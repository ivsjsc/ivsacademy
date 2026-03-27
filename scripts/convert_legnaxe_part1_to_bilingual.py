import html
import json
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator


ROOT = Path(__file__).resolve().parents[1]
NOVEL_DIR = ROOT / "Pages" / "apps" / "story" / "data" / "novels" / "legnaxe_part1"
CHAPTER_PATTERN = re.compile(r"chapter_(\d{2})\.json$")


def chapter_sort_key(path: Path) -> int:
    match = CHAPTER_PATTERN.match(path.name)
    return int(match.group(1)) if match else 999


def normalize_paragraphs(raw_content: str) -> tuple[str, str, list[str]]:
    lines = [line.strip() for line in raw_content.replace("\r\n", "\n").split("\n")]
    lines = [line for line in lines if line]

    if not lines:
        raise ValueError("Empty chapter content")

    label = lines[0]
    if not re.match(r"^(Chương|Chapter)\s+\d+", label, re.IGNORECASE):
        raise ValueError(f"Invalid chapter label: {label}")

    if len(lines) < 2:
        raise ValueError(f"Missing title after label: {label}")

    title_vi = lines[1]
    body_lines = lines[2:]

    if body_lines and re.match(r"^\[[^\]]+\]$", body_lines[0]):
        body_lines = body_lines[1:]

    return label, title_vi, body_lines


def htmlize_paragraphs(paragraphs: list[str]) -> str:
    return "".join(f"<p>{html.escape(paragraph)}</p>" for paragraph in paragraphs)


def translate_texts(texts: list[str], source: str = "vi", target: str = "en") -> list[str]:
    translator = GoogleTranslator(source=source, target=target)
    translated: list[str] = []

    for text in texts:
        stripped = text.strip()
        if not stripped:
            translated.append("")
            continue

        if stripped in {"✦  ✦  ✦", "✦ ✦ ✦"}:
            translated.append("✦  ✦  ✦")
            continue

        result = translator.translate(stripped)
        translated.append(result.strip() if isinstance(result, str) else stripped)
        time.sleep(0.15)

    return translated


def convert_file(path: Path) -> None:
    payload = json.loads(path.read_text(encoding="utf-8"))
    raw_content = payload.get("content", "").strip()
    if not raw_content:
        raise ValueError(f"Missing legacy content in {path.name}")

    chapter_number = chapter_sort_key(path)
    _, title_vi_body, body_lines_vi = normalize_paragraphs(raw_content)
    title_en_body = translate_texts([title_vi_body])[0]
    body_lines_en = translate_texts(body_lines_vi)

    normalized = {
        "chapter_id": f"chapter_{chapter_number:02d}",
        "title_en": f"Chapter {chapter_number}: {title_en_body}",
        "title_vi": f"Chương {chapter_number}: {title_vi_body}",
        "content_en": htmlize_paragraphs(body_lines_en),
        "content_vi": htmlize_paragraphs(body_lines_vi),
    }

    path.write_text(json.dumps(normalized, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Converted {path.name}")


def main() -> None:
    chapter_files = sorted(
        [
            path
            for path in NOVEL_DIR.glob("chapter_*.json")
            if CHAPTER_PATTERN.match(path.name)
        ],
        key=chapter_sort_key,
    )

    expected = [f"chapter_{index:02d}.json" for index in range(1, 17)]
    actual = [path.name for path in chapter_files]
    if actual != expected:
        raise ValueError(f"Unexpected chapter set: {actual}")

    for path in chapter_files:
        convert_file(path)


if __name__ == "__main__":
    main()
