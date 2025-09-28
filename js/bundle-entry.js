// Bundle entry point that includes all JavaScript files

// Core utilities
import './utils.js';

// Language system
import './language.js';

// Component system
import './componentLoader.js';
import './loadComponents.js';

// UI Controllers
import './fabController.js';
import './headerController.js';

// Add additional scripts as needed
// Import specific components for pages based on conditional logic
const path = window.location.pathname;

// Conditionally load page-specific scripts
if (path.includes('/contact.html')) {
  import('./contact-page.js');
}

// Auto-initialize components after import
document.addEventListener('DOMContentLoaded', () => {
  if (window.IVSHeaderController && typeof window.IVSHeaderController.init === 'function') {
    window.IVSHeaderController.init();
  }
  
  if (window.IVSFabController && typeof window.IVSFabController.init === 'function') {
    window.IVSFabController.init();
  }

  // Initialize AOS
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }
});