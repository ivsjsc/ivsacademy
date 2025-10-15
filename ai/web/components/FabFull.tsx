import React, { useEffect } from 'react'

export default function FabFull(){
  useEffect(()=>{
    // show scroll-to-top button when scrolled down
    const btn = document.getElementById('ivs-react-scroll-top')
    function onScroll(){
      if (!btn) return
      if (window.scrollY > 200){ btn.classList.remove('hidden') } else { btn.classList.add('hidden') }
    }
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  }, [])

  function openAssistant(){
    const ev = new CustomEvent('ivs:open-assistant')
    window.dispatchEvent(ev)
  }

  return (
    <div id="ivs-react-fab-full" style={{position:'fixed',right:16,bottom:16,zIndex:9999}}>
      <div style={{display:'flex',flexDirection:'column',gap:12,alignItems:'flex-end'}}>
        <button id="ivs-react-scroll-top" className="hidden" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} style={{width:48,height:48,borderRadius:999,background:'#111',color:'#fff'}}>↑</button>
        <div style={{display:'flex',flexDirection:'column',gap:8,alignItems:'center'}}>
          <button id="ivs-react-open-assistant" onClick={openAssistant} style={{width:56,height:56,borderRadius:999,background:'#0b5fff',color:'#fff',fontWeight:700}}>Chat</button>
          <div style={{display:'flex',flexDirection:'column',gap:6,alignItems:'center'}}>
            <button id="ivs-react-contact" title="Contact" onClick={()=> window.location.href='/contact.html'} style={{width:40,height:40,borderRadius:8,background:'#fff'}}>✉️</button>
            <button id="ivs-react-share" title="Share" onClick={()=> navigator.clipboard?.writeText(window.location.href)} style={{width:40,height:40,borderRadius:8,background:'#fff'}}>🔗</button>
          </div>
        </div>
      </div>
    </div>
  )
}
