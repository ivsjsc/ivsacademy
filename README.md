# IVS Academy - Hệ Sinh Thái Giáo Dục, Công Nghệ & Nhân Lực

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_NAME/deploys)

IVS Academy là nền tảng giáo dục toàn diện cung cấp các giải pháp EdTech tiên tiến, bao gồm hệ thống quản lý học tập tương tác, chatbot AI thông minh, và công cụ phân tích dữ liệu giáo dục.

## 🌟 Tính Năng Chính

### 🎓 **Nền Tảng Học Tập Tương Tác**
- Kho tài liệu học tập đa dạng với video, bài giảng, và bài tập
- Theo dõi tiến độ học tập cá nhân hóa
- Hệ thống quiz và đánh giá tương tác
- Chứng chỉ hoàn thành khóa học

### 🤖 **Chatbot AI Thông Minh**
- Hỗ trợ học tập 24/7 với phản hồi tự nhiên
- Tư vấn khóa học và lộ trình học tập
- Giải đáp thắc mắc về nội dung học tập
- Đa ngôn ngữ (Tiếng Việt, Tiếng Anh)

### 📊 **Phân Tích & Báo Cáo**
- Dashboard phân tích chi tiết hiệu suất website
- Theo dõi tương tác người dùng và khóa học
- Báo cáo tiến độ học tập
- Google Analytics 4 tích hợp

### 🔐 **Quản Lý Nội Dung**
- Giao diện quản trị viên thân thiện
- CRUD operations cho khóa học và tài liệu
- Upload và quản lý media files
- Phân quyền người dùng

### ♿ **Khả Năng Truy Cập**
- Hỗ trợ screen reader và công nghệ hỗ trợ
- Điều hướng bàn phím đầy đủ
- Chế độ tương phản cao
- Thiết kế responsive cho mọi thiết bị

## 🚀 Triển Khai

### Netlify (Khuyến Nghị)

1. **Kết nối Repository:**
   - Đăng nhập vào [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Chọn repository `ivs.github.io`
   - Cấu hình build settings:
     - **Branch:** `main`
     - **Build command:** `echo 'No build required'`
     - **Publish directory:** `.` (root)

2. **Cấu Hình Môi Trường:**
   - Thêm environment variables nếu cần:
     - `NODE_ENV = production`

3. **Domain & SSL:**
   - Netlify tự động cung cấp HTTPS
   - Cấu hình custom domain nếu có

### Local Development

```bash
# Clone repository
git clone https://github.com/ivsjsc/ivs.github.io.git
cd ivs.github.io

# Mở file index.html trong browser
# Hoặc sử dụng local server
python -m http.server 8000
# Truy cập: http://localhost:8000
```

## 📁 Cấu Trúc Project

```
ivs.github.io/
├── index.html                 # Trang chủ
├── learning-materials.html    # Nền tảng học tập
├── admin.html                 # Quản trị nội dung
├── analytics.html            # Dashboard phân tích
├── test-suite.html           # Bộ test tự động
├── components/               # Components tái sử dụng
│   ├── header.html
│   ├── footer.html
│   └── fab-container.html
├── css/                      # Stylesheets
│   ├── styles.css
│   └── responsive-enhancements.css
├── js/                       # JavaScript modules
│   ├── loadComponents.js
│   ├── language.js
│   ├── lazy-loading.js
│   ├── dark-mode-toggle.js
│   ├── seo-enhancer.js
│   ├── ai-chatbot.js
│   ├── security-enhancements.js
│   ├── content-management.js
│   ├── analytics-tracking.js
│   ├── accessibility-enhancements.js
│   └── comprehensive-testing.js
├── images/                   # Hình ảnh
├── audios/                   # Audio files
├── videos/                   # Video files
├── lang/                     # Files ngôn ngữ
├── Pages/                    # Các trang phụ
├── Blogs/                    # Blog posts
├── games/                    # Educational games
├── apps/                     # Web applications
├── netlify.toml             # Netlify config
├── _redirects               # Redirect rules
├── _headers                 # Security headers
└── README.md
```

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Framework:** Tailwind CSS
- **Icons:** Font Awesome 6
- **Charts:** Chart.js
- **Animations:** AOS (Animate On Scroll)
- **Analytics:** Google Analytics 4
- **Deployment:** Netlify
- **Version Control:** Git

## 🔧 Tối Ưu Hóa

Website đã được tối ưu hóa toàn diện:

- ✅ **Performance:** Image optimization, lazy loading, caching
- ✅ **SEO:** Meta tags, structured data, sitemap
- ✅ **Accessibility:** WCAG 2.1 AA compliant
- ✅ **Security:** CSP, XSS protection, CSRF prevention
- ✅ **Mobile:** Responsive design, touch-friendly
- ✅ **PWA:** Service worker, offline support

## 📊 Giám Sát & Bảo Trì

### Analytics Dashboard
Truy cập `/analytics.html` để xem:
- Lưu lượng truy cập
- Tương tác người dùng
- Hiệu suất khóa học
- Báo cáo chi tiết

### Testing Suite
Truy cập `/test-suite.html` để chạy:
- Performance tests
- Accessibility tests
- Security tests
- Functionality tests

### Content Management
Truy cập `/admin.html` để:
- Quản lý khóa học
- Upload tài liệu
- Chỉnh sửa nội dung
- Phân tích thống kê

## 🤝 Đóng Góp

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Tạo Pull Request

## 📄 Giấy Phép

Dự án này thuộc sở hữu của **IVS JSC**. Tất cả quyền được bảo lưu.

## 📞 Liên Hệ

**IVS JSC**
- Website: [https://ivs.edu.vn](https://ivs.edu.vn)
- Email: contact@ivs.edu.vn
- Phone: +84 xxx xxx xxx
- Address: Việt Nam

---

*Được xây dựng với ❤️ bởi IVS Development Team*