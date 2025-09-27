// Tệp này chứa mock version của mã dịch tự động
// Trong môi trường thực tế, bạn sẽ cần sử dụng Google Translate API hoặc dịch vụ tương tự

const fs = require('fs');
const path = require('path');
const https = require('https');
const querystring = require('querystring');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Đường dẫn tới các file JSON
const zhJsonPath = path.join(__dirname, 'lang/zh.json');
const enJsonPath = path.join(__dirname, 'lang/en.json');
const outputPath = path.join(__dirname, 'lang/zh.translated_full.json');

// Đọc nội dung các file
console.log('Đang đọc file zh.json và en.json...');
const zh = JSON.parse(fs.readFileSync(zhJsonPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

// Kiểm tra các key chưa được dịch
function isChinese(text) {
  const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\uff00-\uffef\u{2f800}-\u{2fa1f}]/u;
  return chineseRegex.test(text);
}

const untranslatedKeys = Object.keys(zh).filter(key => !isChinese(zh[key]));
console.log(`Có ${untranslatedKeys.length} keys cần được dịch sang tiếng Trung.`);

// Mock function giả lập dịch tự động (trong thực tế sẽ sử dụng API)
// Chỉ để minh họa, không thực sự dịch
async function mockTranslate(text, sourceLang = 'en', targetLang = 'zh-CN') {
  // Đây chỉ là một hàm mẫu, thực tế sẽ gọi API dịch
  return new Promise((resolve) => {
    setTimeout(() => {
      // Xử lý text có thể là null hoặc undefined
      const safeText = typeof text === 'string' ? text : String(text || '');
      // Trả về chữ tiếng Trung placeholder
      resolve(`[已翻译] ${safeText.substring(0, 30)}${safeText.length > 30 ? '...' : ''}`);
    }, 100);
  });
}

// Thực hiện dịch từng key
async function translateAllKeys() {
  console.log('Quá trình này sẽ mất thời gian, tùy thuộc vào số lượng key cần dịch.');
  console.log('Trong môi trường thực tế, bạn sẽ cần sử dụng API dịch như Google Translate API.');
  
  rl.question('Bạn có muốn tiếp tục với mô phỏng dịch không? (y/n): ', async (answer) => {
    if (answer.toLowerCase() === 'y') {
      const translatedZh = { ...zh }; // Tạo bản sao của zh.json
      
      console.log('Đang dịch (mô phỏng)...');
      
      // Dịch theo batch để giảm tải API
      const batchSize = 20;
      let processed = 0;
      
      for (let i = 0; i < untranslatedKeys.length; i += batchSize) {
        const batch = untranslatedKeys.slice(i, i + batchSize);
        const promises = batch.map(async (key) => {
          // Sử dụng en[key] làm nguồn để dịch nếu có
          const sourceText = en[key] || zh[key];
          
          try {
            // Trong thực tế, gọi API dịch tại đây
            const translatedText = await mockTranslate(sourceText);
            translatedZh[key] = translatedText;
            
            // Log tiến độ
            processed++;
            if (processed % 50 === 0 || processed === untranslatedKeys.length) {
              console.log(`Đã xử lý ${processed}/${untranslatedKeys.length} keys (${(processed / untranslatedKeys.length * 100).toFixed(1)}%)`);
            }
          } catch (error) {
            console.error(`Lỗi khi dịch key "${key}":`, error.message);
            // Giữ nguyên giá trị cũ nếu có lỗi
          }
        });
        
        // Đợi batch hiện tại hoàn thành
        await Promise.all(promises);
        
        // Tạm dừng để tránh vượt quá rate limit của API
        if (i + batchSize < untranslatedKeys.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      // Ghi file kết quả
      fs.writeFileSync(outputPath, JSON.stringify(translatedZh, null, 2));
      console.log(`\nĐã hoàn thành! File kết quả được lưu tại: ${outputPath}`);
      console.log('\nLưu ý: Đây chỉ là mô phỏng dịch. Trong môi trường thực tế:');
      console.log('1. Bạn cần sử dụng API dịch thực tế như Google Translate API');
      console.log('2. Cần kiểm tra lại chất lượng dịch bởi người biết tiếng Trung');
      console.log('3. Sử dụng apply_zh_translation.js để áp dụng file đã dịch');
    } else {
      console.log('Đã hủy thao tác.');
    }
    
    rl.close();
  });
}

translateAllKeys();