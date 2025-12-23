# IVS Celestech Deployment Guide

## Pre-requisites

1. **Firebase Project** (ivs-159a7)
   - Firebase Authentication (Google Sign-In enabled)
   - Firestore Database
   - Cloud Functions (for GenAI processing)

2. **Google Cloud Project**
   - Google GenAI API enabled
   - Service Account with GenAI permissions

3. **Server Hosting** (for backend endpoints)
   - Node.js 16+
   - npm/yarn
   - Cloud Run, App Engine, or VPS

4. **Domain**
   - HTTPS enabled
   - Admin email configured

## Step 1: Setup Firebase

### Enable Google Sign-In
