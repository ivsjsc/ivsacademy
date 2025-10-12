(function(){
  'use strict';

  function el(id){ return document.getElementById(id); }

  function tryParseJSON(str){
    if(!str || !str.trim()) return null;
    try{ return JSON.parse(str); }catch(e){ return { __parseError: e.message }; }
  }

  // small utility: show transient toast
  function showToast(msg, timeout){
    timeout = timeout || 3000;
    var t = document.getElementById('toast'); if(!t) return alert(msg);
    var el = document.createElement('div');
    el.style.background = 'rgba(0,0,0,0.7)'; el.style.color = 'white'; el.style.padding = '0.5rem 0.75rem'; el.style.borderRadius = '0.5rem'; el.style.marginTop = '0.5rem';
    el.textContent = msg;
    t.appendChild(el);
    setTimeout(function(){ el.remove(); }, timeout);
  }

  function buildManifest(){
    var emp = (el('employeeId').value || '').trim();
    if(!emp) return { error: 'employeeId is required' };
    var manifest = {
      '@context': 'https://www.w3.org/2018/credentials/v1',
      type: ['VerifiableCredential','EmployeeID'],
      issuer: {
        id: 'did:web:ivs.academy',
        name: 'IVS Academy'
      },
      credentialSubject: {
        id: 'urn:employee:'+emp,
        employeeId: emp
      },
      issuanceDate: (new Date()).toISOString(),
      proof: {
        type: 'LinkedDataSignature',
        created: (new Date()).toISOString(),
        proofPurpose: 'assertionMethod'
      }
    };

    var fullName = (el('fullName').value||'').trim();
    if(fullName) manifest.credentialSubject.name = fullName;
    var title = (el('title').value||'').trim();
    if(title) manifest.credentialSubject.title = title;

    var extra = tryParseJSON(el('extraPayload').value);
    if(extra){
      if(extra.__parseError) return { error: 'extraPayload JSON parse error: '+extra.__parseError };
      // merge shallowly
      manifest.credentialSubject.extra = extra;
    }

    return manifest;
  }

  function toDataUrl(obj){
    var json = JSON.stringify(obj, null, 2);
    // UTF-8 safe base64
    var enc = new TextEncoder().encode(json);
    var b64 = arrayBufferToBase64(enc);
    return 'data:application/json;base64,'+b64;
  }

  function arrayBufferToBase64(buffer){
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function updatePreview(){
    // clear inline errors
    var empErr = el('employeeError'); if(empErr) empErr.textContent = '';
    var extraErr = el('extraError'); if(extraErr) extraErr.textContent = '';

    var m = buildManifest();
    if(m.error){
      // show inline error if related
      if(m.error.indexOf('employeeId')!==-1 && empErr) empErr.textContent = m.error;
      else if(m.error.indexOf('extraPayload')!==-1 && extraErr) extraErr.textContent = m.error;
      el('manifestPreview').textContent = JSON.stringify({ error: m.error }, null, 2);
      el('manifestUrl').value = '';
      showToast('Error: '+m.error,4000);
      return;
    }
    var preview = JSON.stringify(m, null, 2);
    el('manifestPreview').textContent = preview;
    var url = toDataUrl(m);
    el('manifestUrl').value = url;

    // size warning for large manifests
    if(url.length > 16*1024){
      showToast('Warning: manifest data URL > 16KB. Consider hosting the JSON on HTTPS.',5000);
    }
  }

  function downloadJson(){
    var m = buildManifest();
    if(m.error){ alert(m.error); return; }
    var blob = new Blob([JSON.stringify(m,null,2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (m.credentialSubject && m.credentialSubject.employeeId ? m.credentialSubject.employeeId : 'manifest') + '.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    showToast('Manifest downloaded',2000);
  }

  function copyToClipboard(){
    var url = el('manifestUrl').value;
    if(!url){ alert('No manifest URL to copy. Generate one first.'); return; }
    // Clipboard API with fallback
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(url).then(function(){ showToast('Manifest URL copied to clipboard',2000); }, function(err){ fallbackCopy(url); });
    } else { fallbackCopy(url); }
  }

  function fallbackCopy(text){
    try{
      var ta = document.createElement('textarea'); ta.value = text; ta.style.position='fixed'; ta.style.left='-9999px'; document.body.appendChild(ta); ta.select();
      var ok = document.execCommand('copy'); ta.remove();
      if(ok) showToast('Manifest URL copied to clipboard',2000); else alert('Copy failed');
    }catch(e){ alert('Copy failed: '+e); }
  }

  document.addEventListener('DOMContentLoaded', function(){
    var inputs = ['employeeId','fullName','title','extraPayload'];
    inputs.forEach(function(i){ var node = el(i); if(node) node.addEventListener('input', updatePreview); });

    var gen = el('generateBtn'); if(gen) gen.addEventListener('click', updatePreview);
    var dl = el('downloadBtn'); if(dl) dl.addEventListener('click', downloadJson);
    var cp = el('copyBtn'); if(cp) cp.addEventListener('click', copyToClipboard);

    // seed
    updatePreview();
  });

})();