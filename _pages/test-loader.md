---
title: "IVS Component Loader Test"
description: ""
layout: page.njk
permalink: /test-loader.html/
cssFiles:
  - css/tailwind.css
  - css/style.css
  - css/animations.css
jsFiles:
  - js/utils.js
  - js/animations.js
  - js/loadComponents.js
---

<h1>Trang chẩn đoán lỗi tải thành phần IVS</h1>
    <p>Trang này chỉ thử tải duy nhất tệp <strong>/components/header.html</strong> bằng đường dẫn tuyệt đối.</p>
    
    <div id="header-test-placeholder">
        <p>Đang chờ tải...</p>
    </div>
    
    <h2 id="result-heading">Kết quả:</h2>
    <pre id="result-log">Khởi tạo kiểm tra...</pre>

    <script>
        // --- SCRIPT CHẨN ĐOÁN CÔ LẬP ---
        // Mục tiêu: Chỉ kiểm tra fetch() tới /components/header.html
        // Không phụ thuộc vào bất kỳ tệp JS nào khác.

        const placeholder = document.getElementById('header-test-placeholder');
        const logElement = document.getElementById('result-log');
        const resultHeading = document.getElementById('result-heading');
    const componentUrl = 'components/header.html';

        function log(message) {
            console.log(`[TEST] ${message}`);
            logElement.textContent += `\n- ${message}`;
        }

        async function runTest() {
            log(`Bắt đầu fetch tới: ${componentUrl}`);
            try {
                const response = await fetch(componentUrl);
                log(`Nhận được phản hồi từ máy chủ. Status: ${response.status} ${response.statusText}`);

                if (!response.ok) {
                    // Ném lỗi nếu status không phải là 2xx (ví dụ: 404, 500)
                    throw new Error(`Máy chủ phản hồi với lỗi HTTP ${response.status}.`);
                }

                const html = await response.text();
                log('Fetch và đọc nội dung HTML thành công.');

                if (html.trim() === '') {
                    log('Cảnh báo: Tệp header.html có nội dung rỗng.');
                    placeholder.innerHTML = '<p>Thành công, nhưng tệp header rỗng.</p>';
                } else {
                    placeholder.innerHTML = html;
                    log('Đã chèn thành công HTML vào placeholder.');
                }
                
                // Báo cáo thành công
                resultHeading.textContent = "Kết quả: THÀNH CÔNG";
                resultHeading.className = 'success';
                placeholder.classList.add('success');
                log('Kiểm tra hoàn tất thành công.');

            } catch (error) {
                // Báo cáo thất bại
                log(`GẶP LỖI: ${error.message}`);
                resultHeading.textContent = "Kết quả: THẤT BẠI";
                resultHeading.className = 'error';
                placeholder.classList.add('error');
                placeholder.innerHTML = `<p>Không thể tải header. Vui lòng kiểm tra Console (F12) để xem chi tiết lỗi mạng (Network tab).</p><p><strong>Thông điệp lỗi:</strong> ${error.message}</p>`;
                log('Kiểm tra hoàn tất với lỗi.');
            }
        }

        // Chờ DOM sẵn sàng rồi chạy kiểm tra
        document.addEventListener('DOMContentLoaded', runTest);
    </script>

    <!-- Chèn vào cuối <body> của mọi trang -->
        <div id="fab-container-placeholder"></div>

    <!-- Component Placeholders -->
    <div id="header-placeholder"></div>
    <div id="footer-placeholder"></div>
    <div id="fab-container-placeholder"></div>
    
    <!-- Scripts -->
    <script src="js/utils.js"></script>
    <script src="js/animations.js"></script>
    <script src="js/loadComponents.js"></script>