---
title: ""
description: "Khám phá Thư viện số của IVS JSC: Một hệ sinh thái gồm tài liệu giáo dục, kho truyện, bộ ứng dụng và trò chơi sáng tạo."
layout: page.njk
permalink: /gallery.html/
cssFiles:
  - css/tailwind.css
  - css/style.css
  - css/animations.css
jsFiles:
  - js/language.js
  - js/fabController.js
  - js/loadComponents.js
---

<!-- Hero Section -->
        <section class="relative bg-primary text-white overflow-hidden" aria-labelledby="gallery-title">
            <div class="absolute inset-0 bg-cover bg-center opacity-10" style="background-image: url('/images/backgrounds/library-bg.webp');"></div>
            <div class="container mx-auto px-4 py-24 md:py-36 text-center relative z-10" data-aos="fade-in">
                <h1 id="gallery-title" class="section-title text-4xl md:text-6xl font-bold mb-4 hero-text-shadow" data-lang-key="gallery_hero_title">Chào Mừng Đến Thư Viện Số IVS</h1>
                <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90" data-lang-key="gallery_hero_subtitle">
                    Hệ sinh thái tài nguyên giáo dục, nơi tri thức, sáng tạo và công nghệ giao thoa.
                </p>
            </div>
        </section>

        <!-- Hub Section -->
        <section class="py-16 md:py-24" aria-labelledby="hub-title">
            <div class="container mx-auto px-4">
                <div class="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
                    <h2 id="hub-title" class="section-title text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-4" data-lang-key="gallery_overview_title">Cổng Thông Tin Tri Thức</h2>
                    <p class="text-base md:text-lg" data-lang-key="gallery_overview_desc">Khám phá 4 chuyên mục cốt lõi được xây dựng để phục vụ nhu cầu học tập, giảng dạy và phát triển toàn diện.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <!-- Documents Card -->
                    <div class="hub-card bg-white dark:bg-neutral-800 p-8 rounded-xl text-center" data-aos="fade-up" data-aos-delay="300">
                        <div class="flex items-center justify-center w-20 h-20 mx-auto mb-5 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                            <i class="fas fa-book-open text-4xl text-blue-600 dark:text-blue-400"></i>
                        </div>
                        <h3 class="section-title text-xl font-semibold mb-2 text-neutral-800 dark:text-white" data-lang-key="gallery_overview_docs_title">Tài Liệu</h3>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-6" data-lang-key="gallery_overview_docs_desc">Giáo trình, bài giảng, nghiên cứu và tài liệu tham khảo đa dạng cho mọi cấp độ.</p>
                        <a href="Pages/tailieu.html" class="font-semibold text-blue-600 dark:text-blue-400 hover:underline" data-lang-key="gallery_view_documents">Xem Tài Liệu <i class="fas fa-arrow-right text-xs ml-1"></i></a>
                    </div>
                    
                    <!-- Story Repository Card -->
                    <div class="hub-card bg-white dark:bg-neutral-800 p-8 rounded-xl text-center" data-aos="fade-up" data-aos-delay="400">
                        <div class="flex items-center justify-center w-20 h-20 mx-auto mb-5 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
                           <i class="fas fa-scroll text-4xl text-yellow-500 dark:text-yellow-400"></i>
                        </div>
                        <h3 class="section-title text-xl font-semibold mb-2 text-neutral-800 dark:text-white" data-lang-key="gallery_overview_stories_title">Kho Truyện</h3>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-6" data-lang-key="gallery_overview_stories_desc">Những câu chuyện cổ tích, tản văn và bài học cuộc sống truyền cảm hứng.</p>
                        <a href="apps/story-repository.html" class="font-semibold text-yellow-500 dark:text-yellow-400 hover:underline" data-lang-key="gallery_read_stories">Đọc Truyện <i class="fas fa-arrow-right text-xs ml-1"></i></a>
                    </div>
                    
                    <!-- IVS Games Card -->
                    <div class="hub-card bg-white dark:bg-neutral-800 p-8 rounded-xl text-center" data-aos="fade-up" data-aos-delay="200">
                        <div class="flex items-center justify-center w-20 h-20 mx-auto mb-5 bg-green-100 dark:bg-green-900/50 rounded-full">
                            <i class="fas fa-gamepad text-4xl text-green-600 dark:text-green-400"></i>
                        </div>
                        <h3 class="section-title text-xl font-semibold mb-2 text-neutral-800 dark:text-white" data-lang-key="gallery_overview_games_title">IVS Games</h3>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-6" data-lang-key="gallery_overview_games_desc">Giải trí và học hỏi qua các trò chơi giáo dục tương tác và sáng tạo.</p>
                        <a href="games/ivsgames.html" class="font-semibold text-green-600 dark:text-green-400 hover:underline" data-lang-key="gallery_play_now">Chơi Ngay <i class="fas fa-arrow-right text-xs ml-1"></i></a>
                    </div>
                    
                    <!-- IVS Apps Card -->
                    <div class="hub-card bg-white dark:bg-neutral-800 p-8 rounded-xl text-center" data-aos="fade-up" data-aos-delay="100">
                        <div class="flex items-center justify-center w-20 h-20 mx-auto mb-5 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                            <i class="fas fa-rocket text-4xl text-purple-600 dark:text-purple-400"></i>
                        </div>
                        <h3 class="section-title text-xl font-semibold mb-2 text-neutral-800 dark:text-white" data-lang-key="gallery_overview_apps_title">IVS Apps</h3>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-6" data-lang-key="gallery_overview_apps_desc">Bộ ứng dụng tiện ích và giáo dục được phát triển bởi IVS và đối tác.</p>
                        <a href="apps/ivsapps.html" class="font-semibold text-purple-600 dark:text-purple-400 hover:underline" data-lang-key="gallery_explore_now">Khám Phá <i class="fas fa-arrow-right text-xs ml-1"></i></a>
                    </div>

                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 md:py-24 bg-neutral-100 dark:bg-neutral-800/50">
            <div class="container mx-auto px-4 text-center" data-aos="fade-up">
                <h2 class="section-title text-3xl font-bold mb-4 text-primary dark:text-secondary" data-lang-key="gallery_cta_title">Cùng IVS Xây Dựng Tương Lai Giáo Dục</h2>
                <p class="text-lg max-w-3xl mx-auto mb-8 text-neutral-600 dark:text-neutral-300" data-lang-key="gallery_cta_subtitle">
                    Chúng tôi luôn chào đón các ý tưởng, tài liệu, và sự hợp tác để làm phong phú thêm kho tri thức chung.
                </p>
                <a href="contact.html" class="inline-block bg-accent hover:bg-accent-dark text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg" data-lang-key="gallery_cta_button">
                    Liên Hệ Đóng Góp
                </a>
            </div>
        </section>