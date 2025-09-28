---
title: "Analytics Dashboard - IVS Academy"
description: "Dashboard phân tích và thống kê hiệu suất của IVS Academy - theo dõi tương tác người dùng và hiệu quả học tập"
layout: page.njk
permalink: /analytics.html/
cssFiles:
  - css/tailwind.css
  - css/responsive-enhancements.css
  - css/style.css
  - css/animations.css
jsFiles:
  - js/security-enhancements.js
  - js/analytics-tracking.js
  - js/accessibility-enhancements.js
  - js/utils.js
  - js/animations.js
  - js/loadComponents.js
---

<!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-ivs-text-secondary text-sm">Tổng Lượt Truy Cập</p>
                        <p class="text-2xl font-bold text-ivs-blue" id="totalPageViews">0</p>
                        <p class="text-xs text-green-500 mt-1">
                            <i class="fas fa-arrow-up mr-1"></i>+12% so với tuần trước
                        </p>
                    </div>
                    <i class="fas fa-eye text-3xl text-ivs-blue opacity-50"></i>
                </div>
            </div>

            <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-ivs-text-secondary text-sm">Tương Tác Khóa Học</p>
                        <p class="text-2xl font-bold text-ivs-green" id="courseInteractions">0</p>
                        <p class="text-xs text-green-500 mt-1">
                            <i class="fas fa-arrow-up mr-1"></i>+8% so với tuần trước
                        </p>
                    </div>
                    <i class="fas fa-book text-3xl text-ivs-green opacity-50"></i>
                </div>
            </div>

            <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-ivs-text-secondary text-sm">Tải Tài Liệu</p>
                        <p class="text-2xl font-bold text-ivs-purple" id="materialDownloads">0</p>
                        <p class="text-xs text-red-500 mt-1">
                            <i class="fas fa-arrow-down mr-1"></i>-3% so với tuần trước
                        </p>
                    </div>
                    <i class="fas fa-download text-3xl text-ivs-purple opacity-50"></i>
                </div>
            </div>

            <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-ivs-text-secondary text-sm">Hoàn Thành Quiz</p>
                        <p class="text-2xl font-bold text-ivs-orange" id="quizCompletions">0</p>
                        <p class="text-xs text-green-500 mt-1">
                            <i class="fas fa-arrow-up mr-1"></i>+15% so với tuần trước
                        </p>
                    </div>
                    <i class="fas fa-brain text-3xl text-ivs-orange opacity-50"></i>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Traffic Overview -->
            <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
                <h3 class="text-lg font-bold mb-4">Tổng Quan Lưu Lượng</h3>
                <canvas id="trafficChart" width="400" height="200"></canvas>
            </div>

            <!-- User Engagement -->
            <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
                <h3 class="text-lg font-bold mb-4">Tương Tác Người Dùng</h3>
                <canvas id="engagementChart" width="400" height="200"></canvas>
            </div>
        </div>

        <!-- Learning Analytics -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Top Courses -->
            <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
                <h3 class="text-lg font-bold mb-4">Khóa Học Phổ Biến Nhất</h3>
                <div id="topCourses" class="space-y-3">
                    <!-- Courses will be populated by JavaScript -->
                </div>
            </div>

            <!-- Learning Progress -->
            <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
                <h3 class="text-lg font-bold mb-4">Tiến Độ Học Tập</h3>
                <canvas id="progressChart" width="400" height="200"></canvas>
            </div>
        </div>

        <!-- Performance Metrics -->
        <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
            <h3 class="text-lg font-bold mb-4">Chỉ Số Hiệu Suất Website</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center">
                    <div class="text-2xl font-bold text-ivs-blue" id="avgLoadTime">0ms</div>
                    <p class="text-sm text-ivs-text-secondary">Thời Gian Tải Trung Bình</p>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-ivs-green" id="bounceRate">0%</div>
                    <p class="text-sm text-ivs-text-secondary">Tỷ Lệ Thoát Trang</p>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-ivs-purple" id="sessionDuration">0m</div>
                    <p class="text-sm text-ivs-text-secondary">Thời Gian Truy Cập Trung Bình</p>
                </div>
            </div>
        </div>

        <!-- Recent Events -->
        <div class="bg-ivs-card p-6 rounded-xl border border-ivs-border">
            <h3 class="text-lg font-bold mb-4">Sự Kiện Gần Đây</h3>
            <div id="recentEvents" class="space-y-3 max-h-96 overflow-y-auto">
                <!-- Events will be populated by JavaScript -->
            </div>
        </div>