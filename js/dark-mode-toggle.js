// Dark Mode Toggle Implementation for IVS Website
// Provides consistent dark/light mode switching across all pages

class DarkModeToggle {
    constructor() {
        this.init();
    }

    init() {
        this.createToggleButton();
        this.setupEventListeners();
        this.applyInitialTheme();
    }

    // Create and inject the toggle button into the header
    createToggleButton() {
        const toggleButton = document.createElement('button');
        toggleButton.id = 'darkModeToggle';
        toggleButton.setAttribute('aria-label', 'Toggle dark mode');
        toggleButton.className = 'fixed bottom-6 right-6 z-50 p-3 bg-ivs-card hover:bg-ivs-border rounded-full shadow-lg border border-ivs-border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ivs-blue focus:ring-offset-2 focus:ring-offset-ivs-bg';

        toggleButton.innerHTML = `
            <svg id="moonIcon" class="h-5 w-5 text-ivs-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
            <svg id="sunIcon" class="h-5 w-5 text-ivs-text-primary hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.675l-.707-.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l-.707-.707M8 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
        `;

        document.body.appendChild(toggleButton);
    }

    // Setup event listeners for theme switching
    setupEventListeners() {
        const toggleButton = document.getElementById('darkModeToggle');
        if (!toggleButton) return;

        // Toggle theme on button click
        toggleButton.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Listen for system theme changes
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        prefersDarkMode.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (localStorage.getItem('theme') === null) {
                this.applyTheme(e.matches);
            }
        });

        // Add keyboard support
        toggleButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    // Apply the initial theme based on user preference or system setting
    applyInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

        let isDarkMode;
        if (savedTheme === 'dark') {
            isDarkMode = true;
        } else if (savedTheme === 'light') {
            isDarkMode = false;
        } else {
            // No saved preference, use system preference
            isDarkMode = prefersDarkMode.matches;
        }

        this.applyTheme(isDarkMode);
    }

    // Toggle between dark and light themes
    toggleTheme() {
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        const newTheme = !isCurrentlyDark;

        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');

        // Provide user feedback
        this.showToggleFeedback(newTheme);
    }

    // Apply the specified theme
    applyTheme(isDark) {
        const html = document.documentElement;
        const moonIcon = document.getElementById('moonIcon');
        const sunIcon = document.getElementById('sunIcon');

        if (isDark) {
            html.classList.add('dark');
            if (moonIcon) moonIcon.classList.add('hidden');
            if (sunIcon) sunIcon.classList.remove('hidden');
        } else {
            html.classList.remove('dark');
            if (moonIcon) moonIcon.classList.remove('hidden');
            if (sunIcon) sunIcon.classList.add('hidden');
        }

        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(isDark);
    }

    // Update the theme-color meta tag for mobile browsers
    updateMetaThemeColor(isDark) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        metaThemeColor.content = isDark ? '#0A0A0A' : '#FFFFFF';
    }

    // Show visual feedback when toggling theme
    showToggleFeedback(isDark) {
        const toggleButton = document.getElementById('darkModeToggle');
        if (!toggleButton) return;

        // Add a subtle animation
        toggleButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            toggleButton.style.transform = '';
        }, 150);

        // Optional: Show a toast notification
        this.showToast(isDark ? 'Chế độ tối đã bật' : 'Chế độ sáng đã bật');
    }

    // Show a simple toast notification
    showToast(message) {
        // Remove existing toast
        const existingToast = document.getElementById('theme-toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast
        const toast = document.createElement('div');
        toast.id = 'theme-toast';
        toast.className = 'fixed top-20 right-6 z-50 px-4 py-2 bg-ivs-card text-ivs-text-primary rounded-lg shadow-lg border border-ivs-border text-sm';
        toast.textContent = message;

        document.body.appendChild(toast);

        // Animate in
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            toast.style.transition = 'all 0.3s ease';
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 2 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // Utility method to get current theme
    getCurrentTheme() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }

    // Method to programmatically set theme
    setTheme(theme) {
        const isDark = theme === 'dark';
        this.applyTheme(isDark);
        localStorage.setItem('theme', theme);
    }
}

// Initialize dark mode toggle when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.IVSDarkModeToggle = new DarkModeToggle();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeToggle;
}