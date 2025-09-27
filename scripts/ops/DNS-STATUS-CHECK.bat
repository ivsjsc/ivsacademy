@echo off
echo ========================================
echo IVS ACADEMY DNS RESTORATION CHECK
echo ========================================
echo.

echo Current DNS Status:
echo -------------------
echo IPv6 Resolution: WORKING (Netlify)
echo IPv4 Resolution: FAILED (No A record)
echo HTTPS: SSL Certificate Error
echo.

echo REQUIRED ACTIONS in DNS Control Panel:
echo ======================================
echo 1. Change Record 1:
echo    Host: @ (not ivsacademy.edu.vn)
echo    Type: A
echo    Value: 75.2.60.5 (not 192.0.1.1)
echo.

echo 2. Add New Record:
echo    Host: www
echo    Type: CNAME  
echo    Value: ivsacademy.edu.vn
echo.

echo Testing Current Status...
echo ========================

echo 1. DNS Resolution Test:
nslookup ivsacademy.edu.vn
echo.

echo 2. IPv4 Ping Test:
ping ivsacademy.edu.vn -4 -n 2
echo.

echo 3. HTTPS Test (bypassing SSL):
curl -k -I https://ivsacademy.edu.vn
echo.

echo ========================================
echo NEXT STEPS:
echo ========================================
echo 1. Fix DNS records in Control Panel
echo 2. Wait 15-30 minutes for propagation
echo 3. Run this script again to verify
echo 4. Test website in browser
echo.

echo SUCCESS CRITERIA:
echo - nslookup shows 75.2.60.5 (IPv4)
echo - ping works to IPv4 address  
echo - curl shows HTTP 200 OK
echo - Website loads without SSL error
echo ========================================

pause