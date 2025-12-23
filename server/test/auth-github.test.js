// Tests GitHub auth enforcement using mocked fetch
const request = require('supertest');

function mockFetchSequence(seq) {
  let i = 0;
  global.fetch = jest.fn((url, opts) => {
    const entry = seq[i++];
    if (!entry) return Promise.resolve({ ok: false, status: 500, json: async () => ({ error: 'no-mock' }) });
    if (typeof entry === 'function') return Promise.resolve(entry(url, opts));
    return Promise.resolve(entry);
  });
}

describe('GitHub auth enforcement', () => {
  beforeEach(() => {
    jest.resetModules();
    delete process.env.AUTH_ALLOWED_EMAILS;
    delete process.env.AUTH_ALLOWED_EMAIL_DOMAINS;
    delete process.env.AUTH_ALLOWED_GITHUB_ORGS;
  });

  test('accepts user if email & org whitelisted', async () => {
    process.env.AUTH_ALLOWED_EMAILS = 'ivscorp.vn@gmail.com';
    process.env.AUTH_ALLOWED_GITHUB_ORGS = 'ivsjsc';

    // Mock fetch sequence: token exchange -> user -> emails -> org member check
    mockFetchSequence([
      { ok: true, status: 200, json: async () => ({ access_token: 'TKN' }) },
      { ok: true, status: 200, json: async () => ({ login: 'octocat', name: 'Ok Cat' }) },
      { ok: true, status: 200, json: async () => ([{ email: 'ivscorp.vn@gmail.com', primary: true, verified: true }]) },
      { ok: true, status: 204, text: async () => '' }
    ]);

    const app = require('../index');
    const agent = request.agent(app);
    // kick off start to set state
    let r = await agent.get('/auth/start?provider=github');
    expect(r.status).toBe(302);
    // extract state from session cookie by making callback with the same state stored in session
    const cookie = r.headers['set-cookie'];
    // make callback (we can't read session easily; instead we get the redirect state from session via the server's start logic, but tests previously used start then callback with query state param)
    // To keep test simple: call /auth/callback with code and state param equal to agent's session oauthState stored server-side via start. We rely on the server to compare.
    // Get session by calling a helper endpoint that returns session.oauthState (only available in test env). Simpler: call /auth/start then call /auth/callback with 'state' set to any value; but server will reject if mismatch.

    // Instead: read session cookie and use it as same agent to make callback; server stored state; so call callback without knowing state - the server will compare from session vs query state; for test we can get the state by calling internal test-only endpoint (not present). Simpler approach: after start, parse redirect's 'location' header? start redirects to GitHub URL with state in query, but since it was redirected we can parse it from the Location header of the response.
    const location = r.headers['location'];
    const url = new URL(location);
    const state = url.searchParams.get('state');

    r = await agent.get(`/auth/callback?code=CODE123&state=${encodeURIComponent(state)}`);
    expect(r.status).toBe(302);
  });
});