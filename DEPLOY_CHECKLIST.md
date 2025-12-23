# IVS Celestech - Complete Deployment Checklist

## Pre-Deployment (Do This First!)

### 1. Firebase Setup ✅
- [ ] Go to Firebase Console (ivs-159a7)
- [ ] Copy Web App Config from Project Settings
- [ ] Update `Pages/ivs-celestech/config.json` with real credentials:
  ```json
  {
    "firebase": {
      "apiKey": "YOUR_REAL_API_KEY",
      "authDomain": "ivs-159a7.firebaseapp.com",
      "projectId": "ivs-159a7",
      "storageBucket": "ivs-159a7.appspot.com",
      "messagingSenderId": "452959273724",
      "appId": "YOUR_REAL_APP_ID"
    }
  }
  ```

### 2. Firebase Authentication
- [ ] Firebase Console → Authentication → Sign-in method
- [ ] Enable Google Sign-In
- [ ] Add authorized redirect URIs:
  - `http://localhost:3000` (development)
  - `https://ivsacademy.edu.vn` (production)
  - `https://ivsacademy.github.io` (GitHub Pages)

### 3. Firestore Database
- [ ] Firebase Console → Firestore
- [ ] Create database in production mode
- [ ] Update Security Rules:
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      // Requests: owner can read, authenticated users can create
      match /celestech_requests/{document=**} {
        allow read: if request.auth.uid == resource.data.createdBy || request.auth.token.email in ['admin@ivsacademy.edu.vn'];
        allow create: if request.auth.uid != null;
        allow update: if request.auth.token.email in ['admin@ivsacademy.edu.vn'];
      }
    }
  }
  ```

### 4. Admin Emails Setup
- [ ] Update admin emails in `Pages/ivs-celestech/config.json`
- [ ] Update admin emails in `server/.env`
- [ ] Add admin users to Firebase Authentication (optional, can be any verified email)

### 5. Server Setup
- [ ] Download Firebase Admin SDK JSON key from Firebase Console → Project Settings → Service Accounts
- [ ] Copy to `server/firebase-key.json`
- [ ] Create `server/.env`:
  ```
  PORT=3000
  NODE_ENV=development
  FIREBASE_ADMIN_SDK_KEY=<content-of-firebase-key.json>
  XAI_API_KEY=<your-xai-key-if-using>
  ```
- [ ] Add `.env` to `.gitignore` (never commit secrets!)

---

## Step 1: Test Locally (5 mins)

### 1.1 Start Server
```bash
cd server
npm install
npm run dev
# Should see: "Server running on port 3000"
```

### 1.2 Test Frontend
```bash
# In another terminal, from root directory
python -m http.server 8000
# Open http://localhost:8000/Pages/ivs-celestech/
```

### 1.3 Test Google Sign-In
- [ ] Click "Sign in with Google"
- [ ] Should see login dialog
- [ ] Should redirect back and show user email
- [ ] Check console for any errors

### 1.4 Test Create Request
- [ ] Fill form
- [ ] Submit
- [ ] Check Firebase Console → Firestore → celestech_requests
- [ ] Should see new document

### 1.5 Test Admin Panel
- [ ] Sign in with admin email
- [ ] Should see "Admin Panel" tab
- [ ] Should see pending requests
- [ ] Test approve/reject buttons

---

## Step 2: Deploy Frontend (GitHub Pages)

### 2.1 Commit Code
```bash
git add Pages/ivs-celestech/
git add lang/
git add DEPLOY_CELESTECH.md
git add CELESTECH_QUICKSTART.md
git commit -m "Deploy Celestech v1.0 - Production Ready"
```

### 2.2 Push to GitHub
```bash
git push origin main
```

### 2.3 Verify Deployment
- [ ] GitHub Actions runs automatically
- [ ] Wait for workflow to complete (check Actions tab)
- [ ] Visit https://ivsacademy.edu.vn/Pages/ivs-celestech/
- [ ] Should load without errors

### 2.4 Test Live Frontend
- [ ] Open page in browser
- [ ] Check browser console for errors
- [ ] Test all features

---

## Step 3: Deploy Backend Server

### 3.1 Option A: Cloud Run (Recommended)

```bash
# Make sure you're logged in
gcloud auth login
gcloud config set project ivs-159a7

# Deploy
cd server
gcloud run deploy ivs-celestech-server \
  --source . \
  --platform managed \
  --region us-central1 \
  --set-env-vars FIREBASE_ADMIN_SDK_KEY=$(cat firebase-key.json | base64) \
  --allow-unauthenticated

# Note the service URL: https://ivs-celestech-server-xxxxx.run.app
```

### 3.2 Option B: App Engine

```bash
cd server
gcloud app deploy
# Follow prompts
```

### 3.3 Option C: VPS/Self-Hosted

```bash
# SSH into server
ssh user@your-server.com

# Clone repo
git clone https://github.com/ivsacademy/ivs.github.io.git
cd ivs.github.io/server

# Setup
cp .env.example .env
# Edit .env with real secrets

npm install
npm run build  # if needed

# Start with PM2
npm install -g pm2
pm2 start index.js --name "ivs-celestech-server"
pm2 save
pm2 startup
```

### 3.4 Update Frontend Config

After deploying server, update `Pages/ivs-celestech/config.json`:
```json
{
  "api": {
    "baseUrl": "https://your-server-url.com"
  }
}
```

Then commit and push:
```bash
git add Pages/ivs-celestech/config.json
git commit -m "Update API base URL to production server"
git push origin main
```

---

## Step 4: Setup Custom Domain (Optional)

### 4.1 Configure GitHub Pages
- [ ] Repo Settings → Pages → Custom domain
- [ ] Enter `ivsacademy.edu.vn`
- [ ] Add DNS records to your domain provider:
  ```
  CNAME  ivsacademy.edu.vn  → ivsacademy.github.io
  ```

### 4.2 Verify HTTPS
- [ ] Wait 5-10 minutes for DNS to propagate
- [ ] Check "Enforce HTTPS" in GitHub Pages settings
- [ ] Visit https://ivsacademy.edu.vn/Pages/ivs-celestech/

---

## Step 5: Production Hardening

### 5.1 Security
- [ ] Review Firestore security rules (don't allow public write)
- [ ] Enable rate limiting on server (if self-hosted)
- [ ] Rotate API keys monthly
- [ ] Enable 2FA on Firebase/GCP accounts
- [ ] Setup Cloud Audit Logs

### 5.2 Monitoring
- [ ] Setup Cloud Monitoring dashboard
- [ ] Configure email alerts for errors
- [ ] Monitor function execution time
- [ ] Track Firestore read/write operations

### 5.3 Backup
- [ ] Enable Firestore automated backups
- [ ] Test restore procedure
- [ ] Document backup location

### 5.4 Performance
- [ ] Enable Cloud CDN for static assets
- [ ] Setup image optimization
- [ ] Monitor page load times
- [ ] Check Lighthouse scores

---

## Step 6: Email Notifications (Optional)

### 6.1 Install SendGrid
```bash
cd server
npm install @sendgrid/mail
```

### 6.2 Update `.env`
