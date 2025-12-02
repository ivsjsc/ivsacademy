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

  // Legacy accessor to change the current language (tests may set currentLanguage directly)
  window.changeLanguage = function (newLang) {
    if (!newLang) return;
    window.langSystem.currentLanguage = newLang;
  };
})();
