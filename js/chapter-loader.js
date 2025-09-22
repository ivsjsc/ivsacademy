document.addEventListener('DOMContentLoaded', () => {
    const dynamicChapterContent = document.getElementById('dynamic-chapter-content');
    const prevButton = document.getElementById('prev-chapter-btn');
    const nextButton = document.getElementById('next-chapter-btn');
    const listChapterButton = document.getElementById('list-chapter-btn'); // Nút danh sách chương ở phía dưới
    const listChapterButtonTop = document.getElementById('list-chapter-btn-top'); // Nút danh sách chương ở phía trên
    const chapterModal = document.getElementById('chapter-modal');
    const closeModalButton = document.getElementById('close-modal-btn');
    const modalChapterList = document.getElementById('modal-chapter-list');
    const progressBar = document.querySelector('.progress-bar');

    let currentChapterNumber = 1;
    let totalChapters = 0; // Sẽ được cập nhật từ mảng chapterTitles
    let storyBasePath = ''; // Sẽ được truyền từ HTML, ví dụ: 'legnaxe_part1'
    let currentLanguage = ''; // Biến mới để lưu trữ ngôn ngữ hiện tại

    // Bắt đầu: Chức năng chuyển đổi chế độ Sáng/Tối
    const themeToggleBtn = document.getElementById('theme-toggle-btn'); // Giả định có một nút với ID này trong HTML

    function setupThemeToggle() {
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        // Kiểm tra tùy chọn chủ đề đã lưu trong localStorage
        const savedTheme = localStorage.getItem('theme');
        // Nếu có chủ đề đã lưu, sử dụng nó. Nếu không, kiểm tra tùy chọn hệ thống của người dùng.
        const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.body.classList.toggle('dark', isDark);
        // Thêm trình lắng nghe sự kiện cho nút chuyển đổi
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark');
                localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
            });
        }
    }

    // Gọi hàm thiết lập chủ đề khi DOM được tải
    setupThemeToggle();
    // Kết thúc: Chức năng chuyển đổi chế độ Sáng/Tối

    // Định nghĩa danh sách tên chương dựa trên tài liệu đã cung cấp
    // Phần 1: Bí Mật Cuộc Đại Chiến Thiên Đàng (28 chương + Khúc Vĩ Thanh = 29 chương)
    const chapterTitlesPart1 = [
        { vi: "Bản Hòa Âm Vĩnh Cửu", en: "The Eternal Harmony" },
        { vi: "Lời Phán Từ Trời", en: "The Heavenly Decree" },
        { vi: "Những Tia Lửa Nổi Loạn", en: "Sparks of Rebellion" },
        { vi: "Những Tạo Vật Đầu Tiên", en: "The First Creations" },
        { vi: "Ánh Sáng Và Bóng Tối", en: "Light and Shadow" },
        { vi: "Lời Thì Thầm Của Con Rắn", en: "The Serpent's Whisper" },
        { vi: "Sự Rạn Nứt", en: "The Rift" },
        { vi: "Sự Ra Đời Của Eve", en: "The Birth of Eve" },
        { vi: "Những Bóng Tối Thì Thầm", en: "Whispering Shadows" },
        { vi: "Miếng Nếm Đầu Tiên", en: "The First Taste" },
        { vi: "Sự Sa Ngã", en: "The Fall" },
        { vi: "Sự Ra Đời Đầu Tiên", en: "The First Birth" },
        { vi: "Vết Nứt Đầu Tiên", en: "The First Crack" },
        { vi: "Dấu Ấn Của Cain", en: "The Mark of Cain" },
        { vi: "Di Sản Của Cain", en: "The Legacy of Cain" },
        { vi: "Sự Phán Xét Đầu Tiên", en: "The First Judgment" },
        { vi: "Cửa Lũ Mở Toang", en: "The Floodgates Open" },
        { vi: "Cuộc Chiến Ánh Sáng Vĩnh Cửu", en: "The Eternal Light War" },
        { vi: "Những Hạt Giống Của Sự Nổi Loạn", en: "Seeds of Rebellion" },
        { vi: "Dư Âm của Những Lựa Chọn", en: "Echoes of Choices" },
        { vi: "Sự Vỡ Nát của Tấm Màn", en: "The Shattering of the Veil" },
        { vi: "Bên Kia Tấm Màn", en: "Beyond the Veil" },
        { vi: "Sự Thật Bên Kia Tấm Màn", en: "The Truth Beyond the Veil" },
        { vi: "Cái Giá của Ánh Sáng", en: "The Price of Light" },
        { vi: "Phán Quyết và Sự Chia Cắt Vĩnh Viễn", en: "Judgment and Eternal Division" },
        { vi: "Bình Minh Cuối Cùng", en: "The Last Dawn" },
        { vi: "Ranh Giới Vĩnh Hằng", en: "The Eternal Boundary" },
        { vi: "Ngã Tư Đường Vĩnh Cửu", en: "The Eternal Crossroads" },
        { vi: "Khúc Vĩ Thanh: Mưa Sao Băng Linh Hồn", en: "Epilogue: Soul Meteor Shower" } // Đây là chương cuối cùng của Phần 1 (Chương 29)
    ];

    // Phần 2: Heavenly, Human’s Heart (30 chương) - Giữ nguyên như trước nếu không có thông tin mới
    const chapterTitlesPart2 = [
        { vi: "Lời Từ Biệt Trên Ngai Vàng", en: "Farewell on the Throne" },
        { vi: "Hậu Quả Thiên Đàng", en: "The Heavenly Aftermath" },
        { vi: "Giáng Trần & Thiên Đàng Hậu Biến Cố", en: "Descent & Post-Event Heaven" },
        { vi: "Tiếng Gọi Của Lòng Trắc Ẩn", en: "The Call of Compassion" },
        { vi: "Giữa Dòng Người & Góc Khuất Tâm Hồn", en: "Amongst Humanity & Soul's Hidden Corner" },
        { vi: "Bóng Tối Từ Thiện", en: "Benevolent Darkness" },
        { vi: "Lựa Chọn Trong Màn Đêm", en: "Choices in the Dark" },
        { vi: "Bước Vào Thế Giới Mới", en: "Stepping into a New World" },
        { vi: "Những Bài Học Đầu Tiên", en: "The First Lessons" },
        { vi: "Chuyến Đi Đến Los Angeles", en: "Journey to Los Angeles" },
        { vi: "Những Cuộc Gặp Gỡ Đầu Tiên", en: "The First Encounters" },
        { vi: "Màn Sương Nghi Hoặc", en: "The Mist of Doubt" },
        { vi: "Bóng Hình Quá Khứ", en: "Shadows of the Past" },
        { vi: "Lời Đề Nghị Của Ác Quỷ", en: "The Devil's Proposition" },
        { vi: "Tiếng Vọng Từ Thiên Đàng", en: "Echoes from Heaven" },
        { vi: "Quyền Năng Thức Tỉnh", en: "Awakening Power" },
        { vi: "Cuộn Giấy Cổ Xưa", en: "The Ancient Scroll" },
        { vi: "Bài Học Đầu Tiên và Bão Tố Thiên Đàng", en: "First Lesson and Heavenly Storm" },
        { vi: "Giữa Hai Làn Đạn", en: "Caught Between Two Fires" },
        { vi: "Thử Nghiệm Niềm Tin", en: "A Test of Faith" },
        { vi: "Lằn Ranh Mong Manh", en: "The Thin Line" },
        { vi: "Tiếng Gọi Bị Chặn", en: "The Blocked Call" },
        { vi: "Những Bước Đi Đầu Tiên Trong Bóng Tối", en: "First Steps in Darkness" },
        { vi: "Những Con Đường Trong Bóng Tối", en: "Paths in the Shadows" },
        { vi: "Thăm Dò Vực Thẳm", en: "Probing the Abyss" },
        { vi: "Nước Cờ Thực Tế", en: "The Real Game" },
        { vi: "Dự Án Đặc Biệt", en: "The Special Project" },
        { vi: "Hành Trình Đến Tâm Bão", en: "Journey to the Eye of the Storm" },
        { vi: "Bí Mật Bị Chôn Vùi", en: "The Buried Secret" },
        { vi: "Định Mệnh Chờ Đợi", en: "Destiny Awaits" }
    ];

    // Gộp tất cả các chương lại. Cần điều chỉnh nếu có nhiều phần truyện khác nhau.
    // Hiện tại, giả định storyBasePath sẽ cho biết đang ở phần nào.
    let allChapterTitles = [];

    // Hàm tải nội dung chương từ JSON
    async function fetchChapterContent(storyPath, chapterNum) {
        let chapterFileName;
        // Logic để xác định tên file JSON:
        // Nếu chapterNum là chương cuối cùng (tức là Epilogue) của phần 1, tải epilogue.json
        // Ngược lại, tải chapter_XX.json
        if (chapterNum === totalChapters && storyPath === 'legnaxe_part1') { // Chỉ phần 1 có file epilogue riêng biệt
            chapterFileName = `epilogue.json`; // Tên file JSON cho Epilogue, không có hậu tố ngôn ngữ
        } else {
            chapterFileName = `chapter_${String(chapterNum).padStart(2, '0')}.json`; // Không có hậu tố ngôn ngữ
        }

        const filePath = `/data/novels/${storyPath}/${chapterFileName}`;
        console.log(`Đang cố gắng tải chương: ${filePath}`); // Debug log
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                // Cung cấp thông báo lỗi chi tiết hơn
                const errorMessage = `Không thể tải chương: ${chapterFileName}. Trạng thái: ${response.status} - ${response.statusText}. Vui lòng đảm bảo tệp tồn tại và có thể truy cập.`;
                console.error(`Lỗi tải: ${errorMessage}`); // Debug log
                throw new Error(errorMessage);
            }
            const data = await response.json();
            console.log(`Đã tải dữ liệu chương thành công cho ${chapterFileName}:`, data); // Debug log
            return data;
        } catch (error) {
            console.error('Lỗi khi tải nội dung chương:', error);
            dynamicChapterContent.innerHTML = `<p class="text-red-600 dark:text-red-400 text-center">Lỗi khi tải chương: ${error.message}. Vui lòng kiểm tra lại cấu trúc tệp JSON hoặc đường dẫn.</p>`;
            return null;
        }
    }

    // Hàm hiển thị nội dung chương
    function renderChapter(chapterData, lang) {
        if (!chapterData) {
            console.warn('Không có dữ liệu chương để hiển thị.'); // Debug log
            return;
        }

        // Sử dụng ngôn ngữ được truyền vào để chọn đúng trường tiêu đề và nội dung
        const titleKey = `title_${lang}`;
        const contentKey = `content_${lang}`;

        // Kiểm tra xem các trường ngôn ngữ có tồn tại không
        const chapterTitle = chapterData[titleKey] || chapterData.title_en || 'Tiêu đề chương không tìm thấy';
        const chapterContent = chapterData[contentKey] || chapterData.content_en || '<p>Nội dung chương không tìm thấy cho ngôn ngữ này.</p>';


        dynamicChapterContent.innerHTML = `
            <h3 class="text-2xl sm:text-3xl font-semibold mb-6 mt-4 text-black dark:text-white border-b pb-3 border-gray-200 dark:border-gray-700">
                ${chapterTitle}
            </h3>
            <div class="prose prose-lg dark:prose-invert max-w-none">
                ${chapterContent}
            </div>
        `;
        // Cập nhật tiêu đề tài liệu
        document.title = `${chapterTitle} - LEGNAXE`;
        console.log(`Đã hiển thị chương ${currentChapterNumber}: ${chapterTitle}`); // Debug log

        // Cuộn lên đầu nội dung chương sau khi tải
        const storyContentWrapper = document.querySelector('.story-content-wrapper');
        if (storyContentWrapper) {
            window.scrollTo({
                top: storyContentWrapper.offsetTop - (document.getElementById('navbar')?.offsetHeight || 0) - 20,
                behavior: 'smooth'
            });
        }
    }

    // Hàm cập nhật trạng thái nút điều hướng
    function updateNavigationButtons() {
        prevButton.disabled = currentChapterNumber <= 1;
        nextButton.disabled = currentChapterNumber >= totalChapters;
        console.log(`Nút điều hướng đã cập nhật: Nút trước bị vô hiệu hóa=${prevButton.disabled}, Nút tiếp theo bị vô hiệu hóa=${nextButton.disabled}`); // Debug log

        // Đánh dấu chương hiện tại trong danh sách modal
        modalChapterList.querySelectorAll('.modal-chapter-link').forEach(link => {
            const chapterId = link.dataset.chapterId;
            let linkChapterNum;
            if (chapterId === 'epilogue') {
                linkChapterNum = totalChapters; // Ánh xạ epilogue tới số chương cuối cùng
            } else {
                linkChapterNum = parseInt(chapterId.replace('chapter-', ''));
            }

            if (linkChapterNum === currentChapterNumber) {
                link.classList.add('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-200');
            } else {
                link.classList.remove('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-200');
            }
        });
    }

    // Hàm điều hướng đến một chương cụ thể
    async function navigateToChapter(chapterNum, lang) {
        console.log(`Đang điều hướng đến chương: ${chapterNum}, Ngôn ngữ: ${lang}`); // Debug log
        const chapterData = await fetchChapterContent(storyBasePath, chapterNum); // Không truyền lang vào đây nữa
        if (chapterData) {
            currentChapterNumber = chapterNum;
            renderChapter(chapterData, lang); // Truyền lang vào renderChapter để chọn nội dung
            updateNavigationButtons();
            // Cập nhật URL hash, sử dụng chapter_id từ dữ liệu JSON
            let newHash = `chapter-${chapterNum}`;
            if (currentChapterNumber === totalChapters && storyBasePath === 'legnaxe_part1') {
                newHash = 'epilogue'; // Đảm bảo hash là 'epilogue' cho chương cuối cùng của phần 1
            }
            window.location.hash = newHash;
            updateProgressBar(); // Cập nhật thanh tiến độ sau khi nội dung được hiển thị
        }
    }

    // Hàm cập nhật thanh tiến độ đọc
    function updateProgressBar() {
        const chapterContent = dynamicChapterContent.querySelector('.prose');
        if (!chapterContent) {
            progressBar.style.width = '0%';
            return;
        }

        const chapterRect = chapterContent.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Tính toán phần nội dung chương hiển thị trong khung nhìn
        const visibleTop = Math.max(0, chapterRect.top);
        const visibleBottom = Math.min(viewportHeight, chapterRect.bottom);
        const visibleHeight = visibleBottom - visibleTop;

        let progress = 0;
        if (chapterRect.height > 0) {
            // Tính toán tiến độ dựa trên phần đã cuộn của chương
            const scrolledHeight = Math.max(0, -chapterRect.top); // Phần chương nằm phía trên đầu khung nhìn
            progress = (scrolledHeight / (chapterRect.height - viewportHeight + 100)) * 100; // +100 để tránh chia cho 0 nếu chương rất ngắn
        }
        
        // Đảm bảo tiến độ không vượt quá 100% hoặc dưới 0%
        progress = Math.min(100, Math.max(0, progress));
        progressBar.style.width = `${progress}%`;
        // console.log(`Tiến độ: ${progress.toFixed(2)}%`); // Debug log
    }

    // Hàm đóng modal
    function closeModal() {
        console.log('Đang đóng modal'); // Debug log
        chapterModal.classList.remove('modal-active');
        setTimeout(() => {
            // Đảm bảo display: none chỉ được áp dụng khi transition đã hoàn tất
            if (!chapterModal.classList.contains('modal-active')) {
                chapterModal.style.display = 'none';
            }
        }, 300); // Phù hợp với transition duration trong CSS
        document.body.style.overflow = ''; // Khôi phục cuộn body
    }

    // Khởi tạo Chapter Loader
    window.initializeChapterLoader = function(path, total, lang) { // Đã thêm lại tham số 'total'
        storyBasePath = path;
        currentLanguage = lang; // Lưu trữ ngôn ngữ hiện tại
        console.log(`Chapter Loader đã khởi tạo: Đường dẫn truyện = ${storyBasePath}, Tổng số chương = ${totalChapters}, Ngôn ngữ = ${currentLanguage}`); // Debug log

        // Xác định tổng số chương và danh sách tên chương dựa trên storyBasePath
        if (storyBasePath === 'legnaxe_part1') {
            allChapterTitles = chapterTitlesPart1;
        } else if (storyBasePath === 'legnaxe_part2') {
            allChapterTitles = chapterTitlesPart2;
        } else {
            allChapterTitles = []; // Mặc định nếu không khớp
        }
        totalChapters = allChapterTitles.length;


        // Xóa danh sách chương cũ trong modal và tạo mới
        modalChapterList.innerHTML = '';
        allChapterTitles.forEach((titleObj, index) => { // Đã đổi tên biến thành titleObj
            const chapterNum = index + 1;
            const chapterId = (chapterNum === totalChapters && storyBasePath === 'legnaxe_part1') ? 'epilogue' : `chapter-${chapterNum}`;
            const chapterLink = document.createElement('a');
            chapterLink.href = `#${chapterId}`;
            chapterLink.classList.add(
                'modal-chapter-link',
                'block',
                'py-2',
                'px-4',
                'rounded-lg',
                'hover:bg-gray-100',
                'dark:hover:bg-gray-700',
                'transition-colors',
                'duration-200',
                'text-black',
                'dark:text-white'
            );
            // Sử dụng tên chương từ mảng allChapterTitles
            chapterLink.textContent = `${lang === 'vi' ? 'Chương' : 'Chapter'} ${chapterNum}: ${titleObj[lang] || titleObj.en}`; // Chọn tiêu đề theo ngôn ngữ hoặc fallback về tiếng Anh
            chapterLink.dataset.chapterId = chapterId; // Đặt data-chapter-id để dễ dàng tra cứu
            modalChapterList.appendChild(chapterLink);
        });


        // Lấy chương từ URL hash hoặc mặc định là chương 1
        const hash = window.location.hash.substring(1);
        let initialChapter = 1;
        if (hash) {
            const match = hash.match(/chapter-(\d+)/);
            if (match && parseInt(match[1]) >= 1 && parseInt(match[1]) < totalChapters) { // chapter-1 đến chapter-(totalChapters-1)
                initialChapter = parseInt(match[1]);
            } else if (hash === 'epilogue' && storyBasePath === 'legnaxe_part1') {
                initialChapter = totalChapters; // Ánh xạ epilogue tới số chương cuối cùng của phần 1
            }
        }
        navigateToChapter(initialChapter, currentLanguage); // Truyền ngôn ngữ khi khởi tạo

        // Event listeners cho nút điều hướng
        prevButton?.addEventListener('click', () => {
            console.log('Nút Previous đã được nhấp'); // Debug log
            if (currentChapterNumber > 1) {
                navigateToChapter(currentChapterNumber - 1, currentLanguage); // Truyền ngôn ngữ
            }
        });

        nextButton?.addEventListener('click', () => {
            console.log('Nút Next đã được nhấp'); // Debug log
            if (currentChapterNumber < totalChapters) {
                navigateToChapter(currentChapterNumber + 1, currentLanguage); // Truyền ngôn ngữ
            }
        });

        // Event listeners cho các nút modal danh sách chương
        listChapterButton?.addEventListener('click', () => {
            console.log('Nút List Chapters (dưới) đã được nhấp'); // Debug log
            chapterModal.style.display = 'flex'; // Đảm bảo hiển thị trước khi thêm lớp active
            setTimeout(() => {
                chapterModal.classList.add('modal-active');
            }, 10);
            document.body.style.overflow = 'hidden'; // Ngăn cuộn body khi modal mở
            updateNavigationButtons(); // Cập nhật highlight khi modal mở
        });

        listChapterButtonTop?.addEventListener('click', () => {
            console.log('Nút List Chapters (trên) đã được nhấp'); // Debug log
            chapterModal.style.display = 'flex'; // Đảm bảo hiển thị trước khi thêm lớp active
            setTimeout(() => {
                chapterModal.classList.add('modal-active');
            }, 10);
            document.body.style.overflow = 'hidden'; // Ngăn cuộn body khi modal mở
            updateNavigationButtons(); // Cập nhật highlight khi modal mở
        });

        closeModalButton?.addEventListener('click', closeModal);

        chapterModal?.addEventListener('click', (event) => {
            if (event.target === chapterModal) {
                closeModal();
            }
        });

        // Sử dụng ủy quyền sự kiện cho modalChapterList
        modalChapterList.addEventListener('click', (event) => {
            const link = event.target.closest('.modal-chapter-link');
            if (link) {
                event.preventDefault();
                const chapterId = link.getAttribute('data-chapter-id');
                let targetChapterNum;
                if (chapterId === 'epilogue') {
                    targetChapterNum = totalChapters;
                } else {
                    targetChapterNum = parseInt(chapterId.replace('chapter-', ''));
                }
                
                if (!isNaN(targetChapterNum) && targetChapterNum >= 1 && targetChapterNum <= totalChapters) {
                    navigateToChapter(targetChapterNum, currentLanguage); // Truyền ngôn ngữ
                }
                closeModal();
            }
        });

        // Cập nhật thanh tiến độ khi cuộn và thay đổi kích thước cửa sổ
        window.addEventListener('scroll', updateProgressBar);
        window.addEventListener('resize', updateProgressBar);

        // Xử lý thay đổi hash cho các liên kết chương trực tiếp
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            let targetChapter = 1;
            if (hash) {
                const match = hash.match(/chapter-(\d+)/);
                if (match) {
                    targetChapter = parseInt(match[1]);
                } else if (hash === 'epilogue' && storyBasePath === 'legnaxe_part1') {
                    targetChapter = totalChapters;
                }
            }
            if (targetChapter !== currentChapterNumber) {
                navigateToChapter(targetChapter, currentLanguage); // Truyền ngôn ngữ
            }
        });

        // Cập nhật ban đầu trạng thái nút điều hướng và thanh tiến độ
        updateNavigationButtons();
        updateProgressBar();
    };
});
// Script này được thiết kế để tải và hiển thị động các chương của một câu chuyện từ các tệp JSON.
