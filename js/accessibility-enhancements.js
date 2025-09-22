// accessibility-enhancements.js
// Comprehensive accessibility improvements for IVS Academy website
// Features: ARIA labels, keyboard navigation, screen reader support, color contrast

class AccessibilityManager {
    constructor() {
        this.skipLinks = [];
        this.focusableElements = [];
        this.colorContrastMode = false;
        this.screenReaderMode = false;
        this.initialize();
    }

    initialize() {
        this.addSkipLinks();
        this.enhanceKeyboardNavigation();
        this.addAriaLabels();
        this.implementScreenReaderSupport();
        this.addColorContrastToggle();
        this.setupFocusManagement();
        this.addAccessibilityShortcuts();
        this.initializeColorContrast();
    }

    // Add skip links for keyboard navigation
    addSkipLinks() {
        const skipLinks = [
            { href: '#main-content', text: 'Bỏ qua đến nội dung chính' },
            { href: '#main-navigation', text: 'Bỏ qua đến điều hướng' },
            { href: '#search-input', text: 'Bỏ qua đến tìm kiếm' },
            { href: '#footer', text: 'Bỏ qua đến chân trang' }
        ];

        const skipLinksContainer = document.createElement('div');
        skipLinksContainer.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50';
        skipLinksContainer.setAttribute('aria-label', 'Liên kết bỏ qua điều hướng');

        skipLinks.forEach(link => {
            const skipLink = document.createElement('a');
            skipLink.href = link.href;
            skipLink.className = 'bg-ivs-blue text-white px-4 py-2 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-white';
            skipLink.textContent = link.text;
            skipLinksContainer.appendChild(skipLink);
        });

        document.body.insertBefore(skipLinksContainer, document.body.firstChild);
    }

    // Enhance keyboard navigation
    enhanceKeyboardNavigation() {
        // Make all interactive elements keyboard accessible
        this.makeFocusable('[role="button"], [tabindex="0"]');

        // Handle dropdown menus with keyboard
        this.setupDropdownKeyboardNavigation();

        // Handle modal dialogs
        this.setupModalKeyboardNavigation();

        // Handle custom controls
        this.setupCustomControlNavigation();
    }

    makeFocusable(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
        });
    }

    setupDropdownKeyboardNavigation() {
        const dropdowns = document.querySelectorAll('.desktop-dropdown-container');

        dropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('.desktop-nav-dropdown-toggle');
            const menu = dropdown.querySelector('.desktop-dropdown, .desktop-mega-menu');

            if (button && menu) {
                button.addEventListener('keydown', (e) => {
                    switch(e.key) {
                        case 'Enter':
                        case ' ':
                        case 'ArrowDown':
                            e.preventDefault();
                            this.openDropdown(menu);
                            this.focusFirstMenuItem(menu);
                            break;
                        case 'Escape':
                            this.closeDropdown(menu);
                            button.focus();
                            break;
                    }
                });

                // Handle menu item navigation
                const menuItems = menu.querySelectorAll('a, button');
                menuItems.forEach((item, index) => {
                    item.addEventListener('keydown', (e) => {
                        switch(e.key) {
                            case 'ArrowDown':
                                e.preventDefault();
                                const nextItem = menuItems[index + 1] || menuItems[0];
                                nextItem.focus();
                                break;
                            case 'ArrowUp':
                                e.preventDefault();
                                const prevItem = menuItems[index - 1] || menuItems[menuItems.length - 1];
                                prevItem.focus();
                                break;
                            case 'Escape':
                                this.closeDropdown(menu);
                                button.focus();
                                break;
                            case 'Tab':
                                if (!menu.contains(e.target.nextElementSibling)) {
                                    this.closeDropdown(menu);
                                }
                                break;
                        }
                    });
                });
            }
        });
    }

    setupModalKeyboardNavigation() {
        // Handle modal dialogs (for admin panel, etc.)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
                if (openModal) {
                    this.closeModal(openModal);
                }
            }
        });
    }

    setupCustomControlNavigation() {
        // Handle custom form controls
        const customControls = document.querySelectorAll('input[type="range"], .custom-slider');

        customControls.forEach(control => {
            control.addEventListener('keydown', (e) => {
                const step = parseFloat(control.getAttribute('step')) || 1;
                const min = parseFloat(control.getAttribute('min')) || 0;
                const max = parseFloat(control.getAttribute('max')) || 100;
                let value = parseFloat(control.value) || 0;

                switch(e.key) {
                    case 'ArrowRight':
                    case 'ArrowUp':
                        e.preventDefault();
                        value = Math.min(value + step, max);
                        control.value = value;
                        control.dispatchEvent(new Event('input', { bubbles: true }));
                        break;
                    case 'ArrowLeft':
                    case 'ArrowDown':
                        e.preventDefault();
                        value = Math.max(value - step, min);
                        control.value = value;
                        control.dispatchEvent(new Event('input', { bubbles: true }));
                        break;
                    case 'Home':
                        e.preventDefault();
                        control.value = min;
                        control.dispatchEvent(new Event('input', { bubbles: true }));
                        break;
                    case 'End':
                        e.preventDefault();
                        control.value = max;
                        control.dispatchEvent(new Event('input', { bubbles: true }));
                        break;
                }
            });
        });
    }

    openDropdown(menu) {
        menu.classList.remove('hidden');
        menu.setAttribute('aria-hidden', 'false');
    }

    closeDropdown(menu) {
        menu.classList.add('hidden');
        menu.setAttribute('aria-hidden', 'true');
    }

    focusFirstMenuItem(menu) {
        const firstItem = menu.querySelector('a, button');
        if (firstItem) {
            firstItem.focus();
        }
    }

    closeModal(modal) {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.add('hidden');
        // Return focus to trigger element
        const trigger = document.querySelector(`[aria-controls="${modal.id}"]`);
        if (trigger) {
            trigger.focus();
        }
    }

    // Add comprehensive ARIA labels
    addAriaLabels() {
        // Add ARIA labels to images without alt text
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            const src = img.src.split('/').pop().split('.')[0];
            img.setAttribute('alt', `Hình ảnh: ${src}`);
        });

        // Add ARIA labels to buttons
        const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
        buttons.forEach(button => {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        });

        // Add ARIA labels to form elements
        const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
        inputs.forEach(input => {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                input.setAttribute('aria-labelledby', label.id);
            } else {
                const placeholder = input.getAttribute('placeholder');
                if (placeholder) {
                    input.setAttribute('aria-label', placeholder);
                }
            }
        });

        // Add ARIA labels to navigation
        const nav = document.querySelector('nav');
        if (nav && !nav.hasAttribute('aria-label')) {
            nav.setAttribute('aria-label', 'Điều hướng chính');
        }

        // Add ARIA labels to sections
        const sections = document.querySelectorAll('section:not([aria-labelledby]):not([aria-label])');
        sections.forEach(section => {
            const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
            if (heading) {
                const headingId = `heading-${Math.random().toString(36).substr(2, 9)}`;
                heading.id = headingId;
                section.setAttribute('aria-labelledby', headingId);
            }
        });
    }

    // Implement screen reader support
    implementScreenReaderSupport() {
        // Add screen reader announcements
        this.addScreenReaderAnnouncements();

        // Improve heading structure
        this.improveHeadingStructure();

        // Add landmark roles
        this.addLandmarkRoles();

        // Handle dynamic content updates
        this.setupLiveRegions();
    }

    addScreenReaderAnnouncements() {
        // Create announcement region
        const announcementRegion = document.createElement('div');
        announcementRegion.id = 'sr-announcements';
        announcementRegion.setAttribute('aria-live', 'polite');
        announcementRegion.setAttribute('aria-atomic', 'true');
        announcementRegion.className = 'sr-only';
        document.body.appendChild(announcementRegion);

        this.announcementRegion = announcementRegion;
    }

    announce(message) {
        if (this.announcementRegion) {
            this.announcementRegion.textContent = message;
            // Clear after announcement
            setTimeout(() => {
                this.announcementRegion.textContent = '';
            }, 1000);
        }
    }

    improveHeadingStructure() {
        // Ensure proper heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let lastLevel = 0;

        headings.forEach(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            if (level - lastLevel > 1) {
                // Fix heading hierarchy if needed
                console.warn(`Heading hierarchy issue: ${heading.tagName} after h${lastLevel}`);
            }
            lastLevel = level;
        });
    }

    addLandmarkRoles() {
        // Add main landmark
        const main = document.querySelector('main') || document.querySelector('#main-content');
        if (main && !main.hasAttribute('role')) {
            main.setAttribute('role', 'main');
        }

        // Add navigation landmark
        const nav = document.querySelector('nav');
        if (nav && !nav.hasAttribute('role')) {
            nav.setAttribute('role', 'navigation');
        }

        // Add banner landmark
        const header = document.querySelector('header');
        if (header && !header.hasAttribute('role')) {
            header.setAttribute('role', 'banner');
        }

        // Add contentinfo landmark
        const footer = document.querySelector('footer');
        if (footer && !footer.hasAttribute('role')) {
            footer.setAttribute('role', 'contentinfo');
        }
    }

    setupLiveRegions() {
        // Monitor dynamic content changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.announce('Nội dung mới đã được tải');
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Add color contrast toggle
    addColorContrastToggle() {
        const contrastButton = document.createElement('button');
        contrastButton.id = 'contrast-toggle';
        contrastButton.className = 'fixed bottom-4 right-4 bg-ivs-blue hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-white';
        contrastButton.setAttribute('aria-label', 'Chuyển đổi chế độ tương phản màu');
        contrastButton.innerHTML = '<i class="fas fa-adjust"></i>';

        contrastButton.addEventListener('click', () => {
            this.toggleColorContrast();
        });

        document.body.appendChild(contrastButton);
    }

    toggleColorContrast() {
        this.colorContrastMode = !this.colorContrastMode;
        document.documentElement.classList.toggle('high-contrast', this.colorContrastMode);

        const button = document.getElementById('contrast-toggle');
        button.setAttribute('aria-pressed', this.colorContrastMode.toString());

        this.announce(this.colorContrastMode ?
            'Đã bật chế độ tương phản cao' :
            'Đã tắt chế độ tương phản cao'
        );

        // Save preference
        localStorage.setItem('highContrast', this.colorContrastMode.toString());
    }

    initializeColorContrast() {
        const saved = localStorage.getItem('highContrast') === 'true';
        if (saved) {
            this.colorContrastMode = true;
            document.documentElement.classList.add('high-contrast');
            const button = document.getElementById('contrast-toggle');
            if (button) {
                button.setAttribute('aria-pressed', 'true');
            }
        }
    }

    // Setup focus management
    setupFocusManagement() {
        // Focus trap for modals
        this.setupFocusTrap();

        // Focus indicators
        this.addFocusIndicators();

        // Handle focus on page load
        this.handleInitialFocus();
    }

    setupFocusTrap() {
        // Focus trap utility for modals
        this.focusTrap = (element) => {
            const focusableElements = element.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            const handleTabKey = (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            };

            return {
                activate: () => {
                    document.addEventListener('keydown', handleTabKey);
                    firstElement.focus();
                },
                deactivate: () => {
                    document.removeEventListener('keydown', handleTabKey);
                }
            };
        };
    }

    addFocusIndicators() {
        // Enhanced focus indicators for better visibility
        const style = document.createElement('style');
        style.textContent = `
            .focus-visible:focus-visible {
                outline: 3px solid #60a5fa;
                outline-offset: 2px;
                box-shadow: 0 0 0 1px #ffffff, 0 0 0 4px #60a5fa;
            }

            .high-contrast {
                filter: contrast(150%);
            }

            .high-contrast .bg-ivs-bg { background-color: #000000 !important; }
            .high-contrast .text-ivs-text-primary { color: #ffffff !important; }
            .high-contrast .text-ivs-text-secondary { color: #cccccc !important; }
            .high-contrast .border-ivs-border { border-color: #ffffff !important; }
        `;
        document.head.appendChild(style);

        // Add focus-visible class to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
        interactiveElements.forEach(element => {
            element.classList.add('focus-visible');
        });
    }

    handleInitialFocus() {
        // Skip to main content if URL has hash
        if (window.location.hash === '#main-content') {
            const main = document.querySelector('#main-content');
            if (main) {
                main.focus();
            }
        }
    }

    // Add accessibility shortcuts
    addAccessibilityShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + 1: Skip to main content
            if (e.altKey && e.key === '1') {
                e.preventDefault();
                const main = document.querySelector('#main-content, main, [role="main"]');
                if (main) {
                    main.focus();
                    this.announce('Đã chuyển đến nội dung chính');
                }
            }

            // Alt + 2: Skip to navigation
            if (e.altKey && e.key === '2') {
                e.preventDefault();
                const nav = document.querySelector('#main-navigation, nav, [role="navigation"]');
                if (nav) {
                    nav.focus();
                    this.announce('Đã chuyển đến điều hướng');
                }
            }

            // Alt + 0: Toggle high contrast
            if (e.altKey && e.key === '0') {
                e.preventDefault();
                this.toggleColorContrast();
            }
        });
    }
}

// Initialize accessibility enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.accessibilityManager = new AccessibilityManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityManager;
}