import React from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/Header'
import Footer from './components/Footer'
import Fab from './components/Fab'
import Assistant from './components/Assistant'

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
  mountAssistant: (selector = '#assistant-placeholder') => {
    const el = document.querySelector(selector)
    if (!el) return null
    return createMount(el as HTMLElement, <Assistant />)
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
    mountAssistant: (selector = '#assistant-placeholder') => {
      const el = document.querySelector(selector)
      if (!el) return null
      return createMount(el as HTMLElement, <Assistant />)
    }
  }
}

function autoMountAll(){
  try{
    const api = (window as any).mountIVSReactComponents
    if (!api) return
    api.mountHeader && api.mountHeader()
    api.mountFooter && api.mountFooter()
    api.mountFab && api.mountFab()
    api.mountAssistant && api.mountAssistant()
  }catch(e){ console.warn('autoMountAll failed', e) }
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', autoMountAll)
} else {
  setTimeout(autoMountAll, 0)
}
