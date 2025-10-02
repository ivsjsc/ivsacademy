/**
 * @file main.js
 * @description Điểm khởi đầu (entry point) chính cho toàn bộ JavaScript của website.
 * Tệp này sẽ điều phối việc tải components và khởi tạo các chức năng khác.
 */

// Import các module cần thiết
import { loadAllComponents } from './componentLoader.js';
import { initializeLanguage } from './language.js'; // Giả sử language.js cũng được module hóa

// Hàm khởi tạo chính của ứng dụng
const initializeApp = async () => {
    console.log('Bắt đầu khởi tạo ứng dụng...');

    try {
        // Bước 1: Tải các thành phần giao diện chính (header, footer,...)
        // Dùng await để đảm bảo giao diện được tải xong trước khi thực hiện các bước tiếp theo.
        await loadAllComponents();

        // Bước 2: Khởi tạo hệ thống ngôn ngữ
        // Hệ thống ngôn ngữ sẽ tìm các key trong header/footer vừa được tải để dịch.
        await initializeLanguage();

        // Bước 3: Khởi tạo các chức năng khác (nếu có)
        // ví dụ: initDarkMode(), initAnimations(),...
        console.log('Ứng dụng đã khởi tạo thành công!');

    } catch (error) {
        console.error('Đã xảy ra lỗi nghiêm trọng trong quá trình khởi tạo ứng dụng:', error);
    }
};

// Lắng nghe sự kiện DOMContentLoaded để đảm bảo cây DOM đã sẵn sàng
// trước khi chạy mã JavaScript.
document.addEventListener('DOMContentLoaded', initializeApp);
