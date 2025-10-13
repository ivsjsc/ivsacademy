import React, { useEffect, useRef, useState } from 'react'

export default function AssistantFull(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{from:'user'|'bot', text:string}>>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const mediaRef = useRef<MediaRecorder | null>(null)

  useEffect(()=>{
    // expose open function
    (window as any).IVSReactAssistant = { open: ()=>setOpen(true), close: ()=>setOpen(false) }
  }, [])

  useEffect(()=>{
    // handler to allow external scripts to open the assistant using CustomEvent 'ivs:open-assistant'
    const handler = (e:Event) => setOpen(true)
    window.addEventListener('ivs:open-assistant', handler as EventListener)
    return ()=> window.removeEventListener('ivs:open-assistant', handler as EventListener)
  }, [])

  function sendMessage(text:string){
    if (!text) return
    setMessages(m => [...m, {from:'user', text}])
    inputRef.current!.value = ''
    // call server-side AI proxy
    fetch('/api/xai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text })
    }).then(async res=>{
      if (!res.ok) throw new Error('AI proxy error')
      const data = await res.json()
      const reply = data && (data.reply || data.output || data.text) ? (data.reply || data.output || data.text) : JSON.stringify(data)
      setMessages(m=>[...m, {from:'bot', text: String(reply)}])
    }).catch(err=>{
      console.warn('xai send err', err)
      setMessages(m=>[...m, {from:'bot', text: 'Xin lỗi, không thể trả lời lúc này.'}])
    })
  }

  async function startRecording(){
    // prefer the shared helper if present
    try{
      const helper = (window as any).IVSAssistantAudio
      if (helper && helper.start && helper.stop){
        helper.start()
        return
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      const chunks: BlobPart[] = []
      mr.ondataavailable = e => chunks.push(e.data)
      mr.onstop = async ()=>{
        const blob = new Blob(chunks, { type: 'audio/webm' })
        // upload to server /api/xai/audio
        const fd = new FormData()
        fd.append('file', blob, 'record.webm')
        try{
          const r = await fetch('/api/xai/audio', { method: 'POST', body: fd })
          if (r.ok){
            const j = await r.json()
            setMessages(m=>[...m, {from:'bot', text: j.transcript || '[Đã nhận audio]'}])
          } else {
            setMessages(m=>[...m, {from:'bot', text: 'Không thể gửi audio.'}])
          }
        }catch(e){ setMessages(m=>[...m, {from:'bot', text: 'Lỗi gửi audio.'}]) }
      }
      mr.start()
      mediaRef.current = mr
    } catch(e){ console.warn('rec start', e) }
  }

  function stopRecording(){
    mediaRef.current?.stop()
    mediaRef.current = null
  }

  return (
    <div style={{position:'fixed',right:24,bottom:80,width:340,zIndex:9999}} aria-hidden={!open}>
      <div style={{background:'#fff',borderRadius:8,boxShadow:'0 10px 30px rgba(0,0,0,.12)'}}>
        <div style={{padding:12,display:'flex',justifyContent:'space-between',alignItems:'center',background:'linear-gradient(90deg,#2563eb,#7c3aed)',color:'#fff',borderRadius:'8px 8px 0 0'}}>
          <div>IVS Assistant</div>
          <button onClick={()=>setOpen(false)} style={{background:'transparent',border:'none',color:'#fff'}}>✕</button>
        </div>
        <div style={{height:220,overflow:'auto',padding:12,background:'#fafafa'}}>
          {messages.map((m,i)=> <div key={i} style={{marginBottom:8,textAlign: m.from==='user' ? 'right' : 'left'}}><div style={{display:'inline-block',padding:8,borderRadius:6,background:m.from==='user'?'#0b5fff':'#eee',color:m.from==='user'?'#fff':'#111'}}>{m.text}</div></div>)}
        </div>
        <div style={{padding:12,borderTop:'1px solid #eee',display:'flex',gap:8}}>
          <input ref={inputRef} placeholder="Nhập câu hỏi..." style={{flex:1,padding:'8px',borderRadius:6,border:'1px solid #ddd'}} />
          <button onClick={()=> sendMessage(inputRef.current?.value || '')} style={{background:'#0b5fff',color:'#fff',padding:'8px 12px',borderRadius:6}}>Gửi</button>
          <button onPointerDown={()=> startRecording()} onPointerUp={()=> stopRecording()} style={{padding:'8px',borderRadius:6}}>🎤</button>
        </div>
      </div>
    </div>
  )
}
