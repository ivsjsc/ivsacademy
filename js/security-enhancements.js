/**
 * Security Enhancements Module
 * Implements comprehensive security measures for IVS Academy website
 * Including HTTPS enforcement, CSRF protection, input validation, and security headers
 */

class SecurityManager {
    constructor() {
        this.csrfToken = this.generateCSRFToken();
        this.securityHeaders = this.getSecurityHeaders();
        this.inputValidators = this.initializeValidators();
        this.initialize();
    }

    initialize() {
        this.enforceHTTPS();
        this.setupCSRFProtection();
        this.setupInputValidation();
        this.addSecurityHeaders();
        this.preventXSS();
        this.setupCSP();
        this.monitorSecurityEvents();
    }

    /**
     * Enforce HTTPS on all pages
     */
    enforceHTTPS() {
        if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
            window.location.href = window.location.href.replace('http:', 'https:');
        }
    }

    /**
     * Generate CSRF token for form protection
     */
    generateCSRFToken() {
        const token = this.generateRandomString(32);
        sessionStorage.setItem('csrf_token', token);
        return token;
    }

    /**
     * Get stored CSRF token
     */
    getCSRFToken() {
        return sessionStorage.getItem('csrf_token') || this.generateCSRFToken();
    }

    /**
     * Setup CSRF protection for forms
     */
    setupCSRFProtection() {
        // Add CSRF token to all forms
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.addCSRFTokenToForm(form);
        });

        // Validate CSRF token on form submission
        document.addEventListener('submit', (e) => {
            this.validateCSRFToken(e);
        });
    }

    /**
     * Add CSRF token to form
     */
    addCSRFTokenToForm(form) {
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'csrf_token';
        tokenInput.value = this.getCSRFToken();
        form.appendChild(tokenInput);
    }

    /**
     * Validate CSRF token on form submission
     */
    validateCSRFToken(event) {
        const form = event.target;
        const tokenInput = form.querySelector('input[name="csrf_token"]');
        const submittedToken = tokenInput ? tokenInput.value : null;
        const expectedToken = this.getCSRFToken();

        if (!submittedToken || submittedToken !== expectedToken) {
            event.preventDefault();
            this.showSecurityError('CSRF token validation failed. Please refresh the page and try again.');
            return false;
        }

        return true;
    }

    /**
     * Initialize input validators
     */
    initializeValidators() {
        return {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^[\+]?[1-9][\d]{0,15}$/,
            name: /^[a-zA-ZÀ-ỹ\s'-]{2,50}$/,
            message: /^[\w\sÀ-ỹ.,!?-]{10,1000}$/,
            url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        };
    }

    /**
     * Setup input validation
     */
    setupInputValidation() {
        // Validate inputs on blur
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => this.validateInput(e.target));
            input.addEventListener('input', (e) => this.sanitizeInput(e.target));
        });

        // Prevent form submission with invalid data
        document.addEventListener('submit', (e) => {
            if (!this.validateForm(e.target)) {
                e.preventDefault();
            }
        });
    }

    /**
     * Validate individual input
     */
    validateInput(input) {
        const type = input.type || input.name;
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Trường này là bắt buộc';
        }

        // Type-specific validation
        if (value && isValid) {
            switch (type) {
                case 'email':
                    if (!this.inputValidators.email.test(value)) {
                        isValid = false;
                        errorMessage = 'Email không hợp lệ';
                    }
                    break;
                case 'tel':
                case 'phone':
                    if (!this.inputValidators.phone.test(value.replace(/[\s\-\(\)]/g, ''))) {
                        isValid = false;
                        errorMessage = 'Số điện thoại không hợp lệ';
                    }
                    break;
                case 'password':
                    if (!this.inputValidators.password.test(value)) {
                        isValid = false;
                        errorMessage = 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
                    }
                    break;
                case 'url':
                    if (!this.inputValidators.url.test(value)) {
                        isValid = false;
                        errorMessage = 'URL không hợp lệ';
                    }
                    break;
            }

            // Name validation
            if (input.name && input.name.toLowerCase().includes('name')) {
                if (!this.inputValidators.name.test(value)) {
                    isValid = false;
                    errorMessage = 'Tên không hợp lệ (chỉ chứa chữ cái và khoảng trắng)';
                }
            }

            // Message validation
            if (input.tagName === 'TEXTAREA' || input.name === 'message') {
                if (!this.inputValidators.message.test(value)) {
                    isValid = false;
                    errorMessage = 'Nội dung tin nhắn không hợp lệ hoặc quá ngắn';
                }
            }
        }

        this.showInputValidation(input, isValid, errorMessage);
        return isValid;
    }

    /**
     * Sanitize input to prevent XSS
     */
    sanitizeInput(input) {
        let value = input.value;

        // Basic sanitization
        value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        value = value.replace(/<[^>]*>/g, '');
        value = value.replace(/javascript:/gi, '');
        value = value.replace(/on\w+\s*=/gi, '');

        input.value = value;
    }

    /**
     * Validate entire form
     */
    validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Show input validation feedback
     */
    showInputValidation(input, isValid, message) {
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.validation-error');
        if (existingError) {
            existingError.remove();
        }

        if (!isValid && message) {
            const errorElement = document.createElement('div');
            errorElement.className = 'validation-error text-red-500 text-sm mt-1';
            errorElement.textContent = message;
            input.parentNode.appendChild(errorElement);
            input.classList.add('border-red-500');
        } else {
            input.classList.remove('border-red-500');
            input.classList.add('border-green-500');
        }
    }

    /**
     * Add security headers (client-side simulation)
     */
    addSecurityHeaders() {
        // Note: These headers are typically set server-side
        // This is for client-side security monitoring

        // Content Security Policy (would be set via meta tag or server header)
        const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        if (!cspMeta) {
            const meta = document.createElement('meta');
            meta.httpEquiv = 'Content-Security-Policy';
            meta.content = this.securityHeaders.csp;
            document.head.appendChild(meta);
        }
    }

    /**
     * Get security headers configuration
     */
    getSecurityHeaders() {
        return {
            csp: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.github.com;",
            hsts: 'max-age=31536000; includeSubDomains; preload',
            xFrameOptions: 'SAMEORIGIN',
            xContentTypeOptions: 'nosniff',
            referrerPolicy: 'strict-origin-when-cross-origin'
        };
    }

    /**
     * Prevent XSS attacks
     */
    preventXSS() {
        // Prevent inline event handlers
        document.addEventListener('DOMNodeInserted', (e) => {
            const element = e.target;
            if (element.nodeType === Node.ELEMENT_NODE) {
                // Remove dangerous attributes
                const dangerousAttrs = ['onload', 'onerror', 'onclick', 'onmouseover', 'onmouseout'];
                dangerousAttrs.forEach(attr => {
                    if (element.hasAttribute(attr)) {
                        element.removeAttribute(attr);
                    }
                });
            }
        });

        // Sanitize URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        for (const [key, value] of urlParams) {
            if (this.containsXSS(value)) {
                console.warn('Potential XSS detected in URL parameter:', key);
                // Remove malicious parameter
                urlParams.delete(key);
                window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
            }
        }
    }

    /**
     * Check if string contains XSS payload
     */
    containsXSS(str) {
        const xssPatterns = [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
            /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
            /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi
        ];

        return xssPatterns.some(pattern => pattern.test(str));
    }

    /**
     * Setup Content Security Policy monitoring
     */
    setupCSP() {
        // Monitor CSP violations
        document.addEventListener('securitypolicyviolation', (e) => {
            console.warn('CSP Violation:', {
                violatedDirective: e.violatedDirective,
                blockedURI: e.blockedURI,
                sourceFile: e.sourceFile,
                lineNumber: e.lineNumber
            });

            // Report to monitoring service (in production)
            this.reportSecurityEvent('csp_violation', {
                directive: e.violatedDirective,
                blockedURI: e.blockedURI
            });
        });
    }

    /**
     * Monitor security events
     */
    monitorSecurityEvents() {
        // Monitor for suspicious activities
        let failedAttempts = 0;

        // Track failed form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (!this.validateForm(form)) {
                failedAttempts++;
                if (failedAttempts > 3) {
                    this.showSecurityError('Quá nhiều lần nhập liệu không hợp lệ. Vui lòng thử lại sau.');
                    // Could implement rate limiting here
                }
            } else {
                failedAttempts = 0;
            }
        });

        // Monitor for unusual navigation patterns
        let navigationCount = 0;
        const originalPushState = history.pushState;
        history.pushState = function() {
            navigationCount++;
            if (navigationCount > 10) {
                console.warn('Unusual navigation pattern detected');
            }
            return originalPushState.apply(this, arguments);
        };
    }

    /**
     * Report security events (would send to monitoring service)
     */
    reportSecurityEvent(eventType, details) {
        const event = {
            type: eventType,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            details: details
        };

        console.log('Security Event:', event);

        // In production, send to security monitoring service
        // fetch('/api/security-events', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(event)
        // });
    }

    /**
     * Show security error message
     */
    showSecurityError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md';
        errorDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-shield-alt mr-3"></i>
                <div>
                    <h4 class="font-bold">Lỗi Bảo mật</h4>
                    <p class="text-sm">${message}</p>
                </div>
                <button class="ml-4 text-red-300 hover:text-white" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(errorDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }

    /**
     * Generate random string for tokens
     */
    generateRandomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Public method to validate form manually
     */
    validateFormPublic(form) {
        return this.validateForm(form);
    }

    /**
     * Public method to get CSRF token
     */
    getCSRFTokenPublic() {
        return this.getCSRFToken();
    }
}

// Initialize security manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.securityManager = new SecurityManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecurityManager;
}