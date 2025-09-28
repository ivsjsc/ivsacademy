---
title: ""
description: "Tổng hợp tin tức, sự kiện mới nhất từ IVS JSC và các nguồn tin uy tín về Giáo dục, Kinh tế, Công nghệ, Dịch vụ công."
layout: page.njk
permalink: /news-archive.html/
cssFiles:
  - css/tailwind.css
  - css/styles.css
  - dist/output.css
  - css/style.css
  - css/animations.css
jsFiles:
  - js/language.js
  - js/fabController.js
  - js/loadComponents.js
  - ./js/script.js
  - ./js/posts-loader.js
  - ./js/rss-loader.js
---

<section class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20 md:py-32 overflow-hidden rounded-b-3xl shadow-xl">
            <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('/images/banners/news_hero_banner.webp');" onerror="this.style.backgroundImage='url(https://placehold.co/1920x400/003366/ffffff?text=IVS+D%E1%BB%8Bch+V%E1%BB%A5+C%C3%B4ng+%26+Tin+T%E1%BB%A9c)'; this.classList.add('bg-slate-700');"></div>
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 hero-text-shadow" data-lang-key="news_archive_main_title" data-aos="fade-down">IVS News - Dịch vụ công & Tin tức</h1>
                <p class="text-lg md:text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto hero-text-shadow" data-lang-key="news_archive_subtitle_updated" data-aos="fade-up" data-aos-delay="200">
                    Cập nhật thông tin Dịch vụ công và các tin tức mới nhất về IVS, giáo dục, kinh tế, công nghệ.
                </p>
            </div>
        </section>

        <section class="py-12 md:py-16 bg-white dark:bg-slate-800 shadow-md my-8 mx-auto max-w-7xl rounded-xl">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-8 flex flex-wrap justify-center gap-2 md:gap-4 border-b border-gray-300 dark:border-gray-700 pb-4" role="tablist" aria-orientation="horizontal">
                    <button class="tab-button font-semibold py-2 px-4 rounded-t-md border-b-2 transition-colors duration-300 hover:text-header-orange dark:hover:text-orange-400" data-tab="public-services-news" data-lang-key="tab_public_services_news" role="tab" aria-selected="true" aria-controls="public-services-news-panel">
                        <i class="fas fa-building mr-2"></i>Dịch vụ công
                    </button>
                    <button class="tab-button font-semibold py-2 px-4 rounded-t-md border-b-2 border-transparent transition-colors duration-300 hover:text-header-orange dark:hover:text-orange-400" data-tab="ivs-news" data-lang-key="tab_ivs_news" role="tab" aria-selected="false" aria-controls="ivs-news-panel">
                        <i class="fas fa-newspaper mr-2"></i>Tin IVS
                    </button>
                    <button class="tab-button font-semibold py-2 px-4 rounded-t-md border-b-2 border-transparent transition-colors duration-300 hover:text-header-orange dark:hover:text-orange-400" data-tab="education-news" data-lang-key="tab_news" role="tab" aria-selected="false" aria-controls="education-news-panel">
                        <i class="fas fa-graduation-cap mr-2"></i>Tin tức tổng hợp
                    </button>
                </div>

                <div id="news-content-area">
                    <div id="public-services-news-panel" class="tab-content min-h-content tab-panel-active-styles" role="tabpanel" aria-labelledby="public-services-news-tab">
                        <div class="mb-10">
                            <h3 class="text-xl md:text-2xl font-semibold text-primary dark:text-blue-400 mb-6 text-center" data-lang-key="featured_public_services_title">Cổng Dịch Vụ Công Nổi Bật</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                <a href="https://dichvucong.gov.vn/" target="_blank" rel="noopener noreferrer" class="service-link-card group">
                                    <i class="fas fa-landmark group-hover:text-header-orange transition-colors"></i>
                                    <span data-lang-key="service_national_portal">Cổng Dịch vụ công Quốc gia</span>
                                </a>
                                <a href="https://moit.gov.vn/" target="_blank" rel="noopener noreferrer" class="service-link-card group">
                                    <i class="fas fa-industry group-hover:text-header-orange transition-colors"></i>
                                    <span data-lang-key="service_moit">Bộ Công Thương</span>
                                </a>
                                <a href="https://canhan.gdt.gov.vn/" target="_blank" rel="noopener noreferrer" class="service-link-card group">
                                    <i class="fas fa-file-invoice-dollar group-hover:text-header-orange transition-colors"></i>
                                    <span data-lang-key="service_etax">Thuế điện tử (eTax)</span>
                                </a>
                                <a href="https://baohiemxahoi.gov.vn/" target="_blank" rel="noopener noreferrer" class="service-link-card group">
                                    <i class="fas fa-shield-alt group-hover:text-header-orange transition-colors"></i>
                                    <span data-lang-key="service_vss">Bảo hiểm Xã hội Việt Nam</span>
                                </a>
                                <a href="https://vssid.gov.vn/" target="_blank" rel="noopener noreferrer" class="service-link-card group">
                                    <i class="fas fa-mobile-alt group-hover:text-header-orange transition-colors"></i>
                                    <span data-lang-key="service_vssid">VssID - BHXH Số</span>
                                </a>
                                <a href="https://dangkykinhdoanh.gov.vn/" target="_blank" rel="noopener noreferrer" class="service-link-card group">
                                    <i class="fas fa-briefcase group-hover:text-header-orange transition-colors"></i>
                                    <span data-lang-key="service_business_registration">Đăng ký kinh doanh</span>
                                </a>
                                <a href="https://htkk.gdt.gov.vn/" target="_blank" rel="noopener noreferrer" class="service-link-card group">
                                    <i class="fas fa-calculator group-hover:text-header-orange transition-colors"></i>
                                    <span data-lang-key="service_htkk">Hỗ trợ kê khai (HTKK)</span>
                                </a>
                                 <a href="https://csdlqgvedancu.gov.vn/" target="_blank" rel="noopener noreferrer" class="service-link-card group">
                                    <i class="fas fa-id-card group-hover:text-header-orange transition-colors"></i>
                                    <span data-lang-key="service_national_population_db">CSDL Quốc gia về Dân cư</span>
                                </a>
                            </div>
                        </div>
                        
                        <h2 class="text-2xl md:text-3xl font-bold text-primary dark:text-blue-400 mb-6 border-t border-gray-300 dark:border-gray-700 pt-6" data-lang-key="public_services_section_title_main">Tin tức Dịch vụ công</h2>
                        <div id="public-services-news-rss-container" class="min-h-[200px]">
                             <p class="text-gray-500 dark:text-gray-400 col-span-full text-center py-10" aria-busy="true" data-lang-key="loading_public_services_news">Đang tải tin Dịch vụ công...</p>
                        </div>
                    </div>
                    <div id="ivs-news-panel" class="tab-content min-h-content hidden" role="tabpanel" aria-labelledby="ivs-news-tab">
                        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6" data-lang-key="ivs_news_section_title">Tin tức từ IVS JSC</h2>
                        <div id="ivs-news-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[200px]">
                            <p class="text-gray-500 dark:text-gray-400 col-span-full text-center py-10" aria-busy="true" data-lang-key="loading_ivs_news">Đang tải tin tức IVS...</p>
                        </div>
                    </div>
                    <div id="education-news-panel" class="tab-content min-h-content hidden" role="tabpanel" aria-labelledby="education-news-tab">
                        <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6" data-lang-key="education_section_title">Tin tức Giáo dục & Đào tạo</h2>
                        <div id="education-news-rss-container" class="min-h-[200px]">
                            <p class="text-gray-500 dark:text-gray-400 col-span-full text-center py-10" aria-busy="true" data-lang-key="loading_education_news">Đang tải tin Giáo dục...</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 md:py-20 bg-primary dark:bg-blue-700 text-white text-center rounded-xl shadow-lg my-8 mx-auto max-w-7xl" data-aos="zoom-in-up">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl md:text-4xl font-bold mb-6" data-lang-key="news_cta_title">Bạn muốn nhận tin tức mới nhất từ IVS?</h2>
                <p class="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90" data-lang-key="news_cta_subtitle">
                    Đăng ký nhận bản tin của chúng tôi để không bỏ lỡ bất kỳ thông tin quan trọng nào về giáo dục, công nghệ và các sự kiện của IVS.
                </p>
                <a href="contact.html?subject=NewsletterSubscription" class="inline-block bg-secondary hover:bg-amber-500 text-primary-dark dark:text-gray-900 font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md" data-lang-key="news_cta_button">
                    Đăng Ký Ngay
                </a>
            </div>
        </section>