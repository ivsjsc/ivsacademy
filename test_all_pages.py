#!/usr/bin/env python3
"""
Test all HTML files for basic loading and common issues
"""
import os
import glob
import requests
import time
from pathlib import Path

# Base URL
BASE_URL = "http://127.0.0.1:8000"
DIRECTORY = "e:/IVS/Website/ivs/ivs.github.io"

def test_page(filename):
    """Test a single HTML page"""
    url = f"{BASE_URL}/{filename}"
    try:
        response = requests.get(url, timeout=10)
        status = response.status_code
        
        # Check for common issues
        content = response.text
        issues = []
        
        # Check encoding
        if '╗' in content or '├' in content:
            issues.append("Encoding issue detected")
            
        # Check for basic HTML structure
        if '<html' not in content.lower():
            issues.append("Missing <html> tag")
            
        if '<body' not in content.lower():
            issues.append("Missing <body> tag")
            
        # Check for JavaScript errors (basic)
        if 'console.error' in content:
            issues.append("Potential JS errors in source")
            
        # Check for CSS loading
        if 'css/tailwind.css' not in content and 'css/style.css' not in content:
            issues.append("No CSS files detected")
            
        return {
            'file': filename,
            'status': status,
            'size': len(content),
            'issues': issues,
            'success': status == 200 and len(issues) == 0
        }
        
    except Exception as e:
        return {
            'file': filename,
            'status': 'ERROR',
            'size': 0,
            'issues': [f"Request failed: {str(e)}"],
            'success': False
        }

def main():
    # Find all HTML files
    os.chdir(DIRECTORY)
    html_files = []
    
    # Get HTML files in root directory
    for file in glob.glob("*.html"):
        html_files.append(file)
    
    # Sort files
    html_files.sort()
    
    print("🔍 TESTING HTML FILES")
    print("=" * 50)
    
    results = []
    success_count = 0
    
    for filename in html_files:
        result = test_page(filename)
        results.append(result)
        
        # Print result
        status_icon = "✅" if result['success'] else "❌"
        print(f"{status_icon} {filename}")
        print(f"   Status: {result['status']}")
        print(f"   Size: {result['size']} bytes")
        
        if result['issues']:
            print(f"   Issues: {', '.join(result['issues'])}")
        
        if result['success']:
            success_count += 1
            
        print()
        time.sleep(0.1)  # Small delay to avoid overwhelming server
    
    # Summary
    print("=" * 50)
    print(f"📊 SUMMARY: {success_count}/{len(results)} files OK")
    
    # List problematic files
    problem_files = [r for r in results if not r['success']]
    if problem_files:
        print(f"\n❌ PROBLEMATIC FILES ({len(problem_files)}):")
        for file_result in problem_files:
            print(f"   {file_result['file']}: {', '.join(file_result['issues'])}")
    else:
        print("\n✅ All files are loading correctly!")

if __name__ == "__main__":
    main()