/**
 * IVS Language System - Optimized for Direct Integration
 * Version: 3.3 - Removed duplicated utility functions, now relies on utils.js
 * Description: This script handles all multilingual functionalities.
 * It is now self-contained and initializes on DOMContentLoaded, removing
 * the dependency on external loaders like loadComponents.js for core utilities.
 * Integration: Include this script in your HTML pages after utils.js,
 * preferably before the closing </body> tag.
 */
'use strict';

// Ensure a safe fallback for window.componentLog so pages don't crash if utils.js
// hasn't loaded yet. This provides defensive logging until the real implementation
// from utils.js becomes available.
if (typeof window.componentLog !== 'function') {
    window.componentLog = function(msg, level = 'log') {
        try {
            if (level === 'error') console.error(msg);
            else if (level === 'warn') console.warn(msg);
            else console.log(msg);
        } catch (e) {
            // swallow errors from console in constrained environments
        }
    };
    // Mark that this is a temporary fallback so other scripts can check if utils loaded
    window.__componentLogFallback = true;
}

// 1. GLOBAL CONFIGURATION & STATE
window.langSystem = window.langSystem || {
    translations: {},
    defaultLanguage: 'vi', // Changed default to Vietnamese as per standard practice
    currentLanguage: 'vi',
    languageStorageKey: 'userPreferredLanguage_v3',
    languageFilesPath: '/lang/', // Absolute path is more robust
    isDebugMode: true, // Keep this true for debugging
    initialized: false,
};

// 2. UTILITY FUNCTIONS (Now using componentLog from utils.js)
// No need for local langLog as it's provided by window.componentLog

// 3. CORE TRANSLATION LOGIC
async function fetchTranslations(langCode) {
    if (window.langSystem.translations[langCode]) {
        window.componentLog(`Translations for ${langCode} already loaded.`, 'info');
        return; // Already loaded
    }
    window.componentLog(`Attempting to fetch translations for: ${langCode} from ${window.langSystem.languageFilesPath}${langCode}.json`);
    try {
        const response = await fetch(`${window.langSystem.languageFilesPath}${langCode}.json?v=${new Date().getTime()}`);
        window.componentLog(`Fetch response status for ${langCode}.json: ${response.status} - OK: ${response.ok}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`404 Not Found: Language file ${langCode}.json does not exist at ${response.url}`);
            } else {
                throw new Error(`HTTP ${response.status} for ${langCode}.json: ${response.statusText}`);
            }
        }
        window.langSystem.translations[langCode] = await response.json();
        window.componentLog(`Successfully loaded and parsed translations for ${langCode}. Keys loaded: ${Object.keys(window.langSystem.translations[langCode]).length}`);
    } catch (error) {
        window.componentLog(`Failed to fetch or parse translations for ${langCode}: ${error.message}`, 'error');
        // Do not load default here, handle fallback during language setting.
    }
}

function applyTranslationToElement(element, translation) {
    if (translation === undefined) {
        return false;
    }

    const tagName = element.tagName ? element.tagName.toUpperCase() : '';
    let targetAttr = element.dataset.langTarget;

    if (!targetAttr) {
        if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
            targetAttr = 'placeholder';
        } else {
            targetAttr = 'textContent';
        }
    }

    const targets = targetAttr.split(',').map(t => t.trim()).filter(Boolean);
    if (!targets.length) {
        return false;
    }

    targets.forEach(target => {
        if (target === 'textContent') {
            element.textContent = translation;
        } else if (target === 'innerHTML') {
            element.innerHTML = translation;
        } else {
            element.setAttribute(target, translation);
        }
    });

    return true;
}

function applyTranslations() {
    const lang = window.langSystem.currentLanguage;
    const translations = window.langSystem.translations[lang] || window.langSystem.translations[window.langSystem.defaultLanguage];

    if (!translations) {
        window.componentLog(`CRITICAL: No translations available for '${lang}' or default language '${window.langSystem.defaultLanguage}'. DOM update skipped. This might indicate file loading issues.`, 'error');
        return;
    }

    window.componentLog(`Applying translations for '${lang}'. Total keys in active pack: ${Object.keys(translations).length}`);
    document.documentElement.lang = lang;

    let translatedElementsCount = 0;
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.dataset.langKey;
        if (!key) return;
        const translation = translations[key];

        if (translation !== undefined) {
            if (applyTranslationToElement(el, translation)) {
                translatedElementsCount++;
            }
        } else {
            window.componentLog(`Key '${key}' not found for current language '${lang}' or default. Element not translated.`, 'warn');
        }
    });
    window.componentLog(`Finished applying translations. Total elements updated: ${translatedElementsCount}`);
}

function updateLanguageButtonsUI() {
    // This function can be kept if there are other language buttons outside the one-touch toggle
    // For now, it's less relevant as the one-touch toggle doesn't have active/inactive states
    // but rather triggers a full language change.
    window.componentLog('updateLanguageButtonsUI called. This function is typically handled by headerController for button states.', 'info');
    
    // Notify headerController to update its buttons if it's available
    if (window.IVSHeaderController && typeof window.IVSHeaderController.updateLanguageButtonStates === 'function') {
        window.IVSHeaderController.updateLanguageButtonStates(window.langSystem.currentLanguage);
        window.componentLog('Notified IVSHeaderController to update language button states.');
    }
}

// 4. PUBLIC API & INITIALIZATION
window.langSystem.setLanguage = async function(langCode) { // Expose setLanguage directly on window.langSystem
    window.componentLog(`Attempting to set language to: ${langCode}`);
    
    // Ensure the requested language pack is loaded
    if (!window.langSystem.translations[langCode]) {
        await fetchTranslations(langCode);
    }
    
    // Fallback to default if the requested language is still not available
    if (!window.langSystem.translations[langCode]) {
        window.componentLog(`Cannot set language to '${langCode}', falling back to default '${window.langSystem.defaultLanguage}'. Requested lang pack not available.`, 'warn');
        langCode = window.langSystem.defaultLanguage;
        // Ensure default is loaded if it also failed somehow
        if (!window.langSystem.translations[langCode]) {
            await fetchTranslations(langCode);
        }
    }

    // Final check before setting
    if (!window.langSystem.translations[langCode]) {
        window.componentLog('CRITICAL: Default language pack failed to load. Language system cannot function.', 'error');
        return;
    }

    window.langSystem.currentLanguage = langCode;
    localStorage.setItem(window.langSystem.languageStorageKey, langCode);
    
    applyTranslations();
    updateLanguageButtonsUI(); // Call this to update any remaining language buttons if needed
    window.componentLog(`Language successfully set to: '${window.langSystem.currentLanguage}'.`);
};


async function initializeLanguageSystem() {
    if (window.langSystem.initialized) {
        window.componentLog('Language system already initialized. Skipping re-initialization.', 'info');
        return;
    }

    // Determine initial language: 1. LocalStorage, 2. Browser, 3. Default
    let initialLang = localStorage.getItem(window.langSystem.languageStorageKey) || 
                      (navigator.language || navigator.userLanguage).split('-')[0] || 
                      window.langSystem.defaultLanguage;

    window.componentLog(`Initial language determined: '${initialLang}'. Attempting to load packs...`);

    // Load initial language pack and default pack for fallback
    await Promise.all([
        fetchTranslations(initialLang),
        fetchTranslations(window.langSystem.defaultLanguage)
    ]);

    // Set the final language (with fallback logic)
    // This call will use the setLanguage function defined above
    await window.langSystem.setLanguage(initialLang);

    window.langSystem.initialized = true;
    window.componentLog(`Language system fully initialized. Current active language: '${window.langSystem.currentLanguage}'.`);
}

// Make changeLanguage available globally
window.changeLanguage = async function(langCode) {
    window.componentLog(`Initiating language change to: ${langCode}`);
    
    // Allow Chinese ('zh') in addition to English and Vietnamese
    if (!['en', 'vi', 'zh'].includes(langCode)) {
        window.componentLog(`Invalid language code: ${langCode}`, 'error');
        return;
    }

    try {
        await window.langSystem.setLanguage(langCode);
        window.componentLog(`Successfully changed language to: ${langCode}`);
        return true;
    } catch (error) {
        window.componentLog(`Error changing language: ${error.message}`, 'error');
        throw error;
    }
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
