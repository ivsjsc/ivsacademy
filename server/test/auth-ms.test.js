// Tests Microsoft OIDC id_token validation and email enforcement
const request = require('supertest');
const jwt = require('jsonwebtoken');

function makeSignedIdToken(payload, privateKey) {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h', keyid: 'testkid' });
}

// Mock jwks-rsa at top-level so it is effective before requiring server module
jest.mock('jwks-rsa', () => {
  return function() {
    return { getSigningKey: (kid, cb) => cb(null, { getPublicKey: () => (global.testPubKey || '') }) };
  };
});

describe('Microsoft ID token validation', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('accepts when email in allowed list', async () => {
    // create a test key pair
    const { generateKeyPairSync } = require('crypto');
    const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
    global.testPubKey = publicKey.export({ type: 'pkcs1', format: 'pem' });
    const privatePem = privateKey.export({ type: 'pkcs1', format: 'pem' });

    process.env.TEST_JWKS_BYPASS = '1';
    process.env.OAUTH_TENANT_ID = 'common';
    process.env.OAUTH_CLIENT_ID = 'client123';
    process.env.AUTH_ALLOWED_EMAILS = 'ivscorp.vn@gmail.com';

    // Mock fetch to return token with id_token with email
    global.fetch = jest.fn((url, opts) => {
      if (url.includes('/token')) {
        const idToken = makeSignedIdToken({ email: 'ivscorp.vn@gmail.com', aud: 'client123' }, privatePem);
        return Promise.resolve({ ok: true, status: 200, json: async () => ({ id_token: idToken }) });
      }
      return Promise.resolve({ ok: false, status: 404, json: async () => ({}) });
    });

    const app = require('../index');
    const agent = request.agent(app);
    const r1 = await agent.get('/auth/start');
    expect(r1.status).toBe(302);
    const location = r1.headers['location'];
    const state = new URL(location).searchParams.get('state');

    const r2 = await agent.get(`/auth/callback?code=CODE123&state=${encodeURIComponent(state)}`);
    expect(r2.status).toBe(302);
  });
});