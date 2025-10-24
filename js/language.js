/**
 * IVS Language System - Optimized for Direct Integration
 * Version: 3.4 - Added robust localStorage handling and removed fallback timing hacks.
 * Description: This script handles all multilingual functionalities.
 * It is now self-contained and initializes on DOMContentLoaded.
 * Integration: Include this script in your HTML pages, preferably after utils.js
 * (if utils.js is used) and before the closing </body> tag.
 */
'use strict';

// Defensive fallback for logging. If utils.js loads later, it will overwrite this.
// This fallback uses the same utility pattern as componentLog to ensure consistency.
if (typeof window.componentLog !== 'function') {
    window.componentLog = function(msg, level = 'log') {
        // Use the same pattern as utils.js componentLog
        if (typeof console !== 'undefined' && console && typeof console[level] === 'function') {
            try {
                console[level](`[IVS App] ${msg}`);
            } catch (error) {
                if (typeof console.log === 'function') {
                    console.log(`[IVS App] ${level.toUpperCase()}: ${msg}`);
                }
            }
        } else {
            if (typeof console !== 'undefined' && console && typeof console.log === 'function') {
                console.log(`[IVS App] ${level.toUpperCase()}: ${msg}`);
            }
        }
    };
}


// 1. GLOBAL CONFIGURATION & STATE
window.langSystem = window.langSystem || {
    translations: {},
    defaultLanguage: 'vi', // Changed default to Vietnamese as per standard practice
    currentLanguage: 'vi',
    languageStorageKey: 'userPreferredLanguage',
    isLoading: false, // Add loading state tracking
    lastError: null,  // Track last error for debugging
    // Expose utility for dynamic content
    applyDynamicTranslations: null // Will be set to applyTranslationsToDOM
};


// 2. CORE UTILITIES
/**
 * Lấy văn bản dịch dựa trên khóa.
 * @param {string} key Khóa dịch (ví dụ: 'header_home').
 * @param {string} lang Ngôn ngữ muốn lấy (mặc định là currentLanguage).
 * @returns {string} Văn bản đã dịch hoặc khóa nếu không tìm thấy.
 */
function translate(key, lang = langSystem.currentLanguage) {
    if (!langSystem.translations[lang]) {
        window.componentLog(`Translation data for language '${lang}' not loaded.`, 'warn');
        return key;
    }
    // Sử dụng optional chaining (?.) cho an toàn và thêm kiểm tra undefined
    const translation = langSystem.translations[lang]?.[key];
    
    if (translation === undefined) {
        window.componentLog(`Missing translation key: '${key}' in language '${lang}'`, 'warn');
        // Return key if translation is undefined, but return empty string if translation is explicitly null
        return translation === null ? '' : key;
        // Fallback: if translation is not found in the current language, try the default language.
        const fallbackTranslation = langSystem.translations[langSystem.defaultLanguage]?.[key];
        if (lang !== langSystem.defaultLanguage && fallbackTranslation !== undefined) {
            return fallbackTranslation;
        }
        return key; // Return the key if no translation is found.
    }
    return translation;
}


/**
 * Áp dụng các bản dịch cho tất cả các phần tử có thuộc tính data-i18n.
 * Hỗ trợ các thuộc tính: innerHTML, value, placeholder, và alt cho hình ảnh.
 */
function applyTranslationsToDOM() {
    window.componentLog(`Applying translations for language: ${langSystem.currentLanguage}`);
    const elements = document.querySelectorAll('[data-i18n], [data-lang-key]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n') || element.getAttribute('data-lang-key');
        if (!key) return;
        
        const translationText = translate(key);

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            const attr = element.getAttribute('data-i18n-attr') || element.getAttribute('data-lang-target') || 'placeholder';
            element.setAttribute(attr, translationText);
        } else if (element.tagName === 'IMG') {
             // Dịch cả alt và title cho SEO/Accessibility
            element.setAttribute('alt', translationText);
            element.setAttribute('title', translationText);
        } else {
            // Check for specific target attribute
            const targetAttr = element.getAttribute('data-i18n-attr') || element.getAttribute('data-lang-target');
            if (targetAttr) {
                const targets = targetAttr.split(',').map(t => t.trim()).filter(Boolean);
                targets.forEach(target => {
                    if (target === 'textContent') {
                        element.textContent = translationText;
                    } else if (target === 'innerHTML') {
                        element.innerHTML = translationText;
                    } else {
                        element.setAttribute(target, translationText);
                    }
                });
            } else {
                // Default: update innerHTML
                element.innerHTML = translationText;
            }
        }
    });

    // Cập nhật thuộc tính 'lang' của thẻ html để hỗ trợ SEO và trình đọc màn hình
    document.documentElement.lang = langSystem.currentLanguage;
    window.componentLog('Translation application complete.');
}

// Set the reference for public API
langSystem.applyDynamicTranslations = applyTranslationsToDOM;


/**
 * Tải file JSON ngôn ngữ từ đường dẫn.
 * @param {string} lang Ngôn ngữ cần tải.
 * @returns {Promise<Object>} Object chứa dữ liệu dịch.
 */
async function fetchTranslation(lang) {
    window.componentLog(`Attempting to fetch translations for language: ${lang}`);
    
    // Try multiple path candidates for different deployment environments
    const pathCandidates = [
        `lang/${lang}.json`,           // Relative path for development
        `/lang/${lang}.json`,          // Absolute path for production
        `./lang/${lang}.json`,         // Explicit relative path
        `../lang/${lang}.json`         // One level up (for subdirectories)
    ];
    
    let lastError = null;
    window.componentLog(`Current page URL: ${window.location.href}`);
    
    for (const filePath of pathCandidates) {
        try {
            window.componentLog(`Trying translation file: ${filePath}`);
            const response = await fetch(filePath);
            
            if (response.ok) {
                const data = await response.json();
                window.componentLog(`Successfully loaded translation from: ${filePath}`);
                return data;
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            lastError = error;
            window.componentLog(`Failed to fetch ${filePath}: ${error.message}`, 'warn');
            continue; // Try next path
        }
    }
    
    // If all paths failed, try fallback to default language
    if (lang !== langSystem.defaultLanguage) {
        window.componentLog(`All paths failed for '${lang}', falling back to default language: ${langSystem.defaultLanguage}`, 'warn');
        return await fetchTranslation(langSystem.defaultLanguage);
    }
    
    // Critical error if even default language fails
    throw new Error(`Critical: Failed to load translation for both '${lang}' and default '${langSystem.defaultLanguage}'. Last error: ${lastError?.message}`);
}


// 3. STORAGE AND INITIALIZATION
/**
 * Tải ngôn ngữ ưu tiên từ localStorage.
 * @returns {string} Ngôn ngữ ưu tiên hoặc ngôn ngữ mặc định.
 */
function loadPreferredLanguage() {
    let storedLang = langSystem.defaultLanguage;
    try {
        const value = localStorage.getItem(langSystem.languageStorageKey);
        if (value) {
            storedLang = value;
            window.componentLog(`Found preferred language in storage: ${storedLang}`);
        }
    } catch (e) {
        window.componentLog("Warning: Could not access localStorage for language preference. Using default.", 'warn');
    }
    return storedLang;
}

/**
 * Lưu ngôn ngữ đã chọn vào localStorage.
 * @param {string} lang Ngôn ngữ mới.
 */
function saveLanguagePreference(lang) {
    try {
        localStorage.setItem(langSystem.languageStorageKey, lang);
    } catch (e) {
        window.componentLog("Warning: Could not save language preference to localStorage.", 'warn');
    }
}


// 4. PUBLIC API & MAIN CONTROLLER
window.changeLanguage = async function(newLang) {
    try {
        // Tải bản dịch mới nếu chưa có
        if (!langSystem.translations[newLang]) {
            const data = await fetchTranslation(newLang);
            langSystem.translations[newLang] = data;
        }

        langSystem.currentLanguage = newLang;
        saveLanguagePreference(newLang);
        applyTranslationsToDOM();
        window.componentLog(`Successfully changed language to: ${newLang}`);
        
        // Notify headerController to update its buttons if it's available
        if (window.IVSHeaderController && typeof window.IVSHeaderController.updateLanguageButtonStates === 'function') {
            window.IVSHeaderController.updateLanguageButtonStates(newLang);
            window.componentLog('Notified IVSHeaderController to update language button states.');
        }
    } catch (error) {
        window.componentLog(`Error changing language: ${error.message}`, 'error');
        throw error;
    }
}

async function initializeLanguageSystem() {
    try {
        const initialLang = loadPreferredLanguage();
        
        // Luôn tải ngôn ngữ mặc định (vi) để làm cơ sở dự phòng
        if (initialLang !== langSystem.defaultLanguage) {
            const defaultData = await fetchTranslation(langSystem.defaultLanguage);
            langSystem.translations[langSystem.defaultLanguage] = defaultData;
        }

        // Tải ngôn ngữ ưu tiên (chỉ tải lại nếu nó khác mặc định và chưa được tải)
        if (!langSystem.translations[initialLang]) {
             const preferredData = await fetchTranslation(initialLang);
             langSystem.translations[initialLang] = preferredData;
        }

        langSystem.currentLanguage = initialLang;
        applyTranslationsToDOM();
        window.componentLog(`Language system initialized. Current language: ${langSystem.currentLanguage}`);
        
    } catch (error) {
        window.componentLog(`Critical initialization error: ${error.message}. Translations disabled.`, 'error');
    }
}


// 5. BOOTSTRAP
// Initialize the system after the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguageSystem);
} else {
    // DOM is already ready
    initializeLanguageSystem();
}

// 5. SCRIPT EXECUTION
// The script will now self-initialize once the DOM is ready.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // If utils.js hasn't fully replaced the fallback, wait a short moment
        // to allow page-level script ordering to finish. This prevents the
        // earlier TypeError seen in production where window.componentLog was not a function.
        if (window.__componentLogFallback) {
            // small retry delay (non-blocking) to let utils.js initialize
            setTimeout(initializeLanguageSystem, 25);
            window.componentLog('DOMContentLoaded: using fallback componentLog; scheduling language initialization shortly.');
        } else {
            initializeLanguageSystem();
            window.componentLog('DOMContentLoaded: initializing language system.');
        }
    });
    window.componentLog('DOMContentLoaded listener added for language system initialization.');
} else {
    if (window.__componentLogFallback) {
        setTimeout(initializeLanguageSystem, 25);
        window.componentLog('DOM already loaded: using fallback componentLog; scheduling language initialization shortly.');
    } else {
        initializeLanguageSystem();
        window.componentLog('DOM already loaded, language system initializing immediately.');
    }
}
