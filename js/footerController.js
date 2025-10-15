/**
 * @fileoverview IVSFooterController: Xử lý logic tương tác của Footer.
 * Được gọi bởi loadComponents.js sau khi component footer.html được inject.
 */

'use strict';

const IVSFooterController = {
    _ivs_initialized: false,

    cacheDOM() {
        this.yearSpan = document.getElementById('current-year');
        this.scrollToTopButton = document.getElementById('scrollToTop');
        this.newsletterForm = document.getElementById('newsletterForm');
        this.newsletterMessage = document.getElementById('newsletterMessage');
    },

    bindEvents() {
        // 1. Scroll-to-Top
        if (this.scrollToTopButton) {
            const toggleScrollButton = () => {
                const scrolled = window.scrollY > 200;
                this.scrollToTopButton.classList.toggle('opacity-0', !scrolled);
                this.scrollToTopButton.classList.toggle('invisible', !scrolled);
                this.scrollToTopButton.classList.toggle('translate-y-10', !scrolled);
            };

            window.addEventListener('scroll', toggleScrollButton);
            
            this.scrollToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // 2. Newsletter Form
        if (this.newsletterForm) {
            this.newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        }
    },
    
    // Xử lý gửi Form (Đã lấy logic từ code của bạn)
    async handleNewsletterSubmit(e) {
        e.preventDefault();

        const form = this.newsletterForm;
        const messageOutput = this.newsletterMessage;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalTextSpan = submitBtn?.querySelector('span:last-child');
        const originalText = originalTextSpan ? originalTextSpan.textContent : 'Đăng ký';

        const honeypot = form.querySelector('[name="bot-field"]');
        if (honeypot && honeypot.value) return; 

        if (submitBtn) { 
            submitBtn.disabled = true; 
            if (originalTextSpan) originalTextSpan.textContent = 'Đang xử lý...';
        }
        if (messageOutput) messageOutput.textContent = '';
        
        try {
            const fd = new FormData(form);
            if (!fd.get('form-name')) fd.set('form-name', form.getAttribute('name') || 'newsletter');

            const target = form.getAttribute('action') || '/';
            
            const res = await fetch(target, { method: 'POST', body: fd });
            
            if (res.ok) {
                const msg = 'Cảm ơn! Đăng ký thành công.';
                if (messageOutput) { messageOutput.textContent = msg; messageOutput.className = 'text-sm mt-3 text-green-400'; }
                form.reset();
            } else {
                const fallback = form.getAttribute('data-fallback-action');
                if (fallback) {
                    await fetch(fallback, { method: 'POST', body: fd });
                    if (messageOutput) { messageOutput.textContent = 'Đã gửi (fallback). Cảm ơn!'; messageOutput.className = 'text-sm mt-3 text-green-400'; }
                    form.reset();
                } else {
                    throw new Error('Server error and no fallback defined.');
                }
            }
        } catch (err) {
            window.componentLog('Newsletter submit error: ' + err.message, 'error');
            if (messageOutput) { messageOutput.textContent = 'Lỗi khi gửi. Vui lòng thử lại sau.'; messageOutput.className = 'text-sm mt-3 text-red-400'; }
        } finally {
            if (submitBtn) { 
                submitBtn.disabled = false; 
                if (originalTextSpan) originalTextSpan.textContent = originalText;
            }
        }
    },

    init() {
        if (this._ivs_initialized) return;
        this._ivs_initialized = true;

        this.cacheDOM();
        
        // Cập nhật năm
        if (this.yearSpan) {
            this.yearSpan.textContent = new Date().getFullYear();
        }
        
        this.bindEvents();
    }
};
window.IVSFooterController = IVSFooterController;
