from playwright.sync_api import sync_playwright


def test_translate_fallback_and_hero_tagline():
    """Regression test for translate() fallback behavior and hero_tagline strings.

    This test loads tests/test.html from the local server and uses the page's
    translate() implementation to validate fallbacks and the hero_tagline values
    across en/vi/zh.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:8000/tests/test.html', wait_until='load')

        # Allow scripts to run and the language system to initialize
        page.wait_for_timeout(1500)

        # Inject a deterministic translations map for assertions
        page.evaluate("""
            window.langSystem = window.langSystem || { translations: {}, defaultLanguage: 'vi', currentLanguage: 'vi' };
            window.langSystem.translations = {
                vi: { 'test_key': 'Xin chào', 'another_key': 'Tạm biệt', 'hero_tagline':'IVS JSC: HỆ SINH THÁI GIÁO DỤC, CÔNG NGHỆ & NHÂN SỰ' },
                en: { 'another_key': 'Goodbye', 'hero_tagline': 'IVS JSC: EDUCATION, TECHNOLOGY & HR ECOSYSTEM' },
                zh: { 'hero_tagline': 'IVS JSC: 教育, 科技 & 人力资源生态系统' }
            };
        """)

        page.evaluate("() => (window.langSystem.currentLanguage = 'en')")

        missing = page.evaluate("() => translate('non_existent_key')")
        assert missing == 'non_existent_key', 'translate must return key for completely missing keys'

        # fallback: test_key exists only in vi so translate should fall back to vi when currentLanguage=en
        fallback = page.evaluate("() => translate('test_key')")
        assert fallback == 'Xin chào', 'translate should fallback to default language translation when current lacks key'

        # Check hero_tagline across languages
        en_hero = page.evaluate("() => { window.langSystem.currentLanguage='en'; return translate('hero_tagline'); }")
        vi_hero = page.evaluate("() => { window.langSystem.currentLanguage='vi'; return translate('hero_tagline'); }")
        zh_hero = page.evaluate("() => { window.langSystem.currentLanguage='zh'; return translate('hero_tagline'); }")

        assert en_hero == 'IVS JSC: EDUCATION, TECHNOLOGY & HR ECOSYSTEM'
        assert vi_hero == 'IVS JSC: HỆ SINH THÁI GIÁO DỤC, CÔNG NGHỆ & NHÂN SỰ'
        assert zh_hero == 'IVS JSC: 教育, 科技 & 人力资源生态系统'

        browser.close()
