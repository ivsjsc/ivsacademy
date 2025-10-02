/**
 * @fileoverview IVSFabController - Quản lý các chức năng của Floating Action Button (FAB).
 * Script này xử lý các nút cuộn lên đầu trang, tùy chọn liên hệ, tùy chọn chia sẻ và các menu con của chúng.
 * Nó phụ thuộc vào các hàm tiện ích toàn cục từ utils.js (componentLog, debounce).
 * @version 2.1 - Cải thiện chức năng đóng/mở submenu và hiệu ứng animation.
 * @author IVS-Technical-Team
 */

'use strict';

// Provide gentle fallbacks for global utilities to avoid hard crashes when
// utils.js hasn't loaded yet. Existing code relied on immediate console.error
// which floods logs and may break some environments; we'll use componentLog
// fallback quietly (console.error only if console present and on explicit need).
if (typeof window.componentLog !== 'function') {
    window.componentLog = function(msg, level = 'log') {
        try {
            if (level === 'error') console.error(msg);
            else if (level === 'warn') console.warn(msg);
            else console.log(msg);
        } catch (e) {}
    };
    window.__componentLogFallback = true;
}
            // Allow initialization when either the main fab container or the assistant container
            // is present. Some pages include only the assistant component (fab-assistant).
            if (!this.fabContainer && !this.assistantContainer) {
                window.componentLog("IVSFabController: Kh\u00f4ng t\u00ecm th\u1ea5y ph\u1ea7n t\u1eed FAB container (#fab-container) ho\u1eb7c assistant container (#fab-assistant-container). Logic FAB s\u1ebd kh\u00f4ng ch\u1ea1y.", "warn");
                return;
            }
/**
 * Lấy chuỗi dịch từ langSystem nếu khả dụng, nếu không trả về fallback.
 * @param {string} key
 * @param {string} fallback
 * @returns {string}
 */
function getTranslationValue(key, fallback) {
    try {
        const langSystem = window.langSystem;
        if (!langSystem || !langSystem.translations) return fallback;
        const candidates = [];
        if (langSystem.currentLanguage && langSystem.translations[langSystem.currentLanguage]) {
            candidates.push(langSystem.translations[langSystem.currentLanguage]);
        }
        if (langSystem.defaultLanguage && langSystem.translations[langSystem.defaultLanguage]) {
            candidates.push(langSystem.translations[langSystem.defaultLanguage]);
        }
        for (const pack of candidates) {
            if (pack && typeof pack[key] === 'string' && pack[key].trim().length) {
                return pack[key];
            }
        }
    } catch (err) {
        // Bỏ qua lỗi và dùng fallback
    }
    return fallback;
}

const IVSFabController = {
    // Biến để lưu trữ trạng thái khởi tạo
    isInitialized: false,

    /**
     * Khởi tạo bộ điều khiển FAB.
     * Lưu trữ các phần tử DOM, điền nội dung menu và gắn các trình lắng nghe sự kiện.
     * Đảm bảo chỉ khởi tạo một lần.
     */
    init() {
        if (this.isInitialized) {
            window.componentLog("IVSFabController: Đã được khởi tạo. Bỏ qua khởi tạo lại.", "info");
            return;
        }

        window.componentLog("IVSFabController: Bắt đầu khởi tạo.", "info");
        this.cacheDOM();
        if (!this.fabContainer) {
            window.componentLog("IVSFabController: Không tìm thấy phần tử FAB container (#fab-container). Logic FAB sẽ không chạy.", "warn");
            return;
        }
        this.populateMenus();
        this.bindEvents();
        this.addRippleEffect();
        this.isInitialized = true; // Đánh dấu đã khởi tạo
        
        // Thêm hiệu ứng shake cho nút liên hệ sau 3 giây để thu hút sự chú ý
        setTimeout(() => {
            const contactBtn = document.getElementById('contact-main-btn');
            if (contactBtn) {
                contactBtn.classList.add('fab-shake');
                setTimeout(() => contactBtn.classList.remove('fab-shake'), 1000);
            }
        }, 3000);
        
        window.componentLog("IVSFabController: Khởi tạo hoàn tất.", "info");
    },

    /**
     * Lưu trữ các phần tử DOM cần thiết cho FAB.
     */
    cacheDOM() {
    this.fabContainer = document.getElementById('fab-container');
    this.assistantContainer = document.getElementById('fab-assistant-container');
    this.scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    // Collect submenu buttons from both the canonical fab container and the assistant container
    const buttonsInFab = this.fabContainer ? Array.from(this.fabContainer.querySelectorAll('button[aria-haspopup="true"]')) : [];
    const buttonsInAssistant = this.assistantContainer ? Array.from(this.assistantContainer.querySelectorAll('button[aria-haspopup="true"]')) : [];
    this.buttonsWithSubmenu = buttonsInFab.concat(buttonsInAssistant);

    window.componentLog(`IVSFabController: FAB Container: ${!!this.fabContainer}, Assistant Container: ${!!this.assistantContainer}, ScrollToTopBtn: ${!!this.scrollToTopBtn}, ButtonsWithSubmenu count: ${this.buttonsWithSubmenu.length}`, 'info');
    },

    /**
     * Thêm hiệu ứng ripple cho các nút FAB.
     */
    addRippleEffect() {
        // Attach ripple effect to any .fab-item inside either the canonical fab container
        // or the assistant container so assistant buttons get the same UI affordance.
        const buttons = [];
        if (this.fabContainer) buttons.push(...Array.from(this.fabContainer.querySelectorAll('.fab-item')));
        if (this.assistantContainer) buttons.push(...Array.from(this.assistantContainer.querySelectorAll('.fab-item')));
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    },

    /**
     * Dynamically load an external script and return when loaded.
     * Useful to pull the chatbot controller from another repo if it's not present.
     * @param {string} url
     * @returns {Promise<void>}
     */
    loadExternalScript(url) {
        return new Promise((resolve, reject) => {
            if (!url) return reject(new Error('No script URL provided'));
            // Avoid loading the same script multiple times
            if (document.querySelector(`script[data-ivs-external-src="${url}"]`)) {
                return resolve();
            }
            const s = document.createElement('script');
            s.src = url;
            s.async = true;
            s.setAttribute('data-ivs-external-src', url);
            s.onload = () => resolve();
            s.onerror = (e) => reject(new Error('Failed to load ' + url));
            document.head.appendChild(s);
        });
    },

    /**
     * Tạo hiệu ứng ripple khi click.
     * @param {Event} e Sự kiện click.
     * @param {HTMLElement} button Nút được click.
     */
    createRipple(e, button) {
        // Xóa ripple cũ nếu có
        const oldRipple = button.querySelector('.ripple');
        if (oldRipple) {
            oldRipple.remove();
        }

        const ripple = document.createElement('span');
        button.appendChild(ripple);
        
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        ripple.style.width = ripple.style.height = `${diameter}px`;
        
        if (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - radius;
            const y = e.clientY - rect.top - radius;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
        } else {
            // Nếu không có sự kiện, đặt ripple ở giữa
            ripple.style.left = `${button.clientWidth / 2 - radius}px`;
            ripple.style.top = `${button.clientHeight / 2 - radius}px`;
        }
        
        ripple.classList.add('ripple');
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    },

    /**
     * Điền nội dung cho các menu con liên hệ và chia sẻ.
     */
    populateMenus() {
        const contactMenu = document.getElementById('contact-options');
        const shareMenu = document.getElementById('share-options');
        const assistantMenu = document.getElementById('assistant-options');

        if (contactMenu) {
            this.populateContactOptions(contactMenu);
            window.componentLog("IVSFabController: Đã điền nội dung menu liên hệ.");
        }
        if (shareMenu) {
            this.populateShareOptions(shareMenu);
            window.componentLog("IVSFabController: Đã điền nội dung menu chia sẻ.");
        }
        if (assistantMenu) {
            this.populateAssistantOptions(assistantMenu);
            window.componentLog("IVSFabController: Đã điền nội dung menu assistant.");
        }
    },

    /**
     * Điền nội dung cho menu con tùy chọn liên hệ.
     * @param {HTMLElement} element Phần tử HTML để điền nội dung.
     */
    populateContactOptions(element) {
        const contacts = [
            { key: "fab_call_hotline", text: "Hotline", href: "tel:+84896920547", icon: "fas fa-phone", color: "text-orange-500" },
            { key: "fab_send_email", text: "Email", href: "mailto:info@ivsacademy.edu.vn", icon: "fas fa-envelope", color: "text-red-500" },
            // Đã đồng bộ icon Zalo với fas fa-comment-dots
            { key: "fab_chat_zalo", text: "Zalo", href: "https://zalo.me/1582587135739746654", icon: "fas fa-comment-dots", color: "text-blue-500" },
            { key: "fab_fanpage_fb", text: "Facebook", href: "https://www.facebook.com/hr.ivsacademy/", icon: "fab fa-facebook-f", color: "text-blue-600" },
            { key: "fab_chat_whatapps", text: "WhatsApp", href: "https://wa.me/84795555789/", icon: "fab fa-whatsapp", color: "text-green-500" },
        ];
        // Sử dụng DocumentFragment để tối ưu hiệu suất khi thêm nhiều phần tử DOM
        const fragment = document.createDocumentFragment();
        contacts.forEach(c => {
            const link = document.createElement('a');
            link.href = c.href;
            link.setAttribute('role', 'menuitem');
            // Thêm 'w-full' để mỗi mục chiếm toàn bộ chiều rộng và xuống hàng
            link.className = 'fab-submenu-item group w-full';
            link.setAttribute('data-lang-key', c.key);
            if (c.href.startsWith('http')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
            link.innerHTML = `<i class="${c.icon} fa-fw ${c.color}"></i><span>${c.text}</span>`;
            fragment.appendChild(link);
        });
        element.appendChild(fragment);
    },

    /**
     * Populate assistant menu with a simple action to open the assistant chat window.
     * @param {HTMLElement} element
     */
    populateAssistantOptions(element) {
        // Create a single button that triggers the assistant. For now it opens a new window/tab
        // or toggles a panel if a chatbot controller is present.
        const assistantLabel = getTranslationValue('fab_assistant_button_label', 'Mở IVS Assistant AI');
    const btn = document.createElement('button');
    // include 'fab-item' so global FAB wiring (ripple, aria handling) applies
    btn.className = 'fab-item fab-submenu-item group w-full';
        btn.setAttribute('role', 'menuitem');
        btn.id = 'assistant-open-btn';
        btn.setAttribute('aria-label', assistantLabel);
        btn.setAttribute('title', assistantLabel);
        btn.setAttribute('data-lang-key', 'fab_assistant_button_label');
        btn.setAttribute('data-lang-target', 'aria-label,title');
        btn.innerHTML = `<i class="fas fa-robot fa-fw text-cyan-400"></i><span data-lang-key="fab_assistant_button_label">${assistantLabel}</span>`;
        btn.addEventListener('click', async () => {
            // If a dedicated chatbot controller exists, call it.
            if (window.IVSChatbotController && typeof window.IVSChatbotController.open === 'function') {
                window.IVSChatbotController.open();
                return;
            }

            // If a global script URL is provided (from another repo), try to load it dynamically
            const externalUrl = window.IVS_CHATBOT_SCRIPT_URL || null;
            if (externalUrl) {
                try {
                    await this.loadExternalScript(externalUrl);
                    if (window.IVSChatbotController && typeof window.IVSChatbotController.open === 'function') {
                        window.IVSChatbotController.open();
                        return;
                    }
                } catch (err) {
                    window.componentLog('Failed to load external IVSChatbotController: ' + err.message, 'warn');
                }
            }

            // Fallback: open a small popup to the assistant page (could be replaced with in-page modal)
            const w = window.open('/apps/ivs-assistant.html', '_blank', 'toolbar=0,location=0,menubar=0,width=420,height=720');
            if (!w) window.componentLog('Popup blocked when opening IVS Assistant.');
        });
        element.appendChild(btn);
    },

    /**
     * Điền nội dung cho menu con tùy chọn chia sẻ.
     * @param {HTMLElement} element Phần tử HTML để điền nội dung.
     */
    populateShareOptions(element) {
        const currentUrl = window.location.href;
        const pageTitle = document.title;

        const shares = [
            { text: "Facebook", icon: "fab fa-facebook-f", color: "text-blue-600", action: `window.open('https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}', '_blank', 'noopener,noreferrer')` },
            { text: "(Twitter)", icon: "fab fa-x-twitter", color: "text-neutral-500", action: `window.open('https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(pageTitle)}', '_blank', 'noopener,noreferrer')` },
            { text: "LinkedIn", icon: "fab fa-linkedin", color: "text-blue-700", action: `window.open('https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(pageTitle)}', '_blank', 'noopener,noreferrer')` },
            {
                text: "Copy Link",
                icon: "fas fa-link",
                color: "text-gray-500",
                action: null // Hành động sẽ được xử lý qua trình lắng nghe sự kiện
            }
        ];

        const fragment = document.createDocumentFragment();
        shares.forEach((s, index) => {
            const btn = document.createElement('button');
            const btnId = `share-action-${index}`;
            btn.id = btnId;
            btn.setAttribute('role', 'menuitem');
            // Thêm 'w-full' để mỗi mục chiếm toàn bộ chiều rộng và xuống hàng
            btn.className = 'fab-submenu-item group w-full';
            btn.innerHTML = `<i class="${s.icon} fa-fw ${s.color}"></i><span>${s.text}</span>`;
            fragment.appendChild(btn);

            if (s.text === "Copy Link") {
                btn.addEventListener('click', () => this.copyLinkToClipboard(currentUrl, btn));
            } else if (s.action) {
                btn.addEventListener('click', () => eval(s.action));
            }
        });
        element.appendChild(fragment);
    },

    /**
     * Sao chép liên kết vào clipboard và hiển thị thông báo xác nhận.
     * @param {string} url URL cần sao chép.
     * @param {HTMLElement} targetElement Phần tử mục tiêu để hiển thị thông báo.
     */
    copyLinkToClipboard(url, targetElement) {
        try {
            // Sử dụng document.execCommand('copy') để tương thích tốt hơn với iframe
            const textarea = document.createElement('textarea');
            textarea.value = url;
            textarea.style.position = 'fixed'; // Ngăn cuộn
            textarea.style.opacity = '0'; // Ẩn textarea
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            window.componentLog('Đã sao chép liên kết vào clipboard!');
            this.showCopiedConfirmation(targetElement); // Hiển thị thông báo xác nhận
        } catch (err) {
            window.componentLog('Không thể sao chép liên kết: ' + err, 'error');
            // Có thể hiển thị thông báo lỗi cho người dùng nếu cần
        }
    },

    /**
     * Hiển thị thông báo xác nhận "Đã sao chép!" tạm thời gần phần tử mục tiêu.
     * @param {HTMLElement} targetElement Phần tử gần đó để hiển thị thông báo.
     */
    showCopiedConfirmation(targetElement) {
        const message = 'Đã sao chép!';
        const confirmationDiv = document.createElement('div');
        confirmationDiv.textContent = message;
        confirmationDiv.className = 'absolute z-50 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-2 rounded-lg shadow-xl opacity-0 transition-all duration-300 pointer-events-none whitespace-nowrap backdrop-blur-sm border border-green-400/30';

        // Định vị tương đối với nút mục tiêu
        const rect = targetElement.getBoundingClientRect();
        confirmationDiv.style.top = `${rect.top - 40}px`; // Phía trên nút
        confirmationDiv.style.left = `${rect.left + rect.width / 2}px`; // Căn giữa theo chiều ngang
        confirmationDiv.style.transform = 'translateX(-50%)';

        document.body.appendChild(confirmationDiv);

        // Hiển thị dần
        setTimeout(() => {
            confirmationDiv.classList.remove('opacity-0');
            confirmationDiv.classList.add('opacity-100');
        }, 10);

        // Ẩn dần và xóa
        setTimeout(() => {
            confirmationDiv.classList.remove('opacity-100');
            confirmationDiv.classList.add('opacity-0');
            confirmationDiv.addEventListener('transitionend', () => {
                confirmationDiv.remove();
            }, { once: true });
        }, 2000); // Hiển thị trong 2 giây
    },

    /**
     * Gắn các trình lắng nghe sự kiện cho nút cuộn lên đầu trang và các nút bật/tắt menu con.
     */
    bindEvents() {
        if (this.scrollToTopBtn) {
            const handleScroll = () => {
                if (window.scrollY > 200) {
                    this.scrollToTopBtn.classList.remove('opacity-0', 'scale-90', 'pointer-events-none');
                    this.scrollToTopBtn.classList.add('opacity-100', 'scale-100');
                } else {
                    this.scrollToTopBtn.classList.add('opacity-0', 'scale-90', 'pointer-events-none');
                    this.scrollToTopBtn.classList.remove('opacity-100', 'scale-100');
                }
            };
            window.addEventListener('scroll', window.debounce(handleScroll, 100), { passive: true });
            this.scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
            handleScroll();
            window.componentLog("IVSFabController: Đã gắn sự kiện cho nút cuộn lên đầu trang.");
        }

        // Đảm bảo chỉ một menu con mở tại một thời điểm, click lại sẽ đóng, focus/blur accessibility
        if (this.buttonsWithSubmenu && this.buttonsWithSubmenu.forEach) {
            this.buttonsWithSubmenu.forEach(btn => {
                btn.addEventListener('click', e => {
                    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
                    const isOpen = btn.getAttribute('aria-expanded') === 'true';
                    if (isOpen) {
                        this.closeSubmenu(btn);
                    } else {
                        // Đóng tất cả các menu con khác trước khi mở cái mới
                        this.buttonsWithSubmenu.forEach(otherBtn => {
                            if (otherBtn !== btn) this.closeSubmenu(otherBtn);
                        });
                        this.openSubmenu(btn);
                        btn.focus(); // Giữ focus trên nút chính
                    }
                });
                // Đóng menu khi mất focus (tab ra ngoài menu)
                btn.addEventListener('blur', (e) => {
                    setTimeout(() => {
                        // Nếu không focus vào menu con thì đóng
                        const menu = document.getElementById(btn.getAttribute('aria-controls'));
                        if (menu && !menu.contains(document.activeElement)) {
                            this.closeSubmenu(btn);
                        }
                    }, 100); // Độ trễ nhỏ để cho phép chuyển focus vào các mục trong menu
                });
            });
            window.componentLog("IVSFabController: Đã gắn sự kiện click/focus cho các nút có submenu.");
        }

        // Đóng submenu khi click ra ngoài FAB hoặc Assistant container
        document.addEventListener('click', (e) => {
            const insideFab = this.fabContainer && this.fabContainer.contains(e.target);
            const insideAssistant = this.assistantContainer && this.assistantContainer.contains(e.target);
            if (!insideFab && !insideAssistant) {
                if (this.buttonsWithSubmenu && this.buttonsWithSubmenu.forEach) {
                    this.buttonsWithSubmenu.forEach(btn => this.closeSubmenu(btn));
                }
            }
        });
        window.componentLog("IVSFabController: Đã gắn sự kiện click toàn cục để đóng submenu FAB.");

        // Đóng submenu khi nhấn phím Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.buttonsWithSubmenu && this.buttonsWithSubmenu.forEach) {
                    this.buttonsWithSubmenu.forEach(btn => this.closeSubmenu(btn));
                }
                window.componentLog("IVSFabController: Đã đóng submenu FAB do nhấn phím Escape.");
            }
        });
    },

    /**
     * Mở một menu con cụ thể.
     * @param {HTMLElement} btn Nút có menu con cần mở.
     */
    openSubmenu(btn) {
        const menu = document.getElementById(btn.getAttribute('aria-controls'));
        if (!menu) return;
        
        // Loại bỏ 'hidden' và 'pointer-events-none' ngay lập tức để animation có thể chạy
        menu.classList.remove('hidden', 'pointer-events-none');
        // Thêm lớp 'show' để kích hoạt animation 'fab-panel-in'
        menu.classList.add('show'); 
        
        btn.setAttribute('aria-expanded', 'true');
        
        // Thêm hiệu ứng active cho nút
        btn.classList.add('fab-active');
        
        window.componentLog(`IVSFabController: Đã mở submenu cho nút: ${btn.id}`);
    },

    /**
     * Đóng một menu con cụ thể.
     * @param {HTMLElement} btn Nút có menu con cần đóng.
     */
    closeSubmenu(btn) {
        const menu = document.getElementById(btn.getAttribute('aria-controls'));
        if (!menu) return;
        
        // Xóa lớp 'show' để kích hoạt animation 'fab-panel-out'
        menu.classList.remove('show');

        // Lắng nghe sự kiện kết thúc animation để thêm lại 'hidden' và 'pointer-events-none'
        const onTransitionEnd = () => {
            // Kiểm tra lại xem menu có thực sự ẩn sau animation không
            if (!menu.classList.contains('show')) { // Nếu không có lớp 'show' nữa
                menu.classList.add('hidden', 'pointer-events-none');
            }
            menu.removeEventListener('animationend', onTransitionEnd); // Sử dụng 'animationend' thay vì 'transitionend' cho keyframes
        };
        menu.addEventListener('animationend', onTransitionEnd); // Gắn listener cho 'animationend'
        
        btn.setAttribute('aria-expanded', 'false');
        
        // Xóa hiệu ứng active cho nút
        btn.classList.remove('fab-active');
        
        window.componentLog(`IVSFabController: Đã đóng submenu cho nút: ${btn.id}`);
    },
};

// Ensure FAB is initialized when DOM is ready and when componentLog becomes available.
async function ensureFabInit(retries = 6) {
    const delay = 25;
    for (let i = 0; i < retries; i++) {
        // Wait until componentLog exists and either FAB container or assistant container
        if (typeof window.componentLog === 'function' && (document.getElementById('fab-container') || document.getElementById('fab-assistant-container'))) {
            try {
                if (window.IVSFabController && typeof window.IVSFabController.init === 'function') {
                    window.IVSFabController.init();
                    return;
                }
            } catch (err) {
                window.componentLog('ensureFabInit error: ' + err.message, 'warn');
            }
        }
        await new Promise(r => setTimeout(r, delay * (i + 1)));
    }
    window.componentLog('ensureFabInit: FAB init not completed after retries.', 'warn');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ensureFabInit());
} else {
    ensureFabInit();
}

// Thêm CSS cho hiệu ứng ripple (nếu chưa có trong fab-container-new.html)
// Lưu ý: Phần này đã được chuyển vào fab-container-new.html để giữ CSS và HTML cùng nhau.
// Nếu bạn muốn giữ nó ở đây, hãy đảm bảo nó không bị trùng lặp.
/*
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
*/

// Xuất IVSFabController để loadComponents.js có thể truy cập
window.IVSFabController = IVSFabController;

// Fallback IVSChatbotController: if no external chatbot is provided,
// provide a simple in-page modal that loads /apps/ivs-assistant.html in an iframe.
if (!window.IVSChatbotController) {
    window.IVSChatbotController = (function () {
        let overlay = null;
        let keydownHandler = null;

        const bodyClass = 'ivs-assistant-modal-open';

        function createOverlay() {
            const modalTitle = getTranslationValue('fab_assistant_modal_title', 'IVS Assistant AI');
            const closeLabel = getTranslationValue('fab_assistant_close_label', 'Đóng IVS Assistant AI');

            overlay = document.createElement('div');
            overlay.id = 'ivs-chatbot-overlay';
            overlay.style.position = 'fixed';
            overlay.style.inset = '0';
            overlay.style.zIndex = '99999';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.background = 'rgba(0,0,0,0.4)';

            const panel = document.createElement('div');
            panel.style.width = '420px';
            panel.style.height = '720px';
            panel.style.maxWidth = 'calc(100% - 32px)';
            panel.style.maxHeight = 'calc(100% - 32px)';
            panel.style.borderRadius = '12px';
            panel.style.overflow = 'hidden';
            panel.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            panel.style.background = '#fff';
            panel.style.display = 'flex';
            panel.style.flexDirection = 'column';
            panel.style.position = 'relative';

            const header = document.createElement('div');
            header.style.background = '#0f172a';
            header.style.color = '#f8fafc';
            header.style.padding = '0.75rem 1rem';
            header.style.display = 'flex';
            header.style.alignItems = 'center';
            header.style.justifyContent = 'space-between';
            header.style.fontWeight = '600';
            header.style.fontSize = '1rem';

            const titleSpan = document.createElement('span');
            titleSpan.textContent = modalTitle;
            titleSpan.dataset.langKey = 'fab_assistant_modal_title';
            header.appendChild(titleSpan);

            const iframe = document.createElement('iframe');
            iframe.src = '/apps/ivs-assistant.html';
            iframe.style.border = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.flex = '1';
            iframe.style.background = '#fff';
            iframe.title = modalTitle;
            iframe.setAttribute('aria-label', modalTitle);

            const closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.innerHTML = '&times;';
            closeBtn.style.width = '32px';
            closeBtn.style.height = '32px';
            closeBtn.style.border = 'none';
            closeBtn.style.background = 'rgba(15,23,42,0.35)';
            closeBtn.style.color = '#f8fafc';
            closeBtn.style.borderRadius = '9999px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.fontSize = '1.25rem';
            closeBtn.style.lineHeight = '1';
            closeBtn.style.display = 'inline-flex';
            closeBtn.style.alignItems = 'center';
            closeBtn.style.justifyContent = 'center';
            closeBtn.style.transition = 'background 0.2s ease';
            closeBtn.addEventListener('mouseenter', () => { closeBtn.style.background = 'rgba(15,23,42,0.55)'; });
            closeBtn.addEventListener('mouseleave', () => { closeBtn.style.background = 'rgba(15,23,42,0.35)'; });
            closeBtn.addEventListener('click', () => window.IVSChatbotController.close());
            closeBtn.dataset.langKey = 'fab_assistant_close_label';
            closeBtn.dataset.langTarget = 'aria-label,title';
            closeBtn.setAttribute('aria-label', closeLabel);
            closeBtn.setAttribute('title', closeLabel);

            header.appendChild(closeBtn);
            panel.appendChild(header);

            const frameWrapper = document.createElement('div');
            frameWrapper.style.flex = '1';
            frameWrapper.style.position = 'relative';
            frameWrapper.appendChild(iframe);
            panel.appendChild(frameWrapper);
            overlay.appendChild(panel);

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) window.IVSChatbotController.close();
            });

            return overlay;
        }

        return {
            init() {
                // No heavy initialization required for fallback
                window.componentLog('IVSChatbotController (fallback) ready.', 'info');
            },
            open() {
                try {
                    if (overlay) return; // already open
                    overlay = createOverlay();
                    document.body.appendChild(overlay);
                    document.body.classList.add(bodyClass);
                    keydownHandler = (event) => {
                        if (event.key === 'Escape') {
                            window.IVSChatbotController.close();
                        }
                    };
                    document.addEventListener('keydown', keydownHandler);
                    window.componentLog('IVSChatbotController (fallback) overlay opened.', 'info');
                } catch (err) {
                    window.componentLog('Failed to open IVS Assistant overlay: ' + err.message, 'error');
                    // Fallback to opening in a new window/tab
                    const w = window.open('/apps/ivs-assistant.html', '_blank', 'toolbar=0,location=0,menubar=0,width=420,height=720');
                    if (!w) window.componentLog('Popup blocked when opening IVS Assistant fallback.', 'warn');
                }
            },
            close() {
                if (!overlay) return;
                overlay.remove();
                overlay = null;
                document.body.classList.remove(bodyClass);
                if (keydownHandler) {
                    document.removeEventListener('keydown', keydownHandler);
                    keydownHandler = null;
                }
                window.componentLog('IVSChatbotController (fallback) overlay closed.', 'info');
            }
        };
    })();
}

try {
    if (window.IVSChatbotController && typeof window.IVSChatbotController.init === 'function') {
        window.IVSChatbotController.init();
    }
} catch (err) {
    window.componentLog('IVSChatbotController init() error: ' + err.message, 'warn');
}

// Tự động khởi tạo bộ điều khiển FAB khi DOM được tải hoàn toàn.
// Điều này đảm bảo FAB được thiết lập ngay cả khi loadComponents.js không gọi init một cách rõ ràng,
// hoặc nếu fab-container được bao gồm trực tiếp trong một trang.
document.addEventListener('DOMContentLoaded', () => {
    // If containers are already present, initialize immediately.
    const alreadyPresent = document.querySelector('#fab-container, #fab-assistant-container');
    if (alreadyPresent) {
        IVSFabController.init();
        // Apply initial theme after init
        const savedTheme = localStorage.theme;
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        return;
    }

    // If not present, observe DOM for dynamic insertion (e.g., loadComponents.js injects the FAB)
    const observer = new MutationObserver((mutations, obs) => {
        if (document.querySelector('#fab-container, #fab-assistant-container')) {
            try {
                IVSFabController.init();
            } catch (err) {
                window.componentLog('IVSFabController.init() error after mutation: ' + err.message, 'warn');
            }
            // Apply initial theme after init
            const savedTheme = localStorage.theme;
            if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
            obs.disconnect();
            clearTimeout(timeoutHandle);
        }
    });

    observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

    // After a reasonable timeout, stop observing and log a concise note so logs are not noisy.
    const timeoutMs = 5000;
    const timeoutHandle = setTimeout(() => {
        try {
            observer.disconnect();
        } catch (e) {}
        // Only warn once and provide a short hint for manual init if developers intentionally inject later.
        window.componentLog('IVSFabController: Không tìm thấy FAB hoặc Assistant container sau khi chờ ' + (timeoutMs / 1000) + 's. Nếu bạn chèn container sau thời điểm này, gọi IVSFabController.init() thủ công.', 'info');
    }, timeoutMs);
});
