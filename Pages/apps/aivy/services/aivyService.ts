import { BackendResponse } from '../types';

export class AivyService {
  private baseURL: string;
  private defaultModel: string = 'gemini';

  constructor(apiUrl: string = '/api/ai-router') {
    this.baseURL = apiUrl;
  }

  /**
   * Updates the API URL dynamically.
   */
  public setApiUrl(url: string) {
    this.baseURL = url;
  }

  /**
   * Sends a message to the backend API.
   */
  async sendMessage(message: string, language: 'en' | 'vi' = 'en'): Promise<string> {
    try {
      const payload = {
        message,
        model: this.defaultModel,
        language,
        timestamp: new Date().toISOString()
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      try {
        const response = await fetch(this.baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (response.ok) {
          const data: BackendResponse = await response.json();
          // Support various response structures
          if (data.success && (data.data?.response || data.data?.message)) {
            return data.data.response || data.data.message || '';
          }
          if (data.success && typeof data.data === 'string') {
             return data.data;
          }
        }
        
        // If not successful, throw to trigger fallback
        throw new Error(`API returned status: ${response.status}`);

      } catch (networkError) {
        console.warn('Backend fetch failed, falling back to local simulation:', networkError);
        // Fallback simulation for demonstration/offline support
        return await this.simulateResponse(message, language);
      }

    } catch (error) {
      console.error('AivyService Error:', error);
      return "I'm having trouble reaching my brain right now. Please check your connection or try again later.";
    }
  }

  /**
   * Simulates a backend response for UI demonstration when API is offline.
   */
  private async simulateResponse(message: string, language: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (language === 'vi') {
           resolve(`[Mô phỏng] Tôi không thể kết nối tới máy chủ (${this.baseURL}).\n\nBạn đã nói: "${message}"`);
        } else {
           resolve(`[Simulation] I couldn't reach the backend at (${this.baseURL}).\n\nYou said: "${message}"\n\nTo fix this, ensure your backend is running or provide a valid 'apiUrl' prop to the widget.`);
        }
      }, 1000);
    });
  }
}

// Export a default instance, but consumers should preferably instantiate their own if they need custom config
export const defaultAivyService = new AivyService();
