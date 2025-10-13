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
