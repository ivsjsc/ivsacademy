import React from 'react'
import RemoteComponent from './RemoteComponent'

export default function Assistant(){
  return <RemoteComponent src="/ai/components/ai-assistant.html" onInit={() => {
    try { if (window.IVSAssistant && typeof window.IVSAssistant.init === 'function') window.IVSAssistant.init(); else if (typeof IVSAssistant === 'function') window.IVSAssistant = new IVSAssistant(); } catch(e){}
  }} />
}

