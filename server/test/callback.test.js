const request = require('supertest');
const app = require('../index');
const fs = require('fs');
const path = require('path');

describe('Verified ID callback endpoint', () => {
  // Server writes to server/../data/... (repo-root/data)
  const storage = path.join(__dirname, '..', '..', 'data', 'verified-id-callbacks.jsonl');
  const altStorage = path.join(__dirname, '..', 'data', 'verified-id-callbacks.jsonl');

  beforeEach(() => {
  // remove storage file if exists (either repo-root or server/data)
  try { if (fs.existsSync(storage)) fs.unlinkSync(storage); } catch (e) {}
  try { if (fs.existsSync(altStorage)) fs.unlinkSync(altStorage); } catch (e) {}
  });

  test('accepts basic post without api key when not configured', async () => {
    const res = await request(app)
      .post('/api/verified-id/callback')
      .send({ callback: { state: 'abc', headers: { 'api-key': 'k' } } });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('ok', true);
    // storage created (allow a short retry window for CI/fs timing)
    let exists = false;
    for (let i = 0; i < 10; i++) {
      if (fs.existsSync(storage)) { exists = true; break; }
      await new Promise(r => setTimeout(r, 50));
    }
    expect(exists).toBe(true);
  });

  test('returns 401 when api key expected but missing', async () => {
    process.env.CALLBACK_API_KEY = 'secret123';
    const res = await request(app)
      .post('/api/verified-id/callback')
      .send({ callback: { state: 's' } });

    // When server expects API key but header missing -> 401
    expect(res.status).toBe(401);
    delete process.env.CALLBACK_API_KEY;
  });
});
