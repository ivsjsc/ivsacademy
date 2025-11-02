#!/usr/bin/env python3
"""
Test script to verify foreign teacher service pages load correctly
"""
import requests
import time
from bs4 import BeautifulSoup

def test_page(url, page_name):
    """Test if a page loads and has required components"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')

        # Check for required elements
        checks = {
            'Header placeholder': bool(soup.find(id='header-placeholder')),
            'Footer placeholder': bool(soup.find(id='footer-placeholder')),
            'FAB placeholder': bool(soup.find(id='fab-container-placeholder')),
            'Language script': bool(soup.find('script', src=lambda x: x and 'language.js' in x)),
            'Utils script': bool(soup.find('script', src=lambda x: x and 'utils.js' in x)),
            'LoadComponents script': bool(soup.find('script', src=lambda x: x and 'loadComponents.js' in x)),
            'AOS script': bool(soup.find('script', src=lambda x: x and 'aos@2.3.1' in x)),
            'Font preconnect': bool(soup.find('link', rel='preconnect', href='https://fonts.googleapis.com')),
            'DNS prefetch': bool(soup.find('link', rel='dns-prefetch')),
        }

        print(f"\n=== Testing {page_name} ===")
        all_passed = True
        for check_name, passed in checks.items():
            status = "✓" if passed else "✗"
            print(f"{status} {check_name}")
            if not passed:
                all_passed = False

        return all_passed

    except Exception as e:
        print(f"Error testing {page_name}: {e}")
        return False

def main():
    base_url = "http://localhost:8080"
    pages = [
        ("Pages/bang-gia-tham-khao-gvnn-ivs.html", "Bang Gia Page"),
        ("Pages/foreign-teacher-services.html", "Foreign Teacher Services Page"),
        ("Pages/teacher-lists-available.html", "Teacher Lists Page"),
    ]

    print("Testing Foreign Teacher Service Pages...")
    print("Waiting for server to be ready...")
    time.sleep(2)

    results = []
    for page_path, page_name in pages:
        url = f"{base_url}/{page_path}"
        result = test_page(url, page_name)
        results.append((page_name, result))

    print("\n=== SUMMARY ===")
    all_passed = True
    for page_name, result in results:
        status = "PASS" if result else "FAIL"
        print(f"{page_name}: {status}")
        if not result:
            all_passed = False

    if all_passed:
        print("\n🎉 All pages passed the tests!")
    else:
        print("\n❌ Some pages failed. Check the output above.")

if __name__ == "__main__":
    main()