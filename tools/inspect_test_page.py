from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    # capture console output while page runs tests
    page.on('console', lambda msg: print('BROWSER-CONSOLE:', msg.text))
    page.goto('http://localhost:8000/tests/test.html', wait_until='load')
    # allow JS to run
    # give Jasmine boot a little longer to run and render the reporter UI
    page.wait_for_timeout(5000)
    print('HAS_JASMINE:', page.evaluate("typeof window.jasmine !== 'undefined'"))
    print('HAS_HTML_REPORTER:', page.evaluate("document.querySelectorAll('.jasmine_html-reporter, #HTMLReporter, .jasmine-results, .jasmine-specs').length"))
    print('SCRIPTS:')
    print(page.evaluate("JSON.stringify(Array.from(document.scripts).map(s => s.src || s.getAttribute('src')))"))
    print('JASMINE_PROPS:')
    print('typeof describe =', page.evaluate("typeof describe"))
    print('typeof it =', page.evaluate("typeof it"))
    print('typeof beforeAll =', page.evaluate("typeof beforeAll"))
    print('typeof jasmine =', page.evaluate("typeof jasmine"))
    print('PAGE_CONTENT_START:')
    print(page.content()[:4000])
    browser.close()

