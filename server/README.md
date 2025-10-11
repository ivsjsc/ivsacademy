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
