'use strict';

(function () {
  const RATE_LIMIT_MS = 5000;
  const MIN_TIME_TO_SUBMIT_MS = 2500;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let lastSubmitAt = 0;

  function getConfig() {
    return window.IVS_CONTACT_CONFIG || {};
  }

  function getEndpoint() {
    const endpoint = String(getConfig().CONTACT_FORM_ENDPOINT || '').trim();
    return endpoint || '';
  }

  function setStatus(formStatus, message, type = 'info') {
    const classes = {
      info: 'mt-4 text-center text-sm text-ivs-text-secondary',
      success: 'mt-4 text-center text-sm text-green-500 font-semibold',
      error: 'mt-4 text-center text-sm text-red-500 font-semibold'
    };
    formStatus.textContent = message;
    formStatus.className = classes[type] || classes.info;
  }

  function validate(values) {
    if (!values.name) return 'Vui lòng nhập họ và tên.';
    if (!values.email) return 'Vui lòng nhập email.';
    if (!EMAIL_REGEX.test(values.email)) return 'Email không đúng định dạng.';
    if (!values.phone) return 'Vui lòng nhập số điện thoại.';
    if (!values.message) return 'Vui lòng nhập nội dung yêu cầu.';
    return '';
  }

  function buildPayload(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
  }

  async function submitToEndpoint(endpoint, payload) {
    const body = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) body.append(key, String(value));
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json'
      },
      body: body.toString()
    });

    const text = await response.text();
    let result = {};
    try {
      result = text ? JSON.parse(text) : {};
    } catch (error) {
      result = {};
    }

    if (!response.ok || result.success === false) {
      throw new Error(result.error || 'Không thể gửi yêu cầu.');
    }

    return result;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = document.getElementById('contact-submit-button');
    const startedAtInput = document.getElementById('contact-started-at');

    if (!contactForm || !formStatus || contactForm.dataset.ivsBound === '1') return;
    contactForm.dataset.ivsBound = '1';

    if (startedAtInput && !startedAtInput.value) startedAtInput.value = String(Date.now());

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const now = Date.now();
      if (now - lastSubmitAt < RATE_LIMIT_MS) {
        setStatus(formStatus, 'Bạn đang gửi quá nhanh. Vui lòng thử lại sau vài giây.', 'error');
        return;
      }

      const payload = buildPayload(contactForm);
      const honeypot = String(payload.botField || '').trim();
      const startedAt = Number(payload.startedAt || 0);
      const elapsedMs = startedAt > 0 ? now - startedAt : 0;
      const validationError = validate(payload);

      if (honeypot) {
        setStatus(formStatus, 'Yêu cầu không hợp lệ.', 'error');
        return;
      }

      if (startedAt > 0 && elapsedMs < MIN_TIME_TO_SUBMIT_MS) {
        setStatus(formStatus, 'Vui lòng gửi lại yêu cầu sau vài giây.', 'error');
        return;
      }

      if (validationError) {
        setStatus(formStatus, validationError, 'error');
        return;
      }

      const endpoint = getEndpoint();
      if (!endpoint) {
        console.warn('[Contact] Missing CONTACT_FORM_ENDPOINT. Set it in /js/contact-config.js after deploying the Google Apps Script Web App.');
        setStatus(formStatus, 'Không thể gửi yêu cầu lúc này. Vui lòng liên hệ trực tiếp qua email.', 'error');
        return;
      }

      const originalText = submitButton?.textContent || 'Gửi Yêu Cầu';
      try {
        lastSubmitAt = now;
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Đang gửi...';
        }
        setStatus(formStatus, 'Đang gửi...', 'info');

        await submitToEndpoint(endpoint, {
          ...payload,
          source_page: payload.source_page || 'contact.html',
          userAgent: navigator.userAgent
        });

        setStatus(formStatus, 'Cảm ơn bạn. IVS Academy đã nhận được yêu cầu và sẽ phản hồi sớm.', 'success');
        contactForm.reset();
        if (startedAtInput) startedAtInput.value = String(Date.now());
      } catch (error) {
        console.error('[Contact] Submit failed:', error);
        setStatus(formStatus, 'Không thể gửi yêu cầu lúc này. Vui lòng thử lại hoặc liên hệ trực tiếp qua email.', 'error');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }
    });
  });
})();
