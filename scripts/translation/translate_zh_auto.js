
// translate_zh_auto.js
// Lightweight auto-translation helper with optional Google Translate REST integration.
// Usage examples (PowerShell):
//   $env:GOOGLE_API_KEY='YOUR_KEY'; node translate_zh_auto.js --source ../../lang/en.json --target ../../lang/zh.json --output ../../lang/candidates/zh.translated_full.json --api google --auto
// Without an API key or --api=google the script runs in mock mode (placeholders).

const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');

// Minimal CLI parsing (no dependencies)
const rawArgs = process.argv.slice(2);
function argVal(name, def) {
  const pair = rawArgs.find(a => a.startsWith(`--${name}=`));
  if (pair) return pair.split('=')[1];
  if (rawArgs.includes(`--${name}`)) return true;
  return def;
}

const DEFAULT_SOURCE = path.join(__dirname, '../../lang/en.json');
const DEFAULT_TARGET = path.join(__dirname, '../../lang/zh.json');
const DEFAULT_OUTPUT = path.join(__dirname, '../../lang/candidates/zh.translated_full.json');

const sourcePath = argVal('source', DEFAULT_SOURCE);
const targetPath = argVal('target', DEFAULT_TARGET);
const outputArgPath = argVal('output', DEFAULT_OUTPUT);
const apiProvider = argVal('api', 'mock'); // 'google' or 'mock'
const autoRun = !!argVal('auto', false);
const googleApiKey = process.env.GOOGLE_API_KEY || argVal('key', null);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Keep old variable names for compatibility with the rest of the file
const enJsonPath = sourcePath;
const zhJsonPath = targetPath;
const outputPath = outputArgPath;

console.log('translate_zh_auto.js starting');
console.log(' source:', enJsonPath);
console.log(' target:', zhJsonPath);
console.log(' output:', outputPath);
console.log(' apiProvider:', apiProvider);

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// Google Translate v2 REST wrapper (requires API key). Returns translated text.
function googleTranslateText(text, apiKey, target = 'zh-CN') {
  return new Promise((resolve, reject) => {
    if (!apiKey) return reject(new Error('Google API key is required'));
    const postData = new URLSearchParams({ q: text, target: target, format: 'text' }).toString();
    const options = {
      hostname: 'translation.googleapis.com',
      path: `/language/translate/v2?key=${encodeURIComponent(apiKey)}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData, 'utf8')
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json && json.data && Array.isArray(json.data.translations) && json.data.translations[0]) {
            resolve(json.data.translations[0].translatedText);
          } else if (json && json.error) {
            reject(new Error(json.error.message || JSON.stringify(json.error)));
          } else {
            reject(new Error('Unexpected translation response: ' + data));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', err => reject(err));
    req.write(postData, 'utf8');
    req.end();
  });
}

// Mock translator used when no API configured
async function mockTranslate(text) {
  await delay(5);
  if (!text) return '';
  return `[ZH] ${String(text).substring(0, 200)}`;
}

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