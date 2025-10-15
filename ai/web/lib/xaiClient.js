// Minimal XAI client helper used by tests and optionally by components
async function sendPrompt(prompt){
  const res = await fetch('/api/xai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  })
  if (!res.ok) throw new Error('xai error')
  const data = await res.json()
  return data
}

export { sendPrompt }
