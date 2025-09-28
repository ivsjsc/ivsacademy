#!/usr/bin/env powershell
# ⚠ EMERGENCY DNS FIX SCRIPT
# Run this after updating DNS records

Write-Host "⚠ CRITICAL DNS FIX FOR ivsacademy.edu.vn" -ForegroundColor Red
Write-Host "================================================" -ForegroundColor Red

Write-Host ""
Write-Host "⚫ Current Problem:" -ForegroundColor Yellow
Write-Host "- Domain resolves to IPv6 (Netlify) ✅"
Write-Host "- Domain missing IPv4 A records ❌"  
Write-Host "- Browsers prefer IPv4 → connection fails"
Write-Host "- Result: SSL errors on Safari mobile"

Write-Host ""
Write-Host "⚠ IMMEDIATE ACTION REQUIRED:" -ForegroundColor Red
Write-Host "=============================="

Write-Host ""
Write-Host "1. LOGIN TO DNS MANAGEMENT PANEL" -ForegroundColor Cyan
Write-Host "   (The panel shown in your screenshot)"

Write-Host ""
Write-Host "2. UPDATE THESE RECORDS:" -ForegroundColor Cyan
Write-Host "   Record 9:  @ → A → CHANGE TO: 75.2.60.5"
Write-Host "   Record 10: www → A → CHANGE TO: 75.2.60.5"

Write-Host ""  
Write-Host "3. DELETE THIS RECORD:" -ForegroundColor Cyan
Write-Host "   Record 5: * → A → 112.213.89.150 → DELETE"

Write-Host ""
Write-Host "4. ADD NEW RECORD IF MISSING:" -ForegroundColor Cyan
Write-Host "   @ -> A -> 75.2.60.5 (main domain)" -ForegroundColor Cyan

Write-Host ""
Write-Host "⚡ NETLIFY IP ADDRESSES:" -ForegroundColor Green
Write-Host "========================"
Write-Host "Primary IPv4: 75.2.60.5"
Write-Host "Current IPv6: 2406:da18:b3d:e201::258/259 ✅ (already working)"

Write-Host ""
Write-Host "⏱ VERIFICATION COMMANDS:" -ForegroundColor Yellow
Write-Host "========================="
Write-Host ""
Write-Host "After DNS update (wait 15-30 minutes):"
Write-Host ""

# Test current DNS resolution
Write-Host "🔍 Testing current DNS resolution..." -ForegroundColor Blue
try {
    $ipv4 = Resolve-DnsName ivsacademy.edu.vn -Type A -ErrorAction SilentlyContinue | Select-Object -ExpandProperty IPAddress
    $ipv6 = Resolve-DnsName ivsacademy.edu.vn -Type AAAA -ErrorAction SilentlyContinue | Select-Object -ExpandProperty IPAddress
    
    Write-Host ""
    Write-Host "Current DNS Resolution:" -ForegroundColor White
    if ($ipv4) {
        Write-Host "IPv4 (A): $($ipv4 -join ', ')" -ForegroundColor Green
        if ($ipv4 -contains "75.2.60.5") {
            Write-Host "✅ IPv4 points to Netlify!" -ForegroundColor Green
        } else {
            Write-Host "❌ IPv4 NOT pointing to Netlify (75.2.60.5)" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ No IPv4 (A) records found!" -ForegroundColor Red
    }
    
    if ($ipv6) {
        Write-Host "IPv6 (AAAA): $($ipv6 -join ', ')" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ DNS resolution failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "📝 MANUAL VERIFICATION COMMANDS:" -ForegroundColor Yellow
Write-Host "nslookup ivsacademy.edu.vn"
Write-Host "# Should show: Address: 75.2.60.5"
Write-Host ""
Write-Host "ping ivsacademy.edu.vn"  
Write-Host "# Should ping IPv4, not IPv6"
Write-Host ""
Write-Host "curl -I https://ivsacademy.edu.vn"
Write-Host "# Should work without SSL errors"

Write-Host ""
Write-Host "✅ SUCCESS CRITERIA:" -ForegroundColor Green
Write-Host "=================="
Write-Host "✅ nslookup shows 75.2.60.5 (IPv4)"
Write-Host "✅ ping works to IPv4 address"
Write-Host "✅ curl shows HTTP 200 OK"
Write-Host "✅ Safari mobile loads without SSL warning"
Write-Host "✅ Certificate shows CN=ivsacademy.edu.vn"

Write-Host ""
Write-Host "⚠ IF STILL NOT WORKING AFTER DNS UPDATE:" -ForegroundColor Red
Write-Host "==========================================="
Write-Host "1. Clear browser cache completely"
Write-Host "2. Try incognito/private browsing mode"
Write-Host "3. Test from different device/network"
Write-Host "4. Wait up to 24 hours for full DNS propagation"

Write-Host ""
Write-Host "📞 NEED HELP?" -ForegroundColor Magenta
Write-Host "============="
Write-Host "1. Screenshot your DNS panel after making changes"
Write-Host "2. Run: nslookup ivsacademy.edu.vn"
Write-Host "3. Run: curl -I https://ivsacademy.edu.vn" 
Write-Host "4. Test on Safari mobile again"

Write-Host ""
Write-Host "🔥 PRIORITY: Update DNS records NOW!" -ForegroundColor Red
Write-Host "The fix is simple but critical!" -ForegroundColor Red