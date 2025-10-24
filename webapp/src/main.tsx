import React from 'react'
import { createRoot } from 'react-dom/client'
import MountAPI from './mount'
import './styles.css'

const root = createRoot(document.getElementById('root')!)
root.render(<div>IVS React app ready. Use mount API from static pages.</div>)

// expose mount API globally for incremental integration
;(window as any).mountIVSReactComponents = MountAPI
