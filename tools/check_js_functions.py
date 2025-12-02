from playwright.sync_api import sync_playwright

def run_checks():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:8000/tests/test.html', wait_until='load')
        page.wait_for_timeout(1000)

        results = page.evaluate('''() => {
            // Set a mocked translation environment
            window.langSystem = window.langSystem || { translations: {}, defaultLanguage: 'vi', currentLanguage: 'vi' };
            window.langSystem.translations = {
                vi: { 'test_key': 'Xin chào', 'another_key': 'Tạm biệt', 'hero_tagline':'IVS JSC: HỆ SINH THÁI GIÁO DỤC, CÔNG NGHỆ & NHÂN SỰ' },
                en: { 'another_key': 'Goodbye', 'hero_tagline': 'IVS JSC: EDUCATION, TECHNOLOGY & HR ECOSYSTEM' },
                zh: { 'hero_tagline': 'IVS JSC: 教育, 科技 & 人力资源生态系统' }
            };

            // Test translate fallback behavior
            window.langSystem.currentLanguage = 'en';
            const missing = translate('non_existent_key');
            const fallback = translate('test_key');

            // Test hero_tagline values in different languages
            const enHero = (function() { window.langSystem.currentLanguage='en'; return translate('hero_tagline'); })();
            const viHero = (function() { window.langSystem.currentLanguage='vi'; return translate('hero_tagline'); })();
            const zhHero = (function() { window.langSystem.currentLanguage='zh'; return translate('hero_tagline'); })();

            return { missing, fallback, enHero, viHero, zhHero };
        }
        ''')

        print('JS function results:')
        print(results)

if __name__ == '__main__':
    run_checks()
