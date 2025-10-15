// Runtime loader: discovers the built React bundle in webapp-dist and loads it
(function(){
  function loadScript(src){
    return new Promise((resolve, reject)=>{
      const s = document.createElement('script')
      s.src = src
      s.defer = true
      s.onload = ()=>resolve()
      s.onerror = (e)=>reject(e)
      document.head.appendChild(s)
    })
  }

  async function findBundle(basePath='/webapp-dist'){
    try{
      const resp = await fetch(basePath + '/index.html', {cache: 'no-store'})
      if (!resp.ok) return null
      const text = await resp.text()
      // find first script src like /assets/index-*.js
      const m = text.match(/src=["']?(.*?)assets\/index(-[\w]+)?\.js["']?/) || text.match(/href=["']?(.*?)assets\/index(-[\w]+)?\.js["']?/)
      if (m && m[1]){
        // m[1] may be absolute path or relative; construct a path we can fetch.
        const candidatePath = (m[1].endsWith('/') ? m[1] : (m[1].length? m[1].replace(/index\.html$/, '') : '/')) + 'assets/index' + (m[2]||'') + '.js'
        // If the candidate is absolute like /assets/..., rewrite to basePath + /assets/...
        if (candidatePath.startsWith('/assets/')) return basePath + candidatePath
        return candidatePath
      }
      // fallback: try common path
      return basePath + '/assets/index.js'
    } catch(e){
      return null
    }
  }

  // Expose an async mount helper but respect a global flag to disable mounting.
  (window).mountIVSReactComponentsAsync = async function(basePath='/webapp-dist'){
      if (window.DISABLE_IVS_WEBAPP_MOUNT) {
        console.info('mountIVSReactComponentsAsync disabled by DISABLE_IVS_WEBAPP_MOUNT flag');
        return null;
      }

      if ((window).mountIVSReactComponents) return (window).mountIVSReactComponents
    // try existing helper first
    try{
      const candidate = await findBundle(basePath)
      if (!candidate) return null
      // If candidate is relative, ensure it starts with '/'
      const src = candidate.startsWith('/') ? candidate : (basePath + '/' + candidate)
      if (!document.querySelector('script[data-ivs-react-bundle]')){
        await loadScript(src)
      }
      return (window).mountIVSReactComponents || null
    } catch(e){
      console.warn('mountIVSReactComponentsAsync failed', e)
      return null
    }
  }
})();
