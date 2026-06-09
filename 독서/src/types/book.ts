export type BookCategory = 
  | '동화/소설'
  | '과학/수학'
  | '역사/사회'
  | '예술/체육'
  | '만화책'
  | '기타';

export type MoodEmoji = '😍' | '😊' | '😢' | '🧐' | '⚡' | '🦖';

export interface BookRecord {
  id: string;
  title: string;
  author: string;
  readDate: string;
  rating: number; // 1 to 5
  review: string;
  category: BookCategory;
  pages: number;
  moodEmoji: MoodEmoji;
}

export interface ReadingBadge {
  id: string;
  name: string;
  description: string;
  requiredBooks: number;
  colorClass: string;
}

export interface UserStats {
  totalBooks: number;
  totalPages: number;
  level: number;
  levelProgress: number; // 0 to 100
  title: string;
}
