from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.on('console', lambda msg: print('console>', msg.text))
    page.goto('http://localhost:8000/tests/test.html')
    page.wait_for_timeout(5000)
    print('content snapshot:')
    print(page.content())
    browser.close()
