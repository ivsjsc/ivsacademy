const fs = require('fs');
const path = require('path');

// Đọc các file JSON
const enJsonPath = path.join(__dirname, '../../lang/en.json');
const zhJsonPath = path.join(__dirname, '../../lang/zh.json');
const zhCandidateFullPath = path.join(__dirname, '../../lang/candidates/zh.candidate.full.json');

const en = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
const zh = JSON.parse(fs.readFileSync(zhJsonPath, 'utf8'));
const zhCandidateFull = JSON.parse(fs.readFileSync(zhCandidateFullPath, 'utf8'));

// Kiểm tra số lượng key
const enKeyCount = Object.keys(en).length;
const zhKeyCount = Object.keys(zh).length;
const zhCandidateFullKeyCount = Object.keys(zhCandidateFull).length;

console.log(`Số lượng key trong en.json: ${enKeyCount}`);
console.log(`Số lượng key trong zh.json: ${zhKeyCount}`);
console.log(`Số lượng key trong zh.candidate.full.json: ${zhCandidateFullKeyCount}`);

// Kiểm tra key thiếu
const missingInZhCandidateFull = Object.keys(en).filter(key => !zhCandidateFull[key]);

console.log(`\nKey có trong en.json nhưng thiếu trong zh.candidate.full.json: ${missingInZhCandidateFull.length}`);
if (missingInZhCandidateFull.length > 0) {
    console.log(missingInZhCandidateFull.slice(0, 10).join(', ') + (missingInZhCandidateFull.length > 10 ? '...' : ''));
}

// Tạo diff giữa zh.json hiện tại và zh.candidate.full.json
console.log('\n===== Một số mẫu thay đổi giá trị từ zh.json sang zh.candidate.full.json =====');

// Lấy 10 key đầu tiên để minh họa
let sampleCount = 0;
Object.keys(en).some(key => {
    if (zh[key] !== zhCandidateFull[key]) {
        console.log(`Key: ${key}`);
        console.log(`- zh.json: ${zh[key].substring(0, 100)}${zh[key].length > 100 ? '...' : ''}`);
        console.log(`+ zh.candidate.full.json: ${zhCandidateFull[key].substring(0, 100)}${zhCandidateFull[key].length > 100 ? '...' : ''}`);
        console.log('---');
        sampleCount++;
    }
    return sampleCount >= 10; // Chỉ hiển thị 10 mẫu
});

// Đếm số lượng key đã được dịch sang tiếng Trung trong zh.candidate.full.json
function isChinese(text) {
    const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\uff00-\uffef\u{2f800}-\u{2fa1f}]/u;
    return chineseRegex.test(text);
}

let translatedToChineseCount = 0;
Object.values(zhCandidateFull).forEach(value => {
    if (isChinese(value)) {
        translatedToChineseCount++;
    }
});

console.log(`\nSố giá trị đã được dịch sang tiếng Trung trong zh.candidate.full.json: ${translatedToChineseCount}`);
console.log(`Tỷ lệ hoàn thành: ${((translatedToChineseCount / enKeyCount) * 100).toFixed(2)}%`);

// Xuất kết luận
console.log('\n===== KẾT LUẬN =====');
console.log(`File zh.candidate.full.json đã được tạo với đầy đủ ${zhCandidateFullKeyCount} keys.`);
console.log(`Còn ${enKeyCount - translatedToChineseCount} giá trị cần được dịch sang tiếng Trung.`);
console.log('Để hoàn thành việc dịch, bạn có thể:');
console.log('1. Sử dụng dịch vụ dịch tự động (Google Translate API, DeepL, v.v.)');
console.log('2. Thuê dịch giả chuyên nghiệp để dịch các giá trị còn lại');
console.log('3. Xem xét các phương pháp hỗn hợp giữa dịch tự động và dịch thủ công');