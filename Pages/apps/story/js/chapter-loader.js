// js/chapter-loader.js

/**
 * Hàm khởi tạo bộ tải chương.
 * @param {string} storyPath - Tên thư mục chứa các tệp JSON (ví dụ: 'legnaxe_part1').
 * @param {number} totalChapters - Tổng số chương (không bao gồm epilogue/after-credit).
 * @param {boolean} hasSpecialChapter - Có hay không có chương đặc biệt (epilogue/after-credit).
 * @param {string} lang - Ngôn ngữ hiện tại ('en' hoặc 'vi').
 */
function initializeChapterLoader(storyPath, totalChapters, hasSpecialChapter, lang = 'vi') {
    // Biến lưu trữ trạng thái hiện tại
    let currentChapterIndex = 0; // Chỉ số chương hiện tại trong chapterIds
    const chapterIds = []; // Mảng lưu trữ ID của các chương
    const isPart1 = storyPath.includes('part1');

    // Biến cho Text-to-Speech (TTS)
    let isSpeaking = false;
    let synth = null;
    let currentUtterance = null;
    let currentChapterData = null;
    let vietnameseVoice = null; // Biến lưu giọng đọc tiếng Việt được chọn
    const speechSupported = 'speechSynthesis' in window;
    
    // Lấy các phần tử DOM cần thiết
    const dynamicContent = document.getElementById('dynamic-chapter-content');
    const prevButtons = [
        document.getElementById('prev-chapter-btn'),
        document.getElementById('mobile-prev-chapter-btn'),
    ].filter(Boolean);
    const nextButtons = [
        document.getElementById('next-chapter-btn'),
        document.getElementById('mobile-next-chapter-btn'),
    ].filter(Boolean);
    const listButtons = [
        document.getElementById('list-chapter-btn'),
        document.getElementById('mobile-list-chapter-btn'),
    ].filter(Boolean);
    const chapterModal = document.getElementById('chapter-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalList = document.getElementById('modal-chapter-list');
    const progressBar = document.querySelector('.progress-bar');
    const ttsControls = [
        {
            button: document.getElementById('tts-toggle-btn'),
            icon: document.getElementById('tts-icon'),
            text: document.getElementById('tts-text'),
        },
        {
            button: document.getElementById('mobile-tts-toggle-btn'),
            icon: document.getElementById('mobile-tts-icon'),
            text: document.getElementById('mobile-tts-text'),
        },
    ].filter((control) => control.button && control.icon && control.text);

    function escapeHtml(text) {
        return String(text ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function stripHtml(text) {
        return String(text ?? '').replace(/<[^>]*>/g, ' ');
    }

    function truncateText(text, maxLength = 150) {
        const normalized = String(text ?? '').replace(/\s+/g, ' ').trim();
        if (normalized.length <= maxLength) {
            return normalized;
        }

        return `${normalized.slice(0, maxLength).trimEnd()}...`;
    }

    function getChapterNumberFromId(chapterId = '') {
        if (!chapterId.startsWith('chapter-')) {
            return 0;
        }

        return Number.parseInt(chapterId.split('-')[1], 10) || 0;
    }

    function getLeadPrefix(chapterNumber) {
        const viPrefixes = [
            'Mở ra với',
            'Tiếp nối bằng',
            'Tập trung vào',
            'Đẩy câu chuyện tới',
            'Khắc họa rõ',
            'Làm nổi bật',
        ];
        const enPrefixes = [
            'Opens with',
            'Continues with',
            'Focuses on',
            'Pushes the story toward',
            'Highlights',
            'Brings forward',
        ];
        const prefixes = lang === 'vi' ? viPrefixes : enPrefixes;
        const index = chapterNumber > 0 ? (chapterNumber - 1) % prefixes.length : 0;
        return prefixes[index];
    }

    function buildChapterIntro(chapterNumber, bodyLines) {
        const summarySource = bodyLines.find(line => {
            const normalized = line.trim();
            return normalized
                && !/^\[[^\]]+\]$/.test(normalized)
                && !/^(I|II|III|IV|V|VI|VII|VIII|IX|X)\.\s+/i.test(normalized)
                && !/^(chương|chapter)\s+\d+/i.test(normalized);
        }) || '';

        if (!summarySource) {
            return '';
        }

        return `${getLeadPrefix(chapterNumber)} ${truncateText(summarySource)}`;
    }

    function escapeRegExp(value) {
        return String(value ?? '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function splitDisplayTitle(title, label) {
        const safeTitle = String(title ?? '').trim();
        const safeLabel = String(label ?? '').trim();
        if (!safeTitle || !safeLabel) {
            return {
                fullTitle: safeTitle || safeLabel,
                displayTitle: safeTitle || safeLabel,
                listTitle: safeTitle || safeLabel,
            };
        }

        const prefixPattern = new RegExp(`^${escapeRegExp(safeLabel)}\\s*[:\\-–]\\s*`, 'i');
        if (prefixPattern.test(safeTitle)) {
            const displayTitle = safeTitle.replace(prefixPattern, '').trim();
            return {
                fullTitle: safeTitle,
                displayTitle,
                listTitle: `${safeLabel} - ${displayTitle}`,
            };
        }

        return {
            fullTitle: `${safeLabel}: ${safeTitle}`,
            displayTitle: safeTitle,
            listTitle: `${safeLabel} - ${safeTitle}`,
        };
    }

    function getChapterBaseData(chapterData) {
        const rawTitle = chapterData?.[`title_${lang}`]
            || chapterData?.title
            || chapterData?.title_vi
            || chapterData?.title_en
            || '';
        const rawContent = chapterData?.[`content_${lang}`]
            || chapterData?.content
            || chapterData?.content_vi
            || chapterData?.content_en
            || '';

        return {
            rawTitle: String(rawTitle).trim(),
            rawContent: String(rawContent).trim(),
        };
    }

    function parseChapterData(chapterData, fallbackChapterId = '') {
        const { rawTitle, rawContent } = getChapterBaseData(chapterData);
        const fallbackLabel = fallbackChapterId && fallbackChapterId.startsWith('chapter-')
            ? `${lang === 'vi' ? 'Chương' : 'Chapter'} ${fallbackChapterId.split('-')[1]}`
            : (lang === 'vi' ? 'Chương truyện' : 'Story chapter');

        const containsHtml = /<[^>]+>/.test(rawContent);
        if (containsHtml) {
            const safeTitle = rawTitle || fallbackLabel;
            return {
                label: fallbackLabel,
                title: safeTitle,
                listTitle: `${fallbackLabel} - ${safeTitle}`,
                bodyText: stripHtml(rawContent).replace(/\s+/g, ' ').trim(),
                bodyHtml: rawContent,
            };
        }

        const lines = rawContent
            .replace(/\r\n/g, '\n')
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean);

        let label = fallbackLabel;
        let title = rawTitle || '';
        let bodyLines = [...lines];
        const chapterNumber = getChapterNumberFromId(fallbackChapterId);

        if (lines.length > 0 && /^(chương|chapter)\s+\d+/i.test(lines[0])) {
            label = lines[0];
            bodyLines = lines.slice(1);
        }

        if (!title && bodyLines.length > 0) {
            title = bodyLines[0];
            bodyLines = bodyLines.slice(1);
        }

        if (bodyLines[0] && /^\[[^\]]+\]$/.test(bodyLines[0])) {
            bodyLines = bodyLines.slice(1);
        }

        if (title && bodyLines[0] && bodyLines[0].toLowerCase() === title.toLowerCase()) {
            bodyLines = bodyLines.slice(1);
        }

        const finalTitle = title || fallbackLabel;
        const normalizedTitle = splitDisplayTitle(finalTitle, label);
        const intro = buildChapterIntro(chapterNumber, bodyLines);
        const bodyText = bodyLines.join('\n\n').trim();
        const bodyHtml = bodyLines.length
            ? bodyLines.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')
            : `<p class="text-gray-500 dark:text-gray-400">${lang === 'vi' ? 'Chưa có nội dung chương.' : 'No chapter content available.'}</p>`;

        return {
            label,
            title: normalizedTitle.displayTitle,
            fullTitle: normalizedTitle.fullTitle,
            intro,
            listTitle: normalizedTitle.listTitle,
            bodyText,
            bodyHtml,
        };
    }

    // Khởi tạo Speech Synthesis API nếu được hỗ trợ
    if (speechSupported) {
        synth = window.speechSynthesis;
        // Bắt đầu quá trình tìm kiếm giọng đọc tốt nhất
        // Phải đảm bảo voices đã tải xong (sử dụng sự kiện onvoiceschanged)
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = setVietnameseVoice;
        }
        setVietnameseVoice(); // Gọi lần đầu, phòng trường hợp voices đã tải sẵn
    }

    /**
     * Tìm và thiết lập giọng đọc tiếng Việt tốt nhất (ưu tiên Google/Microsoft).
     */
    function setVietnameseVoice() {
        if (!synth) return;
        
        const voices = synth.getVoices();
        
        // 1. Giọng ưu tiên (thường là giọng máy chủ của Google/Microsoft)
        const preferredVoices = [
            "Google Vietnamese", // Giọng phổ biến và hay của Google Chrome
            "Microsoft An",      // Giọng của Microsoft Edge
            "Microsoft Hoai"     // Giọng của Microsoft Edge
        ];
        
        // 2. Tìm kiếm giọng phù hợp
        vietnameseVoice = voices.find(voice => 
            voice.lang === 'vi-VN' && preferredVoices.some(name => voice.name.includes(name))
        );
        
        // 3. Nếu không tìm thấy giọng ưu tiên, chọn giọng vi-VN đầu tiên
        if (!vietnameseVoice) {
            vietnameseVoice = voices.find(voice => voice.lang === 'vi-VN');
        }

        if (vietnameseVoice) {
            console.log("Đã chọn giọng đọc Tiếng Việt:", vietnameseVoice.name);
        } else {
            console.warn("Không tìm thấy giọng đọc Tiếng Việt cụ thể. Sẽ sử dụng giọng mặc định.");
        }
    }


    // Thêm hàm đóng modal vào phạm vi toàn cục để các listeners khác có thể gọi
    function closeModal() {
        chapterModal.classList.remove('modal-active');
        setTimeout(() => {
            if (!chapterModal.classList.contains('modal-active')) {
                chapterModal.style.display = 'none';
            }
        }, 300);
        document.body.style.overflow = '';
    }
    window.closeModal = closeModal;


    // 1. Khởi tạo danh sách ID và danh sách hiển thị (modal)
    function initChapterList() {
        modalList.innerHTML = ''; // Xóa nội dung cũ
        
        // Thêm các chương chính
        for (let i = 1; i <= totalChapters; i++) {
            const chapterId = `chapter-${i}`;
            chapterIds.push(chapterId);
            
            const chapterTitle = lang === 'en' ? `Chapter ${i}` : `Chương ${i}`;
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${chapterId}`;
            link.dataset.chapterId = chapterId;
            // Classname cho link trong modal
            link.className = 'modal-chapter-link block p-3 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors';
            link.textContent = chapterTitle; // Tên chương sẽ được cập nhật sau khi tải JSON đầu tiên
            listItem.appendChild(link);
            modalList.appendChild(listItem);
        }

        // Thêm epilogue/after-credit nếu có
        if (hasSpecialChapter) {
            // Xác định tên file và tiêu đề đặc biệt
            const specialId = isPart1 ? 'epilogue' : 'after-credit';
            const specialTitle = isPart1 
                               ? (lang === 'en' ? 'Epilogue: The Soul Meteor Shower' : 'Khúc Vĩ Thanh: Mưa Sao Băng Linh Hồn')
                               : (lang === 'en' ? 'After-Credit: Echoes from the Abyss' : 'Phần Sau: Tiếng Vọng Từ Vực Thẳm');
            
            chapterIds.push(specialId);
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${specialId}`;
            link.dataset.chapterId = specialId;
            link.className = 'modal-chapter-link block p-3 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold';
            link.textContent = specialTitle;
            listItem.appendChild(link);
            modalList.appendChild(listItem);
        }

        // Tải tiêu đề cho tất cả các chương
        loadAllChapterTitles();
    }

    // 2. Hàm tải tiêu đề cho tất cả các chương để điền vào modal
    async function loadAllChapterTitles() {
        const modalLinks = modalList.querySelectorAll('.modal-chapter-link');
        
        for (let i = 0; i < chapterIds.length; i++) {
            const chapterId = chapterIds[i];
            const modalLink = modalLinks[i];
            let fileName = '';
            if (chapterId === 'epilogue' || chapterId === 'after-credit') {
                fileName = isPart1 ? 'epilogue.json' : 'after-credit.json';
            } else {
                const num = chapterId.split('-')[1];
                fileName = `chapter_${num.padStart(2, '0')}.json`;
            }
            try {
                const path = `../data/novels/${storyPath}/${fileName}`;
                const response = await fetch(path);
                if (response.ok) {
                    const data = await response.json();
                    const parsed = parseChapterData(data, chapterId);
                    modalLink.innerHTML = `
                        <span class="block text-sm font-semibold text-slate-900 dark:text-slate-100">${escapeHtml(parsed.listTitle)}</span>
                        ${parsed.intro ? `<span class="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">${escapeHtml(parsed.intro)}</span>` : ''}
                    `;
                } else {
                    console.error(`Error loading title (404) for ${path}`);
                }
            } catch (error) {
                modalLink.textContent = modalLink.textContent + ` (Lỗi tải)`;
                console.error(`Error loading title for ${chapterId}:`, error);
            }
        }
    }


    // 3. Hàm lấy nội dung chương từ JSON
    async function fetchChapterContent(chapterId) {
        // Hiển thị loading state
        dynamicContent.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 p-8">Đang tải nội dung chương...</p>`;

        try {
            // Xác định tên tệp JSON
            let fileName = '';
            if (chapterId === 'epilogue') {
                fileName = 'epilogue.json';
            } else if (chapterId === 'after-credit') {
                 fileName = 'after-credit.json';
            } else {
                const num = chapterId.split('-')[1];
                fileName = `chapter_${num.padStart(2, '0')}.json`; 
            }

            // FIX: Đường dẫn tương đối từ HTML (novels/) đến JSON (data/novels/)
            const path = `../data/novels/${storyPath}/${fileName}`;

            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Could not load chapter file (${response.status}): ${path}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching chapter content:', error);
            dynamicContent.innerHTML = `<p class="text-red-500 dark:text-red-400 p-4 text-center">Lỗi: Không thể tải nội dung chương ${chapterId}. Vui lòng kiểm tra lại đường dẫn file JSON.</p>`;
            return null;
        }
    }

    // 4. Hàm hiển thị nội dung chương
    function renderChapter(chapterData, chapterId = '') {
        if (!chapterData) {
            dynamicContent.innerHTML = '<p class="text-red-500 dark:text-red-400">Không thể hiển thị nội dung chương.</p>';
            return;
        }

        // Lưu trữ dữ liệu chương hiện tại cho TTS
        currentChapterData = chapterData;
        const parsed = parseChapterData(chapterData, chapterId || chapterIds[currentChapterIndex]);
        const partNumber = storyPath.includes('part1') ? '1' : '2';
        const contentHtml = `
            <article class="chapter-article">
                <header class="chapter-header mb-8 border-b border-slate-200 pb-6 dark:border-slate-700">
                    <p class="chapter-label text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">${escapeHtml(parsed.label)}</p>
                    <h2 class="chapter-title mt-3 text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">${escapeHtml(parsed.title)}</h2>
                    ${parsed.intro ? `<p class="chapter-intro mt-4 max-w-3xl text-sm sm:text-base leading-7 text-slate-600 dark:text-slate-300">${escapeHtml(parsed.intro)}</p>` : ''}
                </header>
                <div class="prose chapter-body dark:prose-invert">
                    ${parsed.bodyHtml}
                </div>
            </article>
        `;
        dynamicContent.innerHTML = contentHtml;
        document.title = `${parsed.fullTitle} - LEGNAXE Part ${partNumber}`;
        const mainElement = document.querySelector('main');
        const headerOffset = document.getElementById('navbar') ? document.getElementById('navbar').offsetHeight : 80;
        window.scrollTo({ top: mainElement.offsetTop - headerOffset, behavior: 'smooth' });
    }

    // --- TTS LOGIC ---
    
    // 5a. Dừng đọc
    function stopSpeaking() {
        if (synth && synth.speaking) {
            synth.cancel();
            isSpeaking = false;
            updateSpeechButton();
        }
    }

    // 5b. Cập nhật giao diện nút TTS
    function updateSpeechButton() {
        if (!ttsControls.length) return;

        if (!speechSupported) {
             ttsControls.forEach(({ button, icon, text }) => {
                 button.disabled = true;
                 button.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'bg-indigo-600', 'hover:bg-indigo-700');
                 button.classList.add('bg-gray-400', 'cursor-not-allowed', 'dark:bg-gray-600');
                 icon.className = 'fas fa-volume-off';
                 text.textContent = (lang === 'vi' ? 'Không hỗ trợ' : 'Not Supported');
             });
             return;
        }

        ttsControls.forEach(({ button, icon, text }) => {
            button.disabled = false;
            button.classList.remove('bg-gray-400', 'cursor-not-allowed', 'dark:bg-gray-600');
            button.classList.add('bg-indigo-600', 'hover:bg-indigo-700', 'dark:bg-indigo-700', 'dark:hover:bg-indigo-800');

            if (isSpeaking) {
                icon.className = 'fas fa-pause';
                text.textContent = (lang === 'vi' ? 'Tạm dừng' : 'Pause');
            } else {
                icon.className = 'fas fa-play';
                text.textContent = (lang === 'vi' ? 'Nghe truyện' : 'Read Story');
            }
        });
    }
    
    // 5c. Chức năng chính: Bật/Tắt TTS
    function toggleSpeech() {
        if (!speechSupported || !currentChapterData) return;

        if (isSpeaking) {
            // Nếu đang nói, thì dừng
            stopSpeaking();
        } else {
            // 1. Dừng bất kỳ giọng nói nào đang diễn ra (nếu có)
            if (synth.speaking) {
                 synth.cancel();
            }

            // 2. Lấy nội dung
            const parsed = parseChapterData(currentChapterData, chapterIds[currentChapterIndex]);
            const plainContent = parsed.bodyText.replace(/\s{2,}/g, ' ').trim();
            const textToSpeak = `${parsed.label}. ${parsed.title}. ${plainContent}`;

            // 3. Tạo Utterance
            currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
            
            // 4. Thiết lập ngôn ngữ và giọng đọc
            currentUtterance.lang = (lang === 'vi' ? 'vi-VN' : 'en-US');
            currentUtterance.rate = 0.9; // Tốc độ nói
            
            // Gán giọng đọc tiếng Việt đã tìm thấy (nếu có)
            if (lang === 'vi' && vietnameseVoice) {
                currentUtterance.voice = vietnameseVoice;
            } else if (lang === 'en') {
                // Tùy chọn: Chọn giọng English cụ thể nếu cần, tạm thời để API tự chọn giọng EN
            }


            // 5. Callbacks
            currentUtterance.onstart = () => {
                isSpeaking = true;
                updateSpeechButton();
            };

            currentUtterance.onend = () => {
                isSpeaking = false;
                updateSpeechButton();
            };

            currentUtterance.onerror = (event) => {
                console.error('Speech Synthesis Error:', event.error);
                isSpeaking = false;
                updateSpeechButton();
            };

            // 6. Bắt đầu đọc
            synth.speak(currentUtterance);
        }
    }


    // 6. Hàm điều hướng chính
    async function navigateToChapter(chapterId) {
        // Dừng TTS trước khi tải chương mới
        stopSpeaking();
        
        const chapterData = await fetchChapterContent(chapterId);
        if (chapterData) {
            currentChapterIndex = chapterIds.indexOf(chapterId);
            renderChapter(chapterData, chapterId);
            
            // Cập nhật chỉ số chương hiện tại và trạng thái nút
            updateNavigationButtons();
            
            // Cập nhật URL hash
            if (window.location.hash.substring(1) !== chapterId) {
                window.location.hash = chapterId;
            }
            
            // Cập nhật thanh tiến trình đọc
            updateProgressBar();
        }
        
        // Cập nhật lại nút TTS sau khi chương mới được tải
        updateSpeechButton();
    }

    // 7. Hàm cập nhật trạng thái nút điều hướng
    function updateNavigationButtons() {
        const prevDisabled = currentChapterIndex <= 0;
        const nextDisabled = currentChapterIndex >= chapterIds.length - 1;

        prevButtons.forEach((button) => {
            button.disabled = prevDisabled;
            button.classList.toggle('opacity-50', prevDisabled);
        });
        nextButtons.forEach((button) => {
            button.disabled = nextDisabled;
            button.classList.toggle('opacity-50', nextDisabled);
        });
    }
    
    // 8. Hàm cập nhật thanh tiến trình đọc
    function updateProgressBar() {
        if (progressBar && dynamicContent.firstElementChild) {
            const chapterContent = dynamicContent.querySelector('.prose');
            if (!chapterContent) return;

            const contentHeight = chapterContent.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Lấy vị trí cuộn so với phần tử cha (dynamicContent)
            const scrollTop = window.pageYOffset;
            const contentTop = dynamicContent.offsetTop - (document.getElementById('navbar')?.offsetHeight || 80);

            // Tính toán mức độ cuộn (0% khi bắt đầu, 100% khi kết thúc)
            // Lấy 80% chiều cao cửa sổ để tạo điểm dừng (không cần cuộn hết màn hình)
            const scrollDepth = scrollTop - contentTop + (windowHeight * 0.8);
            
            const progress = Math.min(100, Math.max(0, (scrollDepth / contentHeight) * 100));

            // Chỉ cần tính toán dựa trên số chương đã hoàn thành
            const chapterCompletion = (currentChapterIndex / chapterIds.length) * 100;

            // Kết hợp tiến độ đọc chương (chapterCompletion) và tiến độ cuộn (progress)
            // Đây là phần phức tạp, chúng ta sẽ chỉ dùng tiến độ chương đơn giản để tránh phức tạp hóa
            const overallProgress = ((currentChapterIndex + 1) / chapterIds.length) * 100;
            progressBar.style.width = `${overallProgress}%`;
        }
    }

    // 9. Gắn sự kiện cho các nút điều hướng và modal
    
    // Gắn sự kiện cho nút Trước/Sau
    prevButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (currentChapterIndex > 0) {
                navigateToChapter(chapterIds[currentChapterIndex - 1]);
            }
        });
    });

    nextButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (currentChapterIndex < chapterIds.length - 1) {
                navigateToChapter(chapterIds[currentChapterIndex + 1]);
            }
        });
    });

    // Gắn sự kiện mở modal
    listButtons.forEach((button) => {
        button.addEventListener('click', () => {
            chapterModal.style.display = 'flex';
            setTimeout(() => {
                chapterModal.classList.add('modal-active');
            }, 10);
            document.body.style.overflow = 'hidden';
        });
    });

    // Gắn sự kiện đóng modal
    closeModalBtn.addEventListener('click', () => closeModal());
    chapterModal.addEventListener('click', (event) => {
        if (event.target === chapterModal) {
            closeModal();
        }
    });
    
    // Gắn sự kiện cho nút TTS
    ttsControls.forEach(({ button }) => {
        button.addEventListener('click', toggleSpeech);
    });
    
    // Gắn sự kiện cho các liên kết trong modal (sử dụng delegation)
    modalList.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && event.target.classList.contains('modal-chapter-link')) {
            event.preventDefault();
            const chapterId = event.target.dataset.chapterId;
            navigateToChapter(chapterId);
            closeModal();
        }
    });
    
    // Khởi tạo và tải chương ban đầu
    initChapterList();
    
    // Xử lý hash ban đầu hoặc tải chương 1
    const initialHash = window.location.hash.substring(1);
    if (initialHash && chapterIds.includes(initialHash)) {
        navigateToChapter(initialHash);
    } else if (chapterIds.length > 0) {
        navigateToChapter(chapterIds[0]);
    } else {
        // Cập nhật trạng thái nút TTS ngay cả khi không có chương nào được tải
        updateSpeechButton();
    }
    
    // Cập nhật lại thanh tiến trình khi scroll
    window.addEventListener('scroll', updateProgressBar);
    window.addEventListener('resize', updateProgressBar);
}

// Đảm bảo hàm này có sẵn trong phạm vi toàn cục để HTML có thể gọi
window.initializeChapterLoader = initializeChapterLoader;
