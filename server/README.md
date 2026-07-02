# Server helper endpoints

This small server provides helper endpoints used by the static site during development.

## Celestech API Endpoints (NEW)

Platform untuk membuat dan mengelola permintaan layanan dengan alur persetujuan dan pemrosesan GenAI.

### POST /api/celestech/requests
Create a new service request.

**Authentication**: Requires Firebase ID Token in `Authorization: Bearer <token>` header.

**Request body**:
```json
{
  "title": "Document Translation Request",
  "description": "Translate technical documentation from English to Vietnamese",
  "type": "translate",
  "content": "The text to be translated...",
  "targetLanguage": "vi",
  "metadata": {}
}
```

**Response**:
```json
{
  "success": true,
  "message": "Request created successfully",
  "requestId": "aBcDeFgHiJkL"
}
```

### POST /api/celestech/requests/:id/approve
Approve a pending request (admin only).

**Request body**:
```json
{
  "notes": "Optional admin notes"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Request approved"
}
```

### POST /api/celestech/requests/:id/reject
Reject a pending request (admin only).

**Request body**:
```json
{
  "reason": "Reason for rejection"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Request rejected"
}
```

### POST /api/celestech/genai/process
Process a GenAI task.

**Request body**:
```json
{
  "type": "translate",
  "text": "Text to process",
  "requestId": "aBcDeFgHiJkL",
  "targetLanguage": "vi"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "type": "translate",
    "status": "processing",
    "message": "GenAI processing initiated"
  }
}
```

---

## Verified ID Endpoints

This is a small Node.js/Express app that exposes a callback endpoint compatible with Microsoft Entra Verified ID custom issue flow.

Endpoint: POST /api/verified-id/callback

It will optionally validate an `api-key` header and an expected `state` value. Received payloads are appended to `data/verified-id-callbacks.jsonl`.

Usage
- Copy `.env.example` to `.env` and set `CALLBACK_API_KEY` to the API key you configured in the Entra credential callback headers, and `CALLBACK_STATE` if you use a state.
- Install dependencies: npm install
- Start: npm start

Local testing
- Run tests: npm test

Notes for Azure Entra Verified ID
- In the credential's "Issue a credential -> Custom issue" UI set the POST API call to your publicly reachable URL: e.g. `https://ivsacademy.edu.vn/api/verified-id/callback` and include a header `api-key` with the same value as `CALLBACK_API_KEY`.

## AI Proxy for Assistant (new)

This server exposes small proxy endpoints used by the static frontend assistant to avoid embedding API keys in browser code.

- Primary endpoint: `POST /api/xai` — forwards requests to X.ai chat completions (https://api.x.ai/v1/chat/completions) and requires `XAI_API_KEY` in the server environment.
- Backward-compatible endpoint: `POST /api/grok` — a generic proxy that forwards the request body to the configured `AI_BACKEND_URL` and supports Google/OpenAI key styles via `AI_BACKEND_URL`, `GOOGLE_API_KEY`, or `OPENAI_API_KEY` environment variables.

Configuration (example `.env` entries):

```
# For X.ai proxy
XAI_API_KEY=sk-...            # X.ai secret (do NOT commit)

# Or, for generic AI_BACKEND_URL proxy
AI_BACKEND_URL=https://generativelanguage.googleapis.com/v1beta2/models/your-model:generate
GOOGLE_API_KEY=AIzaSy...   # set to your Google API key (do NOT commit this)
# or for OpenAI:
OPENAI_API_KEY=sk-...
```

The proxies forward the JSON body of the request to the configured backend. The server attempts to add an API key either via `?key=` when using Google-style endpoints, or via `Authorization: Bearer` for OpenAI-like endpoints. Use `POST /api/xai` if you specifically want to target X.ai and `POST /api/grok` for a generic backend configured via `AI_BACKEND_URL`.

Run locally:

PowerShell
```powershell
copy .env.example .env
# edit .env and add keys
npm install
npm run dev
```

Security note: Keep your `.env` secret and never commit actual API keys. These proxies are intentionally minimal for local/dev use; for production consider authentication, rate limits, and monitoring.

## Server-side Graph lookup (new)

This server also exposes a convenience endpoint to lookup a user by `employeeId` using the Microsoft Graph API and client credentials.

- Endpoint: `POST /api/graph/lookup`
- Body: `{ "employeeId": "EMP-1001" }`
- Requires environment variables: `AAD_TENANT_ID`, `AAD_CLIENT_ID`, `AAD_CLIENT_SECRET` (see `.env.example`).

Azure App registration summary for this endpoint:
1. Create an App registration in Azure AD.
2. Under API permissions → Add permission → Microsoft Graph → Application permissions → add `User.Read.All`.
3. Click "Grant admin consent".
4. Create a client secret in Certificates & secrets and copy it into `AAD_CLIENT_SECRET`.

Example curl (after server is running):

```bash
curl -X POST http://localhost:3000/api/graph/lookup \
  -H 'Content-Type: application/json' \
  -d '{"employeeId":"EMP-1001"}'
```

This will return the first matching user object from Graph or a 404 if none found.

## Emergency secret leak remediation (step-by-step)

If a client secret (AAD client secret) was accidentally exposed, follow these steps immediately. The commands below are examples you must run from your machine — I will not execute them for you.

1) Revoke the exposed secret (Azure Portal - fastest)
  - Portal: Azure Active Directory → App registrations → select your app → Certificates & secrets → find the secret and Delete it.

2) Revoke via Azure CLI (alternative)
  - Login and delete by `key-id` (Secret ID shown in the Portal):

```powershell
az login
az ad app credential delete --id <APP_CLIENT_ID> --key-id <SECRET_ID>
```

3) Create a new client secret (Portal or CLI)
  - Portal: Certificates & secrets → New client secret → choose expiry → Copy the value now (it will not be shown again).
  - CLI (returns new secret in `password`):

```powershell
az ad app credential reset --id <APP_CLIENT_ID> --append --years 1
```

4) Update your server configuration (do not commit secrets)
  - Edit `server/.env` and set `AAD_CLIENT_SECRET` to the new value. Ensure `.gitignore` prevents `.env` from being committed.
  - Restart the server process (examples):

Systemd example:
```powershell
# on the server
sudo systemctl restart ivs-verified-server.service
```

npm example (development):
```powershell
cd server
npm install
npm restart
```

PM2 example:
```powershell
pm2 restart ivs-verified-server
```

5) Audit and monitor
  - Check Azure AD Sign-in logs and Audit logs for suspicious token requests from the app. In the Portal: Azure AD → Sign-ins / Audit logs. Filter by Application ID.
  - Check your server logs for unexpected requests to `/api/graph/lookup` or other endpoints.

6) Remove secret from Git history (only if it was committed)
  - WARNING: rewriting git history is destructive and requires force-push. Coordinate with your team.

Option A — `git-filter-repo` (recommended):

```bash
# Install: pip install git-filter-repo
git clone --mirror https://github.com/<owner>/<repo>.git repo-mirror.git
cd repo-mirror.git
# create replacements.txt with a line containing the secret to replace, e.g.
# ABY8Q~...======>***REMOVED***
git filter-repo --replace-text ../replacements.txt
git push --force --all
git push --force --tags
```

Option B — BFG Repo-Cleaner (simpler):

```bash
# requires java and bfg jar
bfg --replace-text passwords.txt repo.git
cd repo.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

7) After scrub: rotate any rotated secrets (you created a new one in step 3) and notify your team.

8) Long-term hardening (recommended)
  - Use Managed Identity (if running in Azure) instead of client secrets when possible. This eliminates secrets.
  - Use Azure Key Vault to store secrets and access them from your server at runtime.
  - Reduce lifetime of client secrets; use certificate-based credentials if possible.

If you want, I can add a helper script template to this repo to help you perform secret removal locally (you must run it yourself). See `scripts/scrub-secret.sh`.

## XAI / third-party AI proxy (server-side)

This server exposes a small proxy endpoint to call third-party AI chat completions without embedding the API key in the browser.

- Endpoint: `POST /api/xai`
- Body: Forwarded JSON as-is to X.ai /chat/completions endpoints.
- Requires: `XAI_API_KEY` in environment (see `.env.example`).

Example curl (server must have XAI_API_KEY set):

```bash
curl -X POST http://localhost:3000/api/xai \
  -H 'Content-Type: application/json' \
  -d '{"model":"grok-4-latest","messages":[{"role":"system","content":"You are a test assistant."},{"role":"user","content":"Say hello"}]}'
```

Security notes:
- Rotate any leaked XAI keys immediately (delete and reissue on provider portal).
- Do not post secrets in chat or public repos.
- Consider using a secret store (Key Vault) and rate limiting / authentication on this endpoint in production.

## Setup & Deployment

### Local Development

```bash
cd server
cp .env.example .env
# Edit .env and add your credentials:
# - Firebase Admin SDK credentials (for Firestore)
# - XAI_API_KEY (for AI proxy)
# - AAD_* variables (for Graph lookup)

npm install
npm run dev
```

Server will run on `http://localhost:3000`.

### Testing Celestech Endpoints

```bash
# Create a request
curl -X POST http://localhost:3000/api/celestech/requests \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_FIREBASE_ID_TOKEN' \
  -d '{
    "title": "Test Request",
    "description": "Test description",
    "type": "translate",
    "content": "Hello world",
    "targetLanguage": "vi"
  }'

# Approve a request (replace REQUEST_ID)
curl -X POST http://localhost:3000/api/celestech/requests/REQUEST_ID/approve \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ADMIN_TOKEN' \
  -d '{"notes": "Approved for processing"}'

# Process with GenAI
curl -X POST http://localhost:3000/api/celestech/genai/process \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -d '{
    "type": "translate",
    "text": "Hello world",
    "requestId": "REQUEST_ID",
    "targetLanguage": "vi"
  }'
```

### Production Deployment

See `DEPLOY_GCP.md` for Cloud Run deployment instructions.

Set environment variables in your hosting platform:
- `FIREBASE_ADMIN_SDK_KEY` - Firebase Admin SDK JSON key
- `XAI_API_KEY` - X.ai API key
- `AAD_TENANT_ID`, `AAD_CLIENT_ID`, `AAD_CLIENT_SECRET` - Azure AD credentials

### Newsletter subscription flow

Endpoint: `POST /api/newsletter/subscribe`

Request body:
```json
{
  "email": "user@example.com",
  "source": "footer",
  "pageUrl": "https://ivsacademy.edu.vn/contact.html"
}
```

What it does:
- Stores the email in Firestore collection `newsletter_subscribers` when `FIREBASE_ADMIN_SDK_KEY` is configured.
- Optionally forwards the submission to `NEWSLETTER_SHEET_WEBHOOK_URL` so an Apps Script can append it to Google Sheets.
- Sends a welcome email through Brevo when `BREVO_API_KEY` and `NEWSLETTER_FROM_EMAIL` are set.

---

**Security notes**:
- Never commit `.env` file with real secrets
- Rotate API keys regularly
- Use Firebase ID Token validation for all endpoints
- Implement rate limiting in production
