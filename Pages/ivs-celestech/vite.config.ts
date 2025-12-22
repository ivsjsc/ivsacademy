import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // IMPORTANT: Do NOT inject sensitive API keys into client bundles.
      // Instead, run a backend proxy (serverless function or API) that stores GEMINI_API_KEY
      // and exposes safe endpoints for the frontend. Configure the backend URL via
      // `VITE_BACKEND_URL` in your .env file (e.g. VITE_BACKEND_URL=http://localhost:4000).
      // Client code should use `import.meta.env.VITE_BACKEND_URL` to call server-side APIs.
      // define: {}, // (kept as comment to remind not to expose keys)

      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
