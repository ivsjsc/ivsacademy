export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export interface BackendResponse {
  success: boolean;
  data?: {
    response?: string;
    message?: string;
  };
  error?: string;
}

export interface AivyWidgetProps {
  /** The backend API URL to send messages to. Default: '/api/ai-router' */
  apiUrl?: string;
  /** Custom title for the widget header. Default: 'Aivy Assistant' */
  title?: string;
  /** Custom greeting message. */
  greeting?: string;
  /** Primary brand color (Tailwind class or hex). Default: indigo */
  brandColor?: string;
  /** Enable or disable voice input. Default: true */
  enableVoice?: boolean;
}
