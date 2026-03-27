import os
import json
import docx

# Đường dẫn file docx và thư mục chương
DOCX_PATH = 'LEGNAXE.docx'
FOLDER_PATH = 'Pages/apps/story/data/novels/legnaxe_part1'

# Danh sách file chương cũ cần xóa (từ 17 đến 28 và epilogue)
FILES_TO_DELETE = [
    f'chapter_{i:02d}.json' for i in range(17, 29)
] + ['epilogue.json']

def update_folder_with_docx(docx_path, folder_path):
    doc = docx.Document(docx_path)
    full_text = [para.text for para in doc.paragraphs]
    content = '\n'.join(full_text)
    chapters = content.split('Chương ')
    intro = chapters[0]  # Phần mở đầu (nếu có)
    # Đảm bảo thư mục tồn tại
    os.makedirs(folder_path, exist_ok=True)
    for i in range(1, len(chapters)):
        chapter_content = 'Chương ' + chapters[i]
        filename = f"chapter_{i:02d}.json"
        filepath = os.path.join(folder_path, filename)
        data = {
            "chapter_number": i,
            "content": chapter_content.strip()
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
    update_folder_with_docx(DOCX_PATH, FOLDER_PATH)
    delete_old_chapter_files(FOLDER_PATH, FILES_TO_DELETE)
    print("Hoàn tất cập nhật và dọn dẹp chương truyện.")
