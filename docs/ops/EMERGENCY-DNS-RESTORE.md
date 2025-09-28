# ⚠ EMERGENCY DNS RESTORATION - IVS Academy

## CRITICAL SITUATION
All DNS records have been deleted from Control Panel!
Only 2 records remain:
- ivsacademy.edu.vn → A → 192.0.1.1 (WRONG IP)
- @ → TXT → v=spf1 include:zohomail.com ~all

## IMMEDIATE ACTION REQUIRED

### Step 1: Add Primary Domain Records
```
Host: @
Type: A  
Value: 75.2.60.5
TTL: 3600
```

```
Host: www
Type: CNAME
Value: ivsacademy.edu.vn
TTL: 3600
```

### Step 2: Fix Existing Wrong Record
**CHANGE THIS:**
```
Host: ivsacademy.edu.vn → A → 192.0.1.1
```
**TO THIS:**
```
Host: @ → A → 75.2.60.5
```

### Step 3: Add Email Records (if needed)
```
Host: @
Type: MX
Value: mx.zoho.com
Priority: 10
TTL: 3600
```

```
Host: @
Type: MX  
Value: mx2.zoho.com
Priority: 20
TTL: 3600
```

### Step 4: Add Zoho Verification (if needed)
```
Host: @
Type: TXT
Value: zoho-verification=zb89517511.zmverify.zoho.com
TTL: 3600
```

## REQUIRED DNS RECORDS FOR WEBSITE TO WORK

### Essential Records:
1. **@ → A → 75.2.60.5** (Main domain to Netlify)
2. **www → CNAME → ivsacademy.edu.vn** (WWW redirect)
3. **Keep: @ → TXT → v=spf1 include:zohomail.com ~all** (Email SPF)

### Verification Commands:
```bash
nslookup ivsacademy.edu.vn
# Should show: 75.2.60.5

nslookup www.ivsacademy.edu.vn  
# Should show: ivsacademy.edu.vn

curl -I https://ivsacademy.edu.vn
# Should work without SSL errors
```

## TIMELINE
- DNS propagation: 15-30 minutes
- SSL certificate: Auto-renewal after domain verified
- Full global propagation: 24-48 hours

## CRITICAL PRIORITY
1. Fix @ record: Change 192.0.1.1 → 75.2.60.5
2. Add www CNAME record
3. Test website accessibility

---
**Without these changes, website will NOT work!**