import { useState, useEffect } from 'react';
import type { BookRecord } from './types/book';
import { 
  getBookRecords, 
  saveBookRecords, 
  getStats, 
  initialMockBooks,
  getProfiles,
  saveProfiles,
  getActiveProfile,
  saveActiveProfile
} from './utils/storage';
import { Dashboard } from './components/Dashboard';
import { BookList } from './components/BookList';
import { BookForm } from './components/BookForm';
import { BookDetail } from './components/BookDetail';
import { Rocket, BookOpen, Plus, Heart, Users, Trash2 } from 'lucide-react';
import './App.css'; // Just in case, although empty

function App() {
  const [records, setRecords] = useState<BookRecord[]>([]);
  const [profiles, setProfiles] = useState<string[]>([]);
  const [activeProfile, setActiveProfile] = useState<string>('기본 탐험가');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookshelf'>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookRecord | null>(null);
  const [editingBook, setEditingBook] = useState<BookRecord | null>(null);

  // Initialize profiles and records on mount
  useEffect(() => {
    const loadedProfiles = getProfiles();
    const loadedActive = getActiveProfile();
    setProfiles(loadedProfiles);
    setActiveProfile(loadedActive);

    const saved = getBookRecords(loadedActive);
    if (loadedActive === '기본 탐험가' && saved.length === 0) {
      setRecords(initialMockBooks);
      saveBookRecords('기본 탐험가', initialMockBooks);
    } else {
      setRecords(saved);
    }
  }, []);

  // Switch active profile and reload records
  const switchProfile = (profileName: string) => {
    setActiveProfile(profileName);
    saveActiveProfile(profileName);
    const saved = getBookRecords(profileName);
    
    // Automatically load mock data only if '기본 탐험가' is empty
    if (profileName === '기본 탐험가' && saved.length === 0) {
      setRecords(initialMockBooks);
      saveBookRecords('기본 탐험가', initialMockBooks);
    } else {
      setRecords(saved);
    }
    setIsProfileDropdownOpen(false);
  };

  // Create new profile
  const handleCreateProfile = () => {
    const name = newProfileName.trim();
    if (!name) return;
    if (profiles.includes(name)) {
      alert('이미 존재하는 탐험가 이름이에요! 다른 이름을 입력해 주세요. 💫');
      return;
    }
    const updatedProfiles = [...profiles, name];
    setProfiles(updatedProfiles);
    saveProfiles(updatedProfiles);
    setNewProfileName('');
    switchProfile(name);
  };

  // Delete profile click
  const handleDeleteProfileClick = (profileName: string) => {
    if (profileName === '기본 탐험가') {
      alert('기본 탐험가는 삭제할 수 없어요! 🚀');
      return;
    }
    setProfileToDelete(profileName);
  };

  // Confirm delete profile
  const confirmDeleteProfile = () => {
    if (!profileToDelete) return;
    const updatedProfiles = profiles.filter((p) => p !== profileToDelete);
    setProfiles(updatedProfiles);
    saveProfiles(updatedProfiles);
    localStorage.removeItem('kids_reading_log_records_' + profileToDelete);

    if (activeProfile === profileToDelete) {
      switchProfile('기본 탐험가');
    }
    setProfileToDelete(null);
  };

  const handleSaveBook = (newRecord: BookRecord) => {
    let updatedRecords: BookRecord[];
    if (editingBook) {
      // Edit mode
      updatedRecords = records.map((r) => (r.id === newRecord.id ? newRecord : r));
      setEditingBook(null);
    } else {
      // Add mode
      updatedRecords = [newRecord, ...records];
    }
    setRecords(updatedRecords);
    saveBookRecords(activeProfile, updatedRecords);
  };

  const handleDeleteBook = (id: string) => {
    const updatedRecords = records.filter((r) => r.id !== id);
    setRecords(updatedRecords);
    saveBookRecords(activeProfile, updatedRecords);
    if (selectedBook?.id === id) {
      setSelectedBook(null);
      setIsDetailOpen(false);
    }
  };

  const handleSelectBook = (book: BookRecord) => {
    setSelectedBook(book);
    setIsDetailOpen(true);
  };

  const handleEditBook = (book: BookRecord) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleAddNewBook = () => {
    setEditingBook(null);
    setIsFormOpen(true);
  };

  const stats = getStats(records);

  return (
    <div className="min-height-screen pb-16 flex flex-col justify-between">
      {/* Galaxy Header */}
      <header className="bg-gradient-to-r from-space-900 via-indigo-950 to-space-900 text-white py-12 px-6 shadow-xl relative rounded-b-[3rem] border-b-8 border-indigo-500">
        {/* Decorative background overlay that doesn't restrict dropdown overflows */}
        <div className="absolute inset-0 overflow-hidden rounded-b-[3rem] pointer-events-none z-0">
          {/* Floating Stars */}
          <div className="absolute top-6 left-12 text-yellow-200 text-3xl animate-twinkle">★</div>
          <div className="absolute top-24 right-16 text-yellow-100 text-xl animate-twinkle" style={{ animationDelay: '1.2s' }}>✦</div>
          <div className="absolute bottom-8 left-1/4 text-indigo-300 text-2xl animate-float" style={{ animationDuration: '6s' }}>🪐</div>
          <div className="absolute top-10 right-1/3 text-pink-300 text-lg animate-float" style={{ animationDuration: '8s' }}>☄️</div>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-200 to-indigo-200 font-sans flex items-center justify-center md:justify-start gap-3">
              <span>북스토리</span>
              <span className="text-2xl md:text-3xl">🪐</span>
            </h1>
            <p className="text-indigo-200 font-bold text-base md:text-lg">
              오늘도 책나라로 모험을 떠나볼까요, <span className="text-yellow-300 underline underline-offset-4 decoration-2">{stats.title.split(' ')[0]}</span> 탐험가님!
            </p>
          </div>

          {/* Navigation and Switcher Group */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="px-4 py-2.5 rounded-2xl bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 hover:bg-opacity-20 text-white font-black text-sm flex items-center gap-2 transition-all active:scale-95"
              >
                <Users className="w-4 h-4 text-pink-300" />
                <span>👦 {activeProfile}</span>
              </button>

              {isProfileDropdownOpen && (
                <>
                  {/* Backdrop overlay to close dropdown on outer click */}
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)}></div>
                  
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 bg-opacity-95 backdrop-blur-lg border border-indigo-500 border-opacity-30 rounded-2xl p-3 shadow-2xl z-50 text-left space-y-2">
                    <div className="text-[10px] text-indigo-300 font-black px-1 pb-1 border-b border-indigo-950 border-opacity-40">
                      탐험가 선택하기
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {profiles.map((p) => (
                        <div
                          key={p}
                          className={`flex items-center justify-between px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                            activeProfile === p
                              ? 'bg-indigo-600 text-white'
                              : 'text-indigo-100 hover:bg-white hover:bg-opacity-5'
                          }`}
                        >
                          <button
                            onClick={() => switchProfile(p)}
                            className="flex-1 text-left py-1.5 truncate flex items-center gap-1.5 focus:outline-none"
                          >
                            <span>👦</span>
                            <span className="truncate">{p}</span>
                          </button>
                          {p !== '기본 탐험가' && (
                            <button
                              onClick={() => handleDeleteProfileClick(p)}
                              className="p-1 hover:bg-rose-600 hover:text-white text-rose-400 rounded-md transition-colors shrink-0 ml-2"
                              title="탐험가 삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Create New Profile */}
                    <div className="pt-2 border-t border-indigo-950 border-opacity-40">
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          placeholder="이름 입력 (예: 민수)"
                          value={newProfileName}
                          onChange={(e) => setNewProfileName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleCreateProfile()}
                          className="flex-1 px-2.5 py-1.5 text-xs rounded-xl text-slate-800 focus:outline-none bg-indigo-50 font-bold"
                        />
                        <button
                          onClick={handleCreateProfile}
                          className="bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 text-xs rounded-xl font-black text-white shrink-0"
                        >
                          등록
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Galaxy Nav Tabs */}
            <div className="flex bg-white bg-opacity-10 backdrop-blur-md p-1.5 rounded-2xl border border-white border-opacity-20 shadow-lg">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-indigo-950 shadow-md scale-105'
                    : 'text-indigo-100 hover:text-white hover:bg-white hover:bg-opacity-5'
                }`}
              >
                <Rocket className="w-4 h-4" /> 우주 기지
              </button>
              <button
                onClick={() => setActiveTab('bookshelf')}
                className={`px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 transition-all ${
                  activeTab === 'bookshelf'
                    ? 'bg-white text-indigo-950 shadow-md scale-105'
                    : 'text-indigo-100 hover:text-white hover:bg-white hover:bg-opacity-5'
                }`}
              >
                <BookOpen className="w-4 h-4" /> 나의 책장
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl w-full mx-auto px-4 mt-8 flex-1">
        {activeTab === 'dashboard' ? (
          <Dashboard records={records} />
        ) : (
          <BookList
            records={records}
            onSelectBook={handleSelectBook}
            onEditBook={handleEditBook}
            onDeleteBook={handleDeleteBook}
          />
        )}
      </main>

      {/* Floating Add Book Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleAddNewBook}
          className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-black rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 hover:rotate-1 border-4 border-white"
          title="새로운 책 등록하기"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
          <span className="hidden sm:inline text-base tracking-wide">독서 기록 쓰기</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-slate-400 text-xs py-4 flex items-center justify-center gap-1 font-bold">
        <span>북스토리 독서기록장</span>
        <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 animate-pulse" />
        <span>와 함께 즐거운 책나라 모험을 함께해요!</span>
      </footer>

      {/* Book Form Modal */}
      <BookForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveBook}
        editingRecord={editingBook}
      />

      {/* Book Detail Modal */}
      <BookDetail
        record={selectedBook}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEdit={(book) => {
          setIsDetailOpen(false);
          handleEditBook(book);
        }}
        onDelete={handleDeleteBook}
      />

      {/* Custom Delete Profile Confirmation Modal */}
      {profileToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900 bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border-4 border-indigo-200 p-6 text-center space-y-5">
            <div className="text-5xl animate-bounce" style={{ animationDuration: '3s' }}>😢</div>
            <h3 className="text-xl font-black text-slate-800">정말 지울까요?</h3>
            <p className="text-sm text-slate-500 font-bold leading-relaxed">
              <span className="text-indigo-600">'{profileToDelete}'</span> 탐험가를 지울까요?<br />
              지우면 읽은 책 기록과 뱃지가 완전히 사라져요!
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setProfileToDelete(null)}
                className="flex-1 py-3 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-slate-500 font-black text-sm transition-colors"
              >
                안 지울래요
              </button>
              <button
                onClick={confirmDeleteProfile}
                className="flex-1 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm transition-transform active:translate-y-1 shadow-md"
              >
                지울래요!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
