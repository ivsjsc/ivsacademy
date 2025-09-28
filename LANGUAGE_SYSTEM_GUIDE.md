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
   - Được sử dụng trong HTML để đánh dấu các phần tử cần được dịch

## Cách Thức Hoạt Động

1. Khi trang web được tải, script `js/language.js` khởi tạo hệ thống ngôn ngữ.
2. Script tải file ngôn ngữ tương ứng (`en.json`, `vi.json` hoặc `zh.json`) dựa trên ngôn ngữ được lưu trong localStorage hoặc mặc định là tiếng Việt.
3. Khi ngôn ngữ được chọn, script áp dụng các bản dịch vào các phần tử HTML có attribute `data-lang-key`.

## Cách Thêm Nội Dung Mới Cần Dịch

1. **Thêm key mới vào file en.json**
   - Thêm key và giá trị tiếng Anh vào file `lang/en.json`

2. **Thêm key vào file vi.json và zh.json**
   - Thêm cùng key và giá trị tiếng Việt vào file `lang/vi.json`
   - Thêm cùng key và giá trị tiếng Trung vào file `lang/zh.json`

3. **Sử dụng key trong HTML**
   ```html
   <h1 data-lang-key="your_new_key">Default text</h1>
   ```

4. **Kiểm tra các key thiếu**
   ```
   node js/check-translations.js
   ```

## Cập Nhật Ngôn Ngữ Tiếng Trung

Nếu bạn cần cập nhật hoặc hoàn thiện bản dịch tiếng Trung:

1. **Kiểm tra tình trạng dịch hiện tại**
   ```
   node check_translations_status.js
   ```

2. **Tạo file zh.candidate.full.json từ các key hiện có**
   ```
   node create_full_zh_candidate.js
   ```

3. **Dịch các giá trị còn thiếu trong zh.candidate.full.json**
   - Có thể sử dụng API dịch tự động như Google Translate API
   - Hoặc thuê dịch giả chuyên nghiệp

4. **Áp dụng file dịch mới**
   ```
   node apply_zh_translation.js
   ```

## Lưu Ý Quan Trọng

1. **Sao lưu trước khi thay đổi**
   - Luôn tạo bản sao lưu của các file JSON trước khi thực hiện thay đổi lớn

2. **Giữ nguyên các key**
   - Không đổi tên hoặc xóa các key đã tồn tại
   - Đảm bảo tất cả các file ngôn ngữ có cùng các key

3. **Kiểm tra sau khi cập nhật**
   - Sau khi cập nhật file ngôn ngữ, kiểm tra trang web với từng ngôn ngữ để đảm bảo hiển thị đúng

4. **Tối ưu hóa kích thước file**
   - Nếu file ngôn ngữ trở nên quá lớn, xem xét chia thành nhiều file nhỏ hơn theo từng tính năng hoặc trang

## Các Công Cụ Bổ Sung

1. **Báo Cáo Chi Tiết**
   - Chạy `node check_translation_quality.js` để kiểm tra chất lượng dịch

2. **Mô Phỏng Dịch Tự Động**
   - `translate_zh_auto.js` cung cấp một mô phỏng về cách dịch tự động, cần được thay thế bằng API dịch thực tế

## Hỗ Trợ

Nếu bạn gặp vấn đề với hệ thống ngôn ngữ, hãy liên hệ với quản trị viên hệ thống.