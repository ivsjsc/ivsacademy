'use strict';

/**
 * @version 1.0
 * @author IVS JSC
 * Chapter Loader for Dynamic Story Reading
 */

let currentChapter = 1;
let totalChapters = 0;
let storyPath = '';
let currentLang = 'en'; // Default to English

/**
 * Fetches chapter content from JSON file
 * @param {string} storyPath - Path to the story directory
 * @param {string} chapterId - Chapter ID (e.g., 'chapter-1')
 * @param {string} lang - Language ('en' or 'vi')
 * @returns {Promise<Object>} Chapter data
 */
async function fetchChapterContent(storyPath, chapterId, lang) {
    const chapterNumber = chapterId.replace('chapter-', '');
    const paddedNumber = chapterNumber.padStart(2, '0');
    const url = `/data/novels/${storyPath}/chapter_${paddedNumber}.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chapter:', error);
        throw error;
    }
}

/**
 * Renders chapter content to the page
 * @param {Object} chapterData - Chapter data from JSON
 * @param {string} lang - Language ('en' or 'vi')
 */
function renderChapter(chapterData, lang) {
    const contentDiv = document.getElementById('dynamic-chapter-content');
    if (!contentDiv) return;

    const title = lang === 'vi' ? chapterData.title_vi : chapterData.title_en;
    const content = lang === 'vi' ? chapterData.content_vi : chapterData.content_en;

    contentDiv.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${title}</h2>
        <div class="chapter-content">${content}</div>
    `;

    // Update progress bar
    updateProgressBar();

    // Update URL hash
    window.location.hash = chapterData.chapter_id;
}

/**
 * Navigates to a specific chapter
 * @param {number} chapterNumber - Chapter number
 * @param {string} lang - Language
 */
async function navigateToChapter(chapterNumber, lang) {
    if (chapterNumber < 1 || chapterNumber > totalChapters) return;

    currentChapter = chapterNumber;
    const chapterId = `chapter-${chapterNumber}`;

    try {
        const chapterData = await fetchChapterContent(storyPath, chapterId, lang);
        renderChapter(chapterData, lang);
        updateNavigationButtons();
    } catch (error) {
        console.error('Error navigating to chapter:', error);
        // Show error message
        const contentDiv = document.getElementById('dynamic-chapter-content');
        contentDiv.innerHTML = '<p class="text-red-500">Error loading chapter. Please try again.</p>';
    }
}

/**
 * Updates the progress bar based on current chapter
 */
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const progress = (currentChapter / totalChapters) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

/**
 * Updates navigation buttons state
 */
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-chapter');
    const nextBtn = document.getElementById('next-chapter');

    if (prevBtn) {
        prevBtn.disabled = currentChapter <= 1;
        prevBtn.classList.toggle('opacity-50', currentChapter <= 1);
    }
    if (nextBtn) {
        nextBtn.disabled = currentChapter >= totalChapters;
        nextBtn.classList.toggle('opacity-50', currentChapter >= totalChapters);
    }
}

/**
 * Initializes the chapter loader
 * @param {string} path - Story path
 * @param {number} chapters - Total chapters
 */
function initializeChapterLoader(path, chapters) {
    storyPath = path;
    totalChapters = chapters;

    // Determine language from URL or default
    currentLang = window.location.pathname.includes('_vi.html') ? 'vi' : 'en';

    // Get chapter from URL hash or default to 1
    const hash = window.location.hash.replace('#', '');
    const initialChapter = hash ? parseInt(hash.replace('chapter-', '')) : 1;

    // Load initial chapter
    navigateToChapter(initialChapter, currentLang);

    // Set up navigation event listeners
    const prevBtn = document.getElementById('prev-chapter');
    const nextBtn = document.getElementById('next-chapter');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentChapter > 1) {
                navigateToChapter(currentChapter - 1, currentLang);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentChapter < totalChapters) {
                navigateToChapter(currentChapter + 1, currentLang);
            }
        });
    }

    // Set up modal
    setupChapterModal();
}

/**
 * Sets up the chapter selection modal
 */
function setupChapterModal() {
    const modal = document.getElementById('chapter-modal');
    const closeBtn = document.getElementById('close-modal');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // Add click listeners to chapter links
    const chapterLinks = modal.querySelectorAll('[data-chapter-id]');
    chapterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const chapterId = link.getAttribute('data-chapter-id');
            const chapterNumber = parseInt(chapterId.replace('chapter-', ''));
            navigateToChapter(chapterNumber, currentLang);
            modal.classList.add('hidden');
        });
    });

    // Optional: Add a button to open modal (not in HTML yet)
    // You can add a button with id="open-chapter-modal" to trigger modal
}