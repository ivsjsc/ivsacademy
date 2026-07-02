'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (!contactForm || !formStatus || contactForm.dataset.ivsBound === '1') return;
  contactForm.dataset.ivsBound = '1';
  const startedAtInput = document.getElementById('contact-started-at');
  if (startedAtInput && !startedAtInput.value) startedAtInput.value = String(Date.now());

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton?.textContent || 'Gửi Yêu Cầu';
    const payload = Object.fromEntries(new FormData(contactForm).entries());

    formStatus.textContent = 'Đang gửi...';
    formStatus.className = 'mt-4 text-center text-sm text-ivs-text-secondary';
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(contactForm.action || '/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Không thể gửi yêu cầu.');
      }

      formStatus.textContent = result.message || 'Yêu cầu của bạn đã được gửi thành công.';
      formStatus.className = 'mt-4 text-center text-sm text-green-500 font-semibold';
      contactForm.reset();
    } catch (error) {
      console.error('Lỗi khi gửi form:', error);
      formStatus.textContent = 'Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau.';
      formStatus.className = 'mt-4 text-center text-sm text-red-500 font-semibold';
    } finally {
      if (submitButton) submitButton.disabled = false;
      if (submitButton) submitButton.textContent = originalText;
    }
  });
});
