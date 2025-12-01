import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Assistant from './components/Assistant';
import DocumentCard from './components/DocumentCard';
import AddDocumentModal from './components/AddDocumentModal';
import EditDocumentModal from './components/EditDocumentModal';
import ManageUsersModal from './components/ManageUsersModal';
import DocumentDetailModal from './components/DocumentDetailModal';
import TagInfoModal from './components/TagInfoModal';
import AuthScreen from './components/AuthScreen';
import { DOCUMENTS, INITIAL_USERS } from './constants';
import { CategoryFilter, DocumentItem, User, UserAccount } from './types';
import { Search, Sparkles, Plus } from 'lucide-react';

const App: React.FC = () => {
  // --- User & Auth State ---
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // --- Document State ---
  const [category, setCategory] = useState<CategoryFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState<DocumentItem[]>(DOCUMENTS);
  
  // --- UI Modal State ---
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUserManageModalOpen, setIsUserManageModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isTagInfoModalOpen, setIsTagInfoModalOpen] = useState(false);
  
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // --- Auth Handlers ---
  const handleLogin = (email: string, pass: string) => {
    const account = userAccounts.find(u => u.email === email && u.password === pass);
    if (account) {
      setCurrentUser(account);
      setAuthError(null);
    } else {
      setAuthError('メールアドレスまたはパスワードが正しくありません。');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCategory('ALL');
    setAuthError(null);
  };

  const handleAddUser = (newUser: Omit<UserAccount, 'id'>) => {
    const user: UserAccount = {
      ...newUser,
      id: `user-${Date.now()}`
    };
    setUserAccounts(prev => [...prev, user]);
  };

  // --- Document Handlers ---
  const toggleFavorite = (id: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc
    ));
  };

  const handleAddDocument = (newDocData: Omit<DocumentItem, 'id' | 'lastUpdated' | 'isFavorite'>) => {
    const newDoc: DocumentItem = {
      ...newDocData,
      id: `custom-${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0],
      isFavorite: false,
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const handleOpenEditModal = (doc: DocumentItem) => {
    if (currentUser?.role === 'ADMIN') {
      setEditingDoc(doc);
      setIsEditModalOpen(true);
    }
  };

  const handleOpenDetailModal = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setIsDetailModalOpen(true);
  };

  const handleTagClick = (tagName: string) => {
    setSelectedTag(tagName);
    setIsTagInfoModalOpen(true);
  };

  const handleUpdateDocument = (updatedDoc: DocumentItem) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === updatedDoc.id 
        ? { ...updatedDoc, lastUpdated: new Date().toISOString().split('T')[0] } 
        : doc
    ));
    setIsEditModalOpen(false);
    setEditingDoc(null);
  };

  // --- Filtering Logic ---
  const filteredDocs = useMemo(() => {
    return documents.filter(doc => {
      // 1. Category Filter
      if (category === 'FAVORITES' && !doc.isFavorite) return false;
      if (category !== 'ALL' && category !== 'FAVORITES' && doc.type !== category) return false;

      // 2. Search Filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          doc.title.toLowerCase().includes(q) ||
          doc.manufacturer.toLowerCase().includes(q) ||
          doc.modelSeries.toLowerCase().includes(q) ||
          doc.tags.some(tag => tag.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [documents, category, searchQuery]);

  // --- Dynamic Header Title ---
  const getHeaderTitle = () => {
    if (searchQuery) return `検索結果: "${searchQuery}" (${filteredDocs.length}件)`;
    switch (category) {
      case 'ALL': return 'すべての手順書';
      case 'FAVORITES': return 'お気に入り';
      case 'SERVER': return 'サーバー関連';
      case 'STORAGE': return 'ストレージ関連';
      case 'NETWORK': return 'ネットワーク関連';
      case 'GENERAL': return 'その他';
      default: return 'ドキュメント';
    }
  };

  // --- Render ---
  
  // If no user is logged in, show Auth Screen
  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} authError={authError} />;
  }

  // Determine permissions
  const isAdmin = currentUser.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-dcss-50 font-sans">
      <Sidebar 
        currentCategory={category} 
        setCategory={setCategory} 
        user={currentUser}
        onLogout={handleLogout}
        onOpenUserManagement={() => setIsUserManageModalOpen(true)}
      />

      {/* Main Content */}
      <main className="ml-64 p-8 min-h-screen transition-all">
        
        {/* Top Header Area */}
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8 sticky top-0 bg-dcss-50/95 backdrop-blur-sm z-10 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-dcss-800">{getHeaderTitle()}</h2>
            <p className="text-sm text-gray-500">Box内技術情報へ直接アクセス</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-blue-500" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2.5 w-64 lg:w-72 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm transition-all"
                placeholder="キーワード検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Add Document Button (ADMIN ONLY) */}
            {isAdmin && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-white text-dcss-600 border border-gray-300 hover:bg-gray-50 hover:text-blue-600 px-4 py-2.5 rounded-lg shadow-sm transition-all font-medium"
                title="手順書を新規追加"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">手順書追加</span>
              </button>
            )}

            {/* AI Assistant Toggle */}
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              <Sparkles size={18} />
              <span className="hidden sm:inline font-medium">AIアシスタント</span>
              <span className="sm:hidden font-medium">AI</span>
            </button>
          </div>
        </header>

        {/* Content Grid */}
        {filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
            {filteredDocs.map(doc => (
              <DocumentCard 
                key={doc.id} 
                doc={doc} 
                toggleFavorite={toggleFavorite} 
                onEdit={handleOpenEditModal}
                onOpenDetail={handleOpenDetailModal}
                canEdit={isAdmin}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 text-gray-400">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium text-gray-500">該当する手順書が見つかりません</p>
            <p className="text-sm">キーワードを変更するか、AIアシスタントに聞いてみてください。</p>
            <div className="flex gap-4 mt-4">
              <button 
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:underline"
              >
                フィルターをクリア
              </button>
              {isAdmin && (
                <>
                  <span className="text-gray-300">|</span>
                  <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="text-blue-600 hover:underline"
                  >
                    新規作成する
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {/* AI Assistant Overlay */}
      <Assistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
      
      {/* Modals */}
      <DocumentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        doc={selectedDoc}
        onTagClick={handleTagClick}
      />

      <TagInfoModal
        isOpen={isTagInfoModalOpen}
        onClose={() => setIsTagInfoModalOpen(false)}
        tagName={selectedTag}
      />

      {isAdmin && (
        <>
          <AddDocumentModal 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
            onAdd={handleAddDocument}
          />
          <EditDocumentModal 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
            document={editingDoc}
            onUpdate={handleUpdateDocument}
          />
          <ManageUsersModal 
            isOpen={isUserManageModalOpen} 
            onClose={() => setIsUserManageModalOpen(false)} 
            onAddUser={handleAddUser}
          />
        </>
      )}
    </div>
  );
};

export default App;