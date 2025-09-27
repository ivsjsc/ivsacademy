const fs = require('fs');
const path = require('path');

console.log('Bắt đầu quá trình tạo file zh.candidate.json đầy đủ...');

// Đọc các file JSON hiện có
const enJsonPath = path.join(__dirname, 'lang/en.json');
const viJsonPath = path.join(__dirname, 'lang/vi.json');
const zhCandidatePath = path.join(__dirname, 'lang/zh.candidate.json');

console.log('Đang đọc các file JSON...');
const en = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
const vi = JSON.parse(fs.readFileSync(viJsonPath, 'utf8'));
let zhCandidate = {};

// Kiểm tra xem file zh.candidate.json đã tồn tại chưa
try {
    zhCandidate = JSON.parse(fs.readFileSync(zhCandidatePath, 'utf8'));
    console.log(`Đã đọc file zh.candidate.json hiện có với ${Object.keys(zhCandidate).length} keys`);
} catch (error) {
    console.log('Không tìm thấy file zh.candidate.json hiện có, sẽ tạo mới');
    zhCandidate = {};
}

// Tạo file zh.candidate.json đầy đủ bằng cách sao chép từ en.json
// Giữ lại các giá trị tiếng Trung hiện có trong zhCandidate
const fullZhCandidate = {};

// Duyệt qua tất cả các key trong en.json
Object.keys(en).forEach(key => {
    if (zhCandidate[key]) {
        // Nếu key đã có trong zh.candidate.json hiện tại, giữ nguyên giá trị
        fullZhCandidate[key] = zhCandidate[key];
    } else {
        // Nếu key chưa có, sử dụng giá trị từ en.json làm placeholder
        // Trong thực tế, đây là nơi bạn sẽ thay thế bằng dịch tự động sang tiếng Trung
        fullZhCandidate[key] = en[key]; // Tạm thời sử dụng tiếng Anh
    }
});

// Ghi file zh.candidate.json đầy đủ
console.log('Đang ghi file zh.candidate.full.json...');
fs.writeFileSync(
    path.join(__dirname, 'lang/zh.candidate.full.json'),
    JSON.stringify(fullZhCandidate, null, 2)
);

console.log(`Hoàn thành! File zh.candidate.full.json đã được tạo với ${Object.keys(fullZhCandidate).length} keys.`);
console.log('Bước tiếp theo: Dịch các giá trị còn lại sang tiếng Trung.');