# 🔒 Fix SSL Certificate - IVS Academy

## Vấn Đề Hiện Tại
- Domain `ivsacademy.edu.vn` đang serve certificate `*.netlify.app`
- Gây ra lỗi SSL trên Safari mobile và một số trình duyệt
- Certificate Subject: CN=*.netlify.app thay vì CN=ivsacademy.edu.vn

## Giải Pháp Triệt Để

### Bước 1: Kiểm tra Netlify Domain Settings
1. Đăng nhập [Netlify Dashboard](https://app.netlify.com)
2. Chọn site `ivsjsc.netlify.app`
3. Vào **Site settings** → **Domain management**
4. Kiểm tra **Custom domains** section

### Bước 2: Cấu Hình Custom Domain Đúng Cách
```
Primary domain: ivsacademy.edu.vn
Domain aliases: www.ivsacademy.edu.vn
```

### Bước 3: Verify Domain Ownership
- Netlify sẽ yêu cầu verify ownership qua DNS records
- Thêm TXT record vào DNS provider của domain

### Bước 4: Force SSL Certificate Renewal
```bash
# Trong Netlify Dashboard:
# 1. Domain settings → HTTPS → Renew certificate
# 2. Hoặc xóa domain và thêm lại để force new cert
```

### Bước 5: Cập Nhật DNS Records
```dns
# A Records (IPv4)
@ IN A 75.2.60.5

# AAAA Records (IPv6) 
@ IN AAAA 2406:da18:b3d:e201::258
@ IN AAAA 2406:da18:b3d:e201::259

# CNAME for www
www IN CNAME ivsacademy.edu.vn
```

## Kiểm Tra Sau Khi Fix

### Test SSL Certificate
```powershell
# Kiểm tra certificate mới
$tcp=New-Object System.Net.Sockets.TcpClient('ivsacademy.edu.vn',443)
$ssl=New-Object System.Net.Security.SslStream($tcp.GetStream(),$false,({$true}))
$ssl.AuthenticateAsClient('ivsacademy.edu.vn')
$cert=[System.Security.Cryptography.X509Certificates.X509Certificate2]::new($ssl.RemoteCertificate)
Write-Output ('Subject: ' + $cert.Subject)
Write-Output ('Issuer: ' + $cert.Issuer)
$ssl.Close();$tcp.Close()
```

### Expected Result
```
Subject: CN=ivsacademy.edu.vn, O="Netlify, Inc"
Issuer: CN=DigiCert Global G2 TLS RSA SHA256 2020 CA1
```

### Test Trên Nhiều Devices
- ✅ Chrome Desktop
- ✅ Firefox Desktop  
- ✅ Safari Desktop
- ✅ Safari Mobile (iPhone/iPad)
- ✅ Chrome Mobile
- ✅ Edge Mobile

## Thời Gian Propagation
- DNS changes: 24-48 hours
- SSL certificate: 5-15 minutes sau khi verify domain
- CDN cache: 10-30 minutes

## Backup Plan
Nếu vẫn có vấn đề:
1. Sử dụng CloudFlare SSL proxy
2. Chuyển sang custom SSL certificate
3. Sử dụng subdomain backup: `app.ivsacademy.edu.vn`

## Monitoring
- Set up SSL monitoring với UptimeRobot
- Alert khi certificate sắp expire
- Monthly SSL health check

---
**Status**: 🔄 In Progress  
**Next Check**: Sau 2 hours khi DNS propagate  
**ETA**: SSL fix hoàn tất trong 24h