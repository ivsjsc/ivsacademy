@echo off
echo ================================
echo DNS FIX VERIFICATION SCRIPT
echo ================================
echo.

echo Step 1: Testing DNS Resolution...
nslookup ivsacademy.edu.vn
echo.

echo Step 2: Testing IPv4 Connectivity...
ping ivsacademy.edu.vn -4 -n 2
echo.

echo Step 3: Testing HTTPS SSL...
curl -I https://ivsacademy.edu.vn
echo.

echo ================================
echo EXPECTED RESULTS AFTER DNS FIX:
echo ================================
echo 1. nslookup shows IPv4: 75.2.60.5
echo 2. ping works to IPv4 address
echo 3. curl shows HTTP 200 OK
echo 4. Safari mobile works without SSL error
echo.

echo ================================
echo IF STILL FAILING:
echo ================================  
echo 1. Wait 30 more minutes for DNS propagation
echo 2. Clear browser cache completely
echo 3. Try incognito mode
echo 4. Test from different device/network
echo.

pause