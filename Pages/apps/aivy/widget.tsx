import React from 'react';
import ReactDOM from 'react-dom/client';
import { AivyChatWidget } from './components/AivyChatWidget';

/**
 * Aivy Widget Entry Point
 * This file is used to embed the Aivy chatbot widget on any page
 */

// Wait for DOM to be ready
function initAivyWidget() {
  // Get configuration from window object (set by aivy-integration.js)
  const config = (window as any).AIVY_CONFIG || {
    apiUrl: '/api/ai-router',
    title: 'Aivy Assistant',
    greeting: 'Hello! How can I help you today?',
    brandColor: 'indigo',
    enableVoice: true,
    enableTypingIndicator: true
  };

  // Find the root element created by aivy-integration.js
  const rootElement = document.getElementById('aivy-widget-root');
  
  if (!rootElement) {
    console.error('[Aivy Widget] Could not find #aivy-widget-root element');
    return;
  }

  // Create React root and render widget
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AivyChatWidget 
        apiUrl={config.apiUrl}
        title={config.title}
        greeting={config.greeting}
        brandColor={config.brandColor}
        enableVoice={config.enableVoice}
        enableTypingIndicator={config.enableTypingIndicator}
      />
    </React.StrictMode>
  );

  console.log('[Aivy Widget] Successfully initialized');
}

// Initialize when script loads
initAivyWidget();
