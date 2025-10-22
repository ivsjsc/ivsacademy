/**
 * Component Loader for IVS Website
 * @version 1.0.0
 * @author IVS JSC
 * @description Loads shared HTML components (header, footer, fab-container) dynamically
 */

'use strict';

/**
 * Component loading configuration
 */
const COMPONENTS = {
    header: '/components/header.html',
    footer: '/components/footer.html',
    'fab-container': '/components/fab-container.html'
};

/**
 * Cache for loaded components
 */
const componentCache = new Map();

/**
 * Utility function for logging component operations
 * @param {string} message - Log message
 * @param {string} level - Log level (info, warn, error)
 */
function componentLog(message, level = 'info') {
    const prefix = '[ComponentLoader]';
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];

    switch (level) {
        case 'warn':
            console.warn(`${prefix} ${timestamp}: ${message}`);
            break;
        case 'error':
            console.error(`${prefix} ${timestamp}: ${message}`);
            break;
        default:
            console.log(`${prefix} ${timestamp}: ${message}`);
    }
}

/**
 * Load a single component from server
 * @param {string} componentName - Name of the component to load
 * @returns {Promise<string>} Component HTML content
 */
async function loadComponent(componentName) {
    const componentPath = COMPONENTS[componentName];

    if (!componentPath) {
        throw new Error(`Component '${componentName}' is not defined in COMPONENTS`);
    }

    try {
        componentLog(`Loading component: ${componentName} from ${componentPath}`);

        const response = await fetch(componentPath, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();
        componentCache.set(componentName, html);

        componentLog(`Successfully loaded component: ${componentName}`);
        return html;

    } catch (error) {
        componentLog(`Failed to load component '${componentName}': ${error.message}`, 'error');

        // Return fallback content for critical components
        if (componentName === 'header') {
            return getFallbackHeader();
        } else if (componentName === 'footer') {
            return getFallbackFooter();
        }

        throw error;
    }
}

/**
 * Fallback header content in case loading fails
 * @returns {string} Fallback header HTML
 */
function getFallbackHeader() {
    return `
        <nav class="bg-white shadow-lg" role="navigation" aria-label="Main navigation">
            <div class="container mx-auto px-4 py-3">
                <div class="flex justify-between items-center">
                    <a href="/" class="text-2xl font-bold text-primary">IVS Academy</a>
                    <div class="space-x-4">
                        <a href="/" class="text-gray-700 hover:text-primary">Trang chủ</a>
                        <a href="/education.html" class="text-gray-700 hover:text-primary">Giáo dục</a>
                        <a href="/contact.html" class="text-gray-700 hover:text-primary">Liên hệ</a>
                    </div>
                </div>
            </div>
        </nav>
    `;
}

/**
 * Fallback footer content in case loading fails
 * @returns {string} Fallback footer HTML
 */
function getFallbackFooter() {
    return `
        <footer class="bg-gray-800 text-white py-8" role="contentinfo">
            <div class="container mx-auto px-4 text-center">
                <p>&copy; 2024 IVS JSC. All rights reserved.</p>
            </div>
        </footer>
    `;
}

/**
 * Initialize a loaded component (call init functions if available)
 * @param {string} componentName - Name of the component
 * @param {HTMLElement} container - Container element
 */
function initializeComponent(componentName, container) {
    try {
        // Call component-specific initialization functions
        const initFunctionName = `init${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`;

        if (typeof window[initFunctionName] === 'function') {
            componentLog(`Initializing component: ${componentName}`);
            window[initFunctionName](container);
        }

        // Dispatch custom event for component loaded
        const event = new CustomEvent('componentLoaded', {
            detail: { componentName, container }
        });
        document.dispatchEvent(event);

    } catch (error) {
        componentLog(`Error initializing component '${componentName}': ${error.message}`, 'error');
    }
}

/**
 * Load and inject all components into their placeholders
 * @returns {Promise<void>}
 */
async function loadComponentsAndInitialize() {
    const componentsToLoad = Object.keys(COMPONENTS);
    const loadPromises = componentsToLoad.map(async (componentName) => {
        const placeholder = document.getElementById(`${componentName}-placeholder`);

        if (!placeholder) {
            componentLog(`Placeholder for component '${componentName}' not found`, 'warn');
            return;
        }

        // Skip if already loaded
        if (placeholder.hasAttribute('data-component-loaded')) {
            componentLog(`Component '${componentName}' already loaded, skipping`);
            return;
        }

        try {
            // Show loading state
            placeholder.setAttribute('data-loading-text', 'Đang tải...');
            placeholder.innerHTML = '<div class="animate-pulse bg-gray-200 h-16 rounded"></div>';

            // Load component
            const html = await loadComponent(componentName);

            // Inject component
            placeholder.innerHTML = html;
            placeholder.setAttribute('data-component-loaded', 'true');

            // Initialize component
            initializeComponent(componentName, placeholder);

            componentLog(`Component '${componentName}' loaded and initialized successfully`);

        } catch (error) {
            componentLog(`Failed to load component '${componentName}': ${error.message}`, 'error');

            // Keep loading state for user feedback
            placeholder.innerHTML = '<div class="text-red-500 text-center py-4">Không thể tải component</div>';
        }
    });

    // Wait for all components to load
    await Promise.allSettled(loadPromises);

    // Dispatch event when all components are loaded
    document.dispatchEvent(new CustomEvent('allComponentsLoaded'));
}

/**
 * Preload components in the background (for performance)
 * @returns {Promise<void>}
 */
async function preloadComponents() {
    const componentsToLoad = Object.keys(COMPONENTS);
    const preloadPromises = componentsToLoad.map(async (componentName) => {
        try {
            await loadComponent(componentName);
        } catch (error) {
            // Preloading failures are not critical
            componentLog(`Preload failed for '${componentName}': ${error.message}`, 'warn');
        }
    });

    await Promise.allSettled(preloadPromises);
    componentLog('Component preloading completed');
}

// Export functions for global use
window.loadComponentsAndInitialize = loadComponentsAndInitialize;
window.preloadComponents = preloadComponents;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadComponentsAndInitialize().catch(error => {
            componentLog(`Auto-initialization failed: ${error.message}`, 'error');
        });
    });
} else {
    // DOM already loaded
    loadComponentsAndInitialize().catch(error => {
        componentLog(`Auto-initialization failed: ${error.message}`, 'error');
    });
}

componentLog('Component loader initialized');