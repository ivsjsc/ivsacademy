import React from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/Header'
import Footer from './components/Footer'
import Fab from './components/Fab'
import Assistant from './components/Assistant'
import FabFull from './components/FabFull'
import AssistantFull from './components/AssistantFull'

function createMount(container: HTMLElement, Component: React.ReactElement) {
  const root = createRoot(container)
  root.render(Component)
  return () => root.unmount()
}

export default {
  mountHeader: (selector = '#header-placeholder') => {
    const el = document.querySelector(selector)
    if (!el) return null
    return createMount(el as HTMLElement, <Header />)
  },
  mountFooter: (selector = '#footer-placeholder') => {
    const el = document.querySelector(selector)
    if (!el) return null
    return createMount(el as HTMLElement, <Footer />)
  },
  mountFab: (selector = '#fab-placeholder') => {
    const el = document.querySelector(selector)
    if (!el) return null
    return createMount(el as HTMLElement, <Fab />)
  },
  mountFabFull: (selector = '#fab-placeholder') => {
    const el = document.querySelector(selector)
    if (!el) return null
    return createMount(el as HTMLElement, <FabFull />)
  },
  mountAssistant: (selector = '#assistant-placeholder') => {
    const el = document.querySelector(selector)
    if (!el) return null
    return createMount(el as HTMLElement, <Assistant />)
  }
  ,
  mountAssistantFull: (selector = '#assistant-placeholder') => {
    const el = document.querySelector(selector)
    if (!el) return null
    return createMount(el as HTMLElement, <AssistantFull />)
  }
}

// Expose globally for the runtime loader
;(window as any).mountIVSReactComponents = (typeof (window as any).mountIVSReactComponents === 'object' && (window as any).mountIVSReactComponents) || ({} as any)
Object.assign((window as any).mountIVSReactComponents, exportDefault())

function exportDefault(){
  return {
    mountHeader: (selector = '#header-placeholder') => {
      const el = document.querySelector(selector)
      if (!el) return null
      return createMount(el as HTMLElement, <Header />)
    },
    mountFooter: (selector = '#footer-placeholder') => {
      const el = document.querySelector(selector)
      if (!el) return null
      return createMount(el as HTMLElement, <Footer />)
    },
    mountFab: (selector = '#fab-placeholder') => {
      const el = document.querySelector(selector)
      if (!el) return null
      return createMount(el as HTMLElement, <Fab />)
    },
    mountFabFull: (selector = '#fab-placeholder') => {
      const el = document.querySelector(selector)
      if (!el) return null
      return createMount(el as HTMLElement, <FabFull />)
    },
    mountAssistant: (selector = '#assistant-placeholder') => {
      const el = document.querySelector(selector)
      if (!el) return null
      return createMount(el as HTMLElement, <Assistant />)
    },
    mountAssistantFull: (selector = '#assistant-placeholder') => {
      const el = document.querySelector(selector)
      if (!el) return null
      return createMount(el as HTMLElement, <AssistantFull />)
    }
  }
}

// Auto-mount convenience: prefer full React versions when placeholders exist
function autoMountAll(){
  try{
    const api = (window as any).mountIVSReactComponents
    if (!api) return
    // header/footer
    api.mountHeader && api.mountHeader()
    api.mountFooter && api.mountFooter()
    // prefer full fab/assistant but fallback to legacy remote ones
  if (api.mountFabFull) { api.mountFabFull() } else if (api.mountFab) { api.mountFab() }
  if (api.mountAssistantFull) { api.mountAssistantFull() } else if (api.mountAssistant) { api.mountAssistant() }
  }catch(e){ console.warn('autoMountAll failed', e) }
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', autoMountAll)
} else {
  setTimeout(autoMountAll, 0)
}
