/**
 * Content Management System Module
 * Handles content creation, editing, and management for IVS Academy
 */

class ContentManager {
    constructor() {
        this.content = this.loadContent();
        this.currentSection = 'dashboard';
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.loadDashboardData();
        this.initializeEditors();
    }

    setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-item')) {
                e.preventDefault();
                const navItem = e.target.closest('.nav-item');
                const section = navItem.getAttribute('href').substring(1);
                this.switchSection(section);
            }
        });

        // Add content buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="add-course"]')) {
                this.showCourseModal();
            }
            if (e.target.closest('[data-action="add-material"]')) {
                this.showMaterialModal();
            }
        });

        // Edit/Delete actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="edit"]')) {
                const id = e.target.closest('[data-action="edit"]').dataset.id;
                this.editContent(id);
            }
            if (e.target.closest('[data-action="delete"]')) {
                const id = e.target.closest('[data-action="delete"]').dataset.id;
                this.deleteContent(id);
            }
        });

        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'course-form') {
                e.preventDefault();
                this.saveCourse(e.target);
            }
            if (e.target.id === 'material-form') {
                e.preventDefault();
                this.saveMaterial(e.target);
            }
        });
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[href="#${section}"]`).classList.add('active');

        // Hide all sections
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.add('hidden');
        });

        // Show selected section
        const targetSection = document.getElementById(`${section}-section`);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            this.currentSection = section;
            this.loadSectionData(section);
        }
    }

    loadSectionData(section) {
        switch (section) {
            case 'courses':
                this.loadCourses();
                break;
            case 'materials':
                this.loadMaterials();
                break;
            case 'media':
                this.loadMedia();
                break;
            case 'users':
                this.loadUsers();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
        }
    }

    loadDashboardData() {
        // Update stats
        const stats = {
            courses: this.content.courses.length,
            materials: this.content.materials.length,
            media: this.content.media.length,
            users: this.content.users.length
        };

        document.querySelector('.text-ivs-blue').textContent = stats.courses;
        document.querySelector('.text-ivs-green').textContent = stats.materials;
        document.querySelector('.text-ivs-purple').textContent = stats.media;
        document.querySelector('.text-ivs-orange').textContent = stats.users.toLocaleString();

        // Load recent activity
        this.loadRecentActivity();
    }

    loadCourses() {
        const coursesTable = document.querySelector('#courses-section tbody');
        if (!coursesTable) return;

        coursesTable.innerHTML = '';

        this.content.courses.forEach(course => {
            const row = this.createCourseRow(course);
            coursesTable.appendChild(row);
        });
    }

    createCourseRow(course) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-ivs-blue rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-${course.icon} text-white"></i>
                    </div>
                    <div>
                        <div class="font-semibold">${course.title}</div>
                        <div class="text-sm text-ivs-text-secondary">${course.lessons} bài học</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-ivs-text-secondary">${course.category}</td>
            <td class="px-6 py-4 whitespace-nowrap text-ivs-text-secondary">${course.students}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium ${course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-full">
                    ${course.status === 'active' ? 'Đang hoạt động' : 'Tạm dừng'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button data-action="edit" data-id="${course.id}" class="text-ivs-blue hover:text-blue-600 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button data-action="delete" data-id="${course.id}" class="text-ivs-red hover:text-red-600">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        return row;
    }

    loadMaterials() {
        const materialsGrid = document.querySelector('#materials-section .grid');
        if (!materialsGrid) return;

        materialsGrid.innerHTML = '';

        this.content.materials.forEach(material => {
            const card = this.createMaterialCard(material);
            materialsGrid.appendChild(card);
        });
    }

    createMaterialCard(material) {
        const card = document.createElement('div');
        card.className = 'bg-ivs-card p-6 rounded-xl border border-ivs-border hover:border-ivs-blue transition-colors cursor-pointer';

        card.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-ivs-${material.color} rounded-lg flex items-center justify-center">
                    <i class="fas fa-${material.icon} text-white"></i>
                </div>
                <div class="text-right">
                    <span class="text-xs text-ivs-text-secondary">${material.type.toUpperCase()}</span>
                    <div class="text-xs text-ivs-text-secondary">${material.size}</div>
                </div>
            </div>
            <h3 class="font-semibold mb-2">${material.title}</h3>
            <p class="text-sm text-ivs-text-secondary mb-4">${material.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-xs text-ivs-text-secondary">Cập nhật: ${material.updated}</span>
                <div class="flex space-x-2">
                    <button data-action="edit" data-id="${material.id}" class="text-ivs-blue hover:text-blue-600">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button data-action="delete" data-id="${material.id}" class="text-ivs-red hover:text-red-600">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    showCourseModal(course = null) {
        const modal = this.createModal('course-modal', course ? 'Chỉnh Sửa Khóa Học' : 'Thêm Khóa Học Mới');
        const form = this.createCourseForm(course);
        modal.querySelector('.modal-body').appendChild(form);
        document.body.appendChild(modal);
    }

    createCourseForm(course = null) {
        const form = document.createElement('form');
        form.id = 'course-form';
        form.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium mb-2">Tên Khóa Học</label>
                    <input type="text" name="title" value="${course?.title || ''}" required
                           class="w-full px-3 py-2 bg-ivs-bg border border-ivs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ivs-blue">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Danh Mục</label>
                    <select name="category" required class="w-full px-3 py-2 bg-ivs-bg border border-ivs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ivs-blue">
                        <option value="">Chọn danh mục</option>
                        <option value="Tiếng Anh" ${course?.category === 'Tiếng Anh' ? 'selected' : ''}>Tiếng Anh</option>
                        <option value="STEM" ${course?.category === 'STEM' ? 'selected' : ''}>STEM</option>
                        <option value="Đào Tạo Giáo Viên" ${course?.category === 'Đào Tạo Giáo Viên' ? 'selected' : ''}>Đào Tạo Giáo Viên</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Số Bài Học</label>
                    <input type="number" name="lessons" value="${course?.lessons || ''}" required
                           class="w-full px-3 py-2 bg-ivs-bg border border-ivs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ivs-blue">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Trạng Thái</label>
                    <select name="status" required class="w-full px-3 py-2 bg-ivs-bg border border-ivs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ivs-blue">
                        <option value="active" ${course?.status === 'active' ? 'selected' : ''}>Đang hoạt động</option>
                        <option value="inactive" ${course?.status === 'inactive' ? 'selected' : ''}>Tạm dừng</option>
                    </select>
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium mb-2">Mô Tả</label>
                    <textarea name="description" rows="4" class="w-full px-3 py-2 bg-ivs-bg border border-ivs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ivs-blue">${course?.description || ''}</textarea>
                </div>
            </div>
            <div class="flex justify-end space-x-4 mt-6">
                <button type="button" onclick="this.closest('.modal').remove()" class="px-6 py-2 border border-ivs-border rounded-lg hover:bg-ivs-border transition-colors">
                    Hủy
                </button>
                <button type="submit" class="px-6 py-2 bg-ivs-blue hover:bg-blue-600 text-white rounded-lg transition-colors">
                    ${course ? 'Cập Nhật' : 'Thêm Mới'}
                </button>
            </div>
        `;

        return form;
    }

    saveCourse(form) {
        const formData = new FormData(form);
        const courseData = {
            id: Date.now().toString(),
            title: formData.get('title'),
            category: formData.get('category'),
            lessons: parseInt(formData.get('lessons')),
            status: formData.get('status'),
            description: formData.get('description'),
            students: 0,
            icon: 'book'
        };

        // Add or update course
        const existingIndex = this.content.courses.findIndex(c => c.id === form.dataset.courseId);
        if (existingIndex >= 0) {
            courseData.id = form.dataset.courseId;
            this.content.courses[existingIndex] = courseData;
        } else {
            this.content.courses.push(courseData);
        }

        this.saveContent();
        this.loadCourses();
        document.querySelector('.modal').remove();

        this.showNotification('Khóa học đã được lưu thành công!', 'success');
    }

    showMaterialModal(material = null) {
        const modal = this.createModal('material-modal', material ? 'Chỉnh Sửa Tài Liệu' : 'Upload Tài Liệu Mới');
        const form = this.createMaterialForm(material);
        modal.querySelector('.modal-body').appendChild(form);
        document.body.appendChild(modal);
    }

    createMaterialForm(material = null) {
        const form = document.createElement('form');
        form.id = 'material-form';
        form.innerHTML = `
            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-medium mb-2">Tên Tài Liệu</label>
                    <input type="text" name="title" value="${material?.title || ''}" required
                           class="w-full px-3 py-2 bg-ivs-bg border border-ivs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ivs-blue">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Mô Tả</label>
                    <textarea name="description" rows="3" class="w-full px-3 py-2 bg-ivs-bg border border-ivs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ivs-blue">${material?.description || ''}</textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">File Upload</label>
                    <input type="file" name="file" ${material ? '' : 'required'}
                           class="w-full px-3 py-2 bg-ivs-bg border border-ivs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ivs-blue">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Loại File</label>
                        <select name="type" required class="w-full px-3 py-2 bg-ivs-bg border border-ivs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ivs-blue">
                            <option value="pdf" ${material?.type === 'pdf' ? 'selected' : ''}>PDF</option>
                            <option value="doc" ${material?.type === 'doc' ? 'selected' : ''}>Word</option>
                            <option value="ppt" ${material?.type === 'ppt' ? 'selected' : ''}>PowerPoint</option>
                            <option value="video" ${material?.type === 'video' ? 'selected' : ''}>Video</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Danh Mục</label>
                        <select name="category" required class="w-full px-3 py-2 bg-ivs-bg border border-ivs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ivs-blue">
                            <option value="Tiếng Anh" ${material?.category === 'Tiếng Anh' ? 'selected' : ''}>Tiếng Anh</option>
                            <option value="STEM" ${material?.category === 'STEM' ? 'selected' : ''}>STEM</option>
                            <option value="Tài Liệu Chung" ${material?.category === 'Tài Liệu Chung' ? 'selected' : ''}>Tài Liệu Chung</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="flex justify-end space-x-4 mt-6">
                <button type="button" onclick="this.closest('.modal').remove()" class="px-6 py-2 border border-ivs-border rounded-lg hover:bg-ivs-border transition-colors">
                    Hủy
                </button>
                <button type="submit" class="px-6 py-2 bg-ivs-green hover:bg-green-600 text-white rounded-lg transition-colors">
                    ${material ? 'Cập Nhật' : 'Upload'}
                </button>
            </div>
        `;

        return form;
    }

    createModal(id, title) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-ivs-card rounded-xl border border-ivs-border max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
                <div class="p-6 border-b border-ivs-border">
                    <h3 class="text-xl font-bold">${title}</h3>
                </div>
                <div class="modal-body p-6">
                    <!-- Form will be inserted here -->
                </div>
            </div>
        `;

        return modal;
    }

    editContent(id) {
        // Find content by ID and show appropriate modal
        const course = this.content.courses.find(c => c.id === id);
        if (course) {
            this.showCourseModal(course);
            return;
        }

        const material = this.content.materials.find(m => m.id === id);
        if (material) {
            this.showMaterialModal(material);
        }
    }

    deleteContent(id) {
        if (confirm('Bạn có chắc chắn muốn xóa nội dung này?')) {
            // Remove from courses
            this.content.courses = this.content.courses.filter(c => c.id !== id);

            // Remove from materials
            this.content.materials = this.content.materials.filter(m => m.id !== id);

            this.saveContent();
            this.loadSectionData(this.currentSection);

            this.showNotification('Nội dung đã được xóa thành công!', 'success');
        }
    }

    loadContent() {
        const saved = localStorage.getItem('ivs-cms-content');
        return saved ? JSON.parse(saved) : {
            courses: [
                {
                    id: '1',
                    title: 'Tiếng Anh Giao Tiếp',
                    category: 'Tiếng Anh',
                    lessons: 24,
                    students: 156,
                    status: 'active',
                    description: 'Khóa học tiếng Anh giao tiếp toàn diện cho người mới bắt đầu',
                    icon: 'language'
                }
            ],
            materials: [
                {
                    id: '1',
                    title: 'Grammar Guide Advanced',
                    description: 'Hướng dẫn ngữ pháp nâng cao cho học viên trình độ B2+',
                    type: 'pdf',
                    size: '2.3 MB',
                    category: 'Tiếng Anh',
                    updated: '2 ngày trước',
                    icon: 'file-pdf',
                    color: 'blue'
                }
            ],
            media: [],
            users: [],
            analytics: {}
        };
    }

    saveContent() {
        localStorage.setItem('ivs-cms-content', JSON.stringify(this.content));
    }

    loadRecentActivity() {
        const activityList = document.querySelector('.space-y-4');
        if (!activityList) return;

        const activities = [
            {
                type: 'add',
                action: 'Thêm khóa học mới: "Tiếng Anh Giao Tiếp"',
                time: '2 giờ trước',
                icon: 'plus',
                color: 'blue'
            },
            {
                type: 'edit',
                action: 'Cập nhật tài liệu: "Grammar Guide"',
                time: '4 giờ trước',
                icon: 'edit',
                color: 'green'
            },
            {
                type: 'upload',
                action: 'Upload video bài giảng mới',
                time: '6 giờ trước',
                icon: 'upload',
                color: 'purple'
            }
        ];

        activityList.innerHTML = activities.map(activity => `
            <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-ivs-${activity.color} rounded-lg flex items-center justify-center">
                    <i class="fas fa-${activity.icon} text-white"></i>
                </div>
                <div class="flex-1">
                    <p class="font-semibold">${activity.action}</p>
                    <p class="text-sm text-ivs-text-secondary">${activity.time}</p>
                </div>
            </div>
        `).join('');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-600' :
            type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        } text-white max-w-md`;

        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'} mr-3"></i>
                <span>${message}</span>
                <button class="ml-auto text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    initializeEditors() {
        // Initialize rich text editors if needed
        // This would integrate with a WYSIWYG editor like TinyMCE or Quill
    }

    // Placeholder methods for other sections
    loadMedia() {
        console.log('Loading media...');
    }

    loadUsers() {
        console.log('Loading users...');
    }

    loadAnalytics() {
        console.log('Loading analytics...');
    }
}

// Initialize CMS when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.nav-item')) {
        window.contentManager = new ContentManager();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentManager;
}