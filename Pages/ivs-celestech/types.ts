
export type Language = 'vi' | 'en';
export type Theme = 'light' | 'dark';

// Translation map type used for UI text keys
export type Translation = { [key: string]: string };

export enum ServiceCategory {
  TECH = 'TECH',
  EDTECH = 'EDTECH',
  DATA = 'DATA'
}

export interface ServiceItem {
  id: string;
  title: string; // fallback or key
  titleEn: string;
  category: ServiceCategory;
  description: string;
  descriptionEn: string;
  // New detailed fields
  longDescription: string;
  longDescriptionEn: string;
  features: string[];
  featuresEn: string[];
  deliverables: string[];
  deliverablesEn: string[];
  icon: string; // Lucide icon name
  image: string;
}

export interface ProjectMilestone {
  title: string;
  completed: boolean;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  serviceId: string;
  status: 'draft' | 'in_progress' | 'review' | 'completed';
  progress: number;
  milestones: ProjectMilestone[];
  startDate: string;
  dueDate: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface EstimateResult {
  estimatedCost: string;
  estimatedTime: string;
  techStack: string[];
  summary: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  isRead: boolean;
  timestamp: Date;
}

export interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  trans: any;
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}