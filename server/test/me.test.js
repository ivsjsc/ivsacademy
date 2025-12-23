const request = require('supertest');
const app = require('../index');

describe('Auth /me endpoint', () => {
  test('returns 401 when unauthenticated', async () => {
    const res = await request(app).get('/api/me');
    expect(res.status).toBe(401);
  });

  test('returns user info when session present', async () => {
    // set test session via test-only endpoint using an agent to preserve cookies
    const user = { provider: 'test', profile: { login: 'testuser', name: 'Test User' }, email: 'test@example.com' };
    const agent = request.agent(app);
    let res = await agent.post('/test/set-session').send({ user });
    expect(res.status).toBe(200);

    res = await agent.get('/api/me');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
    expect(res.body.user).toHaveProperty('provider', 'test');
    expect(res.body.user).toHaveProperty('login', 'testuser');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });
});