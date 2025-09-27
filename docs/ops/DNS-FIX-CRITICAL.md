# ⚠ DNS Configuration Fix - IVS Academy

## ⚠ CRITICAL ISSUE IDENTIFIED
- DNS records are mixed between old server and Netlify
- IPv4 A records point to: 112.213.89.150 (OLD SERVER)
- IPv6 AAAA records point to: 2406:da18:b3d:e201::258/259 (NETLIFY)
- Result: Browser connects to old server → Wrong SSL certificate

## ⚡ IMMEDIATE ACTION REQUIRED

### Step 1: Update DNS Records in Domain Panel
Based on the screenshot, you need to CHANGE these records:

**CURRENT (WRONG):**
```
Record 5: * → A → 112.213.89.150
Record 7: ftp → A → 112.213.89.150  
Record 8: mail → A → 112.213.89.150
Record 9: @ → A → 112.213.89.150
Record 10: www → A → 112.213.89.150
```

**CHANGE TO (CORRECT):**
```
Record 5: * → A → 75.2.60.5 (Netlify IPv4)
Record 7: DELETE (not needed for static site)
Record 8: DELETE (email handled separately) 
Record 9: @ → A → 75.2.60.5 (Main domain)
Record 10: www → A → 75.2.60.5 (WWW subdomain)
```

### Step 2: Add Required Netlify Records
**ADD THESE NEW RECORDS:**
```
@ → A → 75.2.60.5
www → CNAME → ivsacademy.edu.vn
_netlify → TXT → [GET FROM NETLIFY DASHBOARD]
```

### Step 3: DNS Verification Commands
After changing DNS, verify with:
```powershell
# Check A record resolution
nslookup ivsacademy.edu.vn

# Expected result:
# Address: 75.2.60.5 (not 112.213.89.150)

# Check WWW resolution  
nslookup www.ivsacademy.edu.vn

# Test HTTP response
curl -I https://ivsacademy.edu.vn
```

## 🎯 NETLIFY SIDE CONFIGURATION

### Required Actions in Netlify Dashboard:

1. **Login**: https://app.netlify.com
2. **Site Settings** → **Domain management**
3. **Add custom domain**: ivsacademy.edu.vn
4. **Verify domain ownership** (will provide TXT record)
5. **Set as primary domain**
6. **Force SSL certificate renewal**

### Netlify DNS Values:
```
Primary IPv4: 75.2.60.5
Secondary IPv4: 75.2.60.5 (same for load balancing)
IPv6: 2606:4700:60:0::1 (Netlify CDN)
```

## ⏰ PROPAGATION TIMELINE

- **DNS changes**: 15 minutes - 2 hours
- **Global propagation**: 24-48 hours  
- **SSL certificate**: 5-15 minutes after domain verification
- **CDN cache**: 10-30 minutes

## ✅ TESTING CHECKLIST

### After DNS Update (Wait 30 minutes):
- [ ] `nslookup ivsacademy.edu.vn` shows `75.2.60.5`
- [ ] `nslookup www.ivsacademy.edu.vn` shows `75.2.60.5`
- [ ] `curl -I https://ivsacademy.edu.vn` works without SSL error
- [ ] Browser shows green padlock (not SSL warning)
- [ ] Safari mobile works without "connection not private" error

### Cross-Browser Testing:
- [ ] Chrome Desktop ✅
- [ ] Firefox Desktop ✅  
- [ ] Safari Desktop ✅
- [ ] Safari Mobile ✅ (CRITICAL - this was failing)
- [ ] Chrome Mobile ✅
- [ ] Edge Browser ✅

## ⚠ TROUBLESHOOTING

### If Still Having Issues:

**DNS Not Propagated:**
```bash
# Check different DNS servers
nslookup ivsacademy.edu.vn 8.8.8.8
nslookup ivsacademy.edu.vn 1.1.1.1
nslookup ivsacademy.edu.vn 208.67.222.222
```

**SSL Still Wrong:**
```bash
# Force check certificate
openssl s_client -connect ivsacademy.edu.vn:443 -servername ivsacademy.edu.vn
```

**Netlify Not Recognizing Domain:**
1. Remove domain from Netlify
2. Wait 5 minutes  
3. Re-add domain
4. Complete verification process

## 📋 EXACT DNS RECORDS NEEDED

### Delete These Records:
- Record 5: `*` → A → `112.213.89.150`
- Record 7: `ftp` → A → `112.213.89.150`  
- Record 8: `mail` → A → `112.213.89.150`

### Update These Records:
- Record 9: `@` → A → `75.2.60.5` (change from 112.213.89.150)
- Record 10: `www` → A → `75.2.60.5` (change from 112.213.89.150)

### Keep These Records:
- Record 1: `zb89517511` → CNAME → `zmverify.zoho.com` (Zoho verification)
- Record 2: `@` → TXT → `zoho-verification=...` (Zoho verification)
- Record 3: `khahome.com` → A → `192.0.1.1` (separate domain)
- Record 4: `@` → TXT → `v=spf1 a mx -all` (email SPF)
- Record 6: `@` → MX → `mail.khahome.com` (email routing)

---

## 🎯 SUCCESS CRITERIA
✅ DNS resolves to Netlify IPs (75.2.60.5)  
✅ SSL certificate shows CN=ivsacademy.edu.vn  
✅ Safari mobile loads without SSL warnings  
✅ All browsers show green padlock  
✅ Site loads fast via Netlify CDN