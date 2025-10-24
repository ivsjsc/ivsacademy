import os
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:8000/index.html')
    page.wait_for_load_state('domcontentloaded')

    # Switch to Chinese using the global function
    page.evaluate("() => window.changeLanguage('zh')")

    # Wait for the translations to be applied
    page.wait_for_timeout(1000)

    page.screenshot(path='jules-scratch/verification/index_zh.png')
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
