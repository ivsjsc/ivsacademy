function getCurrentLanguage() {
    return document.documentElement.lang || 'vi';
}

window.loadPosts = async function(containerId = 'news-container', jsonPath = 'posts.json', limit = 6) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    container.innerHTML = `<p class="text-gray-500 dark:text-gray-400 col-span-full text-center" data-lang-key="loading_news">Đang tải tin tức...</p>`;

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let posts = await response.json();

        posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Lấy tối đa 'limit' tin đầu tiên
        posts = posts.slice(0, limit);

        if (posts.length === 0) {
            container.innerHTML = `<p class="text-gray-500 dark:text-gray-400 col-span-full text-center" data-lang-key="no_news_available">Không có tin tức nào để hiển thị.</p>`;
            return;
        }

        const lang = getCurrentLanguage();
        let htmlContent = '';

        posts.forEach(post => {
            const title = post.title?.[lang] || post.title?.['vi'] || 'Tiêu đề không có sẵn';
            const link = post.link || '#';
            const imageUrl = post.image || 'https://placehold.co/400x200/cccccc/333333?text=No+Image';
            const imageAlt = post.image_alt?.[lang] || post.image_alt?.['vi'] || title;
            const snippet = post.excerpt?.[lang] || post.excerpt?.['vi'] || 'Nội dung không có sẵn.';
            const date = post.date ? new Date(post.date).toLocaleDateString('vi-VN') : 'N/A';
            const hotLabel = post.hot ? `<span class="hot-badge absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">HOT</span>` : '';

            htmlContent += `
                <div class="news-card bg-white dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
                    ${hotLabel}
                    <a href="${link}" class="block">
                        <img src="${imageUrl}" alt="${imageAlt}" class="w-full h-40 object-cover rounded-t-lg" onerror="this.onerror=null; this.src='https://placehold.co/400x200/cccccc/333333?text=Image+Error';">
                    </a>
                    <div class="p-4 flex flex-col flex-grow">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
                            <a href="${link}" class="hover:text-blue-600 dark:hover:text-blue-400">${title}</a>
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">${snippet}</p>
                        <div class="mt-auto flex justify-between items-center">
                            <span class="text-xs text-gray-500 dark:text-gray-400">${date}</span>
                            <a href="${link}" rel="noopener noreferrer" class="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                                Đọc thêm <i class="fas fa-arrow-right ml-1 text-xs"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = htmlContent;
    } catch (error) {
        container.innerHTML = `<p class="text-red-500 dark:text-red-400 col-span-full text-center" data-lang-key="news_load_error">Lỗi tải tin tức. Vui lòng thử lại sau.</p>`;
    }
};
