#!/usr/bin/env python3
"""
Quick test to verify component loading fixes
"""
import requests
import time

BASE_URL = "http://127.0.0.1:8000"

test_pages = [
    "index.html",
    "about.html", 
    "solutions.html",
    "contact.html",
    "education.html",
    "pages/careervn.html",
    "consulting.html",
    "gallery.html"
]

def test_page(page):
    """Test if a page loads and has component placeholders"""
    try:
        response = requests.get(f"{BASE_URL}/{page}", timeout=5)
        content = response.text
        
        # Check for component placeholders
        has_header = 'id="header-placeholder"' in content
        has_footer = 'id="footer-placeholder"' in content
        has_fab = 'id="fab-container-placeholder"' in content
        
        # Check for required scripts
        has_utils = 'utils.js' in content
        has_language = 'language.js' in content  
        has_loadcomponents = 'loadComponents.js' in content
        
        return {
            'status': response.status_code,
            'has_placeholders': has_header or has_footer or has_fab,
            'has_scripts': has_utils and has_language and has_loadcomponents,
            'success': response.status_code == 200 and (has_header or has_footer) and has_utils
        }
        
    except Exception as e:
        return {
            'status': 'ERROR',
            'has_placeholders': False,
            'has_scripts': False,
            'success': False,
            'error': str(e)
        }

def main():
    print("🔍 TESTING COMPONENT LOADING FIXES")
    print("=" * 50)
    
    success_count = 0
    total_count = len(test_pages)
    
    for page in test_pages:
        result = test_page(page)
        
        if result['success']:
            status = "✅"
            success_count += 1
        else:
            status = "❌"
        
        print(f"{status} {page}")
        print(f"   HTTP: {result['status']}")
        print(f"   Placeholders: {'✓' if result['has_placeholders'] else '✗'}")
        print(f"   Scripts: {'✓' if result['has_scripts'] else '✗'}")
        
        if 'error' in result:
            print(f"   Error: {result['error']}")
        
        print()
        time.sleep(0.1)
    
    print("=" * 50)
    print(f"📊 RESULT: {success_count}/{total_count} pages working correctly")
    
    if success_count == total_count:
        print("🎉 All pages are now working properly!")
    else:
        failed_pages = [page for page in test_pages if not test_page(page)['success']]
        print(f"❌ Pages still having issues: {', '.join(failed_pages)}")

if __name__ == "__main__":
    main()