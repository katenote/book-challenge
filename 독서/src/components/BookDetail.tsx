import type { BookRecord } from '../types/book';
import { X, Calendar, BookOpen, Star, Trash2, Edit2 } from 'lucide-react';

interface BookDetailProps {
  record: BookRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (record: BookRecord) => void;
  onDelete: (id: string) => void;
}

const CATEGORY_TAGS: Record<string, { label: string; icon: string; bg: string; text: string }> = {
  '동화/소설': { label: '동화/소설', icon: '🧸', bg: 'bg-pink-100', text: 'text-pink-700' },
  '과학/수학': { label: '과학/수학', icon: '🔬', bg: 'bg-blue-100', text: 'text-blue-700' },
  '역사/사회': { label: '역사/사회', icon: '🏰', bg: 'bg-amber-100', text: 'text-amber-700' },
  '예술/체육': { label: '예술/체육', icon: '🎨', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  '만화책': { label: '만화책', icon: '⚡', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  '기타': { label: '기타', icon: '🧩', bg: 'bg-purple-100', text: 'text-purple-700' },
};

const MOOD_DESCRIPTIONS: Record<string, string> = {
  '😍': '완전 최고였어요! 두 번 세 번 읽고 싶어요.',
  '😊': '기분 좋게 재밌게 읽었어요! 추천해요.',
  '🧐': '새로운 것을 알게 되어 신비롭고 흥미로워요.',
  '⚡': '시간 가는 줄 모르게 완전 짜릿하고 흥미진진했어요!',
  '😢': '마음이 따뜻해지거나 조금 감동적인 슬픔이 있었어요.',
  '🦖': '너무너무 신나고 유쾌한 이야기였어요!',
};

export const BookDetail: React.FC<BookDetailProps> = ({ record, isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen || !record) return null;

  const catInfo = CATEGORY_TAGS[record.category] || { label: '기타', icon: '🧩', bg: 'bg-slate-100', text: 'text-slate-700' };

  const handleDeleteClick = () => {
    if (confirm(`'${record.title}' 독서 기록을 지울까요? 지우면 다시 되돌릴 수 없어요! 😢`)) {
      onDelete(record.id);
      onClose();
    }
  };

  const handleEditClick = () => {
    onEdit(record);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto">
      <div className="bg-amber-50 rounded-3xl w-full max-w-xl shadow-2xl border-8 border-orange-200 relative my-8 max-h-[85vh] flex flex-col overflow-hidden animate-float" style={{ animationDuration: '6s' }}>
        
        {/* Diary Binding Line (Scrapbook Look) */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 flex justify-between px-8 z-20">
          <div className="w-2.5 h-6 bg-slate-700 rounded-full -translate-y-2"></div>
          <div className="w-2.5 h-6 bg-slate-700 rounded-full -translate-y-2"></div>
          <div className="w-2.5 h-6 bg-slate-700 rounded-full -translate-y-2"></div>
          <div className="w-2.5 h-6 bg-slate-700 rounded-full -translate-y-2"></div>
          <div className="w-2.5 h-6 bg-slate-700 rounded-full -translate-y-2"></div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-orange-100 hover:bg-orange-200 rounded-full text-orange-700 hover:scale-110 transition-transform z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Body */}
        <div className="p-6 md:p-8 pt-14 space-y-6 overflow-y-auto flex-1">
          {/* Header Info */}
          <div className="space-y-3 text-left">
            <div className="flex flex-wrap gap-2 items-center">
              <span className={`text-xs font-black px-2.5 py-1 rounded-full border border-orange-300 ${catInfo.bg} ${catInfo.text}`}>
                {catInfo.icon} {catInfo.label}
              </span>
              {record.pages > 0 && (
                <span className="text-xs font-black bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> {record.pages}쪽 책
                </span>
              )}
            </div>

            <h2 className="text-3xl font-black text-slate-800 leading-tight">
              {record.title}
            </h2>
            
            <p className="text-slate-500 font-bold text-sm">
              지은이: {record.author}
            </p>
          </div>

          {/* Rating and Date Badge */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl border-2 border-orange-100 gap-3 text-left">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">내 별점</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-6 h-6 ${
                      s <= record.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">독서 완료일</span>
              <span className="text-sm font-black text-slate-700 flex items-center gap-1.5 justify-start sm:justify-end">
                <Calendar className="w-4 h-4 text-orange-400" /> {record.readDate}
              </span>
            </div>
          </div>

          {/* Feeling / Mood */}
          <div className="bg-orange-100 bg-opacity-50 p-4 rounded-2xl border-2 border-orange-200 flex items-center gap-4 text-left">
            <span className="text-4xl bg-white p-2.5 rounded-2xl shadow-sm border border-orange-200 animate-bounce" style={{ animationDuration: '4s' }}>
              {record.moodEmoji}
            </span>
            <div className="space-y-0.5">
              <span className="text-[10px] text-orange-800 font-black">책을 덮고 난 뒤 기분</span>
              <p className="text-sm font-extrabold text-slate-700">
                {MOOD_DESCRIPTIONS[record.moodEmoji] || '감명 깊었어요!'}
              </p>
            </div>
          </div>

          {/* Reading Review (Notebook Look) */}
          <div className="space-y-2 text-left">
            <span className="text-sm font-black text-slate-500">📖 나의 독서 일기장</span>
            <div 
              className="bg-white rounded-2xl p-6 shadow-inner border-2 border-orange-100 font-handwriting text-2xl text-slate-700 leading-loose min-h-[150px] relative overflow-hidden"
              style={{
                backgroundImage: 'linear-gradient(to bottom, transparent, transparent 38px, #ffedd5 38px, #ffedd5 39px, transparent 39px)',
                backgroundSize: '100% 40px',
                lineHeight: '40px',
                paddingTop: '10px',
              }}
            >
              {record.review ? (
                <p className="whitespace-pre-wrap tracking-wide">{record.review}</p>
              ) : (
                <p className="text-slate-400 italic">아직 느낀 점을 쓰지 않았어요.</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleEditClick}
              className="flex-1 py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-black text-sm flex items-center justify-center gap-1.5 transition-colors border-2 border-indigo-100 hover:scale-102"
            >
              <Edit2 className="w-4 h-4" /> 기록 고치기
            </button>
            <button
              onClick={handleDeleteClick}
              className="flex-1 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-sm flex items-center justify-center gap-1.5 transition-colors border-2 border-rose-100 hover:scale-102"
            >
              <Trash2 className="w-4 h-4" /> 지우기
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
