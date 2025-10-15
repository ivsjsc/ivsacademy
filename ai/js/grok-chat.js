/*
 Unified IVS Assistant
 - Merges useful features from previous GrokChat and IVSChatbot implementations
 - Adds: AbortController with timeout, input/button disable while waiting, aria-live for accessibility,
   sessionStorage conversation persistence, friendly error handling.
 - Exposes: window.IVSAssistant and window.IVSFABChatbot (alias) for compatibility.
*/

class IVSAssistant {
    constructor(opts = {}) {
        this.opts = Object.assign({
            // Prefer the server-side X.ai proxy when available. Fall back to legacy /api/grok.
            apiPath: '/api/xai',
            timeoutMs: 10000,
            storageKey: 'ivs_assistant_conversation',
            initialMessage: 'Xin chào! Tôi là IVS Assistant. Tôi có thể giúp gì cho bạn?'
        }, opts);

    // Debug: indicate which API path assistant will call (visible in browser console)
    try { if (typeof console !== 'undefined' && console.info) console.info('IVSAssistant configured apiPath =', this.opts.apiPath); } catch(e) {}

        this.container = document.getElementById('ai-assistant-window') || document.createElement('div');
        this.chatWindow = null;
        this.messagesContainer = null;
        this.input = null;
        this.sendBtn = null;
        this.closeBtn = null;
        this.quickReplies = null;
        this.isSending = false;
    this._lastSendAt = 0; // throttle guard (ms)
        this.conversation = [];

        // Defer initialization: allow caller to call init(), but also attempt auto-init
        // in case DOM is already present. Use a small delay to allow loadComponents to inject markup.
        setTimeout(() => this.init(), 50);
    }

    init() {
        // If component markup exists, wire into it; otherwise keep retrying for a short period
        const requiredSelectors = ['chat-window', 'chat-messages', 'chat-input', 'chat-send'];
        const foundAll = requiredSelectors.every(id => document.getElementById(id));
        if (!foundAll) {
            // Retry a few times with backoff before giving up
            if (!this._initAttempts) this._initAttempts = 0;
            this._initAttempts++;
            if (this._initAttempts <= 6) {
                const delay = 50 * this._initAttempts;
                setTimeout(() => this.init(), delay);
                return;
            } else {
                // Give up gracefully; will try again if loadComponents explicitly calls IVSAssistant.init()
                window.componentLog('IVSAssistant: DOM not ready for init after retries; defer until component injected.', 'warn');
                return;
            }
        }

        this.chatWindow = document.getElementById('chat-window');
        this.messagesContainer = document.getElementById('chat-messages');
        this.input = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('chat-send');
        this.closeBtn = document.getElementById('chat-close');
        this.quickReplies = document.querySelectorAll('.quick-reply');
        this.assistantBtn = document.getElementById('assistant-main-btn');

        // Ensure messages container has aria-live for screen readers
        if (this.messagesContainer) {
            this.messagesContainer.setAttribute('role', 'log');
            this.messagesContainer.setAttribute('aria-live', 'polite');
        }

        this.bindEvents();
        this.restoreConversation();

        if (!this.conversation || this.conversation.length === 0) {
            this.addMessage('bot', this.opts.initialMessage, { persist: true });
        }
    }

    bindEvents() {
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => this.sendMessage());
        }
        if (this.input) {
            this.input.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.sendMessage(); });
        }
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeChat());
        }
        if (this.assistantBtn) {
            this.assistantBtn.addEventListener('click', () => this.openChat());
        }
        if (this.quickReplies && this.quickReplies.length) {
            this.quickReplies.forEach(b => b.addEventListener('click', (ev) => {
                const reply = b.dataset.reply || b.getAttribute('data-reply');
                if (reply) {
                    this.addMessage('user', reply, { persist: true });
                    this.processMessage(reply);
                }
            }));
        }
        // Microphone record button
        const recordBtn = document.getElementById('chat-record');
        if (recordBtn) {
            recordBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    await this.handleRecordFlow(recordBtn);
                } catch (err) {
                    console.warn('Recording flow error', err);
                    this.addMessage('bot', 'Không thể ghi âm lúc này. Vui lòng thử lại bằng gõ văn bản.', { persist: true });
                }
            });
        }
        // Clear conversation button
        const clearBtn = document.getElementById('chat-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.conversation = [];
                try { sessionStorage.removeItem(this.opts.storageKey); } catch(e) {}
                if (this.messagesContainer) this.messagesContainer.innerHTML = '';
                // Add initial bot message
                this.addMessage('bot', this.opts.initialMessage, { persist: true });
            });
        }
    }

    async handleRecordFlow(recordBtn) {
        // Toggle recording: start if not recording, stop if recording
        const audio = window.IVSAssistantAudio;
        if (!audio) throw new Error('audio_helper_missing');
        if (!audio.isRecording()) {
            const ok = await audio.start();
            if (ok) {
                // update UI - simple: change icon color
                recordBtn.classList.add('recording');
                recordBtn.setAttribute('aria-pressed', 'true');
                // Optionally show small timer — omitted for brevity
            } else {
                throw new Error('record_start_failed');
            }
            return;
        }

        // Stop recording and upload
        const result = audio.stop();
        recordBtn.classList.remove('recording');
        recordBtn.setAttribute('aria-pressed', 'false');
        if (!result || !result.blob) throw new Error('no_audio_blob');

        // Show uploading and placeholder transcription
        const uploadingBubble = this.addMessage('user', 'Đang tải file âm thanh...', { persist: false });
        try {
            // send audio; pass current input value as prompt if present
            const prompt = (this.input && this.input.value) ? this.input.value.trim() : '';
            const resp = await audio.sendAudio(result.blob, { prompt, sessionId: (sessionStorage.getItem('ivs_session') || '') });
            // replace uploading text with transcription (if provided)
            const transcribed = resp && resp.text ? resp.text : (resp && resp.transcript) ? resp.transcript : '';
            if (transcribed) {
                uploadingBubble.textContent = transcribed;
                // persist transcription as user message
                this.conversation.push({ sender: 'user', text: transcribed, ts: Date.now() });
                try { sessionStorage.setItem(this.opts.storageKey, JSON.stringify(this.conversation)); } catch(e){}
            } else {
                uploadingBubble.textContent = '(Không có nội dung được nhận dạng)';
            }

            // If server also included assistant reply, render it; otherwise call requestAI with transcribed text
            const assistantReply = resp && (resp.reply || resp.result || resp.assistant || resp.data);
            if (assistantReply) {
                this.addMessage('bot', assistantReply, { persist: true });
            } else if (transcribed) {
                // make the assistant respond to the transcribed text
                this.showTypingIndicator();
                try {
                    await this.requestAIStream(transcribed, { timeout: this.opts.timeoutMs });
                } catch (err) {
                    this.hideTypingIndicator();
                    this.addMessage('bot', 'Không thể lấy phản hồi từ assistant. Vui lòng thử lại.', { persist: true });
                }
            }
        } catch (err) {
            console.error('Audio upload error', err);
            // replace bubble content with error message
            if (uploadingBubble) uploadingBubble.textContent = 'Lỗi khi tải âm thanh. Vui lòng thử lại.';
            throw err;
        }
    }

    openChat() {
        const assistantWindow = document.getElementById('ai-assistant-window');
        if (assistantWindow) assistantWindow.classList.remove('hidden');
        if (this.chatWindow) this.chatWindow.classList.remove('hidden');
        if (this.assistantBtn) this.assistantBtn.setAttribute('aria-expanded','true');
        if (this.input) setTimeout(()=>this.input.focus(), 120);
    }

    closeChat() {
        const assistantWindow = document.getElementById('ai-assistant-window');
        if (assistantWindow) assistantWindow.classList.add('hidden');
        if (this.chatWindow) this.chatWindow.classList.add('hidden');
        if (this.assistantBtn) this.assistantBtn.setAttribute('aria-expanded','false');
    }

    async sendMessage() {
        if (!this.input || !this.sendBtn) return;
        const text = this.input.value.trim();
        if (!text || this.isSending) return;
        // Throttle: prevent accidental rapid-fire sends (800ms)
        const now = Date.now();
        if (now - this._lastSendAt < 800) return;
        this._lastSendAt = now;

        // clear input and disable UI
        this.input.value = '';
        this.setSending(true);

        // Add user message
        this.addMessage('user', text, { persist: true });

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Try streaming endpoint first; if streaming not supported by server, fallback to normal
            const streamingSupported = true; // optimistic; requestAI will fallback if not supported
            if (streamingSupported) {
                await this.requestAIStream(text, { timeout: this.opts.timeoutMs });
            } else {
                const reply = await this.requestAI(text, { timeout: this.opts.timeoutMs });
                this.hideTypingIndicator();
                this.addMessage('bot', reply, { persist: true });
            }
        } catch (err) {
            this.hideTypingIndicator();
            let errMsg = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
            try {
                // If server returned structured error string
                const errStr = typeof err === 'string' ? err : (err && err.message) ? err.message : '';
                if (errStr && errStr.toLowerCase().includes('not_configured')) {
                    errMsg = 'Assistant tạm thời chưa được cấu hình trên máy chủ. Vui lòng kiểm tra cấu hình server hoặc thử lại sau.';
                } else if (errStr && errStr.toLowerCase().includes('xai_api_not_configured')) {
                    errMsg = 'XAI proxy chưa được cấu hình trên server. Vui lòng khởi động server với XAI_API_KEY.';
                } else if (errStr && errStr.toLowerCase().includes('timeout')) {
                    errMsg = 'Yêu cầu quá thời gian. Vui lòng thử lại.';
                } else if (errStr) {
                    errMsg = errStr;
                }
            } catch (e) {}
            console.warn('Assistant request error:', err);
            this.addMessage('bot', errMsg, { persist: true });
        } finally {
            this.setSending(false);
        }
    }

    setSending(flag) {
        this.isSending = !!flag;
        if (this.sendBtn) this.sendBtn.disabled = !!flag;
        if (this.input) this.input.disabled = !!flag;
    }

    showTypingIndicator() {
        if (!this.messagesContainer) return;
        if (this._typingEl) return; // already shown
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex justify-start';
        typingDiv.innerHTML = `<div class="bg-white dark:bg-gray-700 rounded-lg p-3"><i class="fas fa-ellipsis-h"></i></div>`;
        this.messagesContainer.appendChild(typingDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        this._typingEl = typingDiv;
    }

    hideTypingIndicator() {
        if (this._typingEl && this._typingEl.parentNode) {
            this._typingEl.parentNode.removeChild(this._typingEl);
            this._typingEl = null;
        }
    }

    addMessage(sender, text, { persist=false } = {}) {
        if (!this.messagesContainer) return;
        // Create message container and bubble, return bubble element for possible streaming updates
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

        const bubble = document.createElement('div');
        bubble.className = `max-w-xs px-4 py-2 rounded-lg text-sm ${sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600'}`;
        bubble.textContent = text;

        messageDiv.appendChild(bubble);
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        // persist
        if (persist) {
            this.conversation.push({ sender, text, ts: Date.now() });
            try { sessionStorage.setItem(this.opts.storageKey, JSON.stringify(this.conversation)); } catch(e) { /* ignore */ }
        }

        // Return the bubble element so callers (stream reader) can update its content incrementally
        return bubble;
    }

    restoreConversation() {
        try {
            const raw = sessionStorage.getItem(this.opts.storageKey);
            if (!raw) return;
            this.conversation = JSON.parse(raw) || [];
            this.conversation.forEach(m => this.addMessage(m.sender, m.text));
        } catch(e) { this.conversation = []; }
    }

    async requestAI(message, { timeout = 10000 } = {}) {
        // Basic transport to backend '/api/grok' following existing expectations.
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const resp = await fetch(this.opts.apiPath, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [{ role: 'user', content: message }] }),
                signal: controller.signal
            });
            clearTimeout(id);
            // If primary endpoint indicates not configured or server error, attempt fallback
            if (!resp.ok) {
                let jsonBody = null;
                try { jsonBody = await resp.json(); } catch(_){}
                const errCode = jsonBody && jsonBody.error ? String(jsonBody.error) : '';
                // Common server-side not-configured error codes used in our server: 'xai_api_not_configured' or 'server_not_configured'
                if (resp.status >= 500 || errCode.includes('not_configured') || errCode.includes('xai_api_not_configured')) {
                    // try fallback to /api/grok if configured and different
                    if (this.opts.apiPath !== '/api/grok') {
                        try {
                            console.info('Primary AI endpoint failed; retrying with /api/grok');
                            const fallbackResp = await fetch('/api/grok', {
                                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: message }] }), signal: controller.signal
                            });
                            if (fallbackResp.ok) {
                                const data = await fallbackResp.json();
                                const reply = data?.choices?.[0]?.message?.content || data?.reply || data?.result || 'Xin lỗi, tôi chưa thể trả lời.';
                                return reply;
                            }
                        } catch (fallErr) {
                            // swallow and fall through to original error handling
                            console.warn('Fallback /api/grok attempt failed', fallErr);
                        }
                    }
                }
                let text = `Lỗi mạng: ${resp.status}`;
                try { if (jsonBody && jsonBody.error) text = jsonBody.error; } catch(_){ }
                throw new Error(text);
            }
            const data = await resp.json();
            // support both { choices: [{ message: { content } }] } and { reply: '...' }
            const reply = data?.choices?.[0]?.message?.content || data?.reply || data?.result || 'Xin lỗi, tôi chưa thể trả lời.';
            return reply;
        } catch (err) {
            if (err.name === 'AbortError') throw 'Yêu cầu quá thời gian. Vui lòng thử lại.';
            throw err.message || err;
        } finally { clearTimeout(id); }
    }

    // Attempt to stream response (fetch streaming). Falls back by throwing if server does not stream.
    async requestAIStream(message, { timeout = 10000 } = {}) {
        if (!this.messagesContainer) return;
        // Add an empty bot bubble and update as chunks arrive
        const botBubble = this.addMessage('bot', '', { persist: false });
        // Use AbortController for timeout
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const resp = await fetch(this.opts.apiPath + '?stream=1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'text/event-stream' },
                body: JSON.stringify({ messages: [{ role: 'user', content: message }] }),
                signal: controller.signal
            });
            if (!resp.ok) {
                clearTimeout(id);
                // inspect json body for not-configured signals
                let jsonBody = null;
                try { jsonBody = await resp.json(); } catch(_){}
                const errCode = jsonBody && jsonBody.error ? String(jsonBody.error) : '';
                if (resp.status >= 500 || errCode.includes('not_configured') || errCode.includes('xai_api_not_configured')) {
                    // attempt fallback non-streaming call to /api/grok
                    if (this.opts.apiPath !== '/api/grok') {
                        try {
                            console.info('Streaming primary endpoint failed; retrying non-streaming /api/grok fallback');
                            const fallback = await fetch('/api/grok', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: message }] }), signal: controller.signal });
                            if (fallback.ok) {
                                const data = await fallback.json();
                                const reply = data?.choices?.[0]?.message?.content || data?.reply || data?.result || '';
                                botBubble.textContent = reply;
                                this.conversation.push({ sender: 'bot', text: reply, ts: Date.now() });
                                try { sessionStorage.setItem(this.opts.storageKey, JSON.stringify(this.conversation)); } catch(e){}
                                return;
                            }
                        } catch (fallErr) { console.warn('Fallback /api/grok attempt failed', fallErr); }
                    }
                }
                throw new Error('Server returned ' + resp.status);
            }

            if (!resp.body) {
                // not a streaming response; fallback by reading whole JSON
                clearTimeout(id);
                const data = await resp.json();
                const reply = data?.choices?.[0]?.message?.content || data?.reply || data?.result || '';
                botBubble.textContent = reply;
                // persist final reply
                this.conversation.push({ sender: 'bot', text: reply, ts: Date.now() });
                sessionStorage.setItem(this.opts.storageKey, JSON.stringify(this.conversation));
                return;
            }

            // Stream reader
            const reader = resp.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let done = false;
            let acc = '';
            while (!done) {
                const { value, done: rDone } = await reader.read();
                done = rDone;
                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    acc += chunk;
                    // Update bubble with accumulated text (simple approach)
                    botBubble.textContent = acc;
                    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
                }
            }
            // persist final
            this.conversation.push({ sender: 'bot', text: acc, ts: Date.now() });
            try { sessionStorage.setItem(this.opts.storageKey, JSON.stringify(this.conversation)); } catch(e){}
        } catch (err) {
            if (err.name === 'AbortError') throw 'Yêu cầu quá thời gian. Vui lòng thử lại.';
            throw err;
        } finally {
            clearTimeout(id);
            this.hideTypingIndicator();
        }
    }

    processMessage(message) {
        // Local intelligent responses fallback (kept simple)
        // If backend present, sendMessage() will call requestAI.
        // This method used by quick replies to trigger a send.
        this.sendMessage();
    }
}

// Only run browser-only initialization when in a window environment
if (typeof window !== 'undefined') {
    // Expose single instance (idempotent)
    if (!window.IVSAssistant) {
        try {
            window.IVSAssistant = new IVSAssistant();
            // expose helper to change API path at runtime (useful for debugging)
            window.IVSAssistant.setApiPath = function(p) { this.opts.apiPath = p; console.info('IVSAssistant apiPath set to', p); };
        } catch (e) {
            console.warn('IVSAssistant init failed:', e);
        }
    }

    // Back-compat alias used around the codebase
    if (!window.IVSFABChatbot) window.IVSFABChatbot = window.IVSAssistant;
}

