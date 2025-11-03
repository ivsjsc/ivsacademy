
import asyncio
from playwright.async_api import async_playwright
import os
import http.server
import socketserver
import threading
import time

PORT = 8081

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

httpd = None
server_thread = None
stop_server_event = threading.Event()

def run_server(port):
    global httpd
    while not stop_server_event.is_set():
        try:
            with socketserver.TCPServer(("", port), Handler) as local_httpd:
                httpd = local_httpd
                print(f"Serving at port {port}")
                httpd.serve_forever()
            break
        except OSError:
            print(f"Port {port} already in use. Trying next port.")
            port += 1
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            break

def stop_server():
    global httpd
    if httpd:
        print("Shutting down server...")
        httpd.shutdown()
        httpd.server_close()
        stop_server_event.set()

async def main():
    global server_thread, PORT

    current_port = PORT
    while True:
        try:
            # Check if the port is available before starting the server
            with socketserver.TCPServer(("", current_port), Handler) as s:
                s.server_close()
            PORT = current_port
            break
        except OSError:
            current_port += 1

    server_thread = threading.Thread(target=run_server, args=(PORT,))
    server_thread.daemon = True
    server_thread.start()
    await asyncio.sleep(1)

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()

            await page.goto(f'http://localhost:{PORT}/index.html', timeout=15000)

            await page.wait_for_selector('#lang-main-btn', timeout=15000)

            # --- Test Vietnamese Translations ---
            await page.click('#lang-main-btn')
            await page.click('.lang-option[data-lang="vi"]')
            await page.wait_for_timeout(1000)

            vi_hero_tagline = await page.inner_text('[data-lang-key="hero_tagline"]')
            print(f"DEBUG: Vietnamese hero tagline found: '{vi_hero_tagline}'")
            assert "HỆ SINH THÁI GIÁO DỤC" in vi_hero_tagline
            print("Vietnamese hero tagline verified.")

            # --- Test Chinese Translations ---
            await page.click('#lang-main-btn')
            await page.click('.lang-option[data-lang="zh"]')
            await page.wait_for_timeout(1000)

            zh_hero_tagline = await page.inner_text('[data-lang-key="hero_tagline"]')
            assert "代码优先服务" in zh_hero_tagline
            print("Chinese hero tagline verified.")

            # --- Revert to English ---
            await page.click('#lang-main-btn')
            await page.click('.lang-option[data-lang="en"]')
            await page.wait_for_timeout(1000)
            en_hero_tagline = await page.inner_text('[data-lang-key="hero_tagline"]')
            assert "IVS JSC: EDUCATION, TECHNOLOGY & HR ECOSYSTEM" in en_hero_tagline
            print("English hero tagline verified.")

            print("All translations verified successfully.")

            await page.screenshot(path='translation_verification.png')
            print("Screenshot 'translation_verification.png' created.")

            await browser.close()
    finally:
        stop_server()
        if server_thread:
            server_thread.join(timeout=2)


if __name__ == '__main__':
    asyncio.run(main())
