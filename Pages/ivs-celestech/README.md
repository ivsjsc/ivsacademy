<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1iKXxpcwrpw9BvnHZLaQO8gIOxaf5ZEgF

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. (For local development only) If you experiment with the client-side SDK, set the `GEMINI_API_KEY` in [.env.local](.env.local). **Warning:** Do NOT expose production API keys in client bundles.

Production: To run safely in production, deploy a server-side proxy (serverless function or small API) that stores `GEMINI_API_KEY` securely and exposes endpoints the frontend can call (for example: `POST /api/estimate` and `POST /api/chat/message`). Configure the frontend to point to your backend via `VITE_BACKEND_URL` in `.env` (e.g. `VITE_BACKEND_URL=https://api.example.com`).

3. Run the app:
   `npm run dev`
