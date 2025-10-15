/* assistant-audio.js
 * Simple client-side audio recorder and uploader for IVS Assistant.
 * Exposes window.IVSAssistantAudio with methods: start(), stop(), isRecording(), sendAudio()
 */

(function(){
  'use strict';
  if (typeof window === 'undefined') return; // server-side safe

  const DEFAULT_UPLOAD_PATH = '/api/xai/audio';

  class AssistantAudio {
    constructor(opts = {}) {
      this.opts = Object.assign({ uploadPath: DEFAULT_UPLOAD_PATH, mimeType: 'audio/webm' }, opts);
      this.mediaRecorder = null;
      this.chunks = [];
      this.recordingStart = null;
      this.stream = null;
      this.onStateChange = opts.onStateChange || function(){};
    }

    async start() {
      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') return;
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: this.opts.mimeType });
        this.chunks = [];
        this.mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size) this.chunks.push(e.data); };
        this.mediaRecorder.onstart = () => { this.recordingStart = Date.now(); this.onStateChange('started'); };
        this.mediaRecorder.onstop = () => { this.onStateChange('stopped'); };
        this.mediaRecorder.start();
        return true;
      } catch (err) {
        console.error('AssistantAudio.start error', err);
        this.onStateChange('error', err);
        return false;
      }
    }

    stop() {
      if (!this.mediaRecorder) return null;
      if (this.mediaRecorder.state === 'inactive') return null;
      this.mediaRecorder.stop();
      // stop tracks
      try { this.stream && this.stream.getTracks().forEach(t => t.stop()); } catch(e){}
      const blob = new Blob(this.chunks, { type: this.opts.mimeType });
      const duration = (Date.now() - this.recordingStart) / 1000;
      return { blob, duration };
    }

    isRecording() {
      return this.mediaRecorder && this.mediaRecorder.state === 'recording';
    }

    // send audio blob via multipart/formdata to server endpoint
    async sendAudio(blob, { prompt='', sessionId='' } = {}) {
      if (!blob) throw new Error('missing_audio_blob');
      const fd = new FormData();
      fd.append('audio', blob, 'assistant_recording.webm');
      if (prompt) fd.append('prompt', prompt);
      if (sessionId) fd.append('sessionId', sessionId);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45000);
      try {
        const resp = await fetch(this.opts.uploadPath, { method: 'POST', body: fd, signal: controller.signal });
        clearTimeout(timeout);
        const j = await resp.json();
        if (!resp.ok) throw new Error(j && j.error ? JSON.stringify(j.error) : `status_${resp.status}`);
        return j;
      } catch (err) {
        clearTimeout(timeout);
        console.error('AssistantAudio.sendAudio failed', err);
        throw err;
      }
    }
  }

  // expose singleton
  if (!window.IVSAssistantAudio) window.IVSAssistantAudio = new AssistantAudio();
})();
