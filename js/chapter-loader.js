// js/chapter-loader.js

/**
 * Hàm khởi tạo bộ tải chương.
 * @param {string} storyPath - Tên thư mục chứa các tệp JSON (ví dụ: 'legnaxe_part1').
 * @param {number} totalChapters - Tổng số chương (bao gồm epilogue nếu có).
 * @param {string} lang - Ngôn ngữ hiện tại ('en' hoặc 'vi').
 */
function initializeChapterLoader(storyPath, totalChapters, lang = 'en') {
    // Biến lưu trữ trạng thái hiện tại
    let currentChapterIndex = 0; // Chỉ số chương hiện tại (bắt đầu từ 0)
    const chapterIds = []; // Mảng lưu trữ ID của các chương

    // Lấy các phần tử DOM cần thiết
    const dynamicContent = document.getElementById('dynamic-chapter-content');
    const prevBtn = document.getElementById('prev-chapter-btn');
    const nextBtn = document.getElementById('next-chapter-btn');
    const listBtnTop = document.getElementById('list-chapter-btn-top');
    const listBtnBottom = document.getElementById('list-chapter-btn');
    const chapterModal = document.getElementById('chapter-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalList = document.getElementById('modal-chapter-list');

    // Khởi tạo danh sách chương trong modal
    function initChapterList() {
        modalList.innerHTML = ''; // Xóa nội dung cũ
        for (let i = 1; i <= totalChapters; i++) {
            const chapterId = `chapter-${i}`;
            const chapterTitle = lang === 'en' ? `Chapter ${i}: Title Not Loaded` : `Chương ${i}: Tiêu đề chưa tải`;
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${chapterId}`;
            link.dataset.chapterId = chapterId;
            link.className = 'modal-chapter-link block p-3 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors';
            link.textContent = chapterTitle;
            listItem.appendChild(link);
            modalList.appendChild(listItem);

            // Lưu ID chương vào mảng để tiện sử dụng sau
            chapterIds.push(chapterId);
        }
        // Thêm epilogue nếu có (giả sử epilogue là chương cuối cùng)
        if (totalChapters > 0) {
            const epilogueId = 'epilogue';
            const epilogueTitle = lang === 'en' ? 'Epilogue: The Soul Meteor Shower' : 'Hồi Kết: Cơn Mưa Sao Băng Linh Hồn';
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${epilogueId}`;
            link.dataset.chapterId = epilogueId;
            link.className = 'modal-chapter-link block p-3 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors';
            link.textContent = epilogueTitle;
            listItem.appendChild(link);
            modalList.appendChild(listItem);
            chapterIds.push(epilogueId);
        }
    }

    // Hàm lấy nội dung chương từ JSON
    async function fetchChapterContent(chapterId) {
        try {
            // Xác định tên tệp JSON dựa trên chapterId
            let fileName = '';
            if (chapterId === 'epilogue') {
                fileName = 'epilogue.json';
            } else {
                // Giả sử chapterId có dạng 'chapter-1', 'chapter-2', ...
                const num = chapterId.split('-')[1];
                fileName = `chapter_${num.padStart(2, '0')}.json`; // Ví dụ: chapter_01.json
            }

            // Gửi yêu cầu fetch
            const response = await fetch(`data/novels/${storyPath}/${fileName}`);
            if (!response.ok) {
                throw new Error(`Không thể tải chương: ${chapterId}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Lỗi khi tải nội dung chương:', error);
            return null;
        }
    }

    // Hàm hiển thị nội dung chương
    function renderChapter(chapterData) {
        if (!chapterData) {
            dynamicContent.innerHTML = '<p class="text-red-500">Không thể tải nội dung chương. Vui lòng thử lại sau.</p>';
            return;
        }

        // Xây dựng HTML cho nội dung chương
        const contentHtml = `
            <h3>${chapterData[`title_${lang}`]}</h3>
            <div class="prose">
                ${chapterData[`content_${lang}`]}
            </div>
        `;
        dynamicContent.innerHTML = contentHtml;

        // Cập nhật tiêu đề trang (nếu cần)
        document.title = `${chapterData[`title_${lang}`]} - LEGNAXE Part 1`;
    }

    // Hàm điều hướng đến chương cụ thể
    async function navigateToChapter(chapterId) {
        const chapterData = await fetchChapterContent(chapterId);
        if (chapterData) {
            renderChapter(chapterData);
            // Cập nhật chỉ số chương hiện tại
            currentChapterIndex = chapterIds.indexOf(chapterId);
            // Cập nhật trạng thái nút điều hướng
            updateNavigationButtons();
            // Cập nhật URL hash
            window.location.hash = chapterId;
        }
    }

    // Hàm cập nhật trạng thái nút điều hướng (Previous/Next)
    function updateNavigationButtons() {
        prevBtn.disabled = currentChapterIndex <= 0;
        nextBtn.disabled = currentChapterIndex >= chapterIds.length - 1;
    }

    // Hàm xử lý sự kiện khi người dùng nhấp vào liên kết trong modal
    function handleModalLinkClick(event) {
        event.preventDefault();
        const chapterId = event.target.dataset.chapterId;
        navigateToChapter(chapterId);
        closeModal(); // Đóng modal sau khi chọn
    }

    // Hàm mở modal danh sách chương
    function openModal() {
        chapterModal.style.display = 'flex';
        setTimeout(() => {
            chapterModal.classList.add('modal-active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    // Hàm đóng modal danh sách chương
    function closeModal() {
        chapterModal.classList.remove('modal-active');
        setTimeout(() => {
            if (!chapterModal.classList.contains('modal-active')) {
                chapterModal.style.display = 'none';
            }
        }, 300);
        document.body.style.overflow = '';
    }

    // Hàm xử lý sự kiện khi người dùng thay đổi URL hash (ví dụ: khi nhấn nút back/forward)
    function handleHashChange() {
        const hash = window.location.hash.substring(1); // Loại bỏ ký tự '#'
        if (hash && chapterIds.includes(hash)) {
            navigateToChapter(hash);
        }
    }

    // Khởi tạo
    initChapterList();
    updateNavigationButtons();

    // Gắn sự kiện cho các nút điều hướng
    prevBtn.addEventListener('click', () => {
        if (currentChapterIndex > 0) {
            navigateToChapter(chapterIds[currentChapterIndex - 1]);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentChapterIndex < chapterIds.length - 1) {
            navigateToChapter(chapterIds[currentChapterIndex + 1]);
        }
    });

    listBtnTop.addEventListener('click', openModal);
    listBtnBottom.addEventListener('click', openModal);

    closeModalBtn.addEventListener('click', closeModal);

    // Gắn sự kiện cho các liên kết trong modal
    modalList.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            handleModalLinkClick(event);
        }
    });

    // Gắn sự kiện khi người dùng click ngoài modal để đóng
    chapterModal.addEventListener('click', (event) => {
        if (event.target === chapterModal) {
            closeModal();
        }
    });

    // Gắn sự kiện khi URL hash thay đổi
    window.addEventListener('hashchange', handleHashChange);

    // Tải chương đầu tiên khi trang được tải (hoặc chương từ URL hash nếu có)
    const initialHash = window.location.hash.substring(1);
    if (initialHash && chapterIds.includes(initialHash)) {
        navigateToChapter(initialHash);
    } else {
        navigateToChapter(chapterIds[0]); // Tải chương đầu tiên
    }
}

// Đảm bảo hàm này có sẵn trong phạm vi toàn cục để HTML có thể gọi
window.initializeChapterLoader = initializeChapterLoader;