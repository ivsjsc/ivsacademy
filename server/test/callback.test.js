const request = require('supertest');
const app = require('../index');
const fs = require('fs');
const path = require('path');

describe('Verified ID callback endpoint', () => {
  const storage = path.join(__dirname, '..', 'data', 'verified-id-callbacks.jsonl');

  beforeEach(() => {
    // remove storage file if exists
    try { if (fs.existsSync(storage)) fs.unlinkSync(storage); } catch (e) {}
  });

  test('accepts basic post without api key when not configured', async () => {
    const res = await request(app)
      .post('/api/verified-id/callback')
      .send({ callback: { state: 'abc', headers: { 'api-key': 'k' } } });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
    // storage created
    expect(fs.existsSync(storage)).toBeTruthy();
  });

  test('returns 401 when api key expected but missing', async () => {
    process.env.CALLBACK_API_KEY = 'secret123';
    const res = await request(app)
      .post('/api/verified-id/callback')
      .send({ callback: { state: 's' } });

    expect([401, 403]).toContain(res.status);
    delete process.env.CALLBACK_API_KEY;
  });
});
