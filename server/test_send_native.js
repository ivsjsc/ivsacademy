const http = require('http');

const payloadObj = {
  callback: { headers: { 'api-key': 'TEST-CLIENT-KEY' }, state: 'sample-state', url: 'https://httpbin.org/post' },
  registration: { clientName: 'TestClient' },
  requestedCredentials: [ { acceptedIssuers: ['did:web:www.linkedin.com'], purpose: 'Test purpose', type: 'VerifiedEmployee' } ]
};

const payload = JSON.stringify(payloadObj);

const options = {
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/verified-id/request',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = http.request(options, (res) => {
  console.log('STATUS', res.statusCode);
  let data = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log('RESPONSE JSON keys:', Object.keys(parsed).slice(0,20));
      console.log(JSON.stringify(parsed, null, 2).slice(0, 4000));
    } catch (e) {
      console.log('RESPONSE TEXT:', data.slice(0, 4000));
    }
  });
});

req.on('error', (e) => {
  console.error('problem with request:', e.message);
});

req.write(payload);
req.end();
