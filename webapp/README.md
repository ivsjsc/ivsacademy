IVS incremental React scaffold

This folder contains a minimal Vite + React + TypeScript scaffold intended for an incremental migration.

How it works

- The build output is written to `webapp-dist/`.
- The app exposes a global `window.mountIVSReactComponents` object which has helper functions:
  - `mountHeader(selector)` - mounts a React header into the selector
  - `mountFooter(selector)` - mounts a React footer into the selector
  - `mountFab(selector)` - mounts a React FAB into the selector
  - `mountAssistant(selector)` - mounts a React assistant into the selector

Quick start (from project root)

# install deps
cd webapp
npm install

# dev server
npm run dev

# build
npm run build

After building, you can copy files from `webapp-dist/` into your static hosting path or tweak `loadComponents.js` to fetch the React bundle and call `window.mountIVSReactComponents.mountFab('#fab-placeholder')` from the loader.
