/**
 * @fileoverview This script manages all Header and Mobile Menu interactions.
 * It is designed to be loaded dynamically via loadComponents.js.
 * @version 1.5 - Re-enabled language toggle on header, refined mobile menu logic.
 * @author IVS-Technical-Team
 */

'use strict';

// GLOBAL UTILITIES (Now assumed to be provided by loadComponents.js)
// No longer duplicated here. 'window.componentLog' and 'window.debounce' are expected to be available.

/**
 * All logic related to the Header and Mobile Menu.
 * Handles responsive menu, submenus, and scroll effects.
 */
const IVSHeaderController = {
    init() {
        window.componentLog("IVSHeaderController: Bắt đầu khởi tạo.", "info");
        this.cacheDOM();
        if (!this.header) {
            window.componentLog("IVSHeaderController: Không tìm thấy phần tử Header. Logic UI sẽ không chạy.", "error");
            return;
        }
        this.bindEvents();
        this.updateActiveLinks();
        this.onScroll();
        // Initial setup for mobile menu panel state
        if (this.mobilePanel) {
            // Ensure it starts hidden and off-screen
            this.mobilePanel.classList.add('hidden', 'opacity-0');
            this.mobileMenuContainer.classList.add('translate-x-full');
        }
        window.componentLog("IVSHeaderController: Khởi tạo hoàn tất.", "info");
    },

    cacheDOM() {
        this.header = document.getElementById('ivs-main-header');
        this.mobilePanel = document.getElementById('ivs-mobile-menu-panel');
        this.mobileOpenBtn = document.getElementById('mobile-menu-open-btn');
        this.mobileCloseBtn = document.getElementById('mobile-menu-close-btn');
        this.mobileBackdrop = document.getElementById('ivs-mobile-menu-backdrop');
        this.mobileMenuContainer = document.getElementById('ivs-mobile-menu-container'); // Added for slide effect
        this.bottomNavMenuBtn = document.getElementById('bottom-nav-menu-btn');
        // Language buttons on desktop header
        this.langToggleButtons = document.querySelectorAll('.lang-toggle-btn'); 
        // Language confirmation message element
        this.langConfirmMessage = document.getElementById('lang-confirm-message'); 
        this.submenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
        this.navLinks = document.querySelectorAll('a.desktop-nav-link, .dropdown-item, #ivs-mobile-main-nav a, a.bottom-nav-item');

        window.componentLog(`IVSHeaderController: Header: ${!!this.header}, Mobile Panel: ${!!this.mobilePanel}, Open Btn: ${!!this.mobileOpenBtn}, Close Btn: ${!!this.mobileCloseBtn}, Backdrop: ${!!this.mobileBackdrop}, Mobile Menu Container: ${!!this.mobileMenuContainer}`, 'info');
        window.componentLog(`IVSHeaderController: Bottom Nav Menu Btn: ${!!this.bottomNavMenuBtn}`, 'info');
        window.componentLog(`IVSHeaderController: Language Toggle Buttons count: ${this.langToggleButtons.length}`, 'info');
        window.componentLog(`IVSHeaderController: Language Confirm Message: ${!!this.langConfirmMessage}`, 'info');
        window.componentLog(`IVSHeaderController: Submenu Toggles count: ${this.submenuToggles.length}`, 'info');
    },

    bindEvents() {
        window.componentLog("IVSHeaderController: Bắt đầu gắn kết sự kiện.", "info");

        window.addEventListener('scroll', window.debounce(() => this.onScroll(), 50), { passive: true });
        window.componentLog("IVSHeaderController: Đã gắn sự kiện Scroll.");

        // Mobile Menu Toggles
        if (this.mobileOpenBtn) {
            this.mobileOpenBtn.addEventListener('click', () => this.toggleMobileMenu(true));
            window.componentLog("IVSHeaderController: Đã gắn sự kiện click cho mobile-menu-open-btn.");
        }
        if (this.mobileCloseBtn) {
            this.mobileCloseBtn.addEventListener('click', () => this.toggleMobileMenu(false));
            window.componentLog("IVSHeaderController: Đã gắn sự kiện click cho mobile-menu-close-btn.");
        }
        if (this.mobileBackdrop) {
            this.mobileBackdrop.addEventListener('click', () => this.toggleMobileMenu(false));
            window.componentLog("IVSHeaderController: Đã gắn sự kiện click cho mobile-menu-backdrop.");
        }
        if (this.bottomNavMenuBtn) {
            this.bottomNavMenuBtn.addEventListener('click', () => this.toggleMobileMenu(true));
            window.componentLog("IVSHeaderController: Đã gắn sự kiện click cho bottom-nav-menu-btn.");
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.mobilePanel.classList.contains('hidden')) { // Check if not hidden
                this.toggleMobileMenu(false);
            }
        });
        window.componentLog("IVSHeaderController: Đã gắn sự kiện Keydown (Escape).");

        this.submenuToggles.forEach((toggle, index) => {
            toggle.addEventListener('click', () => this.toggleSubmenu(toggle));
            window.componentLog(`IVSHeaderController: Đã gắn sự kiện click cho Submenu Toggle ${index}.`);
        });

        // Re-adding Event listeners for language toggle buttons on desktop header
        this.langToggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.dataset.lang;
                if (lang) {
                    this.setLanguage(lang);
                }
            });
            window.componentLog(`IVSHeaderController: Đã gắn sự kiện click cho nút ngôn ngữ data-lang="${button.dataset.lang}".`);
        });

        window.componentLog("IVSHeaderController: Gắn kết sự kiện hoàn tất.", "info");
    },

    setLanguage(lang) {
        window.componentLog(`IVSHeaderController: Attempting to switch language to ${lang}`, "info");
        
        // Call the global language change function
        if (typeof window.changeLanguage === 'function') {
            window.changeLanguage(lang)
                .then(() => {
                    // Update active state of language toggle buttons
                    this.langToggleButtons.forEach(btn => {
                        btn.classList.toggle('active', btn.dataset.lang === lang);
                    });
                    
                    // Show confirmation message if it exists
                    if (this.langConfirmMessage) {
                        this.langConfirmMessage.textContent = lang === 'vi' ? 'Đã chuyển sang Tiếng Việt' : 'Switched to English';
                        this.langConfirmMessage.classList.remove('hidden');
                        setTimeout(() => {
                            this.langConfirmMessage.classList.add('hidden');
                        }, 2000);
                    }
                })
                .catch(error => {
                    window.componentLog(`IVSHeaderController: Error switching language: ${error}`, "error");
                });
        } else {
            window.componentLog("IVSHeaderController: window.changeLanguage function not found", "error");
        }
    },

    // New function to update active state of language buttons
    updateLanguageButtonStates(currentLang) {
        this.langToggleButtons.forEach(button => {
            if (button.dataset.lang === currentLang) {
                button.classList.add('active-language');
            } else {
                button.classList.remove('active-language');
            }
        });
    },

    showLangConfirmation() {
        if (this.langConfirmMessage) {
            const currentLang = window.langSystem?.currentLanguage || 'en';
            if (currentLang === 'vi') {
                this.langConfirmMessage.textContent = 'Ngôn ngữ đã đổi!';
            } else {
                this.langConfirmMessage.textContent = 'Language changed!';
            }

            // Apply Tailwind transition classes for smooth animation
            this.langConfirmMessage.classList.remove('opacity-0', 'scale-90', 'pointer-events-none', 'hidden');
            this.langConfirmMessage.classList.add('opacity-100', 'scale-100');

            setTimeout(() => {
                this.langConfirmMessage.classList.remove('opacity-100', 'scale-100');
                this.langConfirmMessage.classList.add('opacity-0', 'scale-90');
                // Hide completely after transition for accessibility/clickability
                this.langConfirmMessage.addEventListener('transitionend', () => {
                    if (this.langConfirmMessage.classList.contains('opacity-0')) {
                        this.langConfirmMessage.classList.add('hidden', 'pointer-events-none');
                    }
                }, { once: true });
            }, 1500); // Hide after 1.5 seconds
        }
    },

    onScroll() {
        if (this.header) {
            this.header.classList.toggle('scrolled', window.scrollY > 10);
        }
    },

    toggleMobileMenu(show) {
        if (!this.mobilePanel || !this.mobileMenuContainer) {
            window.componentLog("IVSHeaderController: Missing mobile menu elements", "error");
            return;
        }

        if (show) {
            // Show menu
            this.mobilePanel.classList.remove('hidden');
            // Use setTimeout to trigger animation after display
            setTimeout(() => {
                this.mobilePanel.classList.remove('opacity-0');
                this.mobileMenuContainer.classList.remove('translate-x-full');
            }, 10);
        } else {
            // Hide menu
            this.mobilePanel.classList.add('opacity-0');
            this.mobileMenuContainer.classList.add('translate-x-full');
            // Wait for animation to complete before hiding
            setTimeout(() => {
                this.mobilePanel.classList.add('hidden');
            }, 300); // Match this with your CSS transition duration
        }
    },

    toggleSubmenu(toggle) {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('i.fa-chevron-down');
        if (!content) {
            window.componentLog("IVSHeaderController: Nội dung submenu không tìm thấy.", 'warn');
            return;
        }

        const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';

        if (icon) {
            icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        }

        toggle.setAttribute('aria-expanded', !isExpanded);

        // Smooth transition for max-height
        content.style.maxHeight = isExpanded ? '0px' : `${content.scrollHeight}px`;
        window.componentLog(`IVSHeaderController: Submenu ${isExpanded ? 'đóng' : 'mở'} cho ${toggle.textContent.trim()}.`);
    },

    updateActiveLinks() {
        const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

        this.navLinks.forEach(link => {
            const linkPath = (link.getAttribute('href') || "").replace(/\/$/, "") || "/";

            link.classList.remove('active');

            if (linkPath === currentPath) {
                link.classList.add('active');
            } else if (linkPath !== "/" && currentPath.startsWith(linkPath)) {
                link.classList.add('active');
            }
        });
        window.componentLog("IVSHeaderController: Đã cập nhật các liên kết đang hoạt động.");
    }
};

// Expose IVSHeaderController globally for loadComponents.js
window.IVSHeaderController = IVSHeaderController;
