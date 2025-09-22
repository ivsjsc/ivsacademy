// FILE: /js/contact-page.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

            formStatus.textContent = 'Đang gửi...'; // Hiển thị trạng thái đang gửi
            formStatus.className = 'mt-4 text-center text-ivs-text-secondary'; // Reset classes

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Đây là nơi bạn sẽ gửi dữ liệu form đến backend của mình.
            // Ví dụ: sử dụng fetch API để gửi dữ liệu đến một API endpoint.
            // Để đơn giản, tôi sẽ mô phỏng một yêu cầu gửi thành công/thất bại.
            try {
                // Mô phỏng độ trễ của mạng
                await new Promise(resolve => setTimeout(resolve, 1500)); 

                // Mô phỏng phản hồi thành công
                const response = { success: true, message: 'Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại sớm nhất!' };
                
                // Nếu có API thực tế, bạn sẽ dùng:
                /*
                const response = await fetch('/api/contact', { // Thay thế bằng endpoint API thực tế của bạn
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                */

                if (response.success) {
                    formStatus.textContent = window.langData ? window.langData['contact_form_success_message'] : response.message;
                    formStatus.className = 'mt-4 text-center text-green-500 font-semibold';
                    contactForm.reset(); // Xóa form sau khi gửi thành công
                } else {
                    // Xử lý lỗi từ backend
                    formStatus.textContent = window.langData ? window.langData['contact_form_error_message'] : 'Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại.';
                    formStatus.className = 'mt-4 text-center text-red-500 font-semibold';
                }
            } catch (error) {
                console.error('Lỗi khi gửi form:', error);
                formStatus.textContent = window.langData ? window.langData['contact_form_network_error_message'] : 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.';
                formStatus.className = 'mt-4 text-center text-red-500 font-semibold';
            }
        });
        
    }
});
