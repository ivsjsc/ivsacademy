// rss-loader.js
// This script is responsible for fetching and displaying RSS feed content.

// Global configuration for RSS feeds (moved from HTML for better separation)
// window.rssConfig will be defined in news-archive.html
// window.rssConfig = {
//     'public-services-rss-container': {
//         url: 'https://chinhphu.vn/rss/thong-tin-tong-hop.rss',
//         limit: 3
//     },
//     'education-rss-container': {
//         url: 'https://thanhnien.vn/rss/giao-duc.rss',
//         limit: 3
//     },
//     'economy-rss-container': {
//         url: 'https://thanhnien.vn/rss/kinh-te.rss',
//         limit: 3
//     },
//     'technology-rss-container': {
//         url: 'https://thanhnien.vn/rss/cong-nghe.rss',
//         limit: 3
//     },
//     'other-rss-container': {
//         url: 'https://thanhnien.vn/rss/the-gioi.rss',
//         limit: 3
//     }
// };

window.loadRssFeed = async function(containerId, feedUrl, limit) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`RSS container #${containerId} not found.`);
        return;
    }
    container.innerHTML = `<p class="text-gray-500 dark:text-gray-400 col-span-full text-center" data-lang-key="loading_news">Đang tải tin tức...</p>`; // Show loading

    try {
        // Using a proxy to bypass CORS issues for external RSS feeds
        // Note: allorigins.win is a public proxy and may not be reliable for production.
        // For production, consider setting up your own CORS proxy or fetching from your backend.
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        const items = xmlDoc.querySelectorAll('item');

        let htmlContent = '';
        let count = 0;
        items.forEach(item => {
            if (count >= limit) return;

            const title = item.querySelector('title')?.textContent || 'No Title';
            const link = item.querySelector('link')?.textContent || '#';
            const description = item.querySelector('description')?.textContent || 'No Description';
            const pubDate = item.querySelector('pubDate')?.textContent ? new Date(item.querySelector('pubDate').textContent).toLocaleDateString('vi-VN') : 'N/A';
            const imageUrlMatch = description.match(/<img[^>]+src="([^">]+)"/);
            const imageUrl = imageUrlMatch ? imageUrlMatch[1] : 'https://placehold.co/400x200/cccccc/333333?text=No+Image';

            // Clean description from HTML tags for snippet
            const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 150) + '...';

            htmlContent += `
                <div class="news-card bg-white dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <img src="${imageUrl}" alt="${title}" class="w-full h-40 object-cover rounded-t-lg" onerror="this.onerror=null; this.src='https://placehold.co/400x200/cccccc/333333?text=Image+Error';">
                    <div class="p-4 flex flex-col flex-grow">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">${title}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">${cleanDescription}</p>
                        <span class="text-xs text-gray-500 dark:text-gray-400 mb-3 block">Ngày đăng: ${pubDate}</span>
                        <a href="${link}" target="_blank" rel="noopener noreferrer" class="mt-auto inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                            Đọc thêm <i class="fas fa-arrow-right ml-1 text-xs"></i>
                        </a>
                    </div>
                </div>
            `;
            count++;
        });

        if (htmlContent === '') {
            container.innerHTML = `<p class="text-gray-500 dark:text-gray-400 col-span-full text-center" data-lang-key="no_news_available">Không có tin tức nào để hiển thị.</p>`;
        } else {
            container.innerHTML = htmlContent;
        }
    } catch (error) {
        console.error(`Error loading RSS feed for ${containerId}:`, error);
        container.innerHTML = `<p class="text-red-500 dark:text-red-400 col-span-full text-center" data-lang-key="news_load_error">Lỗi tải tin tức: ${error.message}. Vui lòng thử lại sau.</p>`;
    }
};