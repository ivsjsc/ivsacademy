const fetch = require('node-fetch');

async function main(){
  const payload = {
    callback: { headers: { 'api-key': 'TEST-CLIENT-KEY' }, state: 'sample-state', url: 'https://httpbin.org/post' },
    registration: { clientName: 'TestClient' },
    requestedCredentials: [ { acceptedIssuers: ['did:web:www.linkedin.com'], purpose: 'Test purpose', type: 'VerifiedEmployee' } ]
  };

  try{
    const res = await fetch('http://127.0.0.1:3000/api/verified-id/request', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
    console.log('STATUS', res.status);
    const txt = await res.text();
    console.log(txt.slice(0, 4000));
  }catch(err){
    console.error('request failed', err);
    process.exit(1);
  }
}

main();
