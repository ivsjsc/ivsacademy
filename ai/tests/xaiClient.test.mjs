import assert from 'assert'

// simple mock server by stubbing global.fetch
const originalFetch = global.fetch
global.fetch = async function(url, opts){
  return {
    ok: true,
    json: async ()=> ({ reply: 'stubbed' })
  }
}

import { sendPrompt } from './xaiClient.js'

const res = await sendPrompt('hello')
assert.strictEqual(res.reply, 'stubbed')

global.fetch = originalFetch

console.log('xaiClient.test.mjs passed')
