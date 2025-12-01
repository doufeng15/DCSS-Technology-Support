export enum EquipmentType {
  SERVER = 'SERVER',
  STORAGE = 'STORAGE',
  NETWORK = 'NETWORK',
  LIBRARY = 'LIBRARY', // Tape libraries
  GENERAL = 'GENERAL'
}

export interface DocumentItem {
  id: string;
  title: string;
  type: EquipmentType;
  manufacturer: string;
  modelSeries: string;
  lastUpdated: string;
  boxLink: string; // URL to the Box file
  isFavorite: boolean;
  tags: string[];
  description?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type CategoryFilter = EquipmentType | 'ALL' | 'FAVORITES';

// Auth types
export type UserRole = 'ADMIN' | 'GENERAL';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface UserAccount extends User {
  password?: string; // Only for mock auth logic
}