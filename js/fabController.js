/**
 * @fileoverview IVSFabController - Quản lý các chức năng của Floating Action Button (FAB).
 * Script này xử lý các nút cuộn lên đầu trang, tùy chọn liên hệ, tùy chọn chia sẻ và các menu con của chúng.
 * Nó phụ thuộc vào các hàm tiện ích toàn cục từ utils.js (componentLog, debounce).
 * @version 2.1 - Cải thiện chức năng đóng/mở submenu và hiệu ứng animation.
 * @author IVS-Technical-Team
 */

'use strict';

// Đảm bảo các hàm tiện ích toàn cục có sẵn (componentLog, debounce)
// Các hàm này được mong đợi sẽ được tải qua public/js/utils.js
if (typeof window.componentLog !== 'function') {
    console.error("[IVSFabController] window.componentLog không được định nghĩa. Vui lòng đảm bảo utils.js được tải trước fabController.js.");
    window.componentLog = (msg, level = 'error') => console[level](msg); // Hàm dự phòng
}
if (typeof window.debounce !== 'function') {
    console.error("[IVSFabController] window.debounce không được định nghĩa. Vui lòng đảm bảo utils.js được tải trước fabController.js.");
    window.debounce = (func) => func; // Hàm dự phòng
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
        this.scrollToTopBtn = document.getElementById('scroll-to-top-btn');
        // Sử dụng Optional Chaining (?) để tránh lỗi nếu fabContainer không tìm thấy
        this.buttonsWithSubmenu = this.fabContainer?.querySelectorAll('button[aria-haspopup="true"]') || [];

        window.componentLog(`IVSFabController: FAB Container: ${!!this.fabContainer}, ScrollToTopBtn: ${!!this.scrollToTopBtn}, ButtonsWithSubmenu count: ${this.buttonsWithSubmenu.length}`, 'info');
    },

    /**
     * Thêm hiệu ứng ripple cho các nút FAB.
     */
    addRippleEffect() {
        const fabButtons = this.fabContainer?.querySelectorAll('.fab-item') || [];
        fabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
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

        if (contactMenu) {
            this.populateContactOptions(contactMenu);
            window.componentLog("IVSFabController: Đã điền nội dung menu liên hệ.");
        }
        if (shareMenu) {
            this.populateShareOptions(shareMenu);
            window.componentLog("IVSFabController: Đã điền nội dung menu chia sẻ.");
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

        // Đóng submenu khi click ra ngoài FAB container
        document.addEventListener('click', (e) => {
            if (this.fabContainer && !this.fabContainer.contains(e.target)) {
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

// Tự động khởi tạo bộ điều khiển FAB khi DOM được tải hoàn toàn.
// Điều này đảm bảo FAB được thiết lập ngay cả khi loadComponents.js không gọi init một cách rõ ràng,
// hoặc nếu fab-container được bao gồm trực tiếp trong một trang.
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra xem phần tử fabContainer có tồn tại trước khi khởi tạo
    if (document.getElementById('fab-container')) {
        IVSFabController.init();
        // Apply initial theme after init
        const savedTheme = localStorage.theme;
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    } else {
        // Nếu fab-container không có sẵn ngay lập tức, nó có thể được tải động.
        // Trong trường hợp đó, loadComponents.js (hoặc tương tự) nên gọi IVSFabController.init() một cách rõ ràng
        // sau khi chèn nội dung fab-container.html.
        window.componentLog("IVSFabController: Không tìm thấy FAB container trên DOMContentLoaded. Giả định tải động. Đảm bảo init() được gọi thủ công sau khi chèn.", "warn");
    }
});
