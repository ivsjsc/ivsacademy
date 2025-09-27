const fs = require('fs');
const path = require('path');

// Đường dẫn tới các file JSON
const enJsonPath = path.join(__dirname, '../../lang/en.json');
const viJsonPath = path.join(__dirname, '../../lang/vi.json');
const zhJsonPath = path.join(__dirname, '../../lang/zh.json');
const zhCandidatePath = path.join(__dirname, '../../lang/candidates/zh.candidate.json');

// Đọc nội dung các file
const en = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
const vi = JSON.parse(fs.readFileSync(viJsonPath, 'utf8'));
const zh = JSON.parse(fs.readFileSync(zhJsonPath, 'utf8'));
const zhCandidate = JSON.parse(fs.readFileSync(zhCandidatePath, 'utf8'));

// Kiểm tra số lượng key trong mỗi file
const enKeyCount = Object.keys(en).length;
const viKeyCount = Object.keys(vi).length;
const zhKeyCount = Object.keys(zh).length;
const zhCandidateKeyCount = Object.keys(zhCandidate).length;

console.log(`Số lượng key trong en.json: ${enKeyCount}`);
console.log(`Số lượng key trong vi.json: ${viKeyCount}`);
console.log(`Số lượng key trong zh.json: ${zhKeyCount}`);
console.log(`Số lượng key trong zh.candidate.json: ${zhCandidateKeyCount}`);

// Kiểm tra key thiếu trong mỗi file
const missingInVi = Object.keys(en).filter(key => !vi[key]);
const missingInZh = Object.keys(en).filter(key => !zh[key]);
const missingInZhCandidate = Object.keys(en).filter(key => !zhCandidate[key]);

console.log(`\nKey có trong en.json nhưng thiếu trong vi.json: ${missingInVi.length}`);
if (missingInVi.length > 0) {
    console.log(missingInVi.slice(0, 10).join(', ') + (missingInVi.length > 10 ? '...' : ''));
}

console.log(`\nKey có trong en.json nhưng thiếu trong zh.json: ${missingInZh.length}`);
if (missingInZh.length > 0) {
    console.log(missingInZh.slice(0, 10).join(', ') + (missingInZh.length > 10 ? '...' : ''));
}

console.log(`\nKey có trong en.json nhưng thiếu trong zh.candidate.json: ${missingInZhCandidate.length}`);
if (missingInZhCandidate.length > 0) {
    console.log(missingInZhCandidate.slice(0, 10).join(', ') + (missingInZhCandidate.length > 10 ? '...' : ''));
}

// Kiểm tra giá trị trong zh.json có phải là tiếng Trung không
let zhValuesInVietnameseOrEnglish = 0;
let zhValuesInChinese = 0;

// Hàm kiểm tra có phải là tiếng Trung không
function isChinese(text) {
    // Kiểm tra có ký tự tiếng Trung không
    const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\uff00-\uffef\u{2f800}-\u{2fa1f}]/u;
    return chineseRegex.test(text);
}

Object.values(zh).forEach(value => {
    if (isChinese(value)) {
        zhValuesInChinese++;
    } else {
        zhValuesInVietnameseOrEnglish++;
    }
});

console.log(`\nTrong zh.json hiện tại:`);
console.log(`- Số giá trị có chữ Trung Quốc: ${zhValuesInChinese}`);
console.log(`- Số giá trị không có chữ Trung Quốc (có thể là tiếng Việt hoặc tiếng Anh): ${zhValuesInVietnameseOrEnglish}`);

// Kiểm tra giá trị trong zh.candidate.json
let zhCandidateValuesInChinese = 0;
let zhCandidateValuesNotInChinese = 0;

Object.values(zhCandidate).forEach(value => {
    if (isChinese(value)) {
        zhCandidateValuesInChinese++;
    } else {
        zhCandidateValuesNotInChinese++;
    }
});

console.log(`\nTrong zh.candidate.json:`);
console.log(`- Số giá trị có chữ Trung Quốc: ${zhCandidateValuesInChinese}`);
console.log(`- Số giá trị không có chữ Trung Quốc: ${zhCandidateValuesNotInChinese}`);

// Xuất kết luận
console.log('\n===== KẾT LUẬN =====');
console.log('File zh.candidate.json đã được tạo với nội dung tiếng Trung.');
console.log(`Tổng số key trong file gốc (en.json): ${enKeyCount}`);
console.log(`Tổng số key trong file ứng viên (zh.candidate.json): ${zhCandidateKeyCount}`);
console.log(`Số key còn thiếu trong zh.candidate.json: ${missingInZhCandidate.length}`);
console.log(`Tỷ lệ hoàn thành: ${((zhCandidateValuesInChinese / enKeyCount) * 100).toFixed(2)}%`);