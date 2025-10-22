/**
 * FAB Container Controller - Floating Action Buttons
 * @version 1.0.0
 * @author IVS JSC
 * @description Controls the floating action buttons with contact, share, and utility functions
 */

'use strict';

/**
 * FAB Container Controller Class
 */
class FABController {
    constructor() {
        this.isOpen = false;
        this.currentMenu = null;
        this.init();
    }

    /**
     * Initialize FAB functionality
     */
    init() {
        // Wait for DOM and components to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupFAB());
        } else {
            this.setupFAB();
        }

        // Listen for component loaded event
        document.addEventListener('componentLoaded', (event) => {
            if (event.detail.componentName === 'fab-container') {
                this.setupFAB();
            }
        });
    }

    /**
     * Setup FAB elements and event listeners
     */
    setupFAB() {
        const fabContainer = document.getElementById('fab-container');
        if (!fabContainer) {
            console.warn('[FAB] Container not found');
            return;
        }

        // Get elements
        this.mainBtn = document.getElementById('fab-main-btn');
        this.contactOptions = document.getElementById('contact-options');
        this.shareOptions = document.getElementById('share-options');
        this.backToTopBtn = document.getElementById('back-to-top-btn');
        this.darkModeToggle = document.getElementById('dark-mode-toggle');
        this.darkModeIcon = document.getElementById('dark-mode-icon');

        if (!this.mainBtn) {
            console.warn('[FAB] Main button not found');
            return;
        }

        // Setup event listeners
        this.setupMainButton();
        this.setupContactOptions();
        this.setupShareOptions();
        this.setupBackToTop();
        this.setupDarkModeToggle();
        this.setupKeyboardSupport();
        this.setupScrollBehavior();

        // Initialize dark mode state
        this.updateDarkModeIcon();

        console.log('[FAB] Initialized successfully');
    }

    /**
     * Setup main FAB button
     */
    setupMainButton() {
        this.mainBtn.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close on outside click
        document.addEventListener('click', (event) => {
            if (!this.mainBtn.contains(event.target) && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    /**
     * Toggle FAB menu
     */
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    /**
     * Open FAB menu
     */
    openMenu() {
        this.isOpen = true;
        this.mainBtn.setAttribute('aria-expanded', 'true');

        // Show both menus initially
        this.showMenu(this.contactOptions);
        this.showMenu(this.shareOptions);

        // Animate icon
        const icon = this.mainBtn.querySelector('#fab-icon');
        if (icon) {
            icon.style.transform = 'rotate(45deg)';
        }
    }

    /**
     * Close FAB menu
     */
    closeMenu() {
        this.isOpen = false;
        this.mainBtn.setAttribute('aria-expanded', 'false');

        this.hideMenu(this.contactOptions);
        this.hideMenu(this.shareOptions);

        // Reset icon
        const icon = this.mainBtn.querySelector('#fab-icon');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    }

    /**
     * Show a menu with animation
     */
    showMenu(menuElement) {
        if (!menuElement) return;

        menuElement.classList.add('active');
        menuElement.style.opacity = '1';
        menuElement.style.transform = 'scale(1)';
        menuElement.style.pointerEvents = 'auto';
    }

    /**
     * Hide a menu with animation
     */
    hideMenu(menuElement) {
        if (!menuElement) return;

        menuElement.classList.remove('active');
        menuElement.style.opacity = '0';
        menuElement.style.transform = 'scale(0)';
        menuElement.style.pointerEvents = 'none';
    }

    /**
     * Setup contact options
     */
    setupContactOptions() {
        if (!this.contactOptions) return;

        const options = this.contactOptions.querySelectorAll('.fab-option');
        options.forEach((option, index) => {
            // Stagger animation
            option.style.transitionDelay = `${index * 50}ms`;
        });
    }

    /**
     * Setup share options
     */
    setupShareOptions() {
        if (!this.shareOptions) return;

        const options = this.shareOptions.querySelectorAll('.fab-option');
        options.forEach((option, index) => {
            // Stagger animation
            option.style.transitionDelay = `${index * 50}ms`;
        });
    }

    /**
     * Setup back to top functionality
     */
    setupBackToTop() {
        if (!this.backToTopBtn) return;

        // Show/hide based on scroll position
        const toggleBackToTop = () => {
            const scrolled = window.pageYOffset;
            const threshold = 300;

            if (scrolled > threshold) {
                this.backToTopBtn.style.opacity = '1';
                this.backToTopBtn.style.transform = 'translateY(0)';
                this.backToTopBtn.style.pointerEvents = 'auto';
            } else {
                this.backToTopBtn.style.opacity = '0';
                this.backToTopBtn.style.transform = 'translateY(16px)';
                this.backToTopBtn.style.pointerEvents = 'none';
            }
        };

        // Initial check
        toggleBackToTop();

        // Listen for scroll
        window.addEventListener('scroll', toggleBackToTop, { passive: true });

        // Click handler
        this.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Setup dark mode toggle
     */
    setupDarkModeToggle() {
        if (!this.darkModeToggle) return;

        this.darkModeToggle.addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Show toggle after a delay
        setTimeout(() => {
            this.darkModeToggle.style.opacity = '1';
            this.darkModeToggle.style.transform = 'translateY(0)';
        }, 1000);
    }

    /**
     * Toggle dark mode
     */
    toggleDarkMode() {
        const html = document.documentElement;
        const isDark = html.classList.contains('dark');

        if (isDark) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }

        this.updateDarkModeIcon();
    }

    /**
     * Update dark mode icon
     */
    updateDarkModeIcon() {
        if (!this.darkModeIcon) return;

        const isDark = document.documentElement.classList.contains('dark');
        this.darkModeIcon.className = isDark ? 'fas fa-sun text-sm' : 'fas fa-moon text-sm';
        this.darkModeToggle.setAttribute('aria-label',
            isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối');
    }

    /**
     * Setup keyboard support
     */
    setupKeyboardSupport() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    /**
     * Setup scroll behavior
     */
    setupScrollBehavior() {
        let scrollTimeout;

        const handleScroll = () => {
            clearTimeout(scrollTimeout);

            // Hide FAB temporarily during scroll
            if (this.isOpen) {
                this.closeMenu();
            }

            // Show back-to-top after scroll stops
            scrollTimeout = setTimeout(() => {
                // FAB will be shown by scroll handler in setupBackToTop
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }
}

// Social sharing functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check this out: ${document.title}`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.linkedin.com/sharing/share-offer?url=${url}&title=${title}`, '_blank', 'width=600,height=400');
}

function copyPageLink() {
    const url = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('Liên kết đã được sao chép!');
        }).catch(() => {
            fallbackCopyTextToClipboard(url);
        });
    } else {
        fallbackCopyTextToClipboard(url);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showToast('Liên kết đã được sao chép!');
    } catch (err) {
        showToast('Không thể sao chép liên kết. Vui lòng sao chép thủ công.');
    }

    document.body.removeChild(textArea);
}

function showToast(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-size: 14px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    // Animate out
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Initialize FAB when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FABController();
});

// Export for global access
window.FABController = FABController;
window.shareOnFacebook = shareOnFacebook;
window.shareOnTwitter = shareOnTwitter;
window.shareOnLinkedIn = shareOnLinkedIn;
window.copyPageLink = copyPageLink;
