import type { BookRecord, ReadingBadge, UserStats } from '../types/book';

const STORAGE_KEY_PREFIX = 'kids_reading_log_records_';
const PROFILES_KEY = 'kids_reading_profiles';
const ACTIVE_PROFILE_KEY = 'kids_reading_active_profile';

export const initialBadges: ReadingBadge[] = [
  {
    id: 'first-step',
    name: '🚀 첫 로켓 발사',
    description: '책을 1권 이상 읽었어요!',
    requiredBooks: 1,
    colorClass: 'from-pink-400 to-rose-500 text-white',
  },
  {
    id: 'steady',
    name: '🌙 달 기지 건설',
    description: '책을 3권 이상 읽었어요!',
    requiredBooks: 3,
    colorClass: 'from-amber-400 to-orange-500 text-white',
  },
  {
    id: 'explorer',
    name: '🪐 토성 고리 정복',
    description: '책을 5권 이상 읽었어요!',
    requiredBooks: 5,
    colorClass: 'from-emerald-400 to-teal-500 text-white',
  },
  {
    id: 'master',
    name: '👑 블랙홀 탈출자',
    description: '책을 10권 이상 읽었어요!',
    requiredBooks: 10,
    colorClass: 'from-indigo-400 to-purple-500 text-white',
  },
  {
    id: 'legend',
    name: '✨ 전설의 은하 수호자',
    description: '책을 20권 이상 읽었어요!',
    requiredBooks: 20,
    colorClass: 'from-violet-500 to-fuchsia-600 animate-pulse-slow text-white',
  },
];

export const getBookRecords = (profileName: string): BookRecord[] => {
  const data = localStorage.getItem(STORAGE_KEY_PREFIX + profileName);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Error parsing book records for profile:', profileName, e);
    return [];
  }
};

export const saveBookRecords = (profileName: string, records: BookRecord[]): void => {
  localStorage.setItem(STORAGE_KEY_PREFIX + profileName, JSON.stringify(records));
};

export const getProfiles = (): string[] => {
  const data = localStorage.getItem(PROFILES_KEY);
  if (!data) return ['기본 탐험가'];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Error parsing profiles:', e);
    return ['기본 탐험가'];
  }
};

export const saveProfiles = (profiles: string[]): void => {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
};

export const getActiveProfile = (): string => {
  return localStorage.getItem(ACTIVE_PROFILE_KEY) || '기본 탐험가';
};

export const saveActiveProfile = (profile: string): void => {
  localStorage.setItem(ACTIVE_PROFILE_KEY, profile);
};

export const getStats = (records: BookRecord[]): UserStats => {
  const totalBooks = records.length;
  const totalPages = records.reduce((sum, r) => sum + (r.pages || 0), 0);
  
  // Calculate level based on totalBooks
  // Level 1: 0-2 books
  // Level 2: 3-4 books
  // Level 3: 5-9 books
  // Level 4: 10-19 books
  // Level 5: 20+ books
  let level = 1;
  let levelProgress = 0;
  let title = '우주 초보 👶';

  if (totalBooks >= 20) {
    level = 5;
    levelProgress = 100;
    title = '전설의 은하 수호자 👑';
  } else if (totalBooks >= 10) {
    level = 4;
    levelProgress = Math.round(((totalBooks - 10) / 10) * 100);
    title = '블랙홀 탈출자 👨‍🚀';
  } else if (totalBooks >= 5) {
    level = 3;
    levelProgress = Math.round(((totalBooks - 5) / 5) * 100);
    title = '토성 고리 탐험가 🪐';
  } else if (totalBooks >= 3) {
    level = 2;
    levelProgress = Math.round(((totalBooks - 3) / 2) * 100);
    title = '달나라 여행자 🌙';
  } else {
    level = 1;
    levelProgress = Math.round((totalBooks / 3) * 100);
    title = '우주 아기 로켓 🚀';
  }

  return {
    totalBooks,
    totalPages,
    level,
    levelProgress,
    title,
  };
};

export const getUnlockedBadges = (totalBooks: number): ReadingBadge[] => {
  return initialBadges.filter(b => totalBooks >= b.requiredBooks);
};

export const getLockedBadges = (totalBooks: number): ReadingBadge[] => {
  return initialBadges.filter(b => totalBooks < b.requiredBooks);
};

// Initial mock data if empty
export const initialMockBooks: BookRecord[] = [
  {
    id: 'mock-1',
    title: '어린 왕자',
    author: '생텍쥐페리',
    readDate: '2026-06-01',
    rating: 5,
    review: '어린 왕자가 사는 별에는 장미꽃이 하나 있대요. 나도 나만의 소중한 장미꽃을 가꾸고 싶어요! 그리고 여우와 나눈 대화가 기억에 남아요. 마음으로 보아야 잘 보인대요. 정말 감동적이고 예쁜 책이에요!',
    category: '동화/소설',
    pages: 120,
    moodEmoji: '😍',
  },
  {
    id: 'mock-2',
    title: '신기한 스쿨버스: 태양계 여행',
    author: '조애나 콜',
    readDate: '2026-06-05',
    rating: 4,
    review: '스쿨버스를 타고 태양계를 직접 날아다녀요! 뜨거운 태양과 예쁜 고리를 가진 토성이 멋있었어요. 우주복을 입고 우주선을 타는 기분을 느꼈어요. 다음에는 블랙홀에 들어가는 편도 읽고 싶어요!',
    category: '과학/수학',
    pages: 45,
    moodEmoji: '🧐',
  },
  {
    id: 'mock-3',
    title: '그리스 로마 신화 - 올림포스의 신들',
    author: '토마스 불핀치',
    readDate: '2026-06-08',
    rating: 5,
    review: '제우스가 번개를 날리고 포세이돈이 삼지창으로 바다를 가르는 모습이 너무 멋졌어요! 신기하고 흥미진진한 모험 이야기가 많아서 시간 가는 줄 모르고 읽었어요. 만화책으로 읽으니까 머리에 쏙쏙 들어왔어요!',
    category: '만화책',
    pages: 180,
    moodEmoji: '⚡',
  },
];
