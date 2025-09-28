---
layout: base.njk
title: IVS JSC - Hệ sinh thái Công nghệ, Giáo dục & Nhân lực - Kiến tạo Giải pháp
description: IVS JSC - Tổ chức tiên phong kiến tạo giải pháp Công nghệ, Chuyển đổi số và Tối ưu nguồn lực cho Doanh nghiệp, Giáo dục. Lập trình không giới hạn mọi ý tưởng.
keywords: IVS JSC, công nghệ, chuyển đổi số, integrate vision synergy, Nguyễn Minh Triết, giải pháp công nghệ, website, ứng dụng quản lý, IVS Celestech
permalink: /index.html
bodyClass: bg-[#0A0A0A] text-[#f4f4f5]
htmlClass: dark scroll-smooth
customStyles: |
  :root {
      --header-height: 4rem;
  }

  body {
      font-family: 'Be Vietnam Pro', sans-serif;
      overflow-x: hidden;
      padding-top: var(--header-height);
  }
---

<!-- Hero Section with Video Background -->
<section class="relative h-screen min-h-[500px] w-full overflow-hidden bg-black">
    <!-- Video Background Container with gradient overlay -->
    <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10"></div>
        <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover">
            <source src="videos/hero-bg.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>

    <!-- Hero Content -->
    <div class="container mx-auto px-4 h-full flex items-center relative z-20">
        <div class="max-w-4xl" data-aos="fade-right" data-aos-duration="1000">
            <h1 class="text-5xl md:text-7xl font-bold mb-4 text-gradient-primary leading-tight" data-lang-key="index_hero_title">
                Tích hợp. Tầm nhìn. Hiệp lực.
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl" data-lang-key="index_hero_subtitle">
                Chúng tôi kiến tạo giải pháp công nghệ tối ưu cho doanh nghiệp, tổ chức giáo dục của bạn.
            </p>
            <div class="flex flex-wrap gap-4">
                <a href="#solutions" class="btn btn-primary" data-lang-key="index_cta_solutions">Khám phá giải pháp</a>
                <a href="/about.html" class="btn btn-outline" data-lang-key="index_cta_about">Về chúng tôi</a>
            </div>
        </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white animate-bounce">
        <span class="sr-only">Scroll down</span>
        <i class="fas fa-chevron-down text-2xl"></i>
    </div>
</section>

<!-- Rest of your index content here -->