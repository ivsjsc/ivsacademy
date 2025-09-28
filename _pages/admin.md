---
title: "IVS CMS - Quản Lý Nội Dung"
description: "Hệ thống quản lý nội dung IVS Academy - Quản lý khóa học, tài liệu và nội dung giáo dục"
layout: page.njk
permalink: /admin.html/
cssFiles:
  - css/tailwind.css
  - css/responsive-enhancements.css
  - css/style.css
  - css/animations.css
jsFiles:
  - js/security-enhancements.js
  - js/content-management.js
  - js/accessibility-enhancements.js
  - js/utils.js
  - js/animations.js
  - js/loadComponents.js
---

<!-- Dashboard -->
            <div id="dashboard-section" class="content-section">
                <div class="mb-6">
                    <h2 class="text-2xl font-bold mb-2">Dashboard</h2>
                    <p class="text-ivs-text-secondary">Tổng quan về hệ thống quản lý nội dung</p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-ivs-text-secondary text-sm">Tổng Khóa Học</p>
                                <p class="text-2xl font-bold text-ivs-blue">24</p>
                            </div>
                            <i class="fas fa-book text-3xl text-ivs-blue opacity-50"></i>
                        </div>
                    </div>

                    <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-ivs-text-secondary text-sm">Tài Liệu</p>
                                <p class="text-2xl font-bold text-ivs-green">156</p>
                            </div>
                            <i class="fas fa-file-alt text-3xl text-ivs-green opacity-50"></i>
                        </div>
                    </div>

                    <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-ivs-text-secondary text-sm">Media Files</p>
                                <p class="text-2xl font-bold text-ivs-purple">89</p>
                            </div>
                            <i class="fas fa-images text-3xl text-ivs-purple opacity-50"></i>
                        </div>
                    </div>

                    <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-ivs-text-secondary text-sm">Người Dùng</p>
                                <p class="text-2xl font-bold text-ivs-orange">1,234</p>
                            </div>
                            <i class="fas fa-users text-3xl text-ivs-orange opacity-50"></i>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="bg-ivs-card rounded-xl border border-ivs-border p-6">
                    <h3 class="text-xl font-bold mb-4">Hoạt Động Gần Đây</h3>
                    <div class="space-y-4">
                        <div class="flex items-center space-x-4">
                            <div class="w-10 h-10 bg-ivs-blue rounded-lg flex items-center justify-center">
                                <i class="fas fa-plus text-white"></i>
                            </div>
                            <div class="flex-1">
                                <p class="font-semibold">Thêm khóa học mới: "Tiếng Anh Giao Tiếp"</p>
                                <p class="text-sm text-ivs-text-secondary">2 giờ trước</p>
                            </div>
                        </div>

                        <div class="flex items-center space-x-4">
                            <div class="w-10 h-10 bg-ivs-green rounded-lg flex items-center justify-center">
                                <i class="fas fa-edit text-white"></i>
                            </div>
                            <div class="flex-1">
                                <p class="font-semibold">Cập nhật tài liệu: "Grammar Guide"</p>
                                <p class="text-sm text-ivs-text-secondary">4 giờ trước</p>
                            </div>
                        </div>

                        <div class="flex items-center space-x-4">
                            <div class="w-10 h-10 bg-ivs-purple rounded-lg flex items-center justify-center">
                                <i class="fas fa-upload text-white"></i>
                            </div>
                            <div class="flex-1">
                                <p class="font-semibold">Upload video bài giảng mới</p>
                                <p class="text-sm text-ivs-text-secondary">6 giờ trước</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Courses Management -->
            <div id="courses-section" class="content-section hidden">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-2xl font-bold mb-2">Quản Lý Khóa Học</h2>
                        <p class="text-ivs-text-secondary">Tạo và chỉnh sửa các khóa học</p>
                    </div>
                    <button class="bg-ivs-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center">
                        <i class="fas fa-plus mr-2"></i>Thêm Khóa Học
                    </button>
                </div>

                <!-- Courses Table -->
                <div class="bg-ivs-card rounded-xl border border-ivs-border overflow-hidden">
                    <div class="p-6 border-b border-ivs-border">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold">Danh Sách Khóa Học</h3>
                            <div class="flex space-x-2">
                                <input type="text" placeholder="Tìm kiếm..." class="px-4 py-2 bg-ivs-bg border border-ivs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ivs-blue">
                                <select class="px-4 py-2 bg-ivs-bg border border-ivs-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ivs-blue">
                                    <option>Tất cả danh mục</option>
                                    <option>Tiếng Anh</option>
                                    <option>STEM</option>
                                    <option>Đào Tạo Giáo Viên</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-ivs-bg">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-ivs-text-secondary uppercase tracking-wider">Khóa Học</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-ivs-text-secondary uppercase tracking-wider">Danh Mục</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-ivs-text-secondary uppercase tracking-wider">Học Viên</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-ivs-text-secondary uppercase tracking-wider">Trạng Thái</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-ivs-text-secondary uppercase tracking-wider">Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-ivs-border">
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="w-10 h-10 bg-ivs-blue rounded-lg flex items-center justify-center mr-3">
                                                <i class="fas fa-language text-white"></i>
                                            </div>
                                            <div>
                                                <div class="font-semibold">Tiếng Anh Giao Tiếp</div>
                                                <div class="text-sm text-ivs-text-secondary">24 bài học</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-ivs-text-secondary">Tiếng Anh</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-ivs-text-secondary">156</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Đang hoạt động</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-ivs-blue hover:text-blue-600 mr-3">Sửa</button>
                                        <button class="text-ivs-red hover:text-red-600">Xóa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Materials Management -->
            <div id="materials-section" class="content-section hidden">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-2xl font-bold mb-2">Quản Lý Tài Liệu</h2>
                        <p class="text-ivs-text-secondary">Upload và quản lý tài liệu học tập</p>
                    </div>
                    <button class="bg-ivs-green hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center">
                        <i class="fas fa-upload mr-2"></i>Upload Tài Liệu
                    </button>
                </div>

                <!-- Materials Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border hover:border-ivs-blue transition-colors cursor-pointer">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-ivs-blue rounded-lg flex items-center justify-center">
                                <i class="fas fa-file-pdf text-white"></i>
                            </div>
                            <div class="text-right">
                                <span class="text-xs text-ivs-text-secondary">PDF</span>
                                <div class="text-xs text-ivs-text-secondary">2.3 MB</div>
                            </div>
                        </div>
                        <h3 class="font-semibold mb-2">Grammar Guide Advanced</h3>
                        <p class="text-sm text-ivs-text-secondary mb-4">Hướng dẫn ngữ pháp nâng cao cho học viên trình độ B2+</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-ivs-text-secondary">Cập nhật: 2 ngày trước</span>
                            <div class="flex space-x-2">
                                <button class="text-ivs-blue hover:text-blue-600">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="text-ivs-red hover:text-red-600">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>