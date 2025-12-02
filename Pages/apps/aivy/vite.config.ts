import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Check if we're building the widget
    const isWidget = process.env.BUILD_WIDGET === 'true';
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: isWidget ? {
        // Widget build configuration
        lib: {
          entry: path.resolve(__dirname, 'widget.tsx'),
          name: 'AivyWidget',
          fileName: 'aivy-widget',
          formats: ['iife']
        },
        rollupOptions: {
          external: [],
          output: {
            globals: {}
          }
        }
      } : {
        // Default app build configuration
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html')
          }
        }
      }
    };
});
