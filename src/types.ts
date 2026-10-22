export type Category = 'All' | 'Education' | 'Games' | 'Productivity' | 'Lifestyle';

export interface AppProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: Category;
  iconBg: string;
  iconText: string;
  screenshots: string[];
  features: string[];
  publicationStatus: string; // e.g., "Add publication status" or "Published on Google Play"
  playStoreUrl: string | null;
  sourceCodeUrl: string | null;
  downloads?: string;
  rating?: string;
  version?: string;
  releaseDate?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface AiGeneratorState {
  prompt: string;
  isGenerating: boolean;
  resultUrl: string | null;
  mode: 'image' | 'video';
  error: string | null;
}
