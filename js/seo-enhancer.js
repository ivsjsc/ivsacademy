// SEO Enhancements for IVS Website
// Adds comprehensive SEO meta tags, structured data, and optimizations

class SEOEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.addStructuredData();
        this.addAdditionalMetaTags();
        this.optimizeForSearchEngines();
    }

    // Add JSON-LD structured data for better search engine understanding
    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "IVS JSC",
            "alternateName": "IVS Academy",
            "description": "Hệ sinh thái Giáo dục, Công nghệ & Nhân lực tiên phong tại Việt Nam",
            "url": "https://ivsacademy.edu.vn",
            "logo": "https://ivsacademy.edu.vn/images/logo/logo.png",
            "sameAs": [
                "https://www.facebook.com/ivsacademy.edu.vn",
                "https://www.linkedin.com/company/ivs-jsc",
                "https://www.youtube.com/@ivsacademy"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+84-28-1234-5678",
                "contactType": "customer service",
                "availableLanguage": ["Vietnamese", "English"]
            },
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "VN",
                "addressRegion": "Ho Chi Minh City",
                "addressLocality": "District 1"
            },
            "founder": {
                "@type": "Person",
                "name": "Nguyễn Minh Triết",
                "jobTitle": "CEO & Founder"
            },
            "knowsAbout": [
                "Education Technology",
                "International Education",
                "Teacher Recruitment",
                "STEM Education",
                "Language Learning",
                "Educational Consulting"
            ],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "IVS Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Educational Consulting",
                            "description": "Comprehensive educational consulting services"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": "Foreign Teacher Services",
                            "description": "Recruitment and placement of international teachers"
                        }
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                        "name": "EdTech Solutions",
                            "description": "Technology solutions for education"
                        }
                    }
                ]
            }
        };

        // Add breadcrumb structured data for inner pages
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
            this.addBreadcrumbStructuredData();
        }

        this.injectStructuredData(structuredData);
    }

    // Add breadcrumb structured data
    addBreadcrumbStructuredData() {
        const path = window.location.pathname;
        const breadcrumbs = this.generateBreadcrumbs(path);

        if (breadcrumbs.length > 1) {
            const breadcrumbData = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": breadcrumbs.map((crumb, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": crumb.name,
                    "item": "https://ivsacademy.edu.vn" + crumb.url
                }))
            };

            this.injectStructuredData(breadcrumbData);
        }
    }

    // Generate breadcrumb data from URL path
    generateBreadcrumbs(path) {
        const segments = path.split('/').filter(segment => segment);
        const breadcrumbs = [{ name: 'Home', url: '/' }];

        let currentPath = '';
        segments.forEach(segment => {
            currentPath += '/' + segment;
            const name = this.formatBreadcrumbName(segment);
            breadcrumbs.push({ name, url: currentPath });
        });

        return breadcrumbs;
    }

    // Format breadcrumb names from URL segments
    formatBreadcrumbName(segment) {
        return segment
            .replace('.html', '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    // Inject structured data into the page
    injectStructuredData(data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data, null, 2);
        document.head.appendChild(script);
    }

    // Add additional meta tags for better SEO
    addAdditionalMetaTags() {
        const metaTags = [
            // Twitter Card meta tags
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@ivsacademy' },
            { name: 'twitter:title', content: document.title },
            { name: 'twitter:description', content: this.getMetaContent('description') },
            { name: 'twitter:image', content: this.getMetaContent('og:image') },

            // Additional Open Graph tags
            { property: 'og:site_name', content: 'IVS JSC' },
            { property: 'og:locale', content: 'vi_VN' },
            { property: 'og:locale:alternate', content: 'en_US' },

            // Additional SEO meta tags
            { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
            { name: 'googlebot', content: 'index, follow' },
            { name: 'theme-color', content: '#60a5fa' },
            { name: 'msapplication-TileColor', content: '#60a5fa' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
            { name: 'apple-mobile-web-app-title', content: 'IVS JSC' },

            // Canonical URL
            { rel: 'canonical', href: window.location.origin + window.location.pathname }
        ];

        metaTags.forEach(tag => {
            if (tag.name && !document.querySelector(`meta[name="${tag.name}"]`)) {
                const meta = document.createElement('meta');
                meta.name = tag.name;
                meta.content = tag.content;
                document.head.appendChild(meta);
            } else if (tag.property && !document.querySelector(`meta[property="${tag.property}"]`)) {
                const meta = document.createElement('meta');
                meta.setAttribute('property', tag.property);
                meta.content = tag.content;
                document.head.appendChild(meta);
            } else if (tag.rel) {
                let link = document.querySelector(`link[rel="${tag.rel}"]`);
                if (!link) {
                    link = document.createElement('link');
                    link.rel = tag.rel;
                    link.href = tag.href;
                    document.head.appendChild(link);
                }
            }
        });
    }

    // Get meta content by name or property
    getMetaContent(name) {
        const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        return meta ? meta.content : '';
    }

    // Optimize for search engines
    optimizeForSearchEngines() {
        // Add hreflang tags for multi-language support
        this.addHreflangTags();

        // Add sitemap link
        this.addSitemapLink();

        // Optimize title and meta description for current page
        this.optimizePageMeta();
    }

    // Add hreflang tags for multi-language support
    addHreflangTags() {
        const hreflangTags = [
            { hreflang: 'vi', href: window.location.origin + window.location.pathname },
            { hreflang: 'en', href: window.location.origin + '/en' + window.location.pathname },
            { hreflang: 'x-default', href: window.location.origin + window.location.pathname }
        ];

        hreflangTags.forEach(tag => {
            if (!document.querySelector(`link[hreflang="${tag.hreflang}"]`)) {
                const link = document.createElement('link');
                link.rel = 'alternate';
                link.hreflang = tag.hreflang;
                link.href = tag.href;
                document.head.appendChild(link);
            }
        });
    }

    // Add sitemap link
    addSitemapLink() {
        if (!document.querySelector('link[rel="sitemap"]')) {
            const link = document.createElement('link');
            link.rel = 'sitemap';
            link.type = 'application/xml';
            link.href = '/sitemap.xml';
            document.head.appendChild(link);
        }
    }

    // Optimize page-specific meta tags
    optimizePageMeta() {
        const path = window.location.pathname;
        const pageSpecificMeta = this.getPageSpecificMeta(path);

        if (pageSpecificMeta) {
            // Update title if needed
            if (pageSpecificMeta.title && !document.title.includes(pageSpecificMeta.title)) {
                document.title = pageSpecificMeta.title;
            }

            // Update description if needed
            const descriptionMeta = document.querySelector('meta[name="description"]');
            if (pageSpecificMeta.description && descriptionMeta) {
                descriptionMeta.content = pageSpecificMeta.description;
            }

            // Update Open Graph tags
            this.updateOpenGraphTags(pageSpecificMeta);
        }
    }

    // Get page-specific meta data
    getPageSpecificMeta(path) {
        const metaMap = {
            '/': {
                title: 'IVS JSC - Hệ sinh thái Giáo dục, Công nghệ & Nhân lực',
                description: 'Khám phá hệ sinh thái giáo dục toàn diện của IVS JSC với các giải pháp EdTech, tuyển dụng giáo viên quốc tế, và tư vấn giáo dục chuyên nghiệp.',
                keywords: 'IVS JSC, giáo dục, EdTech, giáo viên quốc tế, STEM, ngôn ngữ'
            },
            '/about.html': {
                title: 'Về IVS JSC - Tầm Nhìn, Sứ Mệnh & Đội Ngũ Lãnh Đạo',
                description: 'Tìm hiểu về hành trình phát triển, triết lý Integrate-Vision-Synergy, và đội ngũ chuyên gia của IVS JSC trong lĩnh vực giáo dục.',
                keywords: 'về IVS, tầm nhìn, sứ mệnh, Nguyễn Minh Triết, đội ngũ IVS'
            },
            '/education.html': {
                title: 'Dịch Vụ Giáo Dục - IVS Academy',
                description: 'Các giải pháp giáo dục toàn diện từ IVS JSC: liên kết trường học, tuyển dụng giáo viên, và công nghệ giáo dục tiên tiến.',
                keywords: 'giáo dục, liên kết trường học, giáo viên quốc tế, EdTech'
            },
            '/solutions.html': {
                title: 'Giải Pháp Công Nghệ Giáo Dục - IVS Celestech',
                description: 'Khám phá các giải pháp công nghệ tiên tiến cho giáo dục từ IVS Celestech: phần mềm quản lý, thiết bị công nghệ, và nội thất trường học.',
                keywords: 'EdTech, công nghệ giáo dục, phần mềm quản lý, thiết bị công nghệ'
            }
        };

        return metaMap[path] || null;
    }

    // Update Open Graph tags for current page
    updateOpenGraphTags(meta) {
        const ogTags = [
            { property: 'og:title', content: meta.title },
            { property: 'og:description', content: meta.description },
            { property: 'og:url', content: window.location.href }
        ];

        ogTags.forEach(tag => {
            let ogMeta = document.querySelector(`meta[property="${tag.property}"]`);
            if (!ogMeta) {
                ogMeta = document.createElement('meta');
                ogMeta.setAttribute('property', tag.property);
                document.head.appendChild(ogMeta);
            }
            ogMeta.content = tag.content;
        });
    }

    // Add performance and SEO monitoring
    addPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('web-vitals' in window) {
            import('https://unpkg.com/web-vitals@3.1.1/dist/web-vitals.es5.min.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
            });
        }
    }
}

// Initialize SEO enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SEOEnhancer();
});

// Export for potential use in other scripts
window.IVSSEOEnhancer = SEOEnhancer;
