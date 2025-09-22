/**
 * @fileoverview This script handles dynamic loading of shared HTML components
 * and initializes their interactive logic, ensuring reliable execution.
 * It now relies on global utility functions from utils.js and calls
 * the init methods of globally exposed controllers (Header, FAB, Language).
 * The Chatbot controller initialization has been removed.
 * @version 4.11 - Removed Chatbot controller initialization.
 * @author IVS-Technical-Team
 */

'use strict';

// Ensure global utilities are available (componentLog, debounce)
// These are expected to be loaded via public/js/utils.js
if (typeof window.componentLog !== 'function') {
    console.error("[IVS LoadComponents] window.componentLog is not defined. Please ensure utils.js is loaded before loadComponents.js.");
    window.componentLog = (msg, level = 'error') => console[level](msg); // Fallback
}
if (typeof window.debounce !== 'function') {
    console.error("[IVS LoadComponents] window.debounce is not defined. Please ensure utils.js is loaded before loadComponents.js.");
    window.debounce = (func) => func; // Fallback
}

// =================================================================
//  MAIN COMPONENT LOADER
// =================================================================

/**
 * Loads an HTML component and injects it into a placeholder,
 * ensuring that any <script> tags within the injected HTML are executed.
 * @param {string} url The URL of the HTML component to load.
 * @param {string} placeholderId The ID of the element to inject the component into.
 * @returns {Promise<boolean>} A promise that resolves to true if successful, false otherwise.
 */
async function loadAndInject(url, placeholderId) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
        window.componentLog(`Placeholder '${placeholderId}' not found.`, "error");
        return false;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const text = await response.text();

        // Create a temporary div to parse the HTML and extract scripts
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;

        const scripts = Array.from(tempDiv.querySelectorAll('script'));

        // Remove scripts from tempDiv's innerHTML before injecting to avoid double execution
        scripts.forEach(script => script.parentNode?.removeChild(script));

        // Inject the HTML content (without scripts first)
        placeholder.innerHTML = tempDiv.innerHTML;

        // Execute scripts sequentially
        for (const oldScript of scripts) {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));

            // Handle both inline scripts and external scripts
            if (oldScript.src) {
                newScript.src = oldScript.src;
                await new Promise((resolve, reject) => {
                    newScript.onload = resolve;
                    newScript.onerror = reject;
                    placeholder.appendChild(newScript); // Append to trigger load
                });
            } else {
                newScript.textContent = oldScript.textContent;
                placeholder.appendChild(newScript); // Append to execute inline scripts
            }
        }

        return true;
    } catch (error) {
        window.componentLog(`Failed to load ${url}: ${error.message}`, 'error');
        return false;
    }
}

/**
 * Loads common components (header, fab-container, footer) and initializes their controllers.
 */
async function loadCommonComponents() {
    window.componentLog("Initializing component sequence...", "info");
    const components = [
        { id: 'header-placeholder', url: '/components/header.html', controller: window.IVSHeaderController },
        { id: 'fab-container-placeholder', url: '/components/fab-container.html', controller: window.IVSFabController }
    ];

    // Footer is loaded last, no specific controller init needed for it
    const footerComponent = { id: 'footer-placeholder', url: '/components/footer.html' };

    for (const comp of components) {
        if (document.getElementById(comp.id)) {
            const success = await loadAndInject(comp.url, comp.id);
            if (success) {
                // Initialize controller if available and has an init method
                if (comp.controller && typeof comp.controller.init === 'function') {
                    comp.controller.init();
                    window.componentLog(`Controller for ${comp.id} initialized.`, "info");
                } else {
                    window.componentLog(`Controller for ${comp.id} not found or init method missing.`, "warn");
                }
            }
        }
    }

    // Load footer separately as it doesn't have a dedicated controller
    if (document.getElementById(footerComponent.id)) {
        await loadAndInject(footerComponent.url, footerComponent.id);
    }

    // Chatbot Controller initialization removed as per user request.
    // if (window.IVSChatbotController && typeof window.IVSChatbotController.init === 'function') {
    //     window.IVSChatbotController.init();
    //     window.componentLog("IVSChatbotController initialized.", "info");
    // } else {
    //     window.componentLog('IVSChatbotController not found or init method missing.', 'warn');
    // }

    // Ensure the language system is initialized after components are loaded
    // It should ideally be initialized earlier if possible, but this is a fallback
    // given its self-initialization nature now.
    if (window.langSystem && typeof window.langSystem.initializeLanguageSystem === 'function') {
        // No need to call initializeLanguageSystem here if it self-initializes on DOMContentLoaded
        // This check is mainly for robustness if its DOMContentLoaded listener somehow fails.
        // The language.js script is now loaded earlier in layout.html.
        window.componentLog('Language system (window.langSystem.initializeLanguageSystem) is expected to be self-initialized. Skipping explicit call here.', 'info');
    } else {
        window.componentLog('Language system (window.langSystem) not found or not ready.', 'warn');
    }

    window.componentLog("Component sequence complete.", "info");
    // Callback for page-specific logic after all common components are loaded
    window.onPageComponentsLoadedCallback?.();
}

// ================= IVSHeaderController (GỘP) =================
// This controller is kept here as it's tightly coupled with the header.html component
// and its logic is not intended to be a separate file.
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
        if (this.mobilePanel) {
            this.mobilePanel.classList.add('hidden', 'opacity-0');
            this.mobileMenuContainer.classList.add('-translate-x-full');
        }
        window.componentLog("IVSHeaderController: Khởi tạo hoàn tất.", "info");
    },
    cacheDOM() {
        this.header = document.getElementById('ivs-main-header');
        this.mobilePanel = document.getElementById('ivs-mobile-menu-panel');
        this.mobileOpenBtn = document.getElementById('mobile-menu-open-btn');
        this.mobileCloseBtn = document.getElementById('mobile-menu-close-btn');
        this.mobileBackdrop = document.getElementById('ivs-mobile-menu-backdrop');
        this.mobileMenuContainer = document.getElementById('ivs-mobile-menu-container');
        this.bottomNavMenuBtn = document.getElementById('bottom-nav-menu-btn');
        this.langToggleButtons = document.querySelectorAll('.lang-toggle-btn');
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
        if (this.mobileOpenBtn) {
            this.mobileOpenBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu(true);
            });
            window.componentLog("IVSHeaderController: Đã gắn sự kiện click cho mobile-menu-open-btn.");
        }
        if (this.mobileCloseBtn) {
            this.mobileCloseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu(false);
            });
            window.componentLog("IVSHeaderController: Đã gắn sự kiện click cho mobile-menu-close-btn.");
        }
        if (this.mobileBackdrop) {
            this.mobileBackdrop.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu(false);
            });
            window.componentLog("IVSHeaderController: Đã gắn sự kiện click cho mobile-menu-backdrop.");
        }
        if (this.bottomNavMenuBtn) {
            this.bottomNavMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu(true);
            });
            window.componentLog("IVSHeaderController: Đã gắn sự kiện click cho bottom-nav-menu-btn.");
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.mobilePanel.classList.contains('hidden')) {
                this.toggleMobileMenu(false);
            }
        });
        window.componentLog("IVSHeaderController: Đã gắn sự kiện Keydown (Escape).", "info");
        
        // Đảm bảo các submenu toggle hoạt động đúng
        this.submenuToggles.forEach((toggle, index) => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleSubmenu(toggle);
            });
            window.componentLog(`IVSHeaderController: Đã gắn sự kiện click cho Submenu Toggle ${index}.`);
        });
        
        this.langToggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const lang = button.dataset.lang;
                if (lang) {
                    this.setLanguage(lang);
                }
            });
            window.componentLog(`IVSHeaderController: Đã gắn sự kiện click cho nút ngôn ngữ data-lang="${button.dataset.lang}".`);
        });
        
        // Thêm logic cho logo menu và swipe gesture
        this.initMobileMenuLogoLogic();
        this.initSwipeGesture();
        
        window.componentLog("IVSHeaderController: Gắn kết sự kiện hoàn tất.", "info");
    },
    setLanguage(lang) {
        window.componentLog(`IVSHeaderController: Attempting to switch language to ${lang}`, "info");
        if (typeof window.changeLanguage === 'function') {
            window.changeLanguage(lang)
                .then(() => {
                    this.langToggleButtons.forEach(btn => {
                        btn.classList.toggle('active', btn.dataset.lang === lang);
                    });
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
            this.langConfirmMessage.classList.remove('opacity-0', 'scale-90', 'pointer-events-none', 'hidden');
            this.langConfirmMessage.classList.add('opacity-100', 'scale-100');
            setTimeout(() => {
                this.langConfirmMessage.classList.remove('opacity-100', 'scale-100');
                this.langConfirmMessage.classList.add('opacity-0', 'scale-90');
                this.langConfirmMessage.addEventListener('transitionend', () => {
                    if (this.langConfirmMessage.classList.contains('opacity-0')) {
                        this.langConfirmMessage.classList.add('hidden', 'pointer-events-none');
                    }
                }, { once: true });
            }, 1500);
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
            // Mở menu
            this.mobilePanel.classList.remove('hidden');
            document.body.classList.add('menu-open'); // Chặn scroll nền khi mở menu
            
            // Sử dụng requestAnimationFrame để đảm bảo DOM đã cập nhật
            requestAnimationFrame(() => {
                this.mobilePanel.classList.remove('opacity-0');
                this.mobileMenuContainer.classList.remove('-translate-x-full');
                this.mobileMenuContainer.classList.add('menu-animate-in');
                
                // Reset các submenu khi mở menu
                const submenus = document.querySelectorAll('.mobile-submenu-content');
                submenus.forEach(submenu => {
                    submenu.style.maxHeight = '0px';
                    submenu.style.opacity = '0';
                    submenu.classList.remove('submenu-open');
                });
                
                const submenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
                submenuToggles.forEach(toggle => {
                    toggle.setAttribute('aria-expanded', 'false');
                    const icon = toggle.querySelector('i.fa-chevron-down');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                });
            });
        } else {
            // Đóng menu
            this.mobileMenuContainer.classList.remove('menu-animate-in');
            this.mobileMenuContainer.classList.add('menu-animate-out');
            this.mobilePanel.classList.add('opacity-0');
            this.mobileMenuContainer.classList.add('-translate-x-full');
            
            // Đợi animation hoàn thành rồi mới ẩn menu
            setTimeout(() => {
                this.mobilePanel.classList.add('hidden');
                document.body.classList.remove('menu-open'); // Bỏ chặn scroll khi đóng menu
                this.mobileMenuContainer.classList.remove('menu-animate-out');
            }, 400);
        }
    },
    toggleSubmenu(toggle) {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('i.fa-chevron-down');
        if (!content) {
            window.componentLog("IVSHeaderController: Nội dung submenu không tìm thấy.", 'warn');
            return;
        }
        
        // Kiểm tra trạng thái hiện tại của submenu
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        // Đặt thuộc tính aria-expanded
        toggle.setAttribute('aria-expanded', !isExpanded);
        
        // Xử lý hiệu ứng xoay icon
        if (icon) {
            icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        }
        
        // Xử lý hiển thị/ẩn submenu
        if (isExpanded) {
            // Đóng submenu
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
            content.classList.add('submenu-closing');
            setTimeout(() => {
                content.classList.remove('submenu-closing');
                content.classList.remove('submenu-open');
            }, 300);
        } else {
            // Mở submenu
            content.classList.add('submenu-open');
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
            
            // Đảm bảo submenu vẫn hiển thị đúng khi nội dung thay đổi
            setTimeout(() => {
                content.style.maxHeight = content.scrollHeight + 'px';
            }, 50);
        }
        
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
    },
    
    // --- Logic hiển thị logo thay cho chữ Menu khi mở menu mobile ---
    initMobileMenuLogoLogic() {
        const menuTitle = document.querySelector('.menu-title');
        const logo = document.getElementById('mobile-menu-logo');
        
        if (!menuTitle || !logo) {
            window.componentLog("IVSHeaderController: Không tìm thấy menu title hoặc logo cho mobile menu.", "warn");
            return;
        }
        
        function showLogo() {
            menuTitle.classList.add('hidden');
            logo.classList.remove('hidden');
        }
        
        function showTitle() {
            menuTitle.classList.remove('hidden');
            logo.classList.add('hidden');
        }
        
        // Khi mở menu
        if (this.mobileOpenBtn) {
            this.mobileOpenBtn.addEventListener('click', function() {
                setTimeout(showLogo, 200); // Đợi menu trượt ra xong mới đổi
            });
        }
        
        // Khi đóng menu
        if (this.mobileCloseBtn) {
            this.mobileCloseBtn.addEventListener('click', function() {
                setTimeout(showTitle, 200);
            });
        }
        
        // Nếu menu đóng bằng click ngoài hoặc phím Esc
        document.addEventListener('click', (e) => {
            if (this.mobilePanel && !this.mobilePanel.classList.contains('hidden')) {
                if (!this.mobilePanel.contains(e.target) && e.target.id !== 'mobile-menu-open-btn') {
                    setTimeout(showTitle, 200);
                }
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setTimeout(showTitle, 200);
        });
        
        window.componentLog("IVSHeaderController: Đã khởi tạo logic logo menu mobile.", "info");
    },
    
    // --- Swipe từ trái sang phải để mở menu hamburger trên mobile ---
    initSwipeGesture() {
        // Mobile Menu Touch Gestures
        let touchStartX = 0;
        let touchEndX = 0;
        let menuOpen = false;
        let initialMenuTransform = 0;
        let currentMenuTransform = 0;
        const SWIPE_THRESHOLD = 50; // Minimum distance for swipe
        const EDGE_THRESHOLD = 24; // Chỉ nhận vuốt mở menu khi bắt đầu từ rìa trái 0-24px
        const VELOCITY_THRESHOLD = 0.5; // Minimum velocity for swipe
        let lastTouchTime = 0;
        let lastTouchX = 0;

        const mobileMenuPanel = document.getElementById('ivs-mobile-menu-panel');
        const mobileMenuContainer = document.getElementById('ivs-mobile-menu-container');
        const mobileMenuBackdrop = document.getElementById('ivs-mobile-menu-backdrop');

        function handleTouchStart(e) {
            touchStartX = e.touches[0].clientX;
            lastTouchX = touchStartX;
            lastTouchTime = Date.now();
            initialMenuTransform = currentMenuTransform;
            menuOpen = !mobileMenuPanel.classList.contains('hidden');

            // Chỉ cho phép vuốt mở menu khi bắt đầu từ rìa trái (0-24px) và menu đang đóng
            if (!menuOpen && touchStartX > EDGE_THRESHOLD) return;

            mobileMenuContainer.style.transition = 'none';
            mobileMenuBackdrop.style.transition = 'none';
        }

        function handleTouchMove(e) {
            if (!menuOpen && touchStartX > EDGE_THRESHOLD) return;

            const currentX = e.touches[0].clientX;
            const deltaX = currentX - touchStartX;
            const currentTime = Date.now();
            const timeDiff = currentTime - lastTouchTime;
            const velocity = (currentX - lastTouchX) / (timeDiff || 1);
            lastTouchX = currentX;
            lastTouchTime = currentTime;

            if (menuOpen) {
                currentMenuTransform = Math.min(0, Math.max(-100, deltaX));
                const progress = 1 + (currentMenuTransform / mobileMenuContainer.offsetWidth);
                const opacity = Math.max(0, Math.min(1, progress));
                mobileMenuContainer.style.transform = `translateX(${currentMenuTransform}px)`;
                mobileMenuBackdrop.style.opacity = opacity;
            } else {
                currentMenuTransform = Math.max(-mobileMenuContainer.offsetWidth, Math.min(0, deltaX - mobileMenuContainer.offsetWidth));
                const progress = 1 + (currentMenuTransform / mobileMenuContainer.offsetWidth);
                const opacity = Math.max(0, Math.min(1, progress));
                mobileMenuContainer.style.transform = `translateX(${currentMenuTransform}px)`;
                mobileMenuBackdrop.style.opacity = opacity;
            }

            // Haptic feedback nhẹ khi vuốt đủ xa
            if ('vibrate' in navigator) {
                if (Math.abs(currentMenuTransform) % 50 === 0) {
                    navigator.vibrate(1);
                }
            }
        }

        function handleTouchEnd(e) {
            touchEndX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : lastTouchX;
            const deltaX = touchEndX - touchStartX;
            const velocity = (touchEndX - lastTouchX) / ((Date.now() - lastTouchTime) || 1);

            mobileMenuContainer.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            mobileMenuBackdrop.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

            if (menuOpen) {
                if (deltaX < -SWIPE_THRESHOLD || velocity < -VELOCITY_THRESHOLD) {
                    closeMenu();
                } else {
                    openMenu();
                }
            } else {
                // Chỉ mở menu nếu vuốt từ rìa trái
                if (touchStartX <= EDGE_THRESHOLD && (deltaX > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD)) {
                    openMenu();
                } else {
                    closeMenu();
                }
            }
        }

        function openMenu() {
            menuOpen = true;
            mobileMenuPanel.classList.remove('hidden');
            mobileMenuContainer.style.transform = 'translateX(0)';
            mobileMenuBackdrop.style.opacity = '1';
            document.body.style.overflow = 'hidden';
            if ('vibrate' in navigator) {
                navigator.vibrate(3);
            }
        }

        function closeMenu() {
            menuOpen = false;
            mobileMenuContainer.style.transform = 'translateX(-100%)';
            mobileMenuBackdrop.style.opacity = '0';
            setTimeout(() => {
                if (!menuOpen) {
                    mobileMenuPanel.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            }, 400);
            if ('vibrate' in navigator) {
                navigator.vibrate(2);
            }
        }

        // Add touch event listeners
        if (mobileMenuPanel && mobileMenuContainer) {
            mobileMenuPanel.addEventListener('touchstart', handleTouchStart, { passive: true });
            mobileMenuPanel.addEventListener('touchmove', handleTouchMove, { passive: true });
            mobileMenuPanel.addEventListener('touchend', handleTouchEnd);
            // Button handlers
            document.getElementById('mobile-menu-open-btn')?.addEventListener('click', openMenu);
            document.getElementById('mobile-menu-close-btn')?.addEventListener('click', closeMenu);
            mobileMenuBackdrop?.addEventListener('click', closeMenu);
        }
        window.componentLog("IVSHeaderController: Đã khởi tạo enhanced swipe gesture cho mobile menu.", "info");
    }
};
window.IVSHeaderController = IVSHeaderController; // Expose globally

// Attach the main loading function to DOMContentLoaded
// This will ensure all components are loaded and controllers initialized after the DOM is ready.
document.addEventListener('DOMContentLoaded', loadCommonComponents);
