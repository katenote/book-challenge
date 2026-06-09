import React, { useState, useEffect } from 'react';
import type { BookRecord, BookCategory, MoodEmoji } from '../types/book';
import { X, Star } from 'lucide-react';

interface BookFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: BookRecord) => void;
  editingRecord?: BookRecord | null;
}

const CATEGORIES: { value: BookCategory; label: string; icon: string; color: string }[] = [
  { value: '동화/소설', label: '동화/소설', icon: '🧸', color: 'bg-pink-100 hover:bg-pink-200 text-pink-700 border-pink-300' },
  { value: '과학/수학', label: '과학/수학', icon: '🔬', color: 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300' },
  { value: '역사/사회', label: '역사/사회', icon: '🏰', color: 'bg-amber-100 hover:bg-amber-200 text-amber-700 border-amber-300' },
  { value: '예술/체육', label: '예술/체육', icon: '🎨', color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border-emerald-300' },
  { value: '만화책', label: '만화책', icon: '⚡', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border-yellow-300' },
  { value: '기타', label: '기타', icon: '🧩', color: 'bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300' },
];

const EMOJIS: { value: MoodEmoji; label: string }[] = [
  { value: '😍', label: '최고예요' },
  { value: '😊', label: '좋아요' },
  { value: '🧐', label: '신비해요' },
  { value: '⚡', label: '흥미진진' },
  { value: '😢', label: '감동/슬픔' },
  { value: '🦖', label: '짱 신나요' },
];

const RATING_LABELS: Record<number, string> = {
  1: '조금 아쉬워요 😢',
  2: '그냥 그래요 🧐',
  3: '재밌어요! 😊',
  4: '아주 재밌어요! 😍',
  5: '최고의 책이에요! 🚀',
};

export const BookForm: React.FC<BookFormProps> = ({ isOpen, onClose, onSave, editingRecord }) => {
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [readDate, setReadDate] = useState(getTodayString());
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [review, setReview] = useState('');
  const [category, setCategory] = useState<BookCategory>('동화/소설');
  const [pages, setPages] = useState<number | ''>('');
  const [moodEmoji, setMoodEmoji] = useState<MoodEmoji>('😍');

  useEffect(() => {
    if (editingRecord) {
      setTitle(editingRecord.title);
      setAuthor(editingRecord.author);
      setReadDate(editingRecord.readDate);
      setRating(editingRecord.rating);
      setReview(editingRecord.review);
      setCategory(editingRecord.category);
      setPages(editingRecord.pages);
      setMoodEmoji(editingRecord.moodEmoji);
    } else {
      setTitle('');
      setAuthor('');
      setReadDate(getTodayString());
      setRating(5);
      setReview('');
      setCategory('동화/소설');
      setPages('');
      setMoodEmoji('😍');
    }
  }, [editingRecord, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('책 제목을 입력해주세요! 📚');
      return;
    }
    
    onSave({
      id: editingRecord ? editingRecord.id : Date.now().toString(),
      title: title.trim(),
      author: author.trim() || '작가 미상',
      readDate,
      rating,
      review: review.trim(),
      category,
      pages: Number(pages) || 0,
      moodEmoji,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-indigo-200 p-6 md:p-8 animate-pulse-slow" style={{ animationIterationCount: 1, animationDuration: '0.4s' }}>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-indigo-50 pb-4">
          <h2 className="text-2xl font-black text-slate-800 font-sans flex items-center gap-2">
            {editingRecord ? '✏️ 독서 기록 수정하기' : '🚀 새로운 책 등록하기'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          
          {/* Title & Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-black text-slate-600">책 제목 *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="책 이름을 적어주세요!"
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none text-slate-700 font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-black text-slate-600">지은이 (글쓴이)</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="누가 쓴 책인가요?"
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none text-slate-700 font-medium"
              />
            </div>
          </div>

          {/* Date & Pages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-black text-slate-600">읽은 날짜</label>
              <input
                type="date"
                value={readDate}
                onChange={(e) => setReadDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none text-slate-700 font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-black text-slate-600">읽은 페이지 수 (쪽)</label>
              <input
                type="number"
                value={pages}
                onChange={(e) => setPages(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="몇 쪽까지 읽었나요?"
                min="0"
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none text-slate-700 font-medium"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-black text-slate-600">어떤 종류의 책인가요?</label>
            <div className="flex flex-wrap gap-2.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`px-4 py-2.5 rounded-full border-2 text-sm font-black transition-all flex items-center gap-1.5 ${
                    category === cat.value
                      ? 'border-indigo-500 scale-105 shadow-md bg-indigo-50 text-indigo-700 ring-2 ring-indigo-400 ring-offset-2'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-3xl border-2 border-amber-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <label className="block text-sm font-black text-amber-800">이 책의 별점 평가</label>
              <p className="text-xs text-amber-600 font-bold mt-1">별을 눌러 점수를 주세요!</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating ?? rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm font-black text-amber-700 font-sans h-5">
                {RATING_LABELS[hoverRating ?? rating]}
              </span>
            </div>
          </div>

          {/* Mood Emoji */}
          <div className="space-y-2">
            <label className="block text-sm font-black text-slate-600">다 읽고 난 내 기분은?</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji.value}
                  type="button"
                  onClick={() => setMoodEmoji(emoji.value)}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                    moodEmoji === emoji.value
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-800 scale-105 font-bold shadow-md'
                      : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-3xl">{emoji.value}</span>
                  <span className="text-[10px] font-bold">{emoji.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Review Textarea */}
          <div className="space-y-2">
            <label className="block text-sm font-black text-slate-600">독서 감상문 (생각이나 느낀 점) *</label>
            <div className="relative">
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="이 책을 읽고 어떤 느낌이 들었나요? 가장 재미있었던 장면이나 기억에 남는 이야기를 자유롭게 적어보세요! ✍️"
                rows={5}
                required
                className="w-full p-5 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:outline-none text-slate-700 font-handwriting text-xl leading-relaxed tracking-wide shadow-inner"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, transparent, transparent 33px, #e2e8f0 33px, #e2e8f0 34px, transparent 34px)',
                  backgroundSize: '100% 35px',
                  lineHeight: '35px',
                  paddingTop: '6px',
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t-2 border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-slate-500 font-black text-base transition-colors"
            >
              취소할래요 😥
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-black text-base transition-transform active:translate-y-1 shadow-cute hover:shadow-cute-hover active:shadow-cute-active"
            >
              책장에 저장! 🎒
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
