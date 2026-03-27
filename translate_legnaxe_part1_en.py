import json
import re
import sys
from pathlib import Path

from deep_translator import GoogleTranslator

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


DATA_DIR = Path("Pages/apps/story/data/novels/legnaxe_part1")
CHAPTER_PATTERN = "chapter_*.json"
MAX_CHUNK_SIZE = 3200


def split_into_chunks(text, max_size=MAX_CHUNK_SIZE):
    lines = text.split("\n")
    chunks = []
    current = []
    current_length = 0

    for line in lines:
        extra = len(line) + (1 if current else 0)
        if current and current_length + extra > max_size:
            chunks.append("\n".join(current))
            current = [line]
            current_length = len(line)
        else:
            current.append(line)
            current_length += extra

    if current:
        chunks.append("\n".join(current))

    return chunks


def translate_text(text, translator):
    translated_chunks = []
    for chunk in split_into_chunks(text):
        translated_chunks.append(translator.translate(chunk))
    return "\n".join(translated_chunks)


def parse_vi_content(content):
    lines = [line.strip() for line in content.replace("\r\n", "\n").split("\n") if line.strip()]
    chapter_label = lines[0] if lines else ""
    title_vi = lines[1] if len(lines) > 1 else ""
    note_vi = lines[2] if len(lines) > 2 and re.match(r"^\[[^\]]+\]$", lines[2]) else ""

    body_start_index = 2
    if note_vi:
        body_start_index = 3

    body_vi = "\n".join(lines[body_start_index:]).strip()
    return chapter_label, title_vi, note_vi, body_vi


def build_en_content(chapter_label_en, title_en, note_en, body_en):
    parts = [chapter_label_en, title_en]
    if note_en:
        parts.append(note_en)
    if body_en:
        parts.append(body_en)
    return "\n".join(part for part in parts if part).strip()


def main():
    translator = GoogleTranslator(source="vi", target="en")
    chapter_files = sorted(DATA_DIR.glob(CHAPTER_PATTERN))

    for chapter_file in chapter_files:
        data = json.loads(chapter_file.read_text(encoding="utf-8"))
        content_vi = str(data.get("content", "")).strip()
        chapter_label_vi, title_vi, note_vi, body_vi = parse_vi_content(content_vi)

        chapter_label_en = translator.translate(chapter_label_vi) if chapter_label_vi else ""
        title_en = translator.translate(title_vi) if title_vi else ""
        note_en = translator.translate(note_vi) if note_vi else ""
        body_en = translate_text(body_vi, translator) if body_vi else ""

        data["title_vi"] = title_vi
        data["title_en"] = title_en
        data["content_vi"] = content_vi
        data["content_en"] = build_en_content(chapter_label_en, title_en, note_en, body_en)

        chapter_file.write_text(
            json.dumps(data, ensure_ascii=False, indent=4),
            encoding="utf-8",
        )
        print(f"Translated: {chapter_file.name}")


if __name__ == "__main__":
    main()
