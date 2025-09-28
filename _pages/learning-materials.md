---
title: "Tài Liệu Học Tập Tương Tác - IVS Learning Hub"
description: "Truy cập kho tài liệu học tập tương tác của IVS Academy với video bài giảng, bài tập thực hành, và theo dõi tiến độ học tập cá nhân hóa."
layout: page.njk
permalink: /learning-materials.html/
cssFiles:
  - css/tailwind.css
  - css/responsive-enhancements.css
  - css/style.css
  - css/animations.css
jsFiles:
  - js/loadComponents.js
  - js/language.js
  - js/fabController.js
  - js/lazy-loading.js
  - js/dark-mode-toggle.js
  - js/seo-enhancer.js
  - js/ai-chatbot.js
  - js/interactive-learning.js
  - js/security-enhancements.js
  - js/analytics-tracking.js
  - js/accessibility-enhancements.js
---

<section class="relative py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="relative container mx-auto px-6 lg:px-8 text-center">
            <div class="max-w-4xl mx-auto" data-aos="fade-up">
                <h1 class="text-4xl md:text-6xl font-bold font-display text-white mb-6">
                    IVS <span class="text-ivs-orange">Learning Hub</span>
                </h1>
                <p class="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                    Nền tảng học tập tương tác với hàng nghìn tài liệu, video bài giảng,<br>
                    và công cụ theo dõi tiến độ cá nhân hóa
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button class="bg-ivs-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                        <i class="fas fa-play-circle mr-2"></i>Bắt Đầu Học Tập
                    </button>
                    <button class="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                        <i class="fas fa-search mr-2"></i>Khám Phá Khóa Học
                    </button>
                </div>
            </div>
        </div>

        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-bounce"></div>
        <div class="absolute bottom-20 right-10 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-bounce" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 left-1/4 w-12 h-12 bg-green-500 rounded-full opacity-20 animate-bounce" style="animation-delay: 2s"></div>
    </section>

    <!-- Learning Dashboard -->
    <section class="py-16 bg-ivs-bg">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <!-- Progress Overview -->
                <div class="lg:col-span-2">
                    <div class="bg-ivs-card rounded-xl p-6 border border-ivs-border" data-aos="fade-up">
                        <h2 class="text-2xl font-bold mb-6 flex items-center">
                            <i class="fas fa-chart-line text-ivs-blue mr-3"></i>
                            Tiến Độ Học Tập
                        </h2>

                        <!-- Progress Stats -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-ivs-green">24</div>
                                <div class="text-sm text-ivs-text-secondary">Khóa học hoàn thành</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-ivs-blue">156</div>
                                <div class="text-sm text-ivs-text-secondary">Bài học đã học</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-ivs-purple">89%</div>
                                <div class="text-sm text-ivs-text-secondary">Điểm trung bình</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-ivs-orange">12</div>
                                <div class="text-sm text-ivs-text-secondary">Giờ học/tháng</div>
                            </div>
                        </div>

                        <!-- Progress Bar -->
                        <div class="space-y-3">
                            <div class="flex justify-between text-sm">
                                <span>Tiếng Anh Giao Tiếp</span>
                                <span>75%</span>
                            </div>
                            <div class="w-full bg-ivs-border rounded-full h-2">
                                <div class="bg-ivs-blue h-2 rounded-full" style="width: 75%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="space-y-6">
                    <div class="bg-ivs-card rounded-xl p-6 border border-ivs-border" data-aos="fade-up" data-aos-delay="100">
                        <h3 class="text-xl font-bold mb-4">Hành Động Nhanh</h3>
                        <div class="space-y-3">
                            <button class="w-full bg-ivs-blue hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center">
                                <i class="fas fa-play mr-3"></i>Tiếp tục học
                            </button>
                            <button class="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center">
                                <i class="fas fa-book mr-3"></i>Bài tập mới
                            </button>
                            <button class="w-full bg-ivs-green hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center">
                                <i class="fas fa-trophy mr-3"></i>Thành tích
                            </button>
                        </div>
                    </div>

                    <!-- Study Streak -->
                    <div class="bg-ivs-card rounded-xl p-6 border border-ivs-border" data-aos="fade-up" data-aos-delay="200">
                        <h3 class="text-xl font-bold mb-4 flex items-center">
                            <i class="fas fa-fire text-orange-500 mr-2"></i>
                            Chuỗi Học Tập
                        </h3>
                        <div class="text-center">
                            <div class="text-4xl font-bold text-ivs-orange mb-2">7</div>
                            <div class="text-sm text-ivs-text-secondary">Ngày liên tiếp</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Course Categories -->
    <section class="py-16 bg-ivs-card">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="text-center mb-12" data-aos="fade-up">
                <h2 class="text-3xl md:text-4xl font-bold font-display mb-4">Danh Mục Khóa Học</h2>
                <p class="text-xl text-ivs-text-secondary max-w-2xl mx-auto">
                    Khám phá các chủ đề học tập đa dạng từ cơ bản đến nâng cao
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- English Learning -->
                <div class="bg-ivs-bg rounded-xl p-6 border border-ivs-border hover:border-ivs-blue transition-all cursor-pointer group" data-aos="fade-up">
                    <div class="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i class="fas fa-language text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Tiếng Anh</h3>
                    <p class="text-ivs-text-secondary mb-4">Giao tiếp, học thuật, và chứng chỉ quốc tế</p>
                    <div class="flex justify-between items-center">
                        <span class="text-ivs-blue font-semibold">24 khóa học</span>
                        <i class="fas fa-arrow-right text-ivs-blue group-hover:translate-x-2 transition-transform"></i>
                    </div>
                </div>

                <!-- STEM Education -->
                <div class="bg-ivs-bg rounded-xl p-6 border border-ivs-border hover:border-ivs-green transition-all cursor-pointer group" data-aos="fade-up" data-aos-delay="100">
                    <div class="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i class="fas fa-robot text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">STEM & Công Nghệ</h3>
                    <p class="text-ivs-text-secondary mb-4">Lập trình, robotics, và khoa học ứng dụng</p>
                    <div class="flex justify-between items-center">
                        <span class="text-ivs-green font-semibold">18 khóa học</span>
                        <i class="fas fa-arrow-right text-ivs-green group-hover:translate-x-2 transition-transform"></i>
                    </div>
                </div>

                <!-- Teacher Training -->
                <div class="bg-ivs-bg rounded-xl p-6 border border-ivs-border hover:border-ivs-purple transition-all cursor-pointer group" data-aos="fade-up" data-aos-delay="200">
                    <div class="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i class="fas fa-chalkboard-teacher text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Đào Tạo Giáo Viên</h3>
                    <p class="text-ivs-text-secondary mb-4">Phương pháp giảng dạy và phát triển chuyên môn</p>
                    <div class="flex justify-between items-center">
                        <span class="text-ivs-purple font-semibold">12 khóa học</span>
                        <i class="fas fa-arrow-right text-ivs-purple group-hover:translate-x-2 transition-transform"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Interactive Features -->
    <section class="py-16 bg-ivs-bg">
        <div class="container mx-auto px-6 lg:px-8">
            <div class="text-center mb-12" data-aos="fade-up">
                <h2 class="text-3xl md:text-4xl font-bold font-display mb-4">Tính Năng Tương Tác</h2>
                <p class="text-xl text-ivs-text-secondary max-w-2xl mx-auto">
                    Học tập không chỉ là xem video, mà còn là tương tác và thực hành
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- Interactive Quiz -->
                <div class="bg-ivs-card rounded-xl p-8 border border-ivs-border" data-aos="fade-up">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-ivs-blue rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-brain text-white"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold">Bài Kiểm Tra Tương Tác</h3>
                            <p class="text-ivs-text-secondary">Kiểm tra kiến thức với câu hỏi đa dạng</p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="bg-ivs-bg p-4 rounded-lg">
                            <p class="font-semibold mb-2">Câu hỏi: What is the capital of France?</p>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input type="radio" name="quiz1" class="mr-3">
                                    <span>London</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="quiz1" class="mr-3">
                                    <span>Paris</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="quiz1" class="mr-3">
                                    <span>Berlin</span>
                                </label>
                            </div>
                        </div>
                        <button class="bg-ivs-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
                            Nộp Bài & Xem Kết Quả
                        </button>
                    </div>
                </div>

                <!-- Multimedia Content -->
                <div class="bg-ivs-card rounded-xl p-8 border border-ivs-border" data-aos="fade-up" data-aos-delay="100">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-ivs-green rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-play-circle text-white"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold">Nội Dung Đa Phương Tiện</h3>
                            <p class="text-ivs-text-secondary">Video, audio, và tài liệu tương tác</p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="aspect-video bg-ivs-bg rounded-lg flex items-center justify-center">
                            <div class="text-center">
                                <i class="fas fa-play-circle text-4xl text-ivs-blue mb-2"></i>
                                <p class="text-ivs-text-secondary">Video bài giảng: Present Perfect Tense</p>
                            </div>
                        </div>
                        <div class="flex space-x-4">
                            <button class="flex-1 bg-ivs-green hover:bg-green-600 text-white py-3 rounded-lg transition-colors">
                                <i class="fas fa-play mr-2"></i>Phát Video
                            </button>
                            <button class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors">
                                <i class="fas fa-download mr-2"></i>Tải Tài Liệu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>