/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",          // Quét các file HTML/JS ở thư mục gốc
    "./src/**/*.{html,js}",   // Quét các file trong thư mục src
    "./header.html",          // File header cụ thể
    "./news-archive.html",    // File trang tin tức
    "./js/*.js"               // File JavaScript
  ],
  theme: {
    extend: {
      colors: {
        'ivs-primary': '#1D4ED8',
        'ivs-primary-dark': '#1E3A8A',
        'ivs-secondary': '#FBBF24',
        'ivs-orange-500': '#ff7a18',
        'ivs-orange-600': '#EA580C',
        'ivs-gray-600': '#4B5563',
        'ivs-gray-700': '#374151',
        'ivs-text-white': '#FFFFFF',
        'ivs-neutral-600': '#4B5563',
        'ivs-blue-400': '#60A5FA',
        'ivs-blue-600': '#2563EB',
        'header-orange': '#ff7a18',
        'ivs-blue': '#3B82F6',
        'ivs-green': '#22C55E',
        'ivs-amber': '#F59E0B',
        'ivs-bg': '#1a1a1a',
        'ivs-border': '#27272A',
        'ivs-neutral-800': '#262626',
        'ivs-text-primary': '#f4f4f5',
        'ivs-text-secondary': '#a1a1aa',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}