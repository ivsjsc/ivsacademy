from playwright.sync_api import sync_playwright
import sys

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Capture console messages
        page.on("console", lambda msg: print(f"Browser console: {msg.text}"))

        try:
            page.goto("http://localhost:8000/tests/test.html")
            # Give the page a moment to load its scripts and reporters
            try:
                page.wait_for_selector(".jasmine-results, .jasmine_html-reporter, #HTMLReporter, .jasmine-specs", timeout=60000)
            except Exception as wait_err:
                print("Reporter element never appeared, dumping page content and console logs for debugging.")
                html = page.content()
                print("===== PAGE CONTENT START =====")
                print(html)
                print("===== PAGE CONTENT END =====")
                raise wait_err

            # Check for failures
            failing_count = page.locator(".jasmine-failed").count()

            if failing_count > 0:
                print(f"{failing_count} tests failed.")
                # Get more details about the failures
                failure_details = page.locator(".jasmine-spec-detail.jasmine-failed").all_text_contents()
                for detail in failure_details:
                    print(f" - {detail.strip()}")
                sys.exit(1) # Exit with a non-zero status code to indicate failure

            passing_count = page.locator(".jasmine-passed").count()
            print(f"{passing_count} tests passed.")

        except Exception as e:
            print(f"An error occurred: {e}")
            sys.exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    run_tests()
