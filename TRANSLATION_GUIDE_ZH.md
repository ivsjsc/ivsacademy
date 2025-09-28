# Hướng Dẫn Hoàn Thành Dịch File zh.json

## Hiện Trạng
- File zh.candidate.full.json đã được tạo với đầy đủ 4072 keys từ file en.json
- Hiện tại chỉ có 88 keys (2.16%) đã được dịch sang tiếng Trung
- Cần dịch thêm 3984 keys còn lại

## Các Bước Tiếp Theo

### 1. Sử Dụng Dịch Vụ Dịch Tự Động
Bạn có thể sử dụng các API dịch như:
- Google Cloud Translation API
- DeepL API
- Microsoft Translator API

Dưới đây là mẫu code sử dụng Google Translate API:

```javascript
const fs = require('fs');
const path = require('path');
const { Translate } = require('@google-cloud/translate').v2;

// Cấu hình Google Cloud Translation API
const translate = new Translate({
  projectId: 'your-google-project-id',
  keyFilename: 'path/to/your/google-key.json',
});

async function translateToChineseBatch(inputFile, outputFile) {
  // Đọc file JSON đầu vào
  const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  const translatedData = {};
  
  // Lấy tất cả các keys cần dịch
  const keys = Object.keys(jsonData);
  const totalKeys = keys.length;
  
  console.log(`Bắt đầu dịch ${totalKeys} keys từ ${inputFile} sang tiếng Trung...`);
  
  // Dịch theo batch để tránh vượt quá giới hạn API
  const batchSize = 100;
  for (let i = 0; i < totalKeys; i += batchSize) {
    const batch = keys.slice(i, i + batchSize);
    const values = batch.map(key => jsonData[key]);
    
    console.log(`Đang dịch batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(totalKeys / batchSize)}...`);
    
    try {
      const [translations] = await translate.translate(values, {
        from: 'en',
        to: 'zh-CN', // Simplified Chinese
      });
      
      // Lưu kết quả dịch
      batch.forEach((key, index) => {
        translatedData[key] = translations[index];
      });
      
      // Ghi file tạm để lưu tiến độ
      fs.writeFileSync(
        outputFile.replace('.json', `_progress_${i + batch.length}.json`),
        JSON.stringify(translatedData, null, 2)
      );
      
      // Chờ 1 giây để tránh vượt quá quota API
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Lỗi khi dịch batch ${Math.floor(i / batchSize) + 1}:`, error);
    }
  }
  
  // Ghi file kết quả cuối cùng
  fs.writeFileSync(outputFile, JSON.stringify(translatedData, null, 2));
  console.log(`Hoàn thành! Kết quả đã được lưu vào ${outputFile}`);
}

// Thực thi function dịch
translateToChineseBatch(
  path.join(__dirname, 'lang/zh.candidate.full.json'),
  path.join(__dirname, 'lang/zh.translated.json')
);
```

### 2. Thuê Dịch Giả Chuyên Nghiệp
Nếu bạn cần độ chính xác cao:
- Xuất file JSON thành CSV để dịch giả làm việc dễ dàng
- Chia nhỏ công việc cho nhiều dịch giả
- Nhập lại kết quả dịch vào file JSON

### 3. Kết Hợp Dịch Tự Động và Kiểm Tra Thủ Công
- Sử dụng API dịch cho lượng lớn nội dung
- Sau đó kiểm tra và hiệu chỉnh các đoạn quan trọng bởi người biết tiếng Trung

## Kiểm Tra và Triển Khai

Sau khi hoàn thành việc dịch:
1. Kiểm tra lại file zh.translated.json bằng cách chạy:
   ```
   node check_translations_status.js
   ```

2. Kiểm tra trên trình duyệt:
   - Thay thế file zh.json bằng file zh.translated.json
   - Kiểm tra website với ngôn ngữ tiếng Trung để đảm bảo mọi thứ hiển thị đúng

3. Backup và áp dụng:
   ```bash
   cp lang/zh.json lang/zh.json.bak_before_replace
   cp lang/zh.translated.json lang/zh.json
   ```

## Lưu Ý Quan Trọng
- Đảm bảo giữ nguyên các placeholders trong văn bản (ví dụ: %s, {variable}, v.v.)
- Giữ nguyên các ký tự HTML nếu có
- Một số thuật ngữ chuyên ngành có thể cần hiệu chỉnh thủ công sau khi dịch tự động