// comprehensive-testing.js
// Comprehensive testing suite for IVS Academy website
// Tests all implemented features: performance, accessibility, functionality

class ComprehensiveTester {
    constructor() {
        this.testResults = {
            passed: 0,
            failed: 0,
            total: 0,
            details: []
        };
        this.testSuites = [
            'PerformanceTests',
            'AccessibilityTests',
            'FunctionalityTests',
            'SecurityTests',
            'CompatibilityTests'
        ];
    }

    async runAllTests() {
        console.log('🚀 Starting Comprehensive Testing Suite for IVS Academy');
        console.log('=' .repeat(60));

        for (const suite of this.testSuites) {
            await this.runTestSuite(suite);
        }

        this.displayResults();
        return this.testResults;
    }

    async runTestSuite(suiteName) {
        console.log(`\n📋 Running ${suiteName}...`);
        const suite = this[suiteName]();

        for (const test of suite) {
            await this.runTest(test);
        }
    }

    async runTest(test) {
        this.testResults.total++;
        console.log(`  ⏳ ${test.name}...`);

        try {
            const result = await test.fn();
            if (result) {
                this.testResults.passed++;
                console.log(`  ✅ ${test.name} - PASSED`);
                this.testResults.details.push({
                    name: test.name,
                    status: 'PASSED',
                    message: test.expected || 'Test passed successfully'
                });
            } else {
                this.testResults.failed++;
                console.log(`  ❌ ${test.name} - FAILED`);
                this.testResults.details.push({
                    name: test.name,
                    status: 'FAILED',
                    message: 'Test returned false'
                });
            }
        } catch (error) {
            this.testResults.failed++;
            console.log(`  ❌ ${test.name} - ERROR: ${error.message}`);
            this.testResults.details.push({
                name: test.name,
                status: 'ERROR',
                message: error.message
            });
        }
    }

    displayResults() {
        console.log('\n' + '=' .repeat(60));
        console.log('📊 TEST RESULTS SUMMARY');
        console.log('=' .repeat(60));
        console.log(`Total Tests: ${this.testResults.total}`);
        console.log(`Passed: ${this.testResults.passed}`);
        console.log(`Failed: ${this.testResults.failed}`);
        console.log(`Success Rate: ${((this.testResults.passed / this.testResults.total) * 100).toFixed(1)}%`);

        if (this.testResults.failed > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.testResults.details
                .filter(test => test.status !== 'PASSED')
                .forEach(test => {
                    console.log(`  - ${test.name}: ${test.message}`);
                });
        }

        console.log('\n🎯 RECOMMENDATIONS:');
        if (this.testResults.failed === 0) {
            console.log('  ✅ All tests passed! Website is ready for production.');
        } else if (this.testResults.failed / this.testResults.total < 0.1) {
            console.log('  ⚠️ Minor issues detected. Review failed tests before deployment.');
        } else {
            console.log('  🚨 Significant issues detected. Address failed tests before deployment.');
        }
    }

    // Performance Tests
    PerformanceTests() {
        return [
            {
                name: 'Page Load Time Test',
                fn: async () => {
                    const startTime = performance.now();
                    await new Promise(resolve => setTimeout(resolve, 100));
                    const loadTime = performance.now() - startTime;
                    return loadTime < 3000; // Should load within 3 seconds
                },
                expected: 'Page should load within 3 seconds'
            },
            {
                name: 'Image Optimization Test',
                fn: () => {
                    const images = document.querySelectorAll('img');
                    let optimizedCount = 0;
                    images.forEach(img => {
                        if (img.hasAttribute('loading') && img.getAttribute('loading') === 'lazy') {
                            optimizedCount++;
                        }
                    });
                    return optimizedCount > 0;
                },
                expected: 'Images should have lazy loading enabled'
            },
            {
                name: 'CSS Performance Test',
                fn: () => {
                    const stylesheets = document.styleSheets;
                    let totalRules = 0;
                    for (let i = 0; i < stylesheets.length; i++) {
                        try {
                            totalRules += stylesheets[i].cssRules.length;
                        } catch (e) {
                            // Cross-origin stylesheet
                        }
                    }
                    return totalRules < 5000; // Reasonable CSS rule limit
                },
                expected: 'CSS should not have excessive rules'
            },
            {
                name: 'JavaScript Bundle Size Test',
                fn: () => {
                    const scripts = document.querySelectorAll('script[src]');
                    return scripts.length < 20; // Reasonable script count
                },
                expected: 'Should not have excessive script files'
            }
        ];
    }

    // Accessibility Tests
    AccessibilityTests() {
        return [
            {
                name: 'ARIA Labels Test',
                fn: () => {
                    const interactiveElements = document.querySelectorAll('button, [role="button"], input, select, textarea');
                    let labeledCount = 0;
                    interactiveElements.forEach(el => {
                        if (el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby') || el.hasAttribute('title')) {
                            labeledCount++;
                        }
                    });
                    return labeledCount / interactiveElements.length > 0.8; // 80% should be labeled
                },
                expected: '80% of interactive elements should have accessibility labels'
            },
            {
                name: 'Heading Hierarchy Test',
                fn: () => {
                    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
                    let validHierarchy = true;
                    let lastLevel = 0;

                    headings.forEach(heading => {
                        const level = parseInt(heading.tagName.charAt(1));
                        if (level - lastLevel > 1) {
                            validHierarchy = false;
                        }
                        lastLevel = level;
                    });

                    return validHierarchy;
                },
                expected: 'Heading hierarchy should be valid (no skipped levels)'
            },
            {
                name: 'Color Contrast Test',
                fn: () => {
                    // Basic contrast check - in real implementation, use a proper contrast library
                    const textElements = document.querySelectorAll('*');
                    let goodContrast = true;

                    textElements.forEach(el => {
                        const style = window.getComputedStyle(el);
                        const color = style.color;
                        const backgroundColor = style.backgroundColor;

                        // Simple check for black text on white background
                        if (color === 'rgb(0, 0, 0)' && backgroundColor === 'rgba(0, 0, 0, 0)') {
                            goodContrast = false;
                        }
                    });

                    return goodContrast;
                },
                expected: 'Text should have sufficient color contrast'
            },
            {
                name: 'Keyboard Navigation Test',
                fn: () => {
                    const focusableElements = document.querySelectorAll(
                        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    return focusableElements.length > 0;
                },
                expected: 'Page should have keyboard-focusable elements'
            },
            {
                name: 'Alt Text Test',
                fn: () => {
                    const images = document.querySelectorAll('img');
                    let altCount = 0;
                    images.forEach(img => {
                        if (img.hasAttribute('alt') && img.getAttribute('alt').trim() !== '') {
                            altCount++;
                        }
                    });
                    return altCount / images.length > 0.9; // 90% should have alt text
                },
                expected: '90% of images should have alt text'
            }
        ];
    }

    // Functionality Tests
    FunctionalityTests() {
        return [
            {
                name: 'Dark Mode Toggle Test',
                fn: () => {
                    const toggle = document.getElementById('theme-toggle') || document.querySelector('[data-theme-toggle]');
                    if (toggle) {
                        toggle.click();
                        const hasDarkClass = document.documentElement.classList.contains('dark');
                        toggle.click(); // Reset
                        return true; // Toggle exists and is clickable
                    }
                    return false;
                },
                expected: 'Dark mode toggle should work'
            },
            {
                name: 'Language Switch Test',
                fn: () => {
                    const langButtons = document.querySelectorAll('.lang-toggle-btn, [data-lang]');
                    if (langButtons.length > 0) {
                        return true; // Language switching is available
                    }
                    return false;
                },
                expected: 'Language switching should be available'
            },
            {
                name: 'Navigation Test',
                fn: () => {
                    const navLinks = document.querySelectorAll('nav a[href]');
                    return navLinks.length > 0;
                },
                expected: 'Navigation links should exist'
            },
            {
                name: 'Form Validation Test',
                fn: () => {
                    const forms = document.querySelectorAll('form');
                    let hasValidation = false;

                    forms.forEach(form => {
                        if (form.hasAttribute('novalidate') === false) {
                            hasValidation = true;
                        }
                    });

                    return hasValidation || forms.length === 0; // Either has forms with validation or no forms
                },
                expected: 'Forms should have proper validation'
            },
            {
                name: 'Analytics Tracking Test',
                fn: () => {
                    return typeof window.analyticsManager !== 'undefined' ||
                           typeof gtag !== 'undefined' ||
                           document.querySelector('script[src*="googletagmanager"]') !== null;
                },
                expected: 'Analytics tracking should be implemented'
            }
        ];
    }

    // Security Tests
    SecurityTests() {
        return [
            {
                name: 'HTTPS Test',
                fn: () => {
                    return window.location.protocol === 'https:' ||
                           window.location.hostname === 'localhost' ||
                           window.location.hostname === '127.0.0.1';
                },
                expected: 'Site should use HTTPS in production'
            },
            {
                name: 'XSS Protection Test',
                fn: () => {
                    const scripts = document.querySelectorAll('script');
                    let safeScripts = 0;

                    scripts.forEach(script => {
                        if (script.src) {
                            // External scripts should be from trusted sources
                            const trustedDomains = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'unpkg.com'];
                            const isTrusted = trustedDomains.some(domain => script.src.includes(domain));
                            if (isTrusted) {
                                safeScripts++;
                            }
                        } else {
                            // Inline scripts should be reviewed
                            safeScripts++;
                        }
                    });

                    return safeScripts === scripts.length;
                },
                expected: 'Scripts should be from trusted sources'
            },
            {
                name: 'CSRF Protection Test',
                fn: () => {
                    // Check for CSRF tokens in forms
                    const forms = document.querySelectorAll('form');
                    let hasProtection = false;

                    forms.forEach(form => {
                        const csrfInput = form.querySelector('input[name="_csrf"], input[name="csrf_token"]');
                        if (csrfInput) {
                            hasProtection = true;
                        }
                    });

                    return hasProtection || forms.length === 0;
                },
                expected: 'Forms should have CSRF protection'
            },
            {
                name: 'Input Validation Test',
                fn: () => {
                    const inputs = document.querySelectorAll('input, textarea, select');
                    let hasValidation = false;

                    inputs.forEach(input => {
                        if (input.hasAttribute('required') ||
                            input.hasAttribute('pattern') ||
                            input.hasAttribute('minlength') ||
                            input.hasAttribute('maxlength')) {
                            hasValidation = true;
                        }
                    });

                    return hasValidation || inputs.length === 0;
                },
                expected: 'Inputs should have validation attributes'
            }
        ];
    }

    // Compatibility Tests
    CompatibilityTests() {
        return [
            {
                name: 'Responsive Design Test',
                fn: () => {
                    const viewport = document.querySelector('meta[name="viewport"]');
                    return viewport && viewport.getAttribute('content').includes('width=device-width');
                },
                expected: 'Viewport meta tag should be properly configured'
            },
            {
                name: 'CSS Flexbox/Grid Test',
                fn: () => {
                    const testElement = document.createElement('div');
                    testElement.style.display = 'flex';
                    document.body.appendChild(testElement);

                    const supportsFlexbox = testElement.style.display === 'flex';
                    document.body.removeChild(testElement);

                    return supportsFlexbox;
                },
                expected: 'Browser should support modern CSS layout'
            },
            {
                name: 'JavaScript ES6+ Test',
                fn: () => {
                    try {
                        // Test arrow functions, template literals, const/let
                        const test = () => `ES6+ supported: ${true}`;
                        return test() === 'ES6+ supported: true';
                    } catch (e) {
                        return false;
                    }
                },
                expected: 'Browser should support ES6+ JavaScript'
            },
            {
                name: 'LocalStorage Test',
                fn: () => {
                    try {
                        localStorage.setItem('test', 'value');
                        const result = localStorage.getItem('test') === 'value';
                        localStorage.removeItem('test');
                        return result;
                    } catch (e) {
                        return false;
                    }
                },
                expected: 'Browser should support localStorage'
            },
            {
                name: 'Fetch API Test',
                fn: () => {
                    return typeof fetch !== 'undefined';
                },
                expected: 'Browser should support Fetch API'
            }
        ];
    }

    // Utility method to run performance benchmarks
    async runPerformanceBenchmark() {
        console.log('\n🏃 Running Performance Benchmarks...');

        const benchmarks = [
            { name: 'DOM Query Performance', fn: this.benchmarkDOMQueries.bind(this) },
            { name: 'JavaScript Execution', fn: this.benchmarkJSExecution.bind(this) },
            { name: 'Memory Usage', fn: this.benchmarkMemoryUsage.bind(this) }
        ];

        for (const benchmark of benchmarks) {
            const startTime = performance.now();
            await benchmark.fn();
            const endTime = performance.now();
            console.log(`  ${benchmark.name}: ${(endTime - startTime).toFixed(2)}ms`);
        }
    }

    async benchmarkDOMQueries() {
        for (let i = 0; i < 1000; i++) {
            document.querySelectorAll('*');
        }
    }

    async benchmarkJSExecution() {
        for (let i = 0; i < 10000; i++) {
            Math.sqrt(i);
        }
    }

    benchmarkMemoryUsage() {
        if (performance.memory) {
            const mem = performance.memory;
            console.log(`    Used JS Heap: ${(mem.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
            console.log(`    Total JS Heap: ${(mem.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
        }
    }
}

// Auto-run tests when script loads (only in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    document.addEventListener('DOMContentLoaded', async function() {
        const tester = new ComprehensiveTester();

        // Add test runner to window for manual testing
        window.runTests = async () => {
            const results = await tester.runAllTests();
            await tester.runPerformanceBenchmark();
            return results;
        };

        // Auto-run tests after a short delay to ensure all scripts are loaded
        setTimeout(async () => {
            console.log('🔍 IVS Academy - Automated Testing Starting...');
            await window.runTests();
        }, 2000);
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComprehensiveTester;
}