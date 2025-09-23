@echo off
:loop
cls
echo ===========================================
echo IVS ACADEMY DNS PROPAGATION MONITOR
echo ===========================================
echo Time: %date% %time%
echo.

echo 1. Testing IPv4 Resolution...
echo ==============================
nslookup ivsacademy.edu.vn | findstr "Address:"
echo.

echo 2. Testing IPv4 Ping...
echo =======================
ping ivsacademy.edu.vn -4 -n 1
echo.

echo 3. Testing HTTPS (bypass SSL)...
echo ================================
curl -k -I https://ivsacademy.edu.vn | findstr "HTTP\|Server"
echo.

echo 4. Testing SSL Certificate...
echo =============================
curl -I https://ivsacademy.edu.vn 2>&1 | findstr "certificate\|SSL\|principal"
echo.

echo ===========================================
echo STATUS INDICATORS:
echo ===========================================
echo IPv4 Working: Look for "75.2.60.5" above
echo Ping Working: Look for "Reply from" above  
echo HTTPS Working: Look for "HTTP/1.1 200" above
echo SSL Fixed: No SSL errors above
echo.

echo ===========================================
echo AUTO-REFRESH in 60 seconds...
echo Press CTRL+C to stop monitoring
echo ===========================================

timeout /t 60 /nobreak > nul
goto loop