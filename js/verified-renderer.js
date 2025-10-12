(function(){
  'use strict';
  function el(id){return document.getElementById(id)}

  function showError(msg){var e=el('error'); if(e) e.textContent = msg;}

  function safeParse(str){ try{return JSON.parse(str);}catch(e){ return {__error: e.message}; }}

  function credentialToCard(cred){
    var subject = cred.credentialSubject || cred.credentialSubject || {};
    return {
      title: (cred.display && cred.display.title) || 'IVS Verified',
      name: subject.name || subject.employeeId || 'Unknown',
      employeeId: subject.employeeId || subject.id || '',
      issuer: (cred.issuer && (cred.issuer.name||cred.issuer.id)) || ''
    };
  }

  function renderCard(card){
    var container = el('cardCanvas'); container.innerHTML = '';
    var h = document.createElement('div'); h.style.fontSize='14px'; h.style.color='#ffd'; h.textContent = card.title; container.appendChild(h);
    var n = document.createElement('div'); n.style.fontSize='20px'; n.style.fontWeight='700'; n.style.marginTop='6px'; n.textContent = card.name; container.appendChild(n);
    var id = document.createElement('div'); id.style.fontSize='12px'; id.style.marginTop='6px'; id.textContent = 'ID: '+card.employeeId; container.appendChild(id);
    var iss = document.createElement('div'); iss.style.fontSize='11px'; iss.style.color='#9fb0c9'; iss.textContent = card.issuer; container.appendChild(iss);
  }

  function generateQr(data){
    var q = el('qrcode'); q.innerHTML = '';
    new QRCode(q, {text:data, width:160, height:160});
  }

  function toDataUrl(json){ var s = JSON.stringify(json, null, 2); var enc = new TextEncoder().encode(s); var b64 = arrayBufferToBase64(enc); return 'data:application/json;base64,'+b64; }
  function arrayBufferToBase64(buffer){ var binary=''; var bytes=new Uint8Array(buffer); for(var i=0;i<bytes.byteLength;i++){ binary+=String.fromCharCode(bytes[i]); } return btoa(binary); }

  function downloadPng(){
    // render cardCanvas and qrcode into a single canvas
    var card = el('cardCanvas'); var qr = el('qrcode').querySelector('img') || el('qrcode').querySelector('canvas');
    if(!card) return showError('No card to download');
    // use html2canvas via CDN? We'll implement simple drawing using canvas
    var canvas = document.createElement('canvas'); canvas.width = 600; canvas.height = 260; var ctx = canvas.getContext('2d');
    // background
    ctx.fillStyle = '#071027'; ctx.fillRect(0,0,canvas.width,canvas.height);
    // draw card area
    ctx.fillStyle = '#0b2140'; ctx.fillRect(20,20,360,220);
    ctx.fillStyle = '#ffd'; ctx.font = '16px sans-serif'; ctx.fillText(card.querySelector('div').textContent, 34,46);
    ctx.font='24px sans-serif'; ctx.fillText(card.querySelectorAll('div')[1].textContent, 34,78);
    ctx.font='12px sans-serif'; ctx.fillStyle='#cfe7ff'; ctx.fillText(card.querySelectorAll('div')[2].textContent, 34,104);
    ctx.fillStyle='#9fb0c9'; ctx.fillText(card.querySelectorAll('div')[3].textContent, 34,124);
    // draw QR if exists
    if(qr){
      try{
        if(qr.tagName === 'IMG'){
          var img = new Image(); img.crossOrigin='anonymous'; img.src = qr.src; img.onload = function(){ ctx.drawImage(img, 400, 60, 160,160); finish(); };
        } else if(qr.tagName === 'CANVAS'){
          ctx.drawImage(qr, 400, 60, 160,160); finish();
        } else finish();
      }catch(e){ finish(); }
    } else finish();

    function finish(){
      var data = canvas.toDataURL('image/png');
      var a = document.createElement('a'); a.href = data; a.download = 'ivs-card.png'; document.body.appendChild(a); a.click(); a.remove();
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    el('renderBtn').addEventListener('click', function(){
      showError('');
      var text = el('jsonInput').value.trim();
      if(!text){ showError('Chưa có JSON'); return; }
      var parsed = safeParse(text);
      if(parsed && parsed.__error){ showError('JSON parse error: '+parsed.__error); return; }
      var card = credentialToCard(parsed);
      renderCard(card);
      var dataUrl = toDataUrl(parsed);
      generateQr(dataUrl);
      el('copyUrlBtn').onclick = function(){ navigator.clipboard.writeText(dataUrl).then(function(){ alert('Copied'); }, function(){ alert('Copy failed'); }); };
    });

    el('lookupBtn').addEventListener('click', async function(){
      showError('');
      var useServer = el('useServerLookup').checked;
      var emp = (el('lookupEmployeeId').value||'').trim();
      if(!emp){ showError('Nhập employeeId để tìm'); return; }
      if(!useServer){ showError('Vui lòng bật option "Tự động lấy thông tin từ Entra"'); return; }
      try{
        var resp = await fetch('/api/graph/lookup', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ employeeId: emp }) });
        if(!resp.ok){ var txt = await resp.text(); showError('Lookup failed: '+resp.status+' '+txt); return; }
        var j = await resp.json();
        if(!j.user){ showError('Không tìm thấy user'); return; }
        // Build a simple credential JSON from returned user
        var user = j.user;
        var cred = {
          '@context': 'https://www.w3.org/2018/credentials/v1',
          type: ['VerifiableCredential','EmployeeID'],
          issuer: { id: 'did:web:ivs.academy', name: 'IVS Academy' },
          credentialSubject: { id: user.id || '', employeeId: user.employeeId || emp, name: user.displayName || user.userPrincipalName, title: user.jobTitle || '' },
          issuanceDate: new Date().toISOString(),
          proof: { type: 'LinkedDataSignature', created: new Date().toISOString(), proofPurpose: 'assertionMethod' }
        };
        el('jsonInput').value = JSON.stringify(cred, null, 2);
        // auto-render
        el('renderBtn').click();
      }catch(err){ console.error(err); showError('Lookup error: '+err.message); }
    });

    el('fileInput').addEventListener('change', function(e){
      var f = e.target.files[0]; if(!f) return; var reader = new FileReader(); reader.onload = function(ev){ el('jsonInput').value = ev.target.result; }; reader.readAsText(f);
    });

    el('downloadBtn').addEventListener('click', function(){ downloadPng(); });
  });
})();