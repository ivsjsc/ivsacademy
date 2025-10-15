import React, { useEffect, useRef } from 'react'

type Props = {
  src: string
  onInit?: () => void
}

export default function RemoteComponent({ src, onInit }: Props){
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let mounted = true
    async function load(){
      try{
        const res = await fetch(src)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const html = await res.text()
        if (!mounted) return
        const div = containerRef.current!
        // clear
        div.innerHTML = ''
        const tmp = document.createElement('div')
        tmp.innerHTML = html
        // move non-script nodes
        Array.from(tmp.childNodes).forEach(node => {
          if ((node as HTMLElement).tagName && (node as HTMLElement).tagName.toLowerCase() === 'script') return
          div.appendChild(node)
        })
        // execute scripts (external & inline)
        const scripts = tmp.querySelectorAll('script')
        for (const s of Array.from(scripts)){
          const ns = document.createElement('script')
          for (let i=0;i<s.attributes.length;i++){ const a = s.attributes[i]; ns.setAttribute(a.name, a.value) }
          if (s.src) {
            ns.src = s.src
            await new Promise((res, rej) => { ns.onload = res; ns.onerror = rej; document.body.appendChild(ns) })
          } else {
            ns.text = s.textContent || ''
            document.body.appendChild(ns)
          }
        }
        // call onInit hook if provided
        onInit && onInit()
      } catch (e) {
        console.warn('RemoteComponent load failed', src, e)
      }
    }
    load()
    return ()=>{ mounted = false }
  }, [src])

  return <div ref={containerRef} />
}
