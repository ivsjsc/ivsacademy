// Simple Express callback endpoint for Microsoft Entra Verified ID
// Accepts POST requests at /api/verified-id/callback
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
// Increase JSON limit slightly (some endpoints may POST metadata)
app.use(express.json({ limit: '5mb' }));
// For multipart handling (file uploads)
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: (parseInt(process.env.XAI_MAX_AUDIO_MB || '15', 10) * 1024 * 1024) } });
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

// Request a verification to be sent to a callback URL.
// This endpoint accepts a payload in the form the frontend provided and forwards it
// to the `callback.url` with the supplied `callback.headers`. For security we
// optionally enforce a request secret and a callback whitelist, and a server-side
// API key override may be applied via env var.
app.post('/api/verified-id/request', async (req, res) => {
  try {
    const payload = req.body || {};
    const callback = payload.callback || {};

    // Optional request secret to avoid open relays (set VERIFY_REQUEST_SECRET)
    const REQUEST_SECRET = process.env.VERIFY_REQUEST_SECRET || '';
    if (REQUEST_SECRET) {
      const incoming = (req.headers['x-verify-secret'] || '').toString();
      if (!incoming || incoming !== REQUEST_SECRET) {
        return res.status(401).json({ error: 'missing_or_invalid_request_secret' });
      }
    }

    if (!callback.url) {
      return res.status(400).json({ error: 'missing_callback_url' });
    }

    // Ensure the URL is HTTPS for safety
    let parsedUrl;
    try {
      parsedUrl = new URL(callback.url);
    } catch (err) {
      return res.status(400).json({ error: 'invalid_callback_url' });
    }
    if (parsedUrl.protocol !== 'https:') {
      return res.status(400).json({ error: 'callback_url_must_be_https' });
    }

    // Optional whitelist of allowed callback hosts (comma-separated)
    const WHITELIST = (process.env.VERIFY_CALLBACK_WHITELIST || '').split(',').map(s => s.trim()).filter(Boolean);
    if (WHITELIST.length > 0) {
      const hostOk = WHITELIST.includes(parsedUrl.hostname) || WHITELIST.includes(parsedUrl.host);
      if (!hostOk) {
        return res.status(403).json({ error: 'callback_host_not_whitelisted', host: parsedUrl.hostname });
      }
    }

    // Merge headers: start with callback.headers (if any), then apply server override
    const outgoingHeaders = Object.assign({}, callback.headers || {});

    // If a server-side VERIFY_API_KEY is provided, inject it under VERIFY_API_KEY_HEADER (default 'api-key')
    const SERVER_API_KEY = process.env.VERIFY_API_KEY || '';
    const SERVER_API_KEY_HEADER = process.env.VERIFY_API_KEY_HEADER || 'api-key';
    if (SERVER_API_KEY) {
      outgoingHeaders[SERVER_API_KEY_HEADER] = SERVER_API_KEY;
    }

    // Default Content-Type application/json
    outgoingHeaders['Content-Type'] = outgoingHeaders['Content-Type'] || 'application/json';

    // Timeout for the outbound request (ms)
    const timeoutMs = parseInt(process.env.VERIFY_TIMEOUT_MS || '10000', 10);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const fetchOptions = {
      method: 'POST',
      headers: outgoingHeaders,
      body: JSON.stringify(payload),
      signal: controller.signal
    };

    const downstream = await fetch(callback.url, fetchOptions);
    clearTimeout(timeoutId);

    const contentType = downstream.headers.get('content-type') || '';
    const status = downstream.status;

    // Proxy response back to caller
    if (contentType.includes('application/json')) {
      const json = await downstream.json();
      return res.status(status).json(json);
    }
    const text = await downstream.text();
    return res.status(status).type('text/plain').send(text);
  } catch (err) {
    if (err && err.name === 'AbortError') {
      return res.status(504).json({ error: 'downstream_timeout' });
    }
    console.error('verification request error', err);
    return res.status(502).json({ error: 'bad_gateway', detail: String(err) });
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

// --- Microsoft Graph lookup using client credentials (server-side)
// POST /api/graph/lookup { employeeId: 'EMP-1001' }
// Requires env: AAD_TENANT_ID, AAD_CLIENT_ID, AAD_CLIENT_SECRET
async function getClientCredentialsToken(tenantId, clientId, clientSecret){
  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('scope', 'https://graph.microsoft.com/.default');
  params.append('client_secret', clientSecret);
  params.append('grant_type', 'client_credentials');

  const resp = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });
  if(!resp.ok){
    const txt = await resp.text();
    throw new Error('Token fetch failed: '+resp.status+' '+txt);
  }
  const j = await resp.json();
  return j.access_token;
}

app.post('/api/graph/lookup', async (req, res) => {
  try{
    const employeeId = (req.body && req.body.employeeId) ? String(req.body.employeeId).trim() : '';
    if(!employeeId) return res.status(400).json({ error: 'missing employeeId' });

    const tenantId = process.env.AAD_TENANT_ID || process.env.OAUTH_TENANT_ID;
    const clientId = process.env.AAD_CLIENT_ID || process.env.OAUTH_CLIENT_ID;
    const clientSecret = process.env.AAD_CLIENT_SECRET || process.env.OAUTH_CLIENT_SECRET;
    if(!tenantId || !clientId || !clientSecret) return res.status(500).json({ error: 'server_not_configured' });

    const token = await getClientCredentialsToken(tenantId, clientId, clientSecret);

    // Query Graph for user with matching employeeId
    const filter = encodeURIComponent(`employeeId eq '${employeeId.replace(/'/g, "''")}'`);
    const url = `https://graph.microsoft.com/v1.0/users?$filter=${filter}`;
    const gresp = await fetch(url, { headers: { Authorization: 'Bearer '+token } });
    if(!gresp.ok){
      const txt = await gresp.text();
      return res.status(502).json({ error: 'graph_error', detail: txt });
    }
    const data = await gresp.json();
    if(!data.value || data.value.length === 0) return res.status(404).json({ error: 'not_found' });
    // return first match
    return res.json({ ok: true, user: data.value[0] });
  }catch(err){
    console.error('graph lookup error', err);
    return res.status(500).json({ error: 'internal_error', detail: String(err) });
  }
});

// Simple proxy to X.ai chat completions (server-side)
// POST /api/xai
// Body: { messages: [...], model: 'grok-4-latest', ... }
app.post('/api/xai', async (req, res) => {
  try{
    const apiKey = process.env.XAI_API_KEY || process.env.AI_API_KEY || '';
    if(!apiKey) return res.status(500).json({ error: 'xai_api_not_configured' });

    // Basic rate-limiting guard (very small, replace with proper limiter in production)
    const MAX_BODY = 20000;
    const incomingSize = JSON.stringify(req.body).length;
    if(incomingSize > MAX_BODY) return res.status(413).json({ error: 'payload_too_large' });

    const endpoint = 'https://api.x.ai/v1/chat/completions';
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify(req.body)
    };

    const r = await fetch(endpoint, fetchOptions);
    const ct = r.headers.get('content-type') || '';
    res.status(r.status);
    if(ct.includes('application/json')){
      const j = await r.json();
      return res.json(j);
    }
    const txt = await r.text();
    return res.type('text/plain').send(txt);
  }catch(err){
    console.error('XAI proxy error', err);
    return res.status(502).json({ error: 'bad_gateway', detail: String(err) });
  }
});

// POST /api/xai/audio - accept audio uploads (multipart/form-data) and forward to configured provider
app.post('/api/xai/audio', upload.single('audio'), async (req, res) => {
  try {
    // Basic config
    const apiKey = process.env.XAI_API_KEY || process.env.AI_API_KEY || '';
    const provider = process.env.XAI_PROVIDER || 'gpt4o';

    // Require API Key for providers that will be used directly
    if (!apiKey && provider === 'gpt4o') return res.status(500).json({ error: 'xai_api_not_configured' });

    // Accept either multipart upload or base64 in JSON
    let audioBuffer = null;
    let filename = 'recording.webm';
    if (req.file && req.file.buffer) {
      audioBuffer = req.file.buffer;
      filename = req.file.originalname || filename;
    } else if (req.body && req.body.audio_base64) {
      // allow JSON payload with base64
      const base64 = req.body.audio_base64;
      audioBuffer = Buffer.from(base64, 'base64');
      filename = req.body.filename || filename;
    } else {
      return res.status(400).json({ error: 'missing_audio' });
    }

    // Quick size guard
    const maxBytes = parseInt(process.env.XAI_MAX_AUDIO_MB || '15', 10) * 1024 * 1024;
    if (audioBuffer.length > maxBytes) return res.status(413).json({ error: 'audio_too_large' });

    // If provider supports audio directly (e.g., gpt-4o-audio-preview), forward multipart
    if (provider === 'gpt4o') {
      // We'll forward to a sample expected endpoint. Update based on actual provider API.
      const endpoint = process.env.GPT_AUDIO_ENDPOINT || 'https://api.openai.com/v1/audio/transcriptions';
      // Use node-fetch multipart
      const FormData = require('form-data');
      const form = new FormData();
      form.append('file', audioBuffer, { filename });
      if (req.body && req.body.prompt) form.append('prompt', req.body.prompt);

      const headers = Object.assign({}, form.getHeaders());
      headers['Authorization'] = `Bearer ${process.env.OPENAI_API_KEY || apiKey}`;

      const upstream = await fetch(endpoint, { method: 'POST', headers, body: form });
      const txt = await upstream.text();
      const contentType = upstream.headers.get('content-type') || '';
      if (!upstream.ok) return res.status(upstream.status).type(contentType).send(txt);
      // If JSON, parse and return unified shape
      if (contentType.includes('application/json')) {
        const j = JSON.parse(txt);
        // Try to extract transcription text (varies by provider)
        const transcript = j.text || j.transcript || (j.data && j.data[0] && j.data[0].text) || null;
        return res.json({ ok: true, model: provider, text: transcript || '', meta: { size: audioBuffer.length } });
      }
      return res.type(contentType).send(txt);
    }

    // Fallback: do STT with upstream if available, then forward text to /api/xai
    // For now, attempt a simple flow: if process.env.STT_API and STT_API_KEY are present, call them.
    if (process.env.STT_API && process.env.STT_API_KEY) {
      const sttEndpoint = process.env.STT_API;
      const FormData = require('form-data');
      const form = new FormData();
      form.append('file', audioBuffer, { filename });
      const headers = Object.assign({}, form.getHeaders());
      headers['Authorization'] = `Bearer ${process.env.STT_API_KEY}`;
      const upr = await fetch(sttEndpoint, { method: 'POST', headers, body: form });
      if (!upr.ok) {
        const t = await upr.text();
        return res.status(502).json({ error: 'stt_failed', detail: t });
      }
      const sttJson = await upr.json();
      const text = sttJson.text || sttJson.transcript || '';
      // Forward to xai endpoint for reasoning
      const forwardResp = await fetch('http://localhost:' + (process.env.PORT || 3000) + '/api/xai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: (req.body.prompt ? req.body.prompt + '\n' : '') + text }] }) });
      const j = await forwardResp.json();
      return res.json({ ok: true, model: 'stt+' + (process.env.XAI_PROVIDER || 'unknown'), text: j?.choices?.[0]?.message?.content || j?.reply || j?.result || '', meta: { stt: sttJson } });
    }

    // If we get here, we don't have an upstream to process audio
    return res.status(501).json({ error: 'audio_processing_not_configured' });
  } catch (err) {
    console.error('audio endpoint error', err);
    return res.status(500).json({ error: 'internal_error', detail: String(err) });
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
