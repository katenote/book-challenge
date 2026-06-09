import { useState, useEffect } from 'react';
import type { BookRecord } from './types/book';
import { getBookRecords, saveBookRecords, getStats, initialMockBooks } from './utils/storage';
import { Dashboard } from './components/Dashboard';
import { BookList } from './components/BookList';
import { BookForm } from './components/BookForm';
import { BookDetail } from './components/BookDetail';
import { Rocket, BookOpen, Plus, Heart } from 'lucide-react';
import './App.css'; // Just in case, although empty

function App() {
  const [records, setRecords] = useState<BookRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookshelf'>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookRecord | null>(null);
  const [editingBook, setEditingBook] = useState<BookRecord | null>(null);

  // Initialize records from localStorage or mock data
  useEffect(() => {
    const saved = getBookRecords();
    if (saved.length === 0) {
      setRecords(initialMockBooks);
      saveBookRecords(initialMockBooks);
    } else {
      setRecords(saved);
    }
  }, []);

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
    saveBookRecords(updatedRecords);
  };

  const handleDeleteBook = (id: string) => {
    const updatedRecords = records.filter((r) => r.id !== id);
    setRecords(updatedRecords);
    saveBookRecords(updatedRecords);
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
      <header className="bg-gradient-to-r from-space-900 via-indigo-950 to-space-900 text-white py-12 px-6 shadow-xl relative overflow-hidden rounded-b-[3rem] border-b-8 border-indigo-500">
        {/* Floating Stars */}
        <div className="absolute top-6 left-12 text-yellow-200 text-3xl animate-twinkle">★</div>
        <div className="absolute top-24 right-16 text-yellow-100 text-xl animate-twinkle" style={{ animationDelay: '1.2s' }}>✦</div>
        <div className="absolute bottom-8 left-1/4 text-indigo-300 text-2xl animate-float" style={{ animationDuration: '6s' }}>🪐</div>
        <div className="absolute top-10 right-1/3 text-pink-300 text-lg animate-float" style={{ animationDuration: '8s' }}>☄️</div>

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
    </div>
  );
}

export default App;
