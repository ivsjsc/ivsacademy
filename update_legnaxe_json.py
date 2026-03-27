import os
import json
import docx
import re
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding='utf-8')

PROJECT_ROOT = Path(__file__).resolve().parent
PREFERRED_DOCX_PATH = Path(r'D:\IVS\2. THƯ VIỆN\Truyện\LEGNAXE\PART 1\LEGNAXE.docx')
FALLBACK_DOCX_PATH = PROJECT_ROOT / 'LEGNAXE.docx'
FOLDER_PATH = PROJECT_ROOT / 'Pages/apps/story/data/novels/legnaxe_part1'

# Danh sách file chương cũ cần xóa (từ 17 đến 28 và epilogue)
FILES_TO_DELETE = [
    f'chapter_{i:02d}.json' for i in range(17, 29)
] + ['epilogue.json']


def resolve_docx_path():
    env_path = os.environ.get('LEGNAXE_DOCX_PATH')
    candidates = []
    if env_path:
        candidates.append(Path(env_path))
    candidates.extend([PREFERRED_DOCX_PATH, FALLBACK_DOCX_PATH])

    for candidate in candidates:
        if candidate.exists():
            return candidate

    checked_paths = '\n'.join(f'- {path}' for path in candidates)
    raise FileNotFoundError(
        'Không tìm thấy file LEGNAXE.docx. Đã kiểm tra các đường dẫn:\n'
        f'{checked_paths}'
    )

def update_folder_with_docx(docx_path, folder_path):
    doc = docx.Document(docx_path)
    lines = [para.text.strip() for para in doc.paragraphs]
    chapter_heading_pattern = re.compile(r'^Chương\s+(\d+)\s*$')
    chapters = []
    current_chapter_number = None
    current_lines = []

    for line in lines:
        heading_match = chapter_heading_pattern.match(line)
        if heading_match:
            if current_chapter_number is not None:
                chapters.append((current_chapter_number, current_lines))
            current_chapter_number = int(heading_match.group(1))
            current_lines = [line]
            continue

        if current_chapter_number is not None:
            current_lines.append(line)

    if current_chapter_number is not None:
        chapters.append((current_chapter_number, current_lines))

    # Đảm bảo thư mục tồn tại
    os.makedirs(folder_path, exist_ok=True)
    for chapter_number, chapter_lines in chapters:
        chapter_content = '\n'.join(line for line in chapter_lines if line != '').strip()
        filename = f"chapter_{chapter_number:02d}.json"
        filepath = os.path.join(folder_path, filename)
        data = {
            "chapter_number": chapter_number,
            "content": chapter_content
        }
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"Đã cập nhật: {filename}")

def delete_old_chapter_files(folder_path, files_to_delete):
    for fname in files_to_delete:
        fpath = os.path.join(folder_path, fname)
        if os.path.exists(fpath):
            os.remove(fpath)
            print(f"Đã xóa: {fname}")
        else:
            print(f"Không tìm thấy: {fname}")

if __name__ == "__main__":
    docx_path = resolve_docx_path()
    print(f"Đang dùng nguồn DOCX: {docx_path}")
    update_folder_with_docx(docx_path, FOLDER_PATH)
    delete_old_chapter_files(FOLDER_PATH, FILES_TO_DELETE)
    print("Hoàn tất cập nhật và dọn dẹp chương truyện.")
