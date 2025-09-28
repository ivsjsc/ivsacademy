# Hướng Dẫn Sử Dụng Hệ Thống Ngôn Ngữ - IVS JSC

Tài liệu này hướng dẫn cách thiết lập, duy trì và mở rộng hệ thống đa ngôn ngữ trong trang web của IVS JSC.

## Cấu Trúc Hệ Thống Ngôn Ngữ

Hệ thống ngôn ngữ của IVS JSC bao gồm:

1. **File JSON Ngôn Ngữ**
   - `lang/en.json` - Tiếng Anh (English)
   - `lang/vi.json` - Tiếng Việt
   - `lang/zh.json` - Tiếng Trung (中文)

2. **Script Xử Lý**
   - `js/language.js` - Script chính xử lý việc tải và áp dụng bản dịch
   - `js/check-translations.js` - Công cụ kiểm tra các key thiếu trong các file ngôn ngữ
   - `check_translations_status.js` - Báo cáo tình trạng dịch của các file ngôn ngữ
   - `apply_zh_translation.js` - Công cụ áp dụng file dịch mới

3. **Data-lang-key Attributes**
   - Được sử dụng trong HTML để đánh dấu các phần tử cần được dịch (ví dụ: `data-lang-key="hero_title"`).

## Các Bước Thêm Nội Dung Mới Cần Dịch

1. **Thêm key mới vào `en.json`**
   - Thêm key và giá trị tiếng Anh vào file `lang/en.json`

2. **Cập nhật `vi.json` và `zh.json`**
   - Thêm cùng key với giá trị tiếng Việt và tiếng Trung tương ứng (hoặc để trống cho zh.json nếu chưa có dịch)

3. **Sử dụng key trong HTML**
   ```html
   <h1 data-lang-key="your_new_key">Default text</h1>
   ```

4. **Kiểm tra**
   ```
   node js/check-translations.js
   ```

## Cập Nhật Tiếng Trung

1. **Kiểm tra tình trạng dịch:**
   ```
   node check_translations_status.js
   ```

2. **Tạo zh.candidate.full.json từ en.json**
   ```
   node create_full_zh_candidate.js
   ```

3. **Dịch tự động (tùy chọn)**
   - Dùng `translate_zh_auto.js` (Google API or mock)
   - Hoặc dùng `translate_zh_deep.py` với deep-translator

4. **Áp dụng bản dịch sau khi review**
   ```
   node apply_zh_translation.js
   ```

## Lưu ý quan trọng
- Luôn sao lưu file trước khi áp dụng thay đổi lớn.
- Giữ `en.json` là nguồn chính và đồng bộ các key trên tất cả các file ngôn ngữ.
- Tránh chỉnh sửa trực tiếp `zh.json` trừ khi bạn đang áp dụng bản dịch đã được review.