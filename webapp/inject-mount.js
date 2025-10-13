// Simple script to dynamically load built React bundle and call mount API
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

  // call this from pages after loadComponents has injected placeholders
  (window as any).mountIVSReactComponentsAsync = async function(basePath='/webapp-dist'){
    if ((window as any).mountIVSReactComponents) return window.mountIVSReactComponents
    await loadScript(basePath + '/assets/index.js')
    return (window as any).mountIVSReactComponents
  }
})();
