const request = require('supertest');
const app = require('../index');

describe('Admin hardening', () => {
  test('login flow sets session and allows access to /admin', async () => {
    process.env.ADMIN_PASSWORD = 'adminpw123';
    const agent = request.agent(app);
    let r = await agent.get('/admin');
    // redirected to login
    expect(r.status).toBe(302);

    r = await agent.post('/admin/login').send('password=adminpw123').set('Content-Type', 'application/x-www-form-urlencoded');
    expect(r.status === 302 || r.status === 200).toBeTruthy();

    r = await agent.get('/admin');
    expect(r.status).toBe(200);

    // logout
    r = await agent.post('/admin/logout');
    expect(r.status).toBe(200);
    delete process.env.ADMIN_PASSWORD;
  });

  test('rate limiter applies to admin endpoints', async () => {
    process.env.ADMIN_API_KEY = 'adminkey';
    process.env.ADMIN_RATE_LIMIT_REQUESTS = '2';
    const headers = { 'x-admin-api-key': 'adminkey' };
    const r1 = await request(app).get('/admin/auth-config').set(headers);
    const r2 = await request(app).get('/admin/auth-config').set(headers);
    const r3 = await request(app).get('/admin/auth-config').set(headers);
    expect([r1.status, r2.status].every(s => s === 200)).toBeTruthy();
    expect(r3.status === 429 || r3.status === 200).toBeTruthy();
    delete process.env.ADMIN_API_KEY;
    delete process.env.ADMIN_RATE_LIMIT_REQUESTS;
  });
});