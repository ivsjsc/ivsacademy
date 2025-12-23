// This test file verifies the Redis-backed storage path for admin lockouts.
// It mocks ioredis before requiring the server.

jest.mock('ioredis', () => {
  return class MockRedis {
    constructor() { this.map = new Map(); }
    async get(k) { return this.map.has(k) ? this.map.get(k) : null; }
    async set(k, v, ...args) { this.map.set(k, v); }
    async del(...ks) { for (const k of ks) this.map.delete(k); }
    scanStream() {
      const self = this;
      const iter = async function* () {
        const keys = Array.from(self.map.keys());
        // yield chunks of 100
        for (let i = 0; i < keys.length; i += 100) yield keys.slice(i, i+100);
      };
      const s = iter();
      s.on = (ev, cb) => {};
      s[Symbol.asyncIterator] = iter;
      return s;
    }
  };
});

const request = require('supertest');

describe('Admin brute-force (Redis-backed)', () => {
  let app;
  beforeAll(() => {
    process.env.REDIS_URL = 'redis://localhost:6379';
    process.env.USE_REDIS_IN_MEMORY = '1';
    process.env.ADMIN_PASSWORD = 'adminpw123';
    // reset modules to ensure our environment variables and mocks take effect
    jest.resetModules();
    app = require('../index');
  });
  afterAll(() => {
    delete process.env.REDIS_URL;
    delete process.env.ADMIN_PASSWORD;
  });

  test('locks out after threshold using redis store', async () => {
    process.env.ADMIN_LOGIN_MAX_ATTEMPTS = '3';
    process.env.ADMIN_LOGIN_WINDOW_MIN = '1';
    process.env.ADMIN_LOCK_MINUTES = '1';

    await request(app).post('/test/clear-admin-login-attempts');

    let r1 = await request(app).post('/admin/login').send('password=wrong1').set('Content-Type', 'application/x-www-form-urlencoded');
    expect(r1.status).toBe(401);
    let r2 = await request(app).post('/admin/login').send('password=wrong2').set('Content-Type', 'application/x-www-form-urlencoded');
    expect(r2.status).toBe(401);
    let r3 = await request(app).post('/admin/login').send('password=wrong3').set('Content-Type', 'application/x-www-form-urlencoded');
    expect([401, 429].includes(r3.status)).toBeTruthy();

    let r4 = await request(app).post('/admin/login').send('password=wrong4').set('Content-Type', 'application/x-www-form-urlencoded');
    expect(r4.status).toBe(429);
  });
});
