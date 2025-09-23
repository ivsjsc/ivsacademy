#!/usr/bin/env powershell
# 🔒 SSL Certificate Health Check Script
# Usage: .\ssl-check.ps1

param(
    [string]$Domain = "ivsacademy.edu.vn",
    [int]$Port = 443,
    [switch]$Verbose
)

Write-Host "🔍 SSL Certificate Health Check for $Domain" -ForegroundColor Cyan
Write-Host "=" * 50

function Test-SSLCertificate {
    param([string]$hostname, [int]$port)
    
    try {
        # Create TCP connection
        $tcp = New-Object System.Net.Sockets.TcpClient($hostname, $port)
        $ssl = New-Object System.Net.Security.SslStream($tcp.GetStream(), $false, ({$true}))
        
        # Authenticate SSL
        $ssl.AuthenticateAsClient($hostname)
        $cert = [System.Security.Cryptography.X509Certificates.X509Certificate2]::new($ssl.RemoteCertificate)
        
        # Get certificate details
        $subject = $cert.Subject
        $issuer = $cert.Issuer
        $notBefore = $cert.NotBefore
        $notAfter = $cert.NotAfter
        $daysToExpiry = ($notAfter - (Get-Date)).Days
        
        # Check SAN (Subject Alternative Names)
        $sanExtension = $cert.Extensions | Where-Object {$_.Oid.FriendlyName -eq "Subject Alternative Name"}
        $sanNames = if ($sanExtension) { $sanExtension.Format($false) } else { "None" }
        
        # Close connections
        $ssl.Close()
        $tcp.Close()
        
        # Analyze certificate health
        $isValidDomain = $subject -match $hostname -or $sanNames -match $hostname
        $isExpiringSoon = $daysToExpiry -lt 30
        $isNetlifyWildcard = $subject -match "\*\.netlify\.app"
        
        # Return results
        return @{
            Domain = $hostname
            Subject = $subject
            Issuer = $issuer
            NotBefore = $notBefore
            NotAfter = $notAfter
            DaysToExpiry = $daysToExpiry
            SAN = $sanNames
            IsValidDomain = $isValidDomain
            IsExpiringSoon = $isExpiringSoon
            IsNetlifyWildcard = $isNetlifyWildcard
            Status = if ($isNetlifyWildcard) { "❌ WRONG CERTIFICATE" } elseif (!$isValidDomain) { "⚠️ DOMAIN MISMATCH" } elseif ($isExpiringSoon) { "⚠️ EXPIRING SOON" } else { "✅ HEALTHY" }
        }
    }
    catch {
        return @{
            Domain = $hostname
            Status = "❌ CONNECTION FAILED"
            Error = $_.Exception.Message
        }
    }
}

function Test-DNSResolution {
    param([string]$hostname)
    
    try {
        $dns = Resolve-DnsName $hostname -ErrorAction Stop
        $ipv4 = $dns | Where-Object {$_.Type -eq "A"} | Select-Object -ExpandProperty IPAddress
        $ipv6 = $dns | Where-Object {$_.Type -eq "AAAA"} | Select-Object -ExpandProperty IPAddress
        
        return @{
            IPv4 = $ipv4 -join ", "
            IPv6 = $ipv6 -join ", "
            Status = "✅ RESOLVED"
        }
    }
    catch {
        return @{
            Status = "❌ DNS FAILED"
            Error = $_.Exception.Message
        }
    }
}

# Main execution
Write-Host "🌐 DNS Resolution Check" -ForegroundColor Yellow
$dnsResult = Test-DNSResolution -hostname $Domain
Write-Host "Status: $($dnsResult.Status)"
if ($dnsResult.IPv4) { Write-Host "IPv4: $($dnsResult.IPv4)" }
if ($dnsResult.IPv6) { Write-Host "IPv6: $($dnsResult.IPv6)" }
if ($dnsResult.Error) { Write-Host "Error: $($dnsResult.Error)" -ForegroundColor Red }

Write-Host "`n🔒 SSL Certificate Check" -ForegroundColor Yellow
$sslResult = Test-SSLCertificate -hostname $Domain -port $Port

Write-Host "Status: $($sslResult.Status)"
Write-Host "Domain: $($sslResult.Domain)"
if ($sslResult.Subject) { Write-Host "Subject: $($sslResult.Subject)" }
if ($sslResult.Issuer) { Write-Host "Issuer: $($sslResult.Issuer)" }
if ($sslResult.DaysToExpiry) { 
    $color = if ($sslResult.DaysToExpiry -lt 30) { "Red" } elseif ($sslResult.DaysToExpiry -lt 60) { "Yellow" } else { "Green" }
    Write-Host "Days to Expiry: $($sslResult.DaysToExpiry)" -ForegroundColor $color
}
if ($sslResult.SAN -and $Verbose) { Write-Host "SAN: $($sslResult.SAN)" }
if ($sslResult.Error) { Write-Host "Error: $($sslResult.Error)" -ForegroundColor Red }

# Recommendations
Write-Host "`n💡 Recommendations" -ForegroundColor Magenta
if ($sslResult.IsNetlifyWildcard) {
    Write-Host "❌ CRITICAL: Domain is serving Netlify wildcard certificate!"
    Write-Host "   → Fix: Configure custom domain in Netlify Dashboard"
    Write-Host "   → URL: https://app.netlify.com → Site Settings → Domain management"
}
elseif (!$sslResult.IsValidDomain) {
    Write-Host "⚠️  WARNING: Certificate doesn't match domain!"
    Write-Host "   → Check SAN entries and domain configuration"
}
elseif ($sslResult.IsExpiringSoon) {
    Write-Host "⚠️  WARNING: Certificate expires in $($sslResult.DaysToExpiry) days!"
    Write-Host "   → Renew certificate soon"
}
else {
    Write-Host "✅ SSL certificate is healthy!"
}

# Test common subdomains
if ($Verbose) {
    Write-Host "`nTesting Subdomains" -ForegroundColor Yellow
    $subdomains = @("www.$Domain")
    foreach ($subdomain in $subdomains) {
        Write-Host "Testing $subdomain..."
        $subResult = Test-SSLCertificate -hostname $subdomain -port $Port
        Write-Host "  Status: $($subResult.Status)"
    }
}

Write-Host "`n" + "=" * 50
Write-Host "SSL Health Check Complete" -ForegroundColor Green