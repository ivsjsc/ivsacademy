from playwright.sync_api import sync_playwright
import subprocess
import time

def verify_translation():
    server = None
    try:
        # Start a web server in the background
        server = subprocess.Popen(["python3", "-m", "http.server"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        time.sleep(2)  # Give the server a moment to start

        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()

            # Navigate to the main page
            page.goto("http://localhost:8000/index.html")

            # Wait for the page to load and translations to be applied
            page.wait_for_selector("[data-lang-key='hero_title_slogan']")

            # Take a screenshot
            page.screenshot(path="translation_verification.png")
            print("Screenshot taken. Please verify 'translation_verification.png'")

            browser.close()
    finally:
        if server:
            server.kill()

if __name__ == "__main__":
    verify_translation()
