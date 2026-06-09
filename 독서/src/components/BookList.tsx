import React, { useState } from 'react';
import type { BookRecord, BookCategory } from '../types/book';
import { Search, Star, Trash2, Edit2, Calendar, BookOpen, Layers } from 'lucide-react';

interface BookListProps {
  records: BookRecord[];
  onSelectBook: (record: BookRecord) => void;
  onEditBook: (record: BookRecord) => void;
  onDeleteBook: (id: string) => void;
}

const CATEGORY_ICONS: Record<BookCategory, string> = {
  '동화/소설': '🧸',
  '과학/수학': '🔬',
  '역사/사회': '🏰',
  '예술/체육': '🎨',
  '만화책': '⚡',
  '기타': '🧩',
};

const CATEGORY_COLORS: Record<BookCategory, string> = {
  '동화/소설': 'border-pink-300 bg-pink-50 text-pink-700 hover:bg-pink-100',
  '과학/수학': 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100',
  '역사/사회': 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100',
  '예술/체육': 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
  '만화책': 'border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
  '기타': 'border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100',
};

const SPINE_COLORS: Record<BookCategory, string> = {
  '동화/소설': 'bg-gradient-to-b from-pink-400 to-pink-600',
  '과학/수학': 'bg-gradient-to-b from-blue-400 to-blue-600',
  '역사/사회': 'bg-gradient-to-b from-amber-400 to-amber-600',
  '예술/체육': 'bg-gradient-to-b from-emerald-400 to-emerald-600',
  '만화책': 'bg-gradient-to-b from-yellow-400 to-yellow-600',
  '기타': 'bg-gradient-to-b from-purple-400 to-purple-600',
};

export const BookList: React.FC<BookListProps> = ({ records, onSelectBook, onEditBook, onDeleteBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | '전체'>('전체');
  const [sortBy, setSortBy] = useState<'dateDesc' | 'dateAsc' | 'ratingDesc' | 'pagesDesc'>('dateDesc');

  // Filter books
  const filteredRecords = records.filter((record) => {
    const matchesSearch = 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === '전체' || record.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort books
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortBy === 'dateDesc') {
      return new Date(b.readDate).getTime() - new Date(a.readDate).getTime();
    }
    if (sortBy === 'dateAsc') {
      return new Date(a.readDate).getTime() - new Date(b.readDate).getTime();
    }
    if (sortBy === 'ratingDesc') {
      return b.rating - a.rating;
    }
    if (sortBy === 'pagesDesc') {
      return b.pages - a.pages;
    }
    return 0;
  });

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (confirm(`'${title}' 독서 기록을 지울까요? 지우면 다시 되돌릴 수 없어요! 😢`)) {
      onDeleteBook(id);
    }
  };

  const handleEdit = (e: React.MouseEvent, record: BookRecord) => {
    e.stopPropagation();
    onEditBook(record);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-cute border-4 border-indigo-50 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="책 이름이나 지은이를 검색해보세요!"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-400 focus:outline-none text-slate-700 font-medium bg-slate-50"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-400 focus:outline-none text-slate-600 font-bold bg-slate-50"
            >
              <option value="dateDesc">최근 읽은 책 순</option>
              <option value="dateAsc">오래전에 읽은 순</option>
              <option value="ratingDesc">별점 높은 책 순</option>
              <option value="pagesDesc">두꺼운 책 순</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-slate-400 font-bold text-xs mr-2 flex items-center gap-1">
            <Layers className="w-4 h-4" /> 종류별 보기:
          </span>
          <button
            onClick={() => setSelectedCategory('전체')}
            className={`px-4 py-2 rounded-full border-2 text-xs font-black transition-all ${
              selectedCategory === '전체'
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 scale-105 shadow-sm ring-1 ring-indigo-400'
                : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            전체보기 🌈
          </button>
          {Object.entries(CATEGORY_ICONS).map(([catName, emoji]) => (
            <button
              key={catName}
              onClick={() => setSelectedCategory(catName as BookCategory)}
              className={`px-4 py-2 rounded-full border-2 text-xs font-black transition-all ${
                selectedCategory === catName
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 scale-105 shadow-sm ring-1 ring-indigo-400'
                  : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span>{emoji}</span> {catName}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {sortedRecords.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border-4 border-indigo-50 shadow-cute space-y-4">
          <div className="text-6xl animate-bounce" style={{ animationDuration: '3s' }}>🛸</div>
          <h3 className="text-xl font-black text-slate-700 font-sans">
            앗! 책을 찾지 못했어요.
          </h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            조건에 맞는 책이 없거나 아직 책장에 책이 없어요. 새로운 책을 등록해보세요!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRecords.map((record) => (
            <div
              key={record.id}
              onClick={() => onSelectBook(record)}
              className="bg-white rounded-3xl overflow-hidden shadow-cute hover:shadow-cute-hover border-4 border-indigo-50 hover:border-indigo-200 transition-all duration-300 flex hover:-translate-y-2 cursor-pointer relative group min-h-[190px]"
            >
              {/* Spine Decorator (Simulating a cute Book Spine on the left) */}
              <div className={`w-6 ${SPINE_COLORS[record.category]} flex-shrink-0 flex flex-col items-center justify-center text-white py-4 gap-1`}>
                <span className="text-xs font-black [writing-mode:vertical-lr] tracking-widest leading-none">
                  {record.category}
                </span>
                <span className="text-sm mt-auto">{record.moodEmoji}</span>
              </div>

              {/* Book Info Panel */}
              <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    {/* Category Tag */}
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[record.category].split(' ').slice(0, 3).join(' ')}`}>
                      {CATEGORY_ICONS[record.category]} {record.category}
                    </span>
                    
                    {/* Page tag */}
                    {record.pages > 0 && (
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-0.5">
                        <BookOpen className="w-3 h-3" /> {record.pages}쪽
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-slate-800 text-lg leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 mt-1">
                    {record.title}
                  </h3>
                  
                  {/* Author */}
                  <p className="text-slate-400 text-xs font-bold line-clamp-1">
                    {record.author} 씀
                  </p>
                </div>

                {/* Rating & Date */}
                <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= record.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {record.readDate}
                  </span>
                </div>

                {/* Hover Quick Action Panel */}
                <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 flex gap-1 bg-white bg-opacity-90 backdrop-blur-sm p-1 rounded-xl shadow-md border border-slate-100 transition-all duration-300">
                  <button
                    onClick={(e) => handleEdit(e, record)}
                    className="p-1.5 hover:bg-indigo-50 text-indigo-500 rounded-lg hover:scale-110 transition-transform"
                    title="기록 고치기"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, record.id, record.title)}
                    className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg hover:scale-110 transition-transform"
                    title="기록 지우기"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
