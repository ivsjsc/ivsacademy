# Aivy Chatbot Integration Guide

## Overview
The Aivy chatbot has been successfully integrated into the IVS Academy website. It's a React-based AI assistant that appears as a floating widget on all pages and communicates with the backend API to provide intelligent responses.

## Architecture

### Frontend Components

#### 1. **Global Integration Script** (`js/aivy-integration.js`)
- Lazy-loads the Aivy React widget on all pages
- Handles configuration and initialization
- Provides fallback UI if widget fails
- Exposes `window.AivyWidget` API for manual control

**Location**: `/js/aivy-integration.js`

**Configuration Options**:
```javascript
const CONFIG = {
  apiUrl: '/api/ai-router',           // Backend endpoint
  title: 'Aivy Assistant',            // Widget title
  greeting: '...',                    // Initial greeting message
  brandColor: 'indigo',               // Tailwind color
  enableVoice: true,                  // Speech recognition
  enableTypingIndicator: true,        // Show typing animation
  containerId: 'aivy-widget-root',    // React root element ID
  scriptSrc: '/Pages/apps/aivy/assets/index.js' // React app bundle
};
```

#### 2. **React Application** (`Pages/apps/aivy/`)
The main Aivy chatbot application built with React and Vite.

**Key Files**:
- `App.tsx` - Demo page with chatbot widget
- `AivyChatWidget.tsx` - Main chat widget component
  - Floating toggle button (bottom-right)
  - Chat window with message history
  - Input field with send button
  - Voice input support
  - Clear chat and refresh options
  - Responsive design
- `aivyService.ts` - API communication service
  - Sends messages to backend
  - Handles timeouts (15 seconds)
  - Fallback simulation for offline mode
- `types.ts` - TypeScript interfaces

**Features**:
✓ Multi-language support (English/Vietnamese)
✓ Voice input via Speech Recognition API
✓ Auto-scroll to latest messages
✓ Typing indicators
✓ Message validation
✓ Error handling with user feedback
✓ Customizable appearance
✓ Mobile-responsive

### Backend Components

#### 1. **AI Router Endpoint** (`ai/server/index.js`)
**Endpoint**: `POST /api/ai-router`

**Request Format**:
```json
{
  "message": "Your question here",
  "model": "gemini" | "grok" | "openai",
  "language": "en" | "vi",
  "timestamp": "2025-12-02T10:00:00Z"
}
```

**Response Format**:
```json
{
  "success": true,
  "data": {
    "response": "AI response text",
    "model": "gemini",
    "language": "en"
  }
}
```

**Supported AI Providers**:

1. **Google Gemini** (Default)
   - Model: `gemini-pro`
   - Requires: `GOOGLE_API_KEY` environment variable
   - Endpoint: `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent`
   - Max tokens: 500
   - Temperature: 0.7

2. **Grok (X.AI)**
   - Model: `grok-2-latest`
   - Requires: `XAI_API_KEY` environment variable
   - Endpoint: `https://api.x.ai/v1/chat/completions`
   - Max tokens: 500
   - Temperature: 0.7

3. **OpenAI**
   - Model: `gpt-4o-mini`
   - Requires: `OPENAI_API_KEY` environment variable
   - Endpoint: `https://api.openai.com/v1/chat/completions`
   - Max tokens: 500
   - Temperature: 0.7

**Error Handling**:
- Automatic fallback to alternative provider if primary fails
- Validation of required environment variables
- 15-second timeout on requests
- Detailed error messages

**System Prompts**:
- **Vietnamese**: Aivy responds as IVS Academy AI assistant in Vietnamese, focusing on education topics
- **English**: Aivy responds as IVS Academy AI assistant in English, focusing on education topics

#### 2. **Environment Variables Required**
Create/update `.env` or `.env.local` in the server directory:

```env
# Google Gemini (Primary)
GOOGLE_API_KEY=your_google_api_key_here

# Grok/X.AI (Fallback)
XAI_API_KEY=your_xai_api_key_here

# OpenAI (Fallback)
OPENAI_API_KEY=your_openai_api_key_here

# Server port
PORT=3000
```

## Integration Points

### Pages with Aivy Widget
The following pages automatically load the Aivy widget:
- ✓ `index.html` (Homepage)
- ✓ `about.html` (About page)
- ✓ `consulting.html` (Consulting page)
- ✓ `contact.html` (Contact page)
- ✓ `education.html` (Education page)
- ✓ `learning-materials.html` (Learning page)
- ✓ `news-archive.html` (News page)
- ✓ `solutions.html` (Solutions page)

### Script Tag
Each HTML page includes:
```html
<script defer src="/js/aivy-integration.js"></script>
```

This should be placed near the closing `</body>` tag, ideally after other scripts but before `loadComponents.js`:
```html
<!-- Aivy AI Chatbot Integration -->
<script defer src="/js/aivy-integration.js"></script>

<!-- Component Loading -->
<script defer src="/ai/js/loadComponents.js"></script>
</body>
```

## How It Works

### User Flow
1. **Page Load**: User visits a page with Aivy integration
2. **Widget Initialization**: 
   - Integration script loads asynchronously
   - React root element created
   - Configuration passed to React component
   - React app bundle loaded and mounted
3. **User Interaction**:
   - User clicks floating Aivy button
   - Chat window opens with greeting message
   - User types message and clicks send (or presses Enter)
4. **Message Processing**:
   - Frontend sends message to `/api/ai-router`
   - Backend validates and routes to selected AI provider
   - AI provider returns response
   - Response displayed in chat window
5. **Chat Management**:
   - Messages stored in component state
   - Auto-scroll to latest message
   - User can clear chat or refresh
   - Voice input option available

### Request Flow
```
User Message
    ↓
AivyChatWidget (React)
    ↓
AivyService.sendMessage()
    ↓
POST /api/ai-router
    ↓
Backend AI Router
    ↓
AI Provider (Gemini/Grok/OpenAI)
    ↓
Response (JSON)
    ↓
AivyService (parse response)
    ↓
Update Chat Window
    ↓
Display to User
```

## Adding Aivy to New Pages

### Method 1: Direct HTML Integration
Add this script tag to any HTML file before closing `</body>`:
```html
<script defer src="/js/aivy-integration.js"></script>
```

### Method 2: Dynamic Initialization
In JavaScript, manually initialize:
```javascript
// Initialize Aivy after DOM ready
if (window.AivyWidget) {
  window.AivyWidget.initialize();
}
```

### Method 3: Update Configuration
Change API endpoint dynamically:
```javascript
window.AivyWidget.updateApiUrl('https://custom-api.com/api/chat');
```

## Configuration Options

### Window Configuration Object
Available after Aivy loads:
```javascript
window.AIVY_CONFIG = {
  apiUrl: '/api/ai-router',
  title: 'Aivy Assistant',
  greeting: 'Hello! How can I help?',
  brandColor: 'indigo',
  enableVoice: true,
  enableTypingIndicator: true
}
```

### Tailwind Colors Available
- `indigo` (default)
- `blue`
- `purple`
- `cyan`
- `emerald`
- `amber`

## Customization

### Change Greeting Message
Edit `js/aivy-integration.js`:
```javascript
greeting: 'Custom greeting message here...',
```

### Change Widget Title
Edit `js/aivy-integration.js`:
```javascript
title: 'Your Assistant Name',
```

### Disable Voice Feature
Edit `js/aivy-integration.js`:
```javascript
enableVoice: false,
```

### Change API Endpoint
Edit `js/aivy-integration.js`:
```javascript
apiUrl: 'https://your-api.com/chat',
```

## Troubleshooting

### Widget not appearing?
1. Check browser console for errors
2. Verify `/js/aivy-integration.js` loads successfully
3. Check that `/Pages/apps/aivy/assets/index.js` exists
4. Check browser DevTools Network tab

### Messages not sending?
1. Verify `/api/ai-router` endpoint is running
2. Check backend server logs
3. Verify environment variables are set (GOOGLE_API_KEY, etc.)
4. Check browser console for network errors
5. Test endpoint directly: `curl -X POST http://localhost:3000/api/ai-router -H "Content-Type: application/json" -d '{"message":"hello","model":"gemini","language":"en"}'`

### "AI backend not configured" error?
- Set environment variables in server `.env`:
  - `GOOGLE_API_KEY` or
  - `XAI_API_KEY` or
  - `OPENAI_API_KEY`

### Widget loads but shows fallback?
- Check that React bundle at `/Pages/apps/aivy/assets/index.js` exists
- Verify no JavaScript errors in console
- Try rebuilding the React app:
  ```bash
  cd Pages/apps/aivy
  npm install
  npm run build
  ```

## Development

### Build the React App
```bash
cd Pages/apps/aivy
npm install
npm run build
```

### Run Dev Server
```bash
cd Pages/apps/aivy
npm run dev
# Opens at http://localhost:5173
```

### Run Backend Server
```bash
cd ai/server
npm install
npm run dev
# Runs on PORT from .env (default 3000)
```

### Test API Endpoint
```bash
curl -X POST http://localhost:3000/api/ai-router \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is IVS Academy?",
    "model": "gemini",
    "language": "en"
  }'
```

## Files Modified/Created

### New Files
- `/js/aivy-integration.js` - Global integration script
- `/AIVY_INTEGRATION.md` - This documentation

### Modified Files
- `/index.html` - Added Aivy script
- `/about.html` - Added Aivy script
- `/consulting.html` - Added Aivy script
- `/contact.html` - Added Aivy script
- `/education.html` - Added Aivy script
- `/learning-materials.html` - Added Aivy script
- `/news-archive.html` - Added Aivy script
- `/solutions.html` - Added Aivy script
- `/ai/server/index.js` - Added `/api/ai-router` endpoint

## Performance Considerations

### Lazy Loading
The React app is loaded asynchronously, so it doesn't block page rendering.

### Caching
- React bundle is cached by browser
- Asset files have cache-friendly naming

### API Timeouts
- 15-second timeout on chat requests
- Prevents hanging requests

### Fallback Providers
- Automatic failover to alternative AI service
- Ensures service availability

## Security

### API Key Protection
- API keys are stored server-side in environment variables
- Never exposed to browser
- Backend acts as proxy

### Request Validation
- Message length validation
- Model name validation
- Language validation

### CORS
- Backend accepts requests from same origin
- Modify if needed in Express middleware

## Future Enhancements

1. **Database Integration**
   - Store chat history per user
   - Implement user sessions

2. **Analytics**
   - Track chat interactions
   - Monitor API usage

3. **Advanced Features**
   - File upload support
   - Rich text formatting
   - Conversation context
   - Chat export/download

4. **Multi-language Support**
   - Additional language prompts
   - Automatic language detection

5. **Custom Integrations**
   - Knowledge base integration
   - CRM integration
   - Calendar booking

## Support

For issues or questions:
1. Check this documentation
2. Review browser console errors
3. Check server logs
4. Test API endpoints directly
5. Contact development team

## Commit History
- `039c40e` - feat: integrate Aivy chatbot across website with backend AI routing

---
**Last Updated**: December 2, 2025
**Version**: 1.0.0
