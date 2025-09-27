const fs = require('fs');
const path = require('path');

// Đọc các file JSON
const zhJsonPath = path.join(__dirname, '../../lang/zh.json');
const zhCandidateFullPath = path.join(__dirname, '../../lang/candidates/zh.candidate.full.json');

const zh = JSON.parse(fs.readFileSync(zhJsonPath, 'utf8'));
const zhCandidateFull = JSON.parse(fs.readFileSync(zhCandidateFullPath, 'utf8'));

// Kiểm tra các key có trong cả hai file
console.log('Kiểm tra các key giữa zh.json và zh.candidate.full.json:');

// Tạo danh sách các key đã được dịch sang tiếng Trung
function isChinese(text) {
  const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\uff00-\uffef\u{2f800}-\u{2fa1f}]/u;
  return chineseRegex.test(text);
}

const translatedKeysInCandidate = Object.keys(zhCandidateFull).filter(key => isChinese(zhCandidateFull[key]));
console.log(`Số key đã được dịch sang tiếng Trung trong zh.candidate.full.json: ${translatedKeysInCandidate.length}`);

// Xuất 20 mẫu dịch để kiểm tra chất lượng
console.log('\n===== MẪU DỊCH SANG TIẾNG TRUNG =====');
const samples = translatedKeysInCandidate.slice(0, Math.min(20, translatedKeysInCandidate.length));

samples.forEach((key, index) => {
  console.log(`${index + 1}. Key: ${key}`);
  console.log(`   - Tiếng Anh: ${zh[key].substring(0, 100)}${zh[key].length > 100 ? '...' : ''}`);
  console.log(`   + Tiếng Trung: ${zhCandidateFull[key].substring(0, 100)}${zhCandidateFull[key].length > 100 ? '...' : ''}`);
  console.log('');
});

// Tạo file báo cáo với danh sách các key đã được dịch
const report = {
  totalKeys: Object.keys(zhCandidateFull).length,
  translatedKeys: translatedKeysInCandidate.length,
  percentTranslated: ((translatedKeysInCandidate.length / Object.keys(zhCandidateFull).length) * 100).toFixed(2),
  translatedKeysList: translatedKeysInCandidate,
  samples: samples.reduce((acc, key) => {
    acc[key] = {
      english: zh[key],
      chinese: zhCandidateFull[key]
    };
    return acc;
  }, {})
};

// Ghi file báo cáo
fs.writeFileSync(
  path.join(__dirname, '../../lang/reports/translation_report.json'),
  JSON.stringify(report, null, 2)
);

console.log(`\nĐã tạo báo cáo chi tiết tại lang/translation_report.json`);
console.log(`Tỷ lệ dịch: ${report.percentTranslated}% (${report.translatedKeys}/${report.totalKeys} keys)`);
console.log('\nBước tiếp theo:');
console.log('1. Hoàn thành việc dịch các key còn lại theo hướng dẫn trong TRANSLATION_GUIDE_ZH.md');
console.log('2. Sau khi hoàn thành, chạy node apply_zh_translation.js để áp dụng các thay đổi');
console.log('3. Kiểm tra website với ngôn ngữ tiếng Trung để đảm bảo mọi thứ hiển thị đúng');