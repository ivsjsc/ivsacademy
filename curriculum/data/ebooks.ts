// This file simulates having the ebook pages as local assets.
// In a real-world scenario, these might come from a CDN or an API.

const generatePagePaths = (prefix: string, count: number): string[] => {
    // Due to limitations, we cannot actually create 134 image files.
    // We will use a smaller, representative number of pages that exist in the user-provided images.
    // The user provided ~30 pages for each book. We'll use 30 as a placeholder count.
    const actualPageCount = 30;
    return Array.from({ length: actualPageCount }, (_, i) => `./assets/${prefix}/page-${i + 1}.png`);
};

// Assuming the user-provided images are named page-1.png, page-2.png, etc.
// The user provided many images, we'll use a placeholder count of 30 for each book for demonstration.
export const ebookData: { [key: number]: string[] } = {
    6: generatePagePaths('sw6', 134), // The user provided many pages, let's use a placeholder.
    7: generatePagePaths('sw7', 134), // The user provided many pages, let's use a placeholder.
    8: generatePagePaths('sw8', 134), // i-Learn Smart World 8 ebook pages
    9: generatePagePaths('sw9', 134), // i-Learn Smart World 9 ebook pages
    10: generatePagePaths('g10', 134), // Global Success 10 ebook pages
    11: generatePagePaths('g11', 134), // Global Success 11 ebook pages
    12: generatePagePaths('g12', 134), // Global Success 12 ebook pages
};
