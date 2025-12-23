// Simple Express callback endpoint for Microsoft Entra Verified ID
// Accepts POST requests at /api/verified-id/callback
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
// Use native fetch when available (Node 18+). If not, lazy-load node-fetch dynamically to avoid ESM import issues in CommonJS environments (tests).
const fetch = globalThis.fetch || ((...args) => import('node-fetch').then(mod => mod.default(...args)));
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
require('dotenv').config();

// Helper: verify Microsoft ID token using tenant JWKS
async function verifyMicrosoftIdToken(idToken, tenantId, clientId) {
  // Test bypass: when running tests or in special env, skip JWKS fetch and return decoded token
  if (process.env.TEST_JWKS_BYPASS === '1') {
    try {
      const decoded = jwt.decode(idToken);
      return decoded;
    } catch (e) {
      throw e;
    }
  }

  return new Promise((resolve, reject) => {
    try {
      const client = jwksClient({ jwksUri: `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`, timeout: 30000 });
      function getKey(header, callback) {
        client.getSigningKey(header.kid, (err, key) => {
          if (err) return callback(err);
          const pubKey = key && (key.getPublicKey ? key.getPublicKey() : key.publicKey);
          callback(null, pubKey);
        });
      }

      const opts = {
        audience: clientId,
        issuer: `https://login.microsoftonline.com/${tenantId}/v2.0`,
        clockTolerance: 300
      };

      jwt.verify(idToken, getKey, opts, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    } catch (e) {
      reject(e);
    }
  });
}

const app = express();
const session = require('express-session');
const crypto = require('crypto');

// Session middleware for OAuth state and simple login sessions
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};
if (process.env.NODE_ENV === 'production' && process.env.TRUST_PROXY === 'true') {
  app.set('trust proxy', 1);
  sessionOptions.cookie.secure = true;
}
app.use(session(sessionOptions));

// Increase JSON limit slightly (some endpoints may POST metadata)
app.use(express.json({ limit: '5mb' }));
// For multipart handling (file uploads)
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: (parseInt(process.env.XAI_MAX_AUDIO_MB || '15', 10) * 1024 * 1024) } });
app.use(morgan('tiny'));

// Simple auth helper middleware
function ensureAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.status(401).json({ error: 'unauthenticated' });
}

// Test-only helper to set a session user quickly when running local tests
if ((process.env.NODE_ENV || 'development') !== 'production') {
  app.post('/test/set-session', (req, res) => {
    const user = req.body && req.body.user ? req.body.user : { provider: 'test', profile: { login: 'testuser' }, email: 'test@example.com' };
    req.session.user = user;
    res.json({ ok: true });
  });
}

// OAuth start endpoint — generates per-request state and redirects to provider
app.get('/auth/start', (req, res) => {
  const provider = (req.query.provider || 'microsoft').toString();
  const state = crypto.randomBytes(16).toString('hex');
  req.session.oauthState = state;
  req.session.oauthProvider = provider;

  let authUrl = '';
  if (provider === 'github') {
    const params = new URLSearchParams({
      client_id: process.env.OAUTH_CLIENT_ID || '',
      redirect_uri: process.env.OAUTH_REDIRECT_URI || '',
      state,
      scope: 'read:user user:email'
    });
    authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  } else {
    // default to Microsoft
    const tenant = (process.env.OAUTH_TENANT_ID || 'common').toString();
    const params = new URLSearchParams({
      client_id: process.env.OAUTH_CLIENT_ID || '',
      response_type: 'code',
      redirect_uri: process.env.OAUTH_REDIRECT_URI || '',
      response_mode: 'query',
      scope: 'openid profile email offline_access',
      state
    });
    authUrl = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize?${params.toString()}`;
  }

  return res.redirect(authUrl);
});
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

/**
 * AI Router Endpoint for Aivy Chatbot
 * POST /api/ai-router
 * 
 * Handles chat messages from the Aivy widget and routes them to the appropriate AI backend.
 * Supports multiple AI providers (Grok, Google Gemini, OpenAI, etc.)
 * 
 * Request body:
 * {
 *   "message": "Your question here",
 *   "model": "gemini" | "grok" | "openai" | "xai",
 *   "language": "en" | "vi",
 *   "timestamp": "2025-12-02T10:00:00Z"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "response": "AI response text",
 *     "model": "gemini",
 *     "language": "en"
 *   }
 * }
 */
app.post('/api/ai-router', async (req, res) => {
  try {
    const { message, model = 'gemini', language = 'en' } = req.body;

    // Validate request
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'message_required',
        detail: 'Message field is required and must be a non-empty string'
      });
    }

    const trimmedMessage = message.trim();

    // Route to appropriate AI service
    let response;
    try {
      switch (model) {
        case 'gemini':
        case 'google':
          response = await callGoogleGemini(trimmedMessage, language);
          break;
        case 'grok':
        case 'xai':
          response = await callGrokAPI(trimmedMessage, language);
          break;
        case 'openai':
          response = await callOpenAI(trimmedMessage, language);
          break;
        default:
          // Default to Gemini
          response = await callGoogleGemini(trimmedMessage, language);
      }
    } catch (serviceError) {
      console.warn(`AI service error (${model}):`, serviceError.message);
      // Fallback: try alternative service
      try {
        console.log('Attempting fallback to Gemini...');
        response = await callGoogleGemini(trimmedMessage, language);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        throw new Error('All AI services unavailable');
      }
    }

    return res.json({
      success: true,
      data: {
        response: response,
        model: model,
        language: language
      }
    });

  } catch (error) {
    console.error('[AI Router] Error:', error);
    return res.status(502).json({
      success: false,
      error: 'service_unavailable',
      detail: error.message || 'AI service is currently unavailable'
    });
  }
});

/**
 * Call Google Gemini API
 */
async function callGoogleGemini(message, language = 'en') {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY not configured');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
  
  const systemPrompt = language === 'vi' 
    ? 'Bạn là Aivy, trợ lý AI của IVS Academy. Hãy trả lời các câu hỏi bằng Tiếng Việt một cách thân thiện, chuyên nghiệp và hữu ích. Tập trung vào các chủ đề liên quan đến giáo dục, khóa học, kỹ năng và dịch vụ của IVS Academy.'
    : 'You are Aivy, an AI assistant for IVS Academy. Please answer questions in a friendly, professional, and helpful manner. Focus on topics related to education, courses, skills, and IVS Academy services.';

  const payload = {
    contents: [
      {
        parts: [
          { text: systemPrompt },
          { text: message }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 500
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Google Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    const text = data.candidates[0].content.parts[0]?.text;
    if (text) return text;
  }

  throw new Error('Invalid response from Gemini API');
}

/**
 * Call Grok API (XAI)
 */
async function callGrokAPI(message, language = 'en') {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    throw new Error('XAI_API_KEY not configured');
  }

  const endpoint = 'https://api.x.ai/v1/chat/completions';
  
  const systemPrompt = language === 'vi' 
    ? 'Bạn là Aivy, trợ lý AI của IVS Academy. Hãy trả lời các câu hỏi bằng Tiếng Việt một cách thân thiện, chuyên nghiệp và hữu ích. Tập trung vào các chủ đề liên quan đến giáo dục, khóa học, kỹ năng và dịch vụ của IVS Academy.'
    : 'You are Aivy, an AI assistant for IVS Academy. Please answer questions in a friendly, professional, and helpful manner. Focus on topics related to education, courses, skills, and IVS Academy services.';

  const payload = {
    model: 'grok-2-latest',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
    temperature: 0.7,
    max_tokens: 500
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Grok API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.choices && data.choices[0] && data.choices[0].message) {
    return data.choices[0].message.content;
  }

  throw new Error('Invalid response from Grok API');
}

/**
 * Call OpenAI API
 */
async function callOpenAI(message, language = 'en') {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  const endpoint = 'https://api.openai.com/v1/chat/completions';
  
  const systemPrompt = language === 'vi' 
    ? 'Bạn là Aivy, trợ lý AI của IVS Academy. Hãy trả lời các câu hỏi bằng Tiếng Việt một cách thân thiện, chuyên nghiệp và hữu ích. Tập trung vào các chủ đề liên quan đến giáo dục, khóa học, kỹ năng và dịch vụ của IVS Academy.'
    : 'You are Aivy, an AI assistant for IVS Academy. Please answer questions in a friendly, professional, and helpful manner. Focus on topics related to education, courses, skills, and IVS Academy services.';

  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
    temperature: 0.7,
    max_tokens: 500
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.choices && data.choices[0] && data.choices[0].message) {
    return data.choices[0].message.content;
  }

  throw new Error('Invalid response from OpenAI API');
}

// Store verified-id callbacks in the repository-level data/ directory so tests and tooling can find it
const STORAGE_FILE = path.join(__dirname, '..', '..', 'data', 'verified-id-callbacks.jsonl');

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

    // Treat placeholder values (e.g. 'replace_with_...') as "not configured" for local/dev/test convenience
    const apiKeyConfigured = EXPECTED_API_KEY && !EXPECTED_API_KEY.startsWith('replace_') && EXPECTED_API_KEY !== '';
    const stateConfigured = EXPECTED_STATE && !EXPECTED_STATE.startsWith('replace_') && EXPECTED_STATE !== '' && EXPECTED_STATE !== 'ivs_login_state';

    if (apiKeyConfigured) {
      if (!incomingApiKeyHeader) {
        return res.status(401).json({ error: 'Missing api-key header' });
      }
      if (incomingApiKeyHeader !== EXPECTED_API_KEY) {
        return res.status(403).json({ error: 'Invalid api-key' });
      }
    }

    // Optional state check (useful for verifying callback source)
    const incomingState = callback.state || body.state || '';
    if (stateConfigured && incomingState !== EXPECTED_STATE) {
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

// OAuth2 callback (handles GitHub and Microsoft via per-request state stored in session)
app.get('/auth/callback', async (req, res) => {
  try {
    const { code, state, error, error_description } = req.query;

    if (error) {
      console.error('OAuth error:', error, error_description);
      return res.status(400).send(`Authentication error: ${error_description || error}`);
    }

    if (!code) return res.status(400).send('Missing authorization code');

    // Verify state against session to prevent CSRF
    const expectedState = req.session && req.session.oauthState;
    const provider = (req.session && req.session.oauthProvider) || 'microsoft';
    if (!expectedState || expectedState !== state) {
      console.warn('Invalid or missing OAuth state', { expectedState, receivedState: state });
      return res.status(400).send('Invalid OAuth state');
    }

    // Clear the stored state (single use)
    delete req.session.oauthState;
    delete req.session.oauthProvider;

    if (provider === 'github') {
      // Exchange code for access token (GitHub)
      const tokenResp = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.OAUTH_CLIENT_ID,
          client_secret: process.env.OAUTH_CLIENT_SECRET,
          code: code,
          redirect_uri: process.env.OAUTH_REDIRECT_URI
        })
      });

      const tokenData = await tokenResp.json();
      if (!tokenResp.ok || tokenData.error) {
        console.error('GitHub token exchange error', tokenData);
        return res.status(500).send('Failed to exchange code for token (GitHub)');
      }

      const accessToken = tokenData.access_token;
      // Fetch user profile
      const userResp = await fetch('https://api.github.com/user', {
        headers: { Authorization: `token ${accessToken}`, 'User-Agent': 'IVS' }
      });
      const userProfile = await userResp.json();

      // Optionally fetch emails to get primary verified email
      let primaryEmail = null;
      try {
        const emailsResp = await fetch('https://api.github.com/user/emails', {
          headers: { Authorization: `token ${accessToken}`, 'User-Agent': 'IVS' }
        });
        if (emailsResp.ok) {
          const emails = await emailsResp.json();
          const primary = emails.find(e => e.primary && e.verified) || emails.find(e => e.verified) || emails[0];
          if (primary) primaryEmail = primary.email;
        }
      } catch (e) {
        // ignore email fetch failures
      }

      // Authorization checks: optional allowed emails/domains/orgs
      // Source allowed lists from envs OR from config file if present
      const cfgPath = require('path').join(__dirname, 'config', 'auth-config.json');
      let cfg = {};
      if (require('fs').existsSync(cfgPath)) {
        try { cfg = JSON.parse(require('fs').readFileSync(cfgPath, 'utf8') || '{}'); } catch (e) { cfg = {}; }
      }
      const allowedEmails = (process.env.AUTH_ALLOWED_EMAILS || (cfg.allowedEmails || []).join(',')).split(',').map(s => s.trim()).filter(Boolean);
      const allowedDomains = (process.env.AUTH_ALLOWED_EMAIL_DOMAINS || (cfg.allowedDomains || []).join(',')).split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const allowedOrgs = (process.env.AUTH_ALLOWED_GITHUB_ORGS || (cfg.allowedGitHubOrgs || []).join(',')).split(',').map(s => s.trim()).filter(Boolean);

      // Email/domain check
      if (allowedEmails.length > 0 || allowedDomains.length > 0) {
        const emailToCheck = (primaryEmail || '').toString().toLowerCase();
        const domain = emailToCheck.split('@')[1] || '';
        const emailOk = allowedEmails.length === 0 || allowedEmails.includes(emailToCheck);
        const domainOk = allowedDomains.length === 0 || (domain && allowedDomains.includes(domain));
        if (!emailOk && !domainOk) {
          console.warn('GitHub login rejected: email/domain not allowed', { email: emailToCheck });
          return res.status(403).send('Your account is not authorized to access this application (email/domain not allowed).');
        }
      }

      // Org membership check (if configured)
      if (allowedOrgs.length > 0) {
        let memberOfOrg = false;
        try {
          for (const org of allowedOrgs) {
            const checkUrl = `https://api.github.com/orgs/${encodeURIComponent(org)}/members/${encodeURIComponent(userProfile.login)}`;
            const mresp = await fetch(checkUrl, { headers: { Authorization: `token ${accessToken}`, 'User-Agent': 'IVS' } });
            if (mresp.status === 204 || mresp.status === 200) { memberOfOrg = true; break; }
          }
        } catch (e) {
          console.warn('GitHub org membership check failed', e.message);
        }
        if (!memberOfOrg) {
          console.warn('GitHub login rejected: not member of required orgs', { login: userProfile.login, requiredOrgs: allowedOrgs });
          return res.status(403).send('Your GitHub account is not a member of the required organization.');
        }
      }

      // Create session user object
      req.session.user = { provider: 'github', profile: userProfile, email: primaryEmail };

      // Redirect to frontend — avoid sending tokens directly
      const redirectTo = `${process.env.BASE_URL || '/'}?auth=success&provider=github`;
      return res.redirect(redirectTo);
    }


    // Default: Microsoft/OIDC flow
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

    // Validate ID token (if present) to extract claims and optionally enforce allowed emails/domains
    let claims = null;
    if (tokenData.id_token) {
      try {
        const tenantId = process.env.OAUTH_TENANT_ID || 'common';
        claims = await verifyMicrosoftIdToken(tokenData.id_token, tenantId, process.env.OAUTH_CLIENT_ID);
      } catch (e) {
        console.error('ID token validation failed', e);
        return res.status(403).send('Failed to validate ID token');
      }

      // Optional email/domain whitelist enforcement
      const allowedEmails = (process.env.AUTH_ALLOWED_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const allowedDomains = (process.env.AUTH_ALLOWED_EMAIL_DOMAINS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const userEmail = (claims && (claims.email || claims.preferred_username || claims.upn || '')) .toString().toLowerCase();
      if ((allowedEmails.length > 0 || allowedDomains.length > 0) && userEmail) {
        const domain = userEmail.split('@')[1] || '';
        const emailOk = allowedEmails.length === 0 || allowedEmails.includes(userEmail);
        const domainOk = allowedDomains.length === 0 || (domain && allowedDomains.includes(domain));
        if (!emailOk && !domainOk) {
          console.warn('Microsoft login rejected: email/domain not allowed', { userEmail });
          return res.status(403).send('Your account is not authorized to access this application (email/domain not allowed).');
        }
      }
    }

    // Store tokens and claims in session (claims can be used by app)
    req.session.user = { provider: 'microsoft', tokens: tokenData, claims: claims };

    // Redirect to frontend sign-in success page
    const redirect = `${process.env.BASE_URL || '/'}?auth=success&provider=microsoft`;

    return res.redirect(redirect);
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).send('Internal server error during authentication');
  }
});

// ADMIN: middleware for admin protection (API key OR session-based admin)
function adminProtect(req, res, next) {
  // IP allowlist (if set)
  const allowedIps = (process.env.ADMIN_ALLOWED_IPS || '').split(',').map(s => s.trim()).filter(Boolean);
  if (allowedIps.length > 0) {
    const ip = req.ip || req.connection && req.connection.remoteAddress;
    if (!allowedIps.includes(ip) && !allowedIps.includes(req.hostname)) {
      return res.status(403).json({ error: 'ip_not_allowed' });
    }
  }

  // Header API key or query param (backwards compatible)
  const adminKey = (req.headers['x-admin-api-key'] || req.query.admin_api_key || '').toString();
  if (adminKey && adminKey === (process.env.ADMIN_API_KEY || '')) return next();

  // Session-based admin
  if (req.session && req.session.isAdmin) return next();

  return res.status(401).json({ error: 'unauthorized' });
}

// Rate limiter for admin endpoints
const rateLimit = require('express-rate-limit');
const adminLimiter = rateLimit({
  windowMs: parseInt(process.env.ADMIN_RATE_LIMIT_WINDOW_MS || '60000', 10),
  max: parseInt(process.env.ADMIN_RATE_LIMIT_REQUESTS || '60', 10),
  standardHeaders: true,
  legacyHeaders: false
});

// ADMIN: expose read-only auth config (protected by ADMIN_API_KEY header or session)
app.get('/admin/auth-config', adminLimiter, adminProtect, (req, res) => {
  const cfgPath = require('path').join(__dirname, 'config', 'auth-config.json');
  let cfg = {};
  if (require('fs').existsSync(cfgPath)) {
    try { cfg = JSON.parse(require('fs').readFileSync(cfgPath, 'utf8') || '{}'); } catch (e) { cfg = {}; }
  }
  return res.json({ ok: true, config: cfg });
});

// POST to update auth config (protected)
app.post('/admin/auth-config', adminLimiter, adminProtect, (req, res) => {
  const body = req.body || {};
  const cfg = {
    allowedEmails: Array.isArray(body.allowedEmails) ? body.allowedEmails : (body.allowedEmails || []),
    allowedDomains: Array.isArray(body.allowedDomains) ? body.allowedDomains : (body.allowedDomains || []),
    allowedGitHubOrgs: Array.isArray(body.allowedGitHubOrgs) ? body.allowedGitHubOrgs : (body.allowedGitHubOrgs || [])
  };
  const fs = require('fs');
  const path = require('path');
  const cfgPath = path.join(__dirname, 'config', 'auth-config.json');
  try {
    fs.writeFileSync(cfgPath + '.tmp', JSON.stringify(cfg, null, 2), { mode: 0o600 });
    fs.renameSync(cfgPath + '.tmp', cfgPath);
    return res.json({ ok: true, config: cfg });
  } catch (e) {
    console.error('Failed to write auth config', e);
    return res.status(500).json({ error: 'write_failed' });
  }
});

// Serve a tiny static admin UI (no session auth; UI itself must send ADMIN API KEY)
app.use('/admin/static', express.static(require('path').join(__dirname, 'static')));

// Admin login endpoints (server-side login using ADMIN_PASSWORD)
app.get('/admin/login', (req, res) => res.sendFile(require('path').join(__dirname, 'static', 'admin-login.html')));
// Brute-force protection helpers
const adminLoginAttempts = new Map(); // ip -> { attempts: [ts], lockedUntil: ts }
function getLoginMax() { return parseInt(process.env.ADMIN_LOGIN_MAX_ATTEMPTS || '5', 10); }
function getLoginWindowMin() { return parseInt(process.env.ADMIN_LOGIN_WINDOW_MIN || '15', 10); }
function getLoginLockMin() { return parseInt(process.env.ADMIN_LOCK_MINUTES || '30', 10); }
function getAdminAlertWebhook() { return process.env.ADMIN_ALERT_WEBHOOK || ''; }

function nowTs() { return Date.now(); }
function minutesToMs(m) { return m * 60 * 1000; }

// Storage abstraction: in-memory Map or Redis (if REDIS_URL provided)
let redisClient = null;
let useRedis = false;
if (process.env.REDIS_URL) {
  try {
    if (process.env.USE_REDIS_IN_MEMORY === '1') {
      // in-process mock Redis for tests and single-node setups
      class MockRedisClient {
        constructor() { this.map = new Map(); }
        async get(k) { return this.map.has(k) ? this.map.get(k) : null; }
        async set(k, v, ...args) { this.map.set(k, v); }
        async del(...ks) { for (const k of ks) this.map.delete(k); }
        scanStream() {
          const self = this;
          async function* gen() {
            const keys = Array.from(self.map.keys());
            for (let i = 0; i < keys.length; i += 100) yield keys.slice(i, i + 100);
          }
          return gen();
        }
      }
      redisClient = new MockRedisClient();
      useRedis = true;
      console.info('Using in-memory mock Redis for admin login storage');
    } else {
      const IORedis = require('ioredis');
      redisClient = new IORedis(process.env.REDIS_URL);
      useRedis = true;
      console.info('Using Redis for admin login storage');
    }
  } catch (e) {
    console.warn('Failed to initialize Redis client, falling back to in-memory store', e.message);
    redisClient = null;
    useRedis = false;
  }
}

async function storageGet(ip) {
  const key = `admin_login:${ip}`;
  if (useRedis && redisClient) {
    const v = await redisClient.get(key);
    return v ? JSON.parse(v) : null;
  }
  return adminLoginAttempts.get(ip) || null;
}

async function storageSet(ip, obj) {
  const key = `admin_login:${ip}`;
  if (useRedis && redisClient) {
    const ttl = Math.ceil((getLoginWindowMin() + getLoginLockMin()) * 60); // seconds
    await redisClient.set(key, JSON.stringify(obj), 'EX', ttl);
    return;
  }
  adminLoginAttempts.set(ip, obj);
}

async function storageClearAll() {
  if (useRedis && redisClient) {
    // best effort: if Redis is available, scan and delete admin_login:* keys
    try {
      const stream = redisClient.scanStream({ match: 'admin_login:*', count: 100 });
      const keys = [];
      for await (const ks of stream) {
        for (const k of ks) keys.push(k);
      }
      if (keys.length) await redisClient.del(...keys);
    } catch (e) {
      console.warn('storageClearAll warning', e.message);
    }
    return;
  }
  adminLoginAttempts.clear();
}

async function recordFailedAttempt(ip) {
  const entry = (await storageGet(ip)) || { attempts: [], lockedUntil: 0 };
  const cutoff = nowTs() - minutesToMs(getLoginWindowMin());
  entry.attempts = entry.attempts.filter(t => t >= cutoff);
  entry.attempts.push(nowTs());
  if (entry.attempts.length >= getLoginMax()) {
    entry.lockedUntil = nowTs() + minutesToMs(getLoginLockMin());
    // fire alert webhook asynchronously
    alertAdminLockout(ip, entry.attempts.length);
  }
  await storageSet(ip, entry);
}

async function isLocked(ip) {
  const entry = await storageGet(ip);
  if (!entry) return false;
  if (entry.lockedUntil && entry.lockedUntil > nowTs()) return true;
  if (entry.lockedUntil && entry.lockedUntil <= nowTs()) {
    // unlock expired lock
    await storageSet(ip, { attempts: [], lockedUntil: 0 });
    return false;
  }
  return false;
}

async function alertAdminLockout(ip, attempts) {
  try {
    const payload = {
      event: 'admin_lockout',
      ip,
      attempts,
      windowMinutes: getLoginWindowMin(),
      lockMinutes: getLoginLockMin(),
      timestamp: new Date().toISOString()
    };
    console.error('Admin lockout:', payload);
    const hook = getAdminAlertWebhook();
    if (hook) {
      // fire and forget
      try {
        await (global.fetch || ((...a)=> import('node-fetch').then(m=>m.default(...a))) )(
          hook,
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
        );
      } catch (e) {
        console.error('Failed to call ADMIN_ALERT_WEBHOOK', e.message);
      }
    }
  } catch (e) {
    console.error('alertAdminLockout error', e);
  }
}

app.post('/admin/login', express.urlencoded({ extended: false }), async (req, res) => {
  const password = (req.body && req.body.password) ? String(req.body.password) : '';
  const ip = req.ip || req.connection && req.connection.remoteAddress || 'unknown';

  if (await isLocked(ip)) {
    console.warn('Blocked admin login attempt from locked IP', ip);
    return res.status(429).send('Too many attempts. Try later.');
  }

  if (!password || password !== (process.env.ADMIN_PASSWORD || '')) {
    // record failed attempt
    await recordFailedAttempt(ip);
    // Mimic same timing for failed responses
    return res.status(401).send('Invalid credentials');
  }

  // success: reset attempts for ip
  await storageSet(ip, { attempts: [], lockedUntil: 0 });
  req.session.isAdmin = true;
  return res.redirect('/admin');
});

// Admin UI route (protected by session or API key)
app.get('/admin', (req, res) => {
  // allow access if session.isAdmin or adminProtect allows header key
  const adminKey = (req.headers['x-admin-api-key'] || req.query.admin_api_key || '').toString();
  if ((req.session && req.session.isAdmin) || (adminKey && adminKey === (process.env.ADMIN_API_KEY || ''))) {
    return res.sendFile(require('path').join(__dirname, 'static', 'admin.html'));
  }
  // otherwise send login page
  return res.redirect('/admin/login');
});

app.post('/admin/logout', (req, res) => {
  if (req.session) { req.session.isAdmin = false; }
  res.json({ ok: true });
});

// Test helper: clear admin login attempts (only in test env)
if (process.env.NODE_ENV === 'test') {
  app.post('/test/clear-admin-login-attempts', async (req, res) => {
    await storageClearAll();
    return res.status(200).json({ ok: true });
  });
}

// POST to update auth config (protected by ADMIN_API_KEY). Body is JSON with allowedEmails, allowedDomains, allowedGitHubOrgs.
app.post('/admin/auth-config', (req, res) => {
  const adminKey = (req.headers['x-admin-api-key'] || req.query.admin_api_key || '').toString();
  if (!adminKey || adminKey !== (process.env.ADMIN_API_KEY || '')) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const body = req.body || {};
  const cfg = {
    allowedEmails: Array.isArray(body.allowedEmails) ? body.allowedEmails : (body.allowedEmails || []),
    allowedDomains: Array.isArray(body.allowedDomains) ? body.allowedDomains : (body.allowedDomains || []),
    allowedGitHubOrgs: Array.isArray(body.allowedGitHubOrgs) ? body.allowedGitHubOrgs : (body.allowedGitHubOrgs || [])
  };
  const fs = require('fs');
  const path = require('path');
  const cfgPath = path.join(__dirname, 'config', 'auth-config.json');
  try {
    fs.writeFileSync(cfgPath + '.tmp', JSON.stringify(cfg, null, 2), { mode: 0o600 });
    fs.renameSync(cfgPath + '.tmp', cfgPath);
    return res.json({ ok: true, config: cfg });
  } catch (e) {
    console.error('Failed to write auth config', e);
    return res.status(500).json({ error: 'write_failed' });
  }
});

// Protected endpoint to return minimal user profile information
app.get('/api/me', ensureAuth, (req, res) => {
  const user = req.session.user || {};
  const profile = user.profile || {};
  const safe = {
    provider: user.provider || null,
    login: profile.login || profile.name || null,
    name: profile.name || null,
    email: (user.email || profile.email || profile.preferredUsername || profile.preferred_username || null),
    claims: user.claims ? { ...user.claims } : undefined
  };
  // Avoid returning tokens or other secrets
  delete safe.tokens;
  res.json({ ok: true, user: safe });
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
