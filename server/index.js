// Simple Express callback endpoint for Microsoft Entra Verified ID
// Accepts POST requests at /api/verified-id/callback
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(morgan('tiny'));

// Simple AI proxy endpoint for the frontend assistant.
// POST /api/grok
// Body is proxied to the configured backend URL. The server reads API keys from env and
// forwards them in a safe way. This avoids exposing keys to the browser.
app.post('/api/grok', async (req, res) => {
  try {
    const backendUrl = process.env.AI_BACKEND_URL || process.env.GOOGLE_API_URL || null;
    const apiKey = process.env.GOOGLE_API_KEY || process.env.AI_API_KEY || process.env.OPENAI_API_KEY || null;

    if (!backendUrl) {
      return res.status(500).json({ error: 'AI backend not configured. Set AI_BACKEND_URL in server environment.' });
    }

    // Forward body as-is. The backend URL may expect a different payload shape depending on provider.
    const forwardUrl = apiKey && backendUrl.includes('?') ? `${backendUrl}&key=${apiKey}` : (apiKey && backendUrl.includes('?') === false && backendUrl.includes('generativelanguage.googleapis.com') ? `${backendUrl}?key=${apiKey}` : backendUrl);

    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      // Do not attach user-sent headers which might leak client data
    };

    // If an OpenAI style key is provided and backend looks like OpenAI, send Authorization header
    if (process.env.OPENAI_API_KEY && /api\.openai\.com/.test(forwardUrl)) {
      fetchOptions.headers['Authorization'] = `Bearer ${process.env.OPENAI_API_KEY}`;
    }

    // If a custom AI_API_KEY is provided and backend does not use ?key=, send it in x-api-key
    if (process.env.AI_API_KEY && !forwardUrl.includes('key=')) {
      fetchOptions.headers['x-api-key'] = process.env.AI_API_KEY;
    }

    const backendResp = await fetch(forwardUrl, fetchOptions);
    const contentType = backendResp.headers.get('content-type') || '';

    // Proxy status and body
    res.status(backendResp.status);
    if (contentType.includes('application/json')) {
      const json = await backendResp.json();
      return res.json(json);
    }
    const text = await backendResp.text();
    res.type('text/plain').send(text);
  } catch (err) {
    console.error('AI proxy error', err);
    res.status(502).json({ error: 'bad_gateway', detail: String(err) });
  }
});

const STORAGE_FILE = path.join(__dirname, '..', 'data', 'verified-id-callbacks.jsonl');

// health
app.get('/api/verified-id/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Callback endpoint
app.post('/api/verified-id/callback', async (req, res) => {
  try {
    // The Verified ID 'custom issue' sample includes a "callback" object with 'state' and 'headers'
    // Accept either a top-level body or a body.callback wrapper depending on how Azure posts it.
    const body = req.body || {};
    const callback = body.callback || body;

    // Validate api-key header (sample request body shows headers.api-key)
    const incomingApiKeyHeader = (req.headers['api-key'] || req.headers['x-api-key'] || '').toString();
    const EXPECTED_API_KEY = process.env.CALLBACK_API_KEY || '';
    const EXPECTED_STATE = process.env.CALLBACK_STATE || '';
    if (EXPECTED_API_KEY) {
      if (!incomingApiKeyHeader) {
        return res.status(401).json({ error: 'Missing api-key header' });
      }
      if (incomingApiKeyHeader !== EXPECTED_API_KEY) {
        return res.status(403).json({ error: 'Invalid api-key' });
      }
    }

    // Optional state check
    const incomingState = callback.state || body.state || '';
    if (EXPECTED_STATE && incomingState !== EXPECTED_STATE) {
      return res.status(400).json({ error: 'Invalid state' });
    }

    // Append raw payload to a newline-delimited JSON file for later processing
    const record = {
      receivedAt: new Date().toISOString(),
      path: req.path,
      headers: req.headers,
      body: body,
      ip: req.ip
    };

    // Ensure directory exists
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.appendFileSync(STORAGE_FILE, JSON.stringify(record) + '\n');

    // Respond according to Verified ID expectations (200 OK)
    res.json({ ok: true });
  } catch (err) {
    console.error('callback error', err);
    res.status(500).json({ error: 'internal_server_error' });
  }
});

// OAuth2 callback for Microsoft Entra
app.get('/auth/callback', async (req, res) => {
  try {
    const { code, state, error, error_description } = req.query;

    if (error) {
      console.error('OAuth error:', error, error_description);
      return res.status(400).send(`Authentication error: ${error_description || error}`);
    }

    if (!code) {
      return res.status(400).send('Missing authorization code');
    }

    // Exchange code for tokens
    const tokenEndpoint = `https://login.microsoftonline.com/${process.env.OAUTH_TENANT_ID}/oauth2/v2.0/token`;
    const params = new URLSearchParams({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.OAUTH_REDIRECT_URI
    });

    const tokenResponse = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData);
      return res.status(500).send('Failed to exchange authorization code for tokens');
    }

    // Here you would typically:
    // - Validate the ID token
    // - Create a session or JWT for the user
    // - Redirect to the frontend with the session

    // For demo purposes, just return the tokens (NOT recommended for production)
    res.json({
      message: 'Authentication successful',
      tokens: tokenData,
      state: state
    });

  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).send('Internal server error during authentication');
  }
});

// Start server when run directly
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Verified ID callback server listening on port ${port}`);
  });
}

module.exports = app;
