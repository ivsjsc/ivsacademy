#!/usr/bin/env python3
"""
Script to generate IVS blog posts JSON data from Pages/blogs/ directory
"""
import os
import json
import re
from datetime import datetime
from pathlib import Path

def extract_blog_metadata(file_path):
    """Extract title, description, and other metadata from blog HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract title
        title_match = re.search(r'<title[^>]*>([^<]+)</title>', content, re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else os.path.basename(file_path).replace('.html', '')

        # Extract description (try multiple patterns)
        desc_match = re.search(r'<meta[^>]*name="description"[^>]*content="([^"]+)"', content, re.IGNORECASE)
        if not desc_match:
            # Try with data-lang-key
            desc_match = re.search(r'<meta[^>]*content="([^"]+)"[^>]*data-lang-key="[^"]*description[^"]*"[^>]*name="description"', content, re.IGNORECASE)
        if not desc_match:
            # Try og:description
            desc_match = re.search(r'<meta[^>]*property="og:description"[^>]*content="([^"]+)"', content, re.IGNORECASE)

        description = desc_match.group(1).strip() if desc_match else ""

        # Extract og:image if available
        og_image_match = re.search(r'<meta[^>]*property="og:image"[^>]*content="([^"]+)"', content, re.IGNORECASE)
        og_image = og_image_match.group(1).strip() if og_image_match else ""

        # Generate excerpt from description or body content
        if description:
            excerpt = description[:200] + "..." if len(description) > 200 else description
        else:
            # Try to extract from body content
            body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL | re.IGNORECASE)
            if body_match:
                body_content = re.sub(r'<[^>]+>', '', body_match.group(1))  # Remove HTML tags
                body_content = re.sub(r'\s+', ' ', body_content).strip()  # Clean whitespace
                excerpt = body_content[:200] + "..." if len(body_content) > 200 else body_content
            else:
                excerpt = "Bài viết từ IVS JSC"

        # Use file modification time as date
        file_stat = os.stat(file_path)
        date = datetime.fromtimestamp(file_stat.st_mtime).strftime('%Y-%m-%d')

        # Generate relative URL
        relative_path = os.path.relpath(file_path, os.path.dirname(os.path.dirname(file_path)))
        link = f"/{relative_path.replace(os.sep, '/')}"

        return {
            "title": {
                "vi": title,
                "en": title  # For now, use same title for English
            },
            "excerpt": {
                "vi": excerpt,
                "en": excerpt
            },
            "image": og_image or "/images/logo/logo.svg",  # Default to logo if no og:image
            "image_alt": {
                "vi": title,
                "en": title
            },
            "link": link,
            "date": date,
            "hot": False  # Can be set manually for featured posts
        }
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return None

def main():
    # Path to blogs directory
    blogs_dir = Path(__file__).parent / "Pages" / "blogs"

    if not blogs_dir.exists():
        print(f"Blogs directory not found: {blogs_dir}")
        return

    blog_posts = []

    # Process each HTML file in blogs directory
    for html_file in blogs_dir.glob("*.html"):
        print(f"Processing {html_file.name}...")
        metadata = extract_blog_metadata(html_file)
        if metadata:
            blog_posts.append(metadata)

    # Sort by date (newest first)
    blog_posts.sort(key=lambda x: x['date'], reverse=True)

    # Save to JSON file
    output_file = Path(__file__).parent / "ivs-blog-posts.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(blog_posts, f, ensure_ascii=False, indent=2)

    print(f"Generated {len(blog_posts)} blog posts in {output_file}")

if __name__ == "__main__":
    main()