import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AssistantFull from '../components/AssistantFull'

describe('AssistantFull', ()=>{
  beforeEach(()=>{
    // clear localStorage
    localStorage.clear()
    // mock fetch
    global.fetch = jest.fn(() => Promise.resolve({ ok:true, json: () => Promise.resolve({ reply: 'Hello from AI' }), headers: { get: ()=> 'application/json' } })) as any
  })

  afterEach(()=>{
    ;(global.fetch as any) = undefined
  })

  it('sends a message and renders reply', async ()=>{
    render(<AssistantFull />)
    // open assistant via event
    window.dispatchEvent(new CustomEvent('ivs:open-assistant'))
    const input = await screen.findByPlaceholderText(/Nhập câu hỏi/i)
    fireEvent.change(input, { target: { value: 'Hello' } })
    const send = screen.getByText(/Gửi/i)
    fireEvent.click(send)
    await waitFor(()=> expect(screen.getByText('Hello from AI')).toBeInTheDocument())
  })
})
