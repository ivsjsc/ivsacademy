#!/usr/bin/env python3
"""
Fix common issues in HTML files
"""
import os
import glob
import re
from pathlib import Path

def fix_encoding_issues(content):
    """Fix common Vietnamese encoding issues"""
    fixes = {
        'Ã¡': 'á', 'Ã ': 'à', 'áº£': 'ả', 'Ãª': 'ê', 'Ã©': 'é',
        'áº¿': 'ế', 'áº¹': 'ẹ', 'áº½': 'ẽ', 'áº»': 'ề', 'Ã­': 'í',
        'Ã¬': 'ì', 'áº»': 'ỉ', 'Ã³': 'ó', 'Ã²': 'ò', 'áº¿': 'ỏ',
        'Ãº': 'ú', 'Ã¹': 'ù', 'áº»': 'ủ', 'áº¿': 'ů', 'áº½': 'ỳ',
        'áº»': 'ý', 'áº¿': 'ỷ', 'áº½': 'ỹ', 'áº·': 'ạ', 'áº±': 'ằ',
        'áº¯': 'ắ', 'áº³': 'ẳ', 'áº½': 'ẵ', 'áº·': 'ặ', 'áº¡': 'ạ',
        '├í': 'á', '├á': 'à', '├í': 'ả', '├¬': 'â', '├¬': 'ầ',
        '├¬': 'ấ', '├¬': 'ẩ', '├¬': 'ẫ', '├¬': 'ậ', '├í': 'ä',
        '├ª': 'ê', '├⌐': 'é', '├¿': 'è', '├¬': 'ể', '├¬': 'ế',
        '├¬': 'ề', '├¬': 'ễ', '├¬': 'ệ', '├¼': 'ì', '├¡': 'í',
        '├¬': 'ỉ', '├¬': 'ĩ', '├¬': 'ị', '├┤': 'ô', '├│': 'ó',
        '├▓': 'ò', '├¬': 'ỏ', '├¬': 'õ', '├¬': 'ọ', '├¬': 'ồ',
        '├¬': 'ố', '├¬': 'ổ', '├¬': 'ỗ', '├¬': 'ộ', '├╢': 'ö',
        '├║': 'ú', '├╣': 'ù', '├¬': 'ủ', '├¬': 'ũ', '├¬': 'ụ',
        '├¢': 'ư', '├¬': 'ừ', '├¬': 'ứ', '├¬': 'ử', '├¬': 'ữ',
        '├¬': 'ự', '├╝': 'ü', '├╜': 'ý', '├¬': 'ỳ', '├¬': 'ỷ',
        '├¬': 'ỹ', '├¬': 'ỵ', '─æ': 'đ', '─Æ': 'Đ',
        'β•ª': 'ề', 'β•¡': 'ạ', 'β•º': 'ầ', 'β•¬': 'ộ', 'β•Ñ': 'ỗ',
        'β•ç': 'ứ', 'β•¥': 'ạ', 'β•¼': 'ằ', 'β•í': 'á', 'β•áº': 'ẩ',
        'β•┐': 'ũ', 'β•ò': 'ứ', 'β•¢': 'ạ', 'β•║': 'ọ', 'β•Ñ': 'ờ',
        'Ñ': 'ồ', 'ç': 'ứ', '╗': 'ụ', '├': 'ì', '▓': 'ò', '┐': 'ù',
        '¬': 'ì', '║': 'ọ', '╝': 'ũ', '┤': 'ô', '┼': 'í', 'Ω': 'Ω'
    }
    
    result = content
    for wrong, correct in fixes.items():
        result = result.replace(wrong, correct)
    
    return result

def check_file_issues(filepath):
    """Check specific issues in a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        issues = []
        fixes_applied = False
        
        # Check encoding issues
        if any(char in content for char in ['├', '╗', 'β•', 'Ñ']):
            issues.append("Encoding issues detected")
            # Fix encoding
            fixed_content = fix_encoding_issues(content)
            if fixed_content != content:
                with open(filepath, 'w', encoding='utf-8', errors='replace') as f:
                    f.write(fixed_content)
                fixes_applied = True
                issues.append("Encoding fixes applied")
        
        # Check for missing charset
        if '<meta charset' not in content.lower():
            issues.append("Missing charset declaration")
            
        # Check for missing viewport
        if '<meta name="viewport"' not in content.lower():
            issues.append("Missing viewport meta tag")
        
        return {
            'issues': issues,
            'fixes_applied': fixes_applied
        }
        
    except Exception as e:
        return {
            'issues': [f"File read error: {str(e)}"],
            'fixes_applied': False
        }

def main():
    # Get all HTML files
    html_files = glob.glob("*.html")
    html_files.sort()
    
    print("🔧 FIXING HTML FILES")
    print("=" * 50)
    
    fixed_count = 0
    
    for filename in html_files:
        result = check_file_issues(filename)
        
        if result['issues']:
            print(f"📄 {filename}")
            for issue in result['issues']:
                print(f"   • {issue}")
            
            if result['fixes_applied']:
                fixed_count += 1
                print(f"   ✅ Fixes applied")
            print()
    
    print("=" * 50)
    if fixed_count > 0:
        print(f"✅ Fixed {fixed_count} files")
        print("🔄 Please refresh your browser to see changes")
    else:
        print("✅ No files needed fixing")

if __name__ == "__main__":
    os.chdir("e:/IVS/Website/ivs/ivs.github.io")
    main()