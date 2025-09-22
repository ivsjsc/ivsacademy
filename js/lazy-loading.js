// Lazy Loading Implementation for IVS Website
// Adds lazy loading to images and videos for better performance

class LazyLoader {
    constructor() {
        this.init();
    }

    init() {
        this.addLazyLoadingToImages();
        this.addLazyLoadingToVideos();
        this.addResponsiveImages();
        this.initIntersectionObserver();
    }

    // Add loading="lazy" to all images that don't already have it
    addLazyLoadingToImages() {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            // Skip images that are already in viewport or critical for LCP
            if (!this.isCriticalImage(img)) {
                img.setAttribute('loading', 'lazy');
                img.setAttribute('decoding', 'async');
            }
        });
    }

    // Add lazy loading attributes to videos
    addLazyLoadingToVideos() {
        const videos = document.querySelectorAll('video:not([preload])');
        videos.forEach(video => {
            // Set preload to none for non-critical videos
            if (!this.isCriticalVideo(video)) {
                video.setAttribute('preload', 'none');
                video.setAttribute('playsinline', '');
            }
        });
    }

    // Add responsive image attributes for better performance
    addResponsiveImages() {
        const images = document.querySelectorAll('img:not([data-responsive-added])');
        images.forEach(img => {
            if (!this.isCriticalImage(img)) {
                this.makeImageResponsive(img);
                img.setAttribute('data-responsive-added', 'true');
            }
        });
    }

    // Make an image responsive with srcset and sizes
    makeImageResponsive(img) {
        const src = img.getAttribute('src');
        if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
            return; // Skip data URLs and blobs
        }

        // Create responsive breakpoints
        const breakpoints = [480, 768, 1024, 1280, 1920];
        const srcset = breakpoints.map(bp => {
            // For demo purposes, we'll use the same image but with different sizes
            // In production, you'd have actual resized versions
            return `${src} ${bp}w`;
        }).join(', ');

        // Set responsive attributes
        img.setAttribute('srcset', srcset);
        img.setAttribute('sizes', '(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw');
    }

    // Initialize Intersection Observer for custom lazy loading if needed
    initIntersectionObserver() {
        // Create intersection observer for elements that need custom lazy loading
        const lazyElements = document.querySelectorAll('[data-lazy]');

        if (lazyElements.length > 0 && 'IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyElement = entry.target;
                        this.loadElement(lazyElement);
                        observer.unobserve(lazyElement);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            lazyElements.forEach(element => {
                imageObserver.observe(element);
            });
        }
    }

    // Load lazy element when it comes into view
    loadElement(element) {
        if (element.tagName === 'IMG') {
            const src = element.getAttribute('data-src');
            if (src) {
                element.src = src;
                element.removeAttribute('data-src');
                element.classList.remove('lazy');
            }
        } else if (element.tagName === 'VIDEO') {
            const src = element.getAttribute('data-src');
            if (src) {
                element.src = src;
                element.removeAttribute('data-src');
                element.setAttribute('preload', 'metadata');
            }
        }
    }

    // Check if image is critical (above the fold, hero images, etc.)
    isCriticalImage(img) {
        // Consider images in hero sections as critical
        return img.closest('.hero-section, .hero-video, .hero-fallback-image') !== null ||
               img.classList.contains('hero-fallback-image') ||
               img.getAttribute('alt')?.toLowerCase().includes('hero');
    }

    // Check if video is critical
    isCriticalVideo(video) {
        // Consider videos in hero sections as critical
        return video.closest('.hero-section, .hero-video') !== null ||
               video.id === 'heroVideo';
    }

    // Utility method to add lazy loading to dynamically added content
    addLazyLoadingToNewContent(container) {
        const newImages = container.querySelectorAll('img:not([loading])');
        const newVideos = container.querySelectorAll('video:not([preload])');

        newImages.forEach(img => {
            if (!this.isCriticalImage(img)) {
                img.setAttribute('loading', 'lazy');
                img.setAttribute('decoding', 'async');
            }
        });

        newVideos.forEach(video => {
            if (!this.isCriticalVideo(video)) {
                video.setAttribute('preload', 'none');
                video.setAttribute('playsinline', '');
            }
        });
    }
}

// Performance optimization: Preload critical resources
class ResourcePreloader {
    constructor() {
        this.init();
    }

    init() {
        // Preload critical images
        this.preloadCriticalImages();

        // Preload critical fonts
        this.preloadCriticalFonts();
    }

    preloadCriticalImages() {
        const criticalImages = [
            'https://storage.googleapis.com/ivs-public-assets/images/banners/ivs_about_og.jpg',
            'https://storage.googleapis.com/ivs-public-assets/images/logo/ivs_logo_32.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    preloadCriticalFonts() {
        // Preload critical font files
        const fontUrls = [
            'https://fonts.gstatic.com/s/bevietnampro/v11/QdVNSTAEDuoRm3wTJp6AG0aef-2kgenH8x2WtVHg.woff2',
            'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFd2JQEk.woff2'
        ];

        fontUrls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.href = url;
            document.head.appendChild(link);
        });
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LazyLoader();
    new ResourcePreloader();
});

// Export for potential use in other scripts
window.IVSLazyLoader = LazyLoader;
window.IFSResourcePreloader = ResourcePreloader;