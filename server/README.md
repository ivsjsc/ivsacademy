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
