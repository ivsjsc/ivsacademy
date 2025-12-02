/**
 * Global Aivy Chatbot Integration Script
 * Loads the Aivy React widget on all pages
 * Connects to backend API at /api/ai-router
 * 
 * Usage: Add this script to your HTML pages:
 * <script src="/js/aivy-integration.js" defer></script>
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    // API endpoint for the chatbot
    apiUrl: '/api/ai-router',
    
    // Widget appearance
    title: 'Aivy Assistant',
    greeting: 'Xin chào! Tôi là Aivy, trợ lý AI của IVS Academy. Tôi có thể giúp bạn với các câu hỏi về khóa học, nội dung học tập, và dịch vụ của chúng tôi. Làm thế nào tôi có thể giúp bạn hôm nay?',
    brandColor: 'indigo',
    
    // Features
    enableVoice: true,
    enableTypingIndicator: true,
    
    // Widget container ID
    containerId: 'aivy-widget-root',
    
    // Script source (React app built version)
    scriptSrc: '/Pages/apps/aivy/assets/index.js'
  };

  /**
   * Initialize Aivy Widget
   * Creates root element and loads the React app
   */
  function initializeAivy() {
    // Check if already initialized
    if (document.getElementById(CONFIG.containerId)) {
      console.log('[Aivy] Widget already initialized');
      return;
    }

    // Create root container
    const root = document.createElement('div');
    root.id = CONFIG.containerId;
    document.body.appendChild(root);

    // Store config in window for React component to access
    window.AIVY_CONFIG = {
      apiUrl: CONFIG.apiUrl,
      title: CONFIG.title,
      greeting: CONFIG.greeting,
      brandColor: CONFIG.brandColor,
      enableVoice: CONFIG.enableVoice,
      enableTypingIndicator: CONFIG.enableTypingIndicator
    };

    // Load the React bundle
    loadAivyScript();
  }

  /**
   * Load Aivy React Application Script
   */
  function loadAivyScript() {
    const script = document.createElement('script');
    script.src = CONFIG.scriptSrc;
    script.type = 'module';
    script.async = true;
    
    script.onload = function() {
      console.log('[Aivy] Widget script loaded successfully');
    };
    
    script.onerror = function(error) {
      console.error('[Aivy] Failed to load widget script:', error);
      // Fallback: show error message
      showFallbackWidget();
    };
    
    document.head.appendChild(script);
  }

  /**
   * Fallback UI if React app fails to load
   */
  function showFallbackWidget() {
    const fallback = document.createElement('div');
    fallback.id = 'aivy-fallback';
    fallback.innerHTML = `
      <style>
        #aivy-fallback {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 50;
          width: 380px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }
        #aivy-fallback-header {
          background: linear-gradient(to right, #4f46e5, #a855f7);
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        #aivy-fallback-content {
          padding: 20px;
          text-align: center;
          color: #6b7280;
        }
        #aivy-fallback-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 20px;
          padding: 0;
        }
      </style>
      <div id="aivy-fallback-header">
        <h3 style="margin: 0; font-size: 16px; font-weight: 600;">Aivy Assistant</h3>
        <button id="aivy-fallback-close">&times;</button>
      </div>
      <div id="aivy-fallback-content">
        <p style="margin: 0 0 12px 0;">The Aivy widget failed to load.</p>
        <small>Please check your connection and refresh the page.</small>
      </div>
    `;
    
    document.body.appendChild(fallback);
    
    document.getElementById('aivy-fallback-close').addEventListener('click', function() {
      fallback.remove();
    });
  }

  /**
   * Wait for DOM to be ready and initialize
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAivy);
  } else {
    // DOM is already ready
    initializeAivy();
  }

  // Expose API to window for manual control if needed
  window.AivyWidget = {
    config: CONFIG,
    initialize: initializeAivy,
    updateApiUrl: function(newUrl) {
      CONFIG.apiUrl = newUrl;
      if (window.AIVY_CONFIG) {
        window.AIVY_CONFIG.apiUrl = newUrl;
      }
    }
  };

  console.log('[Aivy] Integration script loaded. Widget will initialize when DOM is ready.');
})();
