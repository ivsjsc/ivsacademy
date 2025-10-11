// Small helper to request a Verified ID verification via server proxy
// Usage:
// import { requestVerifiedId } from '/js/verifyClient.js';
// const resp = await requestVerifiedId(payload);

export async function requestVerifiedId(payload, opts = {}) {
  const url = opts.url || '/api/verified-id/request';
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});

  const resp = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  const contentType = resp.headers.get('content-type') || '';
  if (!resp.ok) {
    const text = contentType.includes('application/json') ? await resp.json() : await resp.text();
    const err = new Error('verification_request_failed');
    err.status = resp.status;
    err.body = text;
    throw err;
  }

  if (contentType.includes('application/json')) return resp.json();
  return resp.text();
}

// Example payload shape (fill in values)
export const samplePayload = {
  callback: {
    headers: {
      // The server will override this header if VERIFY_API_KEY is set
      'api-key': '{REPLACE-WITH-API-KEY}'
    },
    state: '{REPLACE-WITH-STATE}',
    url: '{REPLACE-WITH-URL}'
  },
  registration: {
    clientName: '{REPLACE-WITH-CLIENT-NAME}'
  },
  requestedCredentials: [
    {
      acceptedIssuers: ['did:web:www.linkedin.com'],
      purpose: '{REPLACE-WITH-PURPOSE}',
      type: 'VerifiedEmployee'
    }
  ]
};
