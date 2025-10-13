import React from 'react'
import RemoteComponent from './RemoteComponent'

export default function Fab(){
  return <RemoteComponent src="/components/fab-container.html" onInit={() => {
    // ensure the global controller is initialized if script executed
    try { window.IVSFabController && typeof window.IVSFabController.init === 'function' && window.IVSFabController.init() } catch(e){}
  }} />
}
