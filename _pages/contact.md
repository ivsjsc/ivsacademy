---
title: ""
description: "Kết nối với IVS JSC để nhận tư vấn chuyên sâu về giáo dục, công nghệ và các giải pháp doanh nghiệp. Chúng tôi luôn sẵn sàng lắng nghe."
layout: page.njk
permalink: /contact.html/
cssFiles:
  - css/tailwind.css
  - css/styles.min.css
  - css/style.css
  - css/animations.css
jsFiles:
  - js/firebase-init.js
  - js/bundle.min.js
  - js/security-enhancements.js
---

<section class="text-center py-12">
            <h1 class="text-5xl font-extrabold text-white mb-4" data-lang-key="contact_hero_title">
                Liên Hệ Với Chúng Tôi
            </h1>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto" data-lang-key="contact_hero_description">
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy kết nối với IVS JSC để nhận tư vấn chuyên sâu về giáo dục, công nghệ và các giải pháp doanh nghiệp.
            </p>
        </section>

        <section class="bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 class="text-3xl font-bold text-white mb-6 section-title" data-lang-key="contact_info_title">
                        Thông Tin Liên Hệ
                    </h2>
                    <div class="space-y-6 text-lg">
                        <p class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span data-lang-key="contact_address">1104, Tổ 6, Ấp Đất Mới, Xã Long Phước, Huyện Long Thành, Tỉnh Đồng Nai</span>
                        </p>
                        <p class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span data-lang-key="contact_phone">Hotline: (+84) 795 555 789</span>
                        </p>
                        <p class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span data-lang-key="contact_email">Email: info@ivsacademy.edu.vn</span>
                        </p>
                        <p class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span data-lang-key="contact_tax_code">Mã số thuế: 3603960189</span>
                        </p>
                    </div>
                </div>
                <div>
                    <h2 class="text-3xl font-bold text-white mb-6 section-title" data-lang-key="contact_form_title">
                        Gửi Yêu Cầu Cho Chúng Tôi
                    </h2>

                    <!-- Netlify-ready form: keep form-name hidden input and honeypot for spam protection -->
                    <form name="contact" method="POST" action="/thank-you.html" data-netlify="true" data-netlify-honeypot="bot-field" enctype="multipart/form-data" class="space-y-6 contact-form" novalidate>
                        <input type="hidden" name="form-name" value="contact">

                        <!-- Honeypot field (hidden) -->
                        <div style="display:none;" aria-hidden="true">
                            <label>Không điền trường này nếu bạn là người thật: <input name="bot-field"></label>
                        </div>

                        <div>
                            <label for="name" class="block text-lg font-medium text-gray-300 mb-2">Họ và Tên <span class="text-orange-400">*</span></label>
                            <input type="text" id="name" name="name" class="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nguyễn Văn A" required aria-required="true">
                        </div>

                        <div>
                            <label for="email" class="block text-lg font-medium text-gray-300 mb-2">Email <span class="text-orange-400">*</span></label>
                            <input type="email" id="email" name="email" class="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="email@example.com" required aria-required="true">
                        </div>

                        <div>
                            <label for="phone" class="block text-lg font-medium text-gray-300 mb-2">Số Điện Thoại</label>
                            <input type="tel" id="phone" name="phone" class="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0901234567">
                        </div>

                        <div>
                            <label for="project_type" class="block text-lg font-medium text-gray-300 mb-2">Loại dự án</label>
                            <select id="project_type" name="project_type" class="w-full p-3 rounded-lg bg-gray-900 border border-gray-700">
                                <option value="">-- chọn --</option>
                                <option value="dock-construction">Dock Construction</option>
                                <option value="remodel">Remodel</option>
                                <option value="repair">Repairs & Maintenance</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label for="message" class="block text-lg font-medium text-gray-300 mb-2">Nội Dung Yêu Cầu</label>
                            <textarea id="message" name="message" rows="5" class="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tôi muốn tìm hiểu về..."></textarea>
                        </div>

                        <div>
                            <label for="attachment" class="block text-lg font-medium text-gray-300 mb-2">Tệp đính kèm (tuỳ chọn)</label>
                            <input type="file" id="attachment" name="attachment" accept=".jpg,.png,.pdf,.docx" class="w-full text-sm text-gray-300">
                            <p class="text-xs text-gray-500 mt-1">Tối đa theo giới hạn Netlify (kiểm tra tài liệu Netlify cho kích thước tối đa).</p>
                        </div>

                        <div class="flex items-start space-x-3">
                            <input type="checkbox" id="consent" name="consent" required aria-required="true" class="mt-1" />
                            <label for="consent" class="text-sm text-gray-300">Tôi đồng ý được liên hệ về yêu cầu này. <span class="text-orange-400">*</span></label>
                        </div>

                        <div>
                            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800" data-netlify="true">Gửi Yêu Cầu</button>
                        </div>

                        <!-- Optional quick Google Form button retained -->
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLScy2U7Pa1Sy9Xzny4InhSLvUWYeBh3WTxAldelI6xOAzJ2FXg/viewform?usp=pp_url&entry.1517655153=Nguy%E1%BB%85n+Minh+Tri%E1%BA%BFt&entry.396944312=n.bi2993@gmail.com&entry.138806801=0795555789&entry.1102553479=Y%C3%AAu+c%E1%BA%A7u+t%E1%BB%AB+kh%C3%A1ch+h%C3%A0ng" target="_blank" rel="noopener noreferrer" class="block text-center w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 mt-4">
                            Hoặc Gửi Yêu Cầu Nhanh qua Google Form
                        </a>
                    </form>

                    <!-- Progressive enhancement: AJAX submit that still triggers Netlify form processing -->
                    <script>
                        document.addEventListener('DOMContentLoaded', () => {
                            const form = document.querySelector('form[name="contact"]');
                            if (!form) return;

                            const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
                            const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

                            const showFormMessage = (msg, isError = true) => {
                                let container = form.querySelector('#formMessage');
                                if (!container) {
                                    container = document.createElement('div');
                                    container.id = 'formMessage';
                                    container.className = 'text-sm mt-3';
                                    form.appendChild(container);
                                }
                                container.textContent = msg;
                                container.classList.toggle('text-red-400', isError);
                                container.classList.toggle('text-green-400', !isError);
                            };

                            form.addEventListener('submit', async (e) => {
                                // Allow native submission if JS disabled
                                e.preventDefault();

                                // Honeypot check
                                if (form.querySelector('[name="bot-field"]').value) {
                                    // Detected bot — abort
                                    return;
                                }

                                const submitButton = form.querySelector('button[type="submit"]');
                                const originalText = submitButton && submitButton.textContent;
                                if (submitButton) {
                                    submitButton.disabled = true;
                                    submitButton.textContent = 'Đang gửi...';
                                }

                                // Client-side file validation
                                const fileInput = form.querySelector('input[type="file"][name="attachment"]');
                                if (fileInput && fileInput.files.length > 0) {
                                    const file = fileInput.files[0];
                                    if (file.size > MAX_FILE_SIZE) {
                                        showFormMessage('Kích thước tệp vượt quá giới hạn 5 MB. Vui lòng chọn tệp nhỏ hơn.', true);
                                        if (submitButton) {
                                            submitButton.disabled = false;
                                            submitButton.textContent = originalText;
                                        }
                                        return;
                                    }
                                    if (ALLOWED_TYPES.indexOf(file.type) === -1) {
                                        showFormMessage('Loại tệp không được hỗ trợ. Vui lòng gửi JPG, PNG, PDF hoặc DOCX.', true);
                                        if (submitButton) {
                                            submitButton.disabled = false;
                                            submitButton.textContent = originalText;
                                        }
                                        return;
                                    }
                                }

                                const formData = new FormData(form);
                                // Ensure form-name is present (Netlify requires it when using AJAX)
                                formData.set('form-name', form.getAttribute('name') || 'contact');

                                try {
                                    const res = await fetch('/', {
                                        method: 'POST',
                                        body: formData
                                    });

                                    if (res.ok) {
                                        // Redirect to thank-you page (maintain Netlify behavior)
                                        window.location.href = form.getAttribute('action') || '/thank-you.html';
                                    } else {
                                        // Show error UI while keeping original form available
                                        const text = await res.text();
                                        console.error('Netlify form error', text);
                                        showFormMessage('Gửi thất bại — vui lòng thử lại sau.', true);
                                        if (submitButton) {
                                            submitButton.disabled = false;
                                            submitButton.textContent = originalText;
                                        }
                                    }
                                } catch (err) {
                                    console.error('Submit error', err);
                                    showFormMessage('Lỗi khi gửi. Vui lòng thử lại sau.', true);
                                    if (submitButton) {
                                        submitButton.disabled = false;
                                        submitButton.textContent = originalText;
                                    }
                                }
                            });
                        });
                    </script>
                </div>
            </div>
        </section>

        <section class="bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 class="text-3xl font-bold text-white mb-6 section-title" data-lang-key="contact_map_title">
                Vị Trí Của Chúng Tôi
            </h2>
            <div class="rounded-lg overflow-hidden shadow-md">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4823.4906387985575!2d106.98627547583808!3d10.73115266002554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317519ffa45ccdf1%3A0x9b79f7937cef7081!2zSOG7jEMgVknhu4ZOIElWUyBBQ0FERU1ZIFRydW5nIHTDom0gTmdv4bqhaSBuZyBYYSAtIElWUyBKU0M!5e1!3m2!1svi!2sus!4v1751406225294!5m2!1svi!2sus"
                    width="100%"
                    height="500"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Vị trí IVS JSC trên bản đồ Google"
                ></iframe>
            </div>
        </section>