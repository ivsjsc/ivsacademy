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

This server now exposes a small proxy endpoint used by the static frontend assistant to avoid embedding API keys in browser code.

- Endpoint: `POST /api/grok`

Configuration (example `.env` entries):

```
AI_BACKEND_URL=https://generativelanguage.googleapis.com/v1beta2/models/your-model:generate
GOOGLE_API_KEY=AIzaSy...   # set to your Google API key (do NOT commit this)
# or for OpenAI:
OPENAI_API_KEY=sk-...
```

The proxy will forward the JSON body of the request to the configured backend. It attempts to add an API key either via `?key=` if the backend uses Google key style, or via `Authorization: Bearer` when `OPENAI_API_KEY` is set and the backend URL looks like OpenAI.

Run locally:

PowerShell
```powershell
copy .env.example .env
# edit .env and add keys
npm install
npm run dev
```

Security note: Keep your `.env` secret and never commit actual API keys. This proxy is intentionally minimal for local/dev use; for production consider authentication and rate limits.

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
