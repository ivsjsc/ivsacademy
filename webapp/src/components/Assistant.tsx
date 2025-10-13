import React from 'react'

export default function Assistant(){
  return (
    <div id="ivs-react-assistant" style={{position:'fixed',right:24,bottom:80,width:320,maxWidth:'90%'}}>
      <div style={{background:'#fff',padding:12,borderRadius:8,boxShadow:'0 6px 18px rgba(0,0,0,0.12)'}}>
        <div style={{fontWeight:600,marginBottom:8}}>IVS Assistant (React)</div>
        <div style={{height:120,overflow:'auto',background:'#f9f9f9',padding:8,borderRadius:6}}>Hello — this is a placeholder assistant.</div>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <input placeholder="Type a message" style={{flex:1,padding:'8px 10px',borderRadius:6,border:'1px solid #eee'}} />
          <button style={{background:'#0b5fff',color:'#fff',padding:'8px 12px',borderRadius:6}}>Send</button>
        </div>
      </div>
    </div>
  )
}
