const request = require('supertest');
const app = require('../index');

describe('Admin auth-config endpoint', () => {
  test('requires ADMIN_API_KEY', async () => {
    const res = await request(app).get('/admin/auth-config');
    expect(res.status).toBe(401);
  });

  test('returns config when ADMIN_API_KEY provided in header', async () => {
    process.env.ADMIN_API_KEY = 'supersecretkey123';
    const res = await request(app).get('/admin/auth-config').set('x-admin-api-key', 'supersecretkey123');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
    expect(res.body).toHaveProperty('config');
    delete process.env.ADMIN_API_KEY;
  });
});