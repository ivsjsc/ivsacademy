# 🤖 Aivy Chatbot - Quick Start Guide

## What Was Done ✅

Successfully integrated the **Aivy AI Chatbot** across your entire IVS Academy website with full backend API integration.

## 🚀 Quick Start (5 minutes)

### 1. Set Up Environment Variables
Edit or create `server/.env`:
```env
GOOGLE_API_KEY=your_key_here
XAI_API_KEY=your_xai_key_here
OPENAI_API_KEY=your_openai_key_here
PORT=3000
```

### 2. Start Backend Server
```bash
cd ai/server
npm install
npm run dev
# Server runs on http://localhost:3000
```

### 3. Start Website
```bash
# Option A: Use built-in Python server
python -m http.server 8000

# Option B: Use any HTTP server
# Browser: http://localhost:8000
```

### 4. Test Aivy Widget
- Open http://localhost:8000 in browser
- Look for **✨ Aivy button** (bottom-right corner)
- Click button to open chat
- Type a message and press Enter
- See AI response!

---

## 📦 What's Included

### Frontend (`js/aivy-integration.js`)
- ✨ Global initialization script for all pages
- 🎨 Floating widget with modern UI
- 🎤 Voice input support
- 📱 Mobile-responsive design
- 🌐 Multi-language (EN/VI)

### Backend (`ai/server/index.js`)
- 🔌 `/api/ai-router` endpoint for chat
- 🤖 Support for 3 AI providers:
  - Google Gemini (default)
  - Grok/X.AI
  - OpenAI
- ⚡ Automatic fallback if primary AI fails
- 🛡️ API key protection

### Pages Integrated
✅ index.html
✅ about.html
✅ consulting.html
✅ contact.html
✅ education.html
✅ learning-materials.html
✅ news-archive.html
✅ solutions.html

---

## 🎯 Key Features

### User-Facing
- 💬 Chat interface with message history
- 🎤 Voice input (click microphone icon)
- 🔄 Clear chat / refresh options
- ⌨️ Send with Enter key
- 📲 Mobile-friendly

### Backend
- 🔐 Secure API key handling
- 🚀 Fast responses (15s timeout)
- 🛠️ Error handling & fallbacks
- 🌍 Multi-language prompts
- 📊 Request logging

---

## 🔧 API Details

### Endpoint
```
POST http://localhost:3000/api/ai-router
```

### Request Example
```json
{
  "message": "What courses do you offer?",
  "model": "gemini",
  "language": "en"
}
```

### Response Example
```json
{
  "success": true,
  "data": {
    "response": "IVS Academy offers...",
    "model": "gemini",
    "language": "en"
  }
}
```

---

## ⚙️ Configuration

### Change Widget Appearance
Edit `js/aivy-integration.js`:
```javascript
CONFIG = {
  title: 'Your Bot Name',          // Widget title
  greeting: 'Hello! How can I help?', // First message
  brandColor: 'indigo',            // Tailwind color
  enableVoice: true,               // Enable voice input
}
```

### Change API Endpoint
```javascript
apiUrl: '/api/ai-router',  // or your custom URL
```

### Supported Colors
`indigo`, `blue`, `purple`, `cyan`, `emerald`, `amber`

---

## 🐛 Troubleshooting

### "Widget not showing"
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Verify server is running on port 3000
4. Refresh page (Ctrl+F5 for hard refresh)

### "Messages not sending"
1. Check if backend server is running: `npm run dev` in `ai/server/`
2. Verify API keys are set in `.env`
3. Test API directly:
   ```bash
   curl -X POST http://localhost:3000/api/ai-router \
     -H "Content-Type: application/json" \
     -d '{"message":"hi","model":"gemini","language":"en"}'
   ```

### "Backend not configured" error
- Set `GOOGLE_API_KEY` or `XAI_API_KEY` or `OPENAI_API_KEY` in `.env`
- Restart server after updating `.env`

### "Fallback simulation" message
- Backend is not reachable
- Check server is running: `npm run dev`
- Check firewall/network settings

---

## 📚 Full Documentation

For detailed setup, configuration, and troubleshooting:
📖 **See `AIVY_INTEGRATION.md`**

---

## 🎓 Example Usage

### Get Widget Info
```javascript
console.log(window.AIVY_CONFIG);
// Shows current configuration
```

### Change API at Runtime
```javascript
window.AivyWidget.updateApiUrl('https://custom-api.com/chat');
```

### Manual Initialization
```javascript
window.AivyWidget.initialize();
// If widget didn't auto-init
```

---

## 📋 Checklist Before Going Live

- [ ] API keys set in `ai/server/.env`
- [ ] Backend server tested and working
- [ ] Widget appears on all pages
- [ ] Chat messages send successfully
- [ ] Responses are displayed correctly
- [ ] Voice input works (if enabled)
- [ ] Mobile view is responsive
- [ ] No errors in browser console
- [ ] No errors in server logs

---

## 🔄 System Architecture

```
User Browser
    ↓
index.html loads aivy-integration.js
    ↓
React App mounts in page
    ↓
User types message
    ↓
POST /api/ai-router (with message)
    ↓
Express Server
    ↓
Route to AI Provider (Gemini/Grok/OpenAI)
    ↓
Get AI Response
    ↓
Return JSON to Frontend
    ↓
Display in Chat Widget
```

---

## 📞 Support

**Need help?**

1. Check the full documentation: `AIVY_INTEGRATION.md`
2. Review error messages in browser console (F12)
3. Check server logs for API errors
4. Test API endpoint directly with curl
5. Verify environment variables are correct

---

## 🎉 You're Ready!

Your website now has a powerful AI assistant!

**Next Steps:**
1. Set environment variables ✅
2. Start backend server ✅
3. Test the widget ✅
4. Customize if needed ✅
5. Deploy to production 🚀

---

**Commit**: `039c40e`
**Files Added**: 
- `js/aivy-integration.js`
- `AIVY_INTEGRATION.md`
- `AIVY_QUICKSTART.md`

**Files Modified**:
- `ai/server/index.js` (added /api/ai-router)
- 8 HTML pages (added Aivy script)

**Integration Date**: December 2, 2025
