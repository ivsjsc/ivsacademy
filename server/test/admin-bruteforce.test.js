const request = require('supertest');
const app = require('../index');

describe('Admin brute-force protections', () => {
  beforeEach(() => {
    // short thresholds for testing
    process.env.ADMIN_PASSWORD = 'adminpw123';
    process.env.ADMIN_LOGIN_MAX_ATTEMPTS = '3';
    process.env.ADMIN_LOGIN_WINDOW_MIN = '1';
    process.env.ADMIN_LOCK_MINUTES = '1';
  });

  afterEach(() => {
    delete process.env.ADMIN_PASSWORD;
    delete process.env.ADMIN_LOGIN_MAX_ATTEMPTS;
    delete process.env.ADMIN_LOGIN_WINDOW_MIN;
    delete process.env.ADMIN_LOCK_MINUTES;
    delete process.env.ADMIN_ALERT_WEBHOOK;
    if (global.fetch && global.fetch.mockRestore) global.fetch.mockRestore && global.fetch.mockRestore();
  });

  test('locks out after threshold and calls alert webhook', async () => {
    // clear any existing state
    await request(app).post('/test/clear-admin-login-attempts');

    const webhookCalls = [];
    // mock global fetch to capture webhook calls
    global.fetch = jest.fn(async (url, opts) => {
      webhookCalls.push({ url, body: opts && opts.body ? JSON.parse(opts.body) : null });
      return { ok: true, status: 200 };
    });

    process.env.ADMIN_ALERT_WEBHOOK = 'http://example.local/webhook';

    // three failed attempts
    let r1 = await request(app).post('/admin/login').send('password=wrong1').set('Content-Type', 'application/x-www-form-urlencoded');
    expect(r1.status).toBe(401);
    let r2 = await request(app).post('/admin/login').send('password=wrong2').set('Content-Type', 'application/x-www-form-urlencoded');
    expect(r2.status).toBe(401);
    let r3 = await request(app).post('/admin/login').send('password=wrong3').set('Content-Type', 'application/x-www-form-urlencoded');
    // threshold reached on third attempt; still returns 401 for that attempt but lockout applied
    expect([401, 429].includes(r3.status)).toBeTruthy();

    // next attempt should be blocked with 429
    let r4 = await request(app).post('/admin/login').send('password=wrong4').set('Content-Type', 'application/x-www-form-urlencoded');
    expect(r4.status).toBe(429);

    // webhook should have been called at least once for lockout
    expect(webhookCalls.length).toBeGreaterThanOrEqual(1);
    const call = webhookCalls[0];
    expect(call.url).toBe('http://example.local/webhook');
    expect(call.body.event).toBe('admin_lockout');
    expect(call.body.ip).toBeDefined();
  });

  test('successful login resets attempts', async () => {
    // clear any existing state
    await request(app).post('/test/clear-admin-login-attempts');

    // one failed attempt
    let r1 = await request(app).post('/admin/login').send('password=wrong1').set('Content-Type', 'application/x-www-form-urlencoded');
    expect(r1.status).toBe(401);

    // successful login
    const agent = request.agent(app);
    let r2 = await agent.post('/admin/login').send('password=adminpw123').set('Content-Type', 'application/x-www-form-urlencoded');
    expect([200, 302].includes(r2.status)).toBeTruthy();

    // next failed attempt should NOT immediately lock us out (since attempts were reset)
    let r3 = await request(app).post('/admin/login').send('password=wrong2').set('Content-Type', 'application/x-www-form-urlencoded');
    expect(r3.status).toBe(401);
  });
});
