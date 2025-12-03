// Minimal language helper used by the site and tests.
// This file intentionally contains a small, robust implementation of translate()
// that the app and tests rely on. It avoids complex loading/initialization logic
// so it can be exercised directly by Playwright tests.

/* globals window */

'use strict';

(function () {
  // Ensure langSystem exists with sane defaults
  window.langSystem = window.langSystem || {};
  window.langSystem.defaultLanguage = window.langSystem.defaultLanguage || 'vi';
  window.langSystem.currentLanguage = window.langSystem.currentLanguage || window.langSystem.defaultLanguage;
  window.langSystem.translations = window.langSystem.translations || {};

  // Function to load translations
  async function loadTranslations() {
    try {
      const langs = ['vi', 'en', 'zh'];
      for (const lang of langs) {
        const response = await fetch(`/lang/${lang}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load ${lang}.json`);
        }
        window.langSystem.translations[lang] = await response.json();
      }
      // Dispatch a custom event when translations are loaded
      window.dispatchEvent(new CustomEvent('translationsLoaded'));
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  }

  // Load translations when the script is executed
  loadTranslations();

  // translate(key, lang?) — returns translated string, fallback to defaultLanguage if missing,
  // explicit null => empty string, completely missing => return key
  function translate(key, lang) {
    lang = lang || window.langSystem.currentLanguage;

    const translationsForLang = window.langSystem.translations?.[lang];

    // If we have an object for the requested language, check value
    if (translationsForLang && Object.prototype.hasOwnProperty.call(translationsForLang, key)) {
      const value = translationsForLang[key];
      // Treat an explicit null as an intentional empty string
      if (value === null) return '';
      return value;
    }

    // Not found in requested language — try fallback (defaultLanguage)
    const def = window.langSystem.defaultLanguage;
    if (lang !== def) {
      const translationsForDefault = window.langSystem.translations?.[def];
      if (translationsForDefault && Object.prototype.hasOwnProperty.call(translationsForDefault, key)) {
        const value = translationsForDefault[key];
        if (value === null) return '';
        return value;
      }
    }

    // No translation found — return key (caller can detect this)
    return key;
  }

  // Expose globally for tests and application code
  window.translate = translate;

  // Change the current language and update UI/storage
  // Returns a Promise that resolves after language change is complete
  window.changeLanguage = function (newLang) {
    return Promise.resolve().then(function() {
      if (!newLang) throw new Error('Language code required');
      
      // Validate language code
      const validLangs = ['vi', 'en', 'zh'];
      if (!validLangs.includes(newLang)) {
        throw new Error('Invalid language code: ' + newLang);
      }
      
      // Update current language
      window.langSystem.currentLanguage = newLang;
      
      // Persist user preference
      if (window.localStorage) {
        localStorage.setItem('userPreferredLanguage', newLang);
      }
      
      // Update HTML lang attribute
      document.documentElement.lang = newLang;
      
      // Update all elements with data-lang-key attribute
      document.querySelectorAll('[data-lang-key]').forEach(function(elem) {
        const key = elem.getAttribute('data-lang-key');
        const translated = translate(key, newLang);
        if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
          elem.placeholder = translated;
        } else {
          elem.textContent = translated;
        }
      });
      
      // Dispatch custom event so other components can react to language change
      if (window.CustomEvent) {
        window.dispatchEvent(new CustomEvent('languageChanged', {
          detail: { language: newLang }
        }));
      }
    });
  };
})();
