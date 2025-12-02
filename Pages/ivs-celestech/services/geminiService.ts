import { GoogleGenAI, Type } from "@google/genai";
import { EstimateResult, Language } from "../types";

const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateEstimate = async (
  serviceName: string,
  features: string[],
  language: Language
): Promise<EstimateResult> => {
  if (!apiKey) {
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
  if (!apiKey) return null;
  
  const systemInstruction = language === 'vi' 
    ? "Bạn là 'Aivy', trợ lý AI thông minh, hóm hỉnh và chuyên nghiệp của IVS Celestech. Bạn chuyên về tư vấn giải pháp công nghệ (Web, App, Data, EdTech). Hãy trả lời ngắn gọn, hữu ích và thân thiện. Nếu được hỏi về giá, hãy đưa ra khoảng giá ước lượng nhưng khuyên họ dùng tính năng 'Tạo yêu cầu' để chính xác hơn."
    : "You are 'Aivy', a smart, witty, and professional AI assistant for IVS Celestech. You specialize in tech solutions (Web, App, Data, EdTech). Keep answers concise, helpful, and friendly. If asked about price, give a rough range but advise them to use the 'Create Request' feature for accuracy.";

  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: { systemInstruction }
  });
};
