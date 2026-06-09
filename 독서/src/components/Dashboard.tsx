import React from 'react';
import type { BookRecord } from '../types/book';
import { getStats, initialBadges, getUnlockedBadges } from '../utils/storage';
import { BookOpen, Award, Flame, Star } from 'lucide-react';

interface DashboardProps {
  records: BookRecord[];
}

export const Dashboard: React.FC<DashboardProps> = ({ records }) => {
  const stats = getStats(records);
  const unlockedBadges = getUnlockedBadges(records.length);

  // Dynamic Character SVG based on level
  const renderCharacter = () => {
    switch (stats.level) {
      case 1:
        return (
          // Baby Rocket
          <svg viewBox="0 0 100 100" className="w-32 h-32 animate-float">
            <path d="M50 15 C60 35 60 70 50 85 C40 70 40 35 50 15 Z" fill="#6366f1" />
            <path d="M50 15 C55 35 55 60 50 75 C45 60 45 35 50 15 Z" fill="#818cf8" />
            <circle cx="50" cy="40" r="8" fill="#e0e7ff" />
            <circle cx="50" cy="40" r="4" fill="#312e81" />
            {/* Fins */}
            <path d="M40 60 C30 70 30 80 35 85 C40 85 45 80 43 72 Z" fill="#fca5a5" />
            <path d="M60 60 C70 70 70 80 65 85 C60 85 55 80 57 72 Z" fill="#fca5a5" />
            {/* Fire */}
            <path d="M50 85 C45 92 48 98 50 100 C52 98 55 92 50 85 Z" fill="#f97316" />
            <path d="M50 85 C47 89 49 93 50 95 C51 93 53 89 50 85 Z" fill="#facc15" />
          </svg>
        );
      case 2:
        return (
          // Cute Astronaut Dog/Cat
          <svg viewBox="0 0 100 100" className="w-32 h-32 animate-float">
            {/* Space Helmet */}
            <circle cx="50" cy="50" r="35" fill="rgba(225, 231, 255, 0.4)" stroke="#e2e8f0" strokeWidth="2" />
            {/* Ears */}
            <path d="M30 35 C20 20 25 10 32 20 Z" fill="#fb923c" />
            <path d="M70 35 C80 20 75 10 68 20 Z" fill="#fb923c" />
            {/* Head */}
            <circle cx="50" cy="52" r="23" fill="#fdba74" />
            <path d="M40 52 C40 58 60 58 60 52 Z" fill="#ffedd5" />
            {/* Eyes */}
            <circle cx="43" cy="46" r="3" fill="#1e293b" />
            <circle cx="57" cy="46" r="3" fill="#1e293b" />
            {/* Nose/Mouth */}
            <polygon points="50,50 48,48 52,48" fill="#9a3412" />
            <path d="M49 52 C49 54 50 55 51 54" stroke="#9a3412" strokeWidth="1.5" fill="none" />
            <path d="M51 52 C51 54 50 55 49 54" stroke="#9a3412" strokeWidth="1.5" fill="none" />
            {/* Suit Collar */}
            <rect x="42" y="72" width="16" height="6" rx="3" fill="#3b82f6" />
          </svg>
        );
      case 3:
        return (
          // Cute UFO
          <svg viewBox="0 0 100 100" className="w-32 h-32 animate-float">
            {/* Glass Dome */}
            <path d="M25 50 C25 25 75 25 75 50 Z" fill="#93c5fd" opacity="0.8" />
            <circle cx="50" cy="42" r="12" fill="#a7f3d0" />
            <circle cx="47" cy="40" r="2" fill="#047857" />
            <circle cx="53" cy="40" r="2" fill="#047857" />
            <path d="M47 46 C47 48 53 48 53 46 Z" fill="#047857" />
            {/* Base saucer */}
            <ellipse cx="50" cy="55" rx="42" ry="12" fill="#818cf8" />
            <ellipse cx="50" cy="53" rx="36" ry="9" fill="#a5b4fc" />
            {/* Lights */}
            <circle cx="25" cy="55" r="3" fill="#fef08a" />
            <circle cx="37" cy="57" r="3.5" fill="#fef08a" />
            <circle cx="50" cy="58" r="4" fill="#fef08a" />
            <circle cx="63" cy="57" r="3.5" fill="#fef08a" />
            <circle cx="75" cy="55" r="3" fill="#fef08a" />
            {/* Beam */}
            <polygon points="35,66 65,66 80,95 20,95" fill="#fef08a" opacity="0.25" />
          </svg>
        );
      case 4:
        return (
          // Advanced Spaceship
          <svg viewBox="0 0 100 100" className="w-32 h-32 animate-float">
            {/* Wings */}
            <path d="M15 65 C10 80 30 75 40 70 Z" fill="#f43f5e" />
            <path d="M85 65 C90 80 70 75 60 70 Z" fill="#f43f5e" />
            {/* Main Body */}
            <path d="M50 10 C65 30 65 75 50 82 C35 75 35 30 50 10 Z" fill="#e2e8f0" />
            <path d="M50 10 C58 30 58 75 50 82 Z" fill="#cbd5e1" />
            {/* Window */}
            <circle cx="50" cy="38" r="9" fill="#38bdf8" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="47" cy="35" r="3" fill="#ffffff" opacity="0.6" />
            {/* Thruster & Fire */}
            <rect x="44" y="82" width="12" height="6" fill="#475569" />
            <path d="M50 88 C40 98 48 100 50 100 C52 100 60 98 50 88 Z" fill="#ff7e00" />
            <path d="M50 88 C45 94 48 96 50 96 C52 96 55 94 50 88 Z" fill="#ffc000" />
          </svg>
        );
      default:
        return (
          // Space Robot / Guard
          <svg viewBox="0 0 100 100" className="w-32 h-32 animate-float">
            {/* Halo */}
            <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="#ec4899" strokeWidth="3" strokeDasharray="6 4" />
            {/* Head */}
            <rect x="34" y="25" width="32" height="26" rx="8" fill="#f43f5e" />
            <rect x="38" y="29" width="24" height="18" rx="4" fill="#1e293b" />
            {/* Eyes */}
            <circle cx="45" cy="38" r="3" fill="#a7f3d0" className="animate-pulse" />
            <circle cx="55" cy="38" r="3" fill="#a7f3d0" className="animate-pulse" />
            {/* Antenna */}
            <line x1="50" y1="25" x2="50" y2="15" stroke="#f43f5e" strokeWidth="3" />
            <circle cx="50" cy="13" r="4" fill="#fbcfe8" />
            {/* Neck */}
            <rect x="46" y="51" width="8" height="6" fill="#cbd5e1" />
            {/* Body */}
            <rect x="28" y="57" width="44" height="30" rx="10" fill="#f43f5e" />
            <rect x="36" y="63" width="28" height="14" rx="3" fill="#e2e8f0" />
            {/* Heart Light */}
            <path d="M50 72 C49 70 47 70 47 72 C47 74 50 76 50 76 C50 76 53 74 53 72 C53 70 51 70 50 72 Z" fill="#e11d48" />
          </svg>
        );
    }
  };

  // Fun goal progress (e.g., target is always 5 books, or changes)
  const getGoalStatus = () => {
    const target = 5;
    const progress = Math.min(Math.round((records.length / target) * 100), 100);
    return { target, progress };
  };

  const goal = getGoalStatus();

  return (
    <div className="space-y-8">
      {/* Level Card */}
      <div className="bg-white rounded-3xl p-8 shadow-cute border-4 border-indigo-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        {/* Decorative Stars */}
        <div className="absolute top-4 left-6 text-yellow-300 text-2xl animate-twinkle">★</div>
        <div className="absolute bottom-6 right-8 text-yellow-300 text-xl animate-twinkle" style={{ animationDelay: '1.5s' }}>★</div>
        <div className="absolute top-10 right-20 text-yellow-300 text-lg animate-twinkle" style={{ animationDelay: '0.8s' }}>★</div>

        <div className="flex-shrink-0 bg-gradient-to-tr from-indigo-50 to-purple-50 p-6 rounded-3xl border-2 border-dashed border-indigo-200">
          {renderCharacter()}
        </div>

        <div className="flex-1 w-full text-center md:text-left space-y-4">
          <div>
            <span className="bg-indigo-100 text-indigo-700 font-bold px-4 py-1.5 rounded-full text-sm font-sans">
              레벨 {stats.level}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 mt-2 font-sans tracking-wide">
              {stats.title}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              우주 모험을 떠난 지 {stats.totalBooks}일째 되는 날의 힘찬 탐험!
            </p>
          </div>

          {/* Level Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-slate-500 px-1">
              <span>레벨업까지 한 걸음 더!</span>
              <span>{stats.levelProgress}%</span>
            </div>
            <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200 relative p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${stats.levelProgress}%` }}
              >
                {/* Micro Rocket riding the bar */}
                <div 
                  className="absolute right-0 -top-1.5 transition-transform duration-1000"
                  style={{ transform: 'translateX(4px)' }}
                >
                  🚀
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Books */}
        <div className="bg-white rounded-2xl p-6 shadow-cute border-4 border-blue-100 flex items-center gap-5 hover:scale-[1.02] transition-transform duration-300">
          <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-400 font-bold text-sm">내가 읽은 책</p>
            <h3 className="text-3xl font-black text-slate-800 font-sans mt-0.5">
              {stats.totalBooks} <span className="text-lg font-bold text-slate-500">권</span>
            </h3>
          </div>
        </div>

        {/* Total Pages */}
        <div className="bg-white rounded-2xl p-6 shadow-cute border-4 border-purple-100 flex items-center gap-5 hover:scale-[1.02] transition-transform duration-300">
          <div className="p-4 bg-purple-50 text-purple-500 rounded-2xl">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-400 font-bold text-sm">총 읽은 페이지</p>
            <h3 className="text-3xl font-black text-slate-800 font-sans mt-0.5">
              {stats.totalPages} <span className="text-lg font-bold text-slate-500">쪽</span>
            </h3>
          </div>
        </div>

        {/* Monthly Target */}
        <div className="bg-white rounded-2xl p-6 shadow-cute border-4 border-yellow-100 flex flex-col justify-center space-y-3 hover:scale-[1.02] transition-transform duration-300">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-bold text-sm">이번 달 도전 목표</span>
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">
              목표 {goal.target}권
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-7 h-7 text-yellow-400 fill-yellow-400" />
            <span className="text-xl font-black text-slate-800">
              {stats.totalBooks} / {goal.target} 권 달성!
            </span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="bg-yellow-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Badges Shelf */}
      <div className="bg-white rounded-3xl p-8 shadow-cute border-4 border-pink-100 space-y-6">
        <div className="flex items-center gap-2">
          <Award className="w-7 h-7 text-pink-500" />
          <h2 className="text-2xl font-extrabold text-slate-800 font-sans">
            나의 우주 탐험 뱃지
          </h2>
        </div>

        {/* Dynamic Badges List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {initialBadges.map((badge) => {
            const isUnlocked = unlockedBadges.some(b => b.id === badge.id);
            return (
              <div 
                key={badge.id}
                className={`relative p-5 rounded-2xl border-4 text-center flex flex-col items-center justify-between min-h-[170px] transition-all duration-300 ${
                  isUnlocked 
                    ? `bg-gradient-to-br ${badge.colorClass} border-transparent scale-100 shadow-md` 
                    : 'bg-slate-50 border-slate-100 text-slate-400 saturate-50'
                }`}
              >
                {!isUnlocked && (
                  <div className="absolute top-2 right-2 bg-slate-200 rounded-full p-1 text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                <div className={`text-4xl my-2 ${isUnlocked ? 'animate-bounce' : ''}`} style={{ animationDuration: '3s' }}>
                  {badge.name.split(' ')[0]}
                </div>
                
                <div className="space-y-1">
                  <h4 className={`font-black text-sm ${isUnlocked ? 'text-white' : 'text-slate-600'}`}>
                    {badge.name.substring(badge.name.indexOf(' ') + 1)}
                  </h4>
                  <p className={`text-[10px] ${isUnlocked ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {badge.description}
                  </p>
                </div>

                <div className="mt-3">
                  {isUnlocked ? (
                    <span className="bg-white bg-opacity-20 text-[10px] font-bold px-2 py-0.5 rounded-full text-white">
                      획득 완료!
                    </span>
                  ) : (
                    <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      책 {badge.requiredBooks}권 필요
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
