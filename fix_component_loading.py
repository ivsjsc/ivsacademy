#!/usr/bin/env python3
"""
Fix component loading issues in HTML files
"""
import os
import glob
import re
from pathlib import Path

def fix_component_loading(content, is_in_pages_folder=False):
    """Fix component loading scripts in HTML files"""
    
    # Determine correct path prefix for js files
    js_path_prefix = "../js/" if is_in_pages_folder else "js/"
    
    # Standard component loading script
    standard_script = f'''<script defer src="{js_path_prefix}utils.js"></script>
<script defer src="{js_path_prefix}language.js"></script>
<script defer src="{js_path_prefix}loadComponents.js"></script>
<script defer>
    document.addEventListener('DOMContentLoaded', function() {{
        if (typeof window.loadCommonComponents === 'function') {{
            window.loadCommonComponents().then(() => {{
                console.log('Page components loaded successfully');
                
                // Initialize AOS if available
                if (typeof AOS !== 'undefined') {{
                    AOS.init({{
                        duration: 700,
                        once: true,
                        offset: 50,
                        easing: 'ease-out-cubic'
                    }});
                }}
                
                // Call page callback if exists
                if (typeof window.onPageComponentsLoadedCallback === 'function') {{
                    window.onPageComponentsLoadedCallback();
                }}
            }}).catch(error => {{
                console.error('Failed to load components:', error);
            }});
        }}
    }});
</script>'''

    # Check if file has component placeholders
    has_header_placeholder = 'id="header-placeholder"' in content
    has_footer_placeholder = 'id="footer-placeholder"' in content
    has_fab_placeholder = 'id="fab-container-placeholder"' in content
    
    if not (has_header_placeholder or has_footer_placeholder or has_fab_placeholder):
        return content, False  # No changes needed
    
    # Check if loadComponents.js is already included
    has_loadcomponents = f'{js_path_prefix}loadComponents.js' in content
    has_utils = f'{js_path_prefix}utils.js' in content
    has_language = f'{js_path_prefix}language.js' in content
    
    if has_loadcomponents and has_utils and has_language:
        return content, False  # Already has proper scripts
    
    # Find the position to insert scripts (before </body>)
    body_end = content.rfind('</body>')
    if body_end == -1:
        return content, False  # No body tag found
    
    # Remove existing problematic script patterns
    patterns_to_remove = [
        r'<script[^>]*src="[^"]*bundle\.min\.js"[^>]*></script>',
        r'<script[^>]*src="[^"]*script\.js"[^>]*></script>',
        r'<script[^>]*>[\s\S]*?window\.onPageComponentsLoadedCallback[\s\S]*?</script>',
    ]
    
    for pattern in patterns_to_remove:
        content = re.sub(pattern, '', content, flags=re.IGNORECASE)
    
    # Insert standard script before </body>
    content = content[:body_end] + standard_script + '\n' + content[body_end:]
    
    return content, True

def process_file(filepath):
    """Process a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Check if it's in pages folder
        is_in_pages = '/pages/' in str(filepath).replace('\\', '/') or '\\pages\\' in str(filepath)
        
        fixed_content, was_changed = fix_component_loading(content, is_in_pages)
        
        if was_changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            return True
        
        return False
        
    except Exception as e:
        print(f"Error processing {filepath}: {str(e)}")
        return False

def main():
    # Get all HTML files
    html_files = []
    
    # Root directory HTML files
    for file in glob.glob("*.html"):
        html_files.append(file)
    
    # Pages directory HTML files
    if os.path.exists("pages"):
        for file in glob.glob("pages/*.html"):
            html_files.append(file)
    
    # Blog directory HTML files
    if os.path.exists("Blogs"):
        for file in glob.glob("Blogs/*.html"):
            html_files.append(file)
    
    print("🔧 FIXING COMPONENT LOADING IN HTML FILES")
    print("=" * 60)
    
    fixed_count = 0
    total_count = len(html_files)
    
    for filepath in sorted(html_files):
        was_fixed = process_file(filepath)
        
        status = "✅ FIXED" if was_fixed else "⏩ SKIP"
        print(f"{status} {filepath}")
        
        if was_fixed:
            fixed_count += 1
    
    print("=" * 60)
    print(f"📊 SUMMARY:")
    print(f"   Total files checked: {total_count}")
    print(f"   Files fixed: {fixed_count}")
    print(f"   Files unchanged: {total_count - fixed_count}")
    
    if fixed_count > 0:
        print(f"\n✅ Fixed component loading in {fixed_count} files")
        print("🔄 Please refresh your browser to see changes")
    else:
        print("\n✅ All files are already properly configured")

if __name__ == "__main__":
    os.chdir("e:/IVS/Website/ivs/ivs.github.io")
    main()