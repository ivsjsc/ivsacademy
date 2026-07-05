from playwright.sync_api import sync_playwright
import time

def test_mobile_menu():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        # Test on a common mobile viewport (iPhone 12/13)
        context = browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
        )
        page = context.new_page()

        # Navigate to the local server
        page.goto('http://localhost:8000/index.html')
        page.wait_for_load_state('networkidle')

        # Wait for components to load
        page.wait_for_selector('#mobile-menu-open-btn')

        # Take a screenshot before opening
        page.screenshot(path='mobile_before_open.png')

        # Click to open menu
        page.click('#mobile-menu-open-btn')

        # Wait for transition
        time.sleep(1)

        # Check if panel is visible
        panel = page.locator('#ivs-mobile-menu-panel')
        container = page.locator('#ivs-mobile-menu-container')

        is_hidden = panel.evaluate('el => el.classList.contains(\"hidden\")')
        print(f'Panel hidden: {is_hidden}')

        # Check z-index
        z_index = panel.evaluate('el => getComputedStyle(el).zIndex')
        print(f'Panel z-index: {z_index}')

        # Check background color of container
        bg_color = container.evaluate('el => getComputedStyle(el).backgroundColor')
        print(f'Container background color: {bg_color}')

        # Take a screenshot of the open menu
        page.screenshot(path='mobile_open.png')

        # Check scroll locking
        body_overflow = page.evaluate('() => getComputedStyle(document.body).overflow')
        print(f'Body overflow: {body_overflow}')

        # Click backdrop to close (click at x=10, y=10 which should be backdrop)
        page.mouse.click(10, 10)
        time.sleep(1)

        is_hidden_after = panel.evaluate('el => el.classList.contains(\"hidden\")')
        print(f'Panel hidden after backdrop click: {is_hidden_after}')

        # Open again and test escape key
        page.click('#mobile-menu-open-btn')
        time.sleep(1)
        page.keyboard.press('Escape')
        time.sleep(1)
        is_hidden_after_esc = panel.evaluate('el => el.classList.contains(\"hidden\")')
        print(f'Panel hidden after Escape: {is_hidden_after_esc}')

        browser.close()

if __name__ == '__main__':
    test_mobile_menu()
