const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Đường dẫn tới các file
const zhJsonPath = path.join(__dirname, 'lang/zh.json');
const zhCandidateFullPath = path.join(__dirname, 'lang/zh.candidate.full.json');
const timestamp = new Date().toISOString().replace(/[:T\-\.Z]/g, '_');
const zhBackupPath = path.join(__dirname, `lang/zh.json.backup_${timestamp}`);

console.log('Tiến hành áp dụng file zh.candidate.full.json thành zh.json mới...');

// Kiểm tra số lượng giá trị tiếng Trung trong zh.candidate.full.json
function isChinese(text) {
  const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\uff00-\uffef\u{2f800}-\u{2fa1f}]/u;
  return chineseRegex.test(text);
}

const zhCandidateFull = JSON.parse(fs.readFileSync(zhCandidateFullPath, 'utf8'));
let chineseValueCount = 0;
Object.values(zhCandidateFull).forEach(value => {
  if (isChinese(value)) {
    chineseValueCount++;
  }
});

const totalKeys = Object.keys(zhCandidateFull).length;
const percentTranslated = ((chineseValueCount / totalKeys) * 100).toFixed(2);

console.log(`File zh.candidate.full.json có ${totalKeys} keys`);
console.log(`Số lượng giá trị được dịch sang tiếng Trung: ${chineseValueCount} (${percentTranslated}%)`);

if (percentTranslated < 90) {
  console.log('\n⚠️ CẢNH BÁO: Chưa đủ 90% giá trị được dịch sang tiếng Trung.');
  console.log('Bạn nên hoàn thành việc dịch trước khi áp dụng file này.');
}

rl.question('\nBạn có muốn tiếp tục áp dụng file này không? (y/n): ', (answer) => {
  if (answer.toLowerCase() === 'y') {
    try {
      // Tạo bản sao lưu của zh.json hiện tại
      fs.copyFileSync(zhJsonPath, zhBackupPath);
      console.log(`Đã tạo bản sao lưu tại ${zhBackupPath}`);
      
      // Ghi đè zh.json bằng zh.candidate.full.json
      fs.copyFileSync(zhCandidateFullPath, zhJsonPath);
      console.log('Đã áp dụng thành công file zh.candidate.full.json thành zh.json mới!');
    } catch (error) {
      console.error('Có lỗi xảy ra:', error.message);
    }
  } else {
    console.log('Đã hủy thao tác.');
  }
  rl.close();
});