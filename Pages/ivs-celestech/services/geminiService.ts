import { GoogleGenAI, Type } from "@google/genai";
import { EstimateResult, Language } from "../types";

// Prefer calling a backend proxy to keep the Gemini API key on the server side.
const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL as string) || '';
const apiKey = process.env.API_KEY || ''; // will be empty in client bundles unless intentionally injected

let ai: any = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateEstimate = async (
  serviceName: string,
  features: string[],
  language: Language
): Promise<EstimateResult> => {
  // If a backend proxy is configured, use it (recommended for production)
  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL.replace(/\/$/, '')}/api/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceName, features, language })
      });
      if (res.ok) {
        const json = await res.json();
        return json as EstimateResult;
      } else {
        console.error('Backend estimate error', res.statusText);
      }
    } catch (err) {
      console.error('Backend estimate fetch failed', err);
    }
  }

  // Fallback to client-side SDK only if an API key was injected (not recommended)
  if (!apiKey || !ai) {
    return {
      estimatedCost: language === 'vi' ? "50.000.000 - 80.000.000 VNĐ" : "$2,000 - $3,500 USD",
      estimatedTime: language === 'vi' ? "4 - 6 Tuần" : "4 - 6 Weeks",
      techStack: ["React", "Node.js", "PostgreSQL"],
      summary: language === 'vi'
        ? "Đang chạy chế độ Demo (Thiếu API Key). Đây là số liệu giả lập."
        : "Running in Demo Mode (Missing API Key). This is simulated data."
    };
  }

  const prompt = `
    Role: You are Aivy, a senior technical consultant for IVS Celestech.
    Task: Estimate cost and time for a project.
    Context:
    - Service: ${serviceName}
    - Features: ${features.join(', ')}
    - Target Audience: Business Clients.
    
    Output Language: ${language === 'vi' ? 'Vietnamese' : 'English'}
    Currency: ${language === 'vi' ? 'VNĐ' : 'USD'}
    
    Provide a professional estimate.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedCost: { type: Type.STRING },
            estimatedTime: { type: Type.STRING },
            techStack: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            summary: { type: Type.STRING }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as EstimateResult;
    }
    throw new Error("No response text");
  } catch (error) {
    console.error("Estimate Error", error);
    return {
      estimatedCost: language === 'vi' ? "Liên hệ báo giá" : "Contact for quote",
      estimatedTime: language === 'vi' ? "Chưa xác định" : "TBD",
      techStack: ["TBD"],
      summary: language === 'vi'
        ? "Chúng tôi cần thêm thông tin chi tiết để báo giá chính xác. Vui lòng chat với Aivy."
        : "We need more details for an accurate quote. Please chat with Aivy."
    };
  }
};

export const createChatSession = (language: Language) => {
  // If backend exists, return a simple proxy object that calls server endpoints
  if (BACKEND_URL) {
    const base = BACKEND_URL.replace(/\/$/, '');
    return {
      sendMessage: async ({ message }: { message: string }) => {
        const res = await fetch(`${base}/api/chat/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, language })
        });
        if (!res.ok) throw new Error('Chat proxy error');
        return await res.json();
      }
    } as any;
  }

  if (!apiKey || !ai) return null;

  const systemInstruction = language === 'vi'
    ? "Bạn là 'Aivy', trợ lý AI thông minh, hóm hỉnh và chuyên nghiệp của IVS Celestech. Bạn chuyên về tư vấn giải pháp công nghệ (Web, App, Data, EdTech). Hãy trả lời ngắn gọn, hữu ích và thân thiện. Nếu được hỏi về giá, hãy đưa ra khoảng giá ước lượng nhưng khuyên họ dùng tính năng 'Tạo yêu cầu' để chính xác hơn."
    : "You are 'Aivy', a smart, witty, and professional AI assistant for IVS Celestech. You specialize in tech solutions (Web, App, Data, EdTech). Keep answers concise, helpful, and friendly. If asked about price, give a rough range but advise them to use the 'Create Request' feature for accuracy.";

  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: { systemInstruction }
  });
};
