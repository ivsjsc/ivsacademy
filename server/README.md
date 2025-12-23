# Server helper endpoints

This small server provides helper endpoints used by the static site during development.

New endpoints added:

- `POST /api/verified-id/request` - Forward a Verified ID verification request to the provided callback URL.

Environment variables (optional):

- `VERIFY_REQUEST_SECRET` - If set, callers must include `X-VERIFY-SECRET` header with this value when calling `/api/verified-id/request` to prevent open relays.
- `VERIFY_CALLBACK_WHITELIST` - Comma-separated list of allowed callback hostnames. If set, callback URLs not matching this list will be rejected.
- `VERIFY_API_KEY` - Server-side API key to inject into outgoing callback headers. Use this instead of sending secrets from the browser.
- `VERIFY_API_KEY_HEADER` - Header name to use for `VERIFY_API_KEY` (defaults to `api-key`).
- `VERIFY_TIMEOUT_MS` - Timeout in milliseconds for outbound callback requests (default 10000).

Example curl (replace placeholders):

```bash
curl -X POST 'http://localhost:3000/api/verified-id/request' \
  -H 'Content-Type: application/json' \
  -H 'X-VERIFY-SECRET: your-secret-if-configured' \
  -d '{
    "callback": {
      "headers": { "api-key": "{REPLACE-WITH-API-KEY}" },
      "state": "{REPLACE-WITH-STATE}",
      "url": "https://httpbin.org/post"
    },
    "registration": { "clientName": "{REPLACE-WITH-CLIENT-NAME}" },
    "requestedCredentials": [ { "acceptedIssuers": ["did:web:www.linkedin.com"], "purpose": "{REPLACE-WITH-PURPOSE}", "type": "VerifiedEmployee" } ]
  }'
```

Example browser usage (use `js/verifyClient.js`):

```js
import { requestVerifiedId, samplePayload } from '/js/verifyClient.js';

(async () => {
  try {
    const resp = await requestVerifiedId(samplePayload);
    console.log('verification response', resp);
  } catch (err) {
    console.error('verification error', err);
  }
})();
```

Notes:
- The server will inject `VERIFY_API_KEY` into the outgoing headers if configured. This prevents the browser from needing to hold secrets.
- The endpoint enforces HTTPS callback URLs and supports an optional whitelist for added safety.
# IVS Verified ID Callback Endpoint (demo)

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

{ 
## GCP Deploy scripts
- Scripts: `server/scripts/gcp/create_service_account.sh`, `enable_apis.sh`, `redeploy_cloudrun.sh`.
- See `DEPLOY_GCP.md` for step-by-step: create SA, upload `GCP_SA_KEY` to GitHub Secrets, enable billing, then run the workflow `Deploy → staging (GCP)`.
}
