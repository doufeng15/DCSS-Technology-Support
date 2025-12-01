import React from 'react';
import { EquipmentType, CategoryFilter, User } from '../types';
import { 
  Server, 
  Database, 
  Network, 
  LayoutGrid, 
  Star, 
  LogOut,
  Layers,
  Shield,
  User as UserIcon,
  Users
} from 'lucide-react';

interface SidebarProps {
  currentCategory: CategoryFilter;
  setCategory: (cat: CategoryFilter) => void;
  user: User;
  onLogout: () => void;
  onOpenUserManagement: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentCategory, setCategory, user, onLogout, onOpenUserManagement }) => {
  
  const navItems = [
    { id: 'ALL', label: 'すべての手順書', icon: LayoutGrid },
    { id: 'FAVORITES', label: 'お気に入り', icon: Star },
    { type: 'divider' },
    { id: EquipmentType.SERVER, label: 'サーバー (Server)', icon: Server },
    { id: EquipmentType.STORAGE, label: 'ストレージ (Storage)', icon: Database },
    { id: EquipmentType.NETWORK, label: 'ネットワーク (Network)', icon: Network },
    { id: EquipmentType.GENERAL, label: 'その他 / OS', icon: Layers },
  ];

  return (
    <div className="w-64 bg-dcss-900 text-gray-300 flex flex-col h-screen fixed left-0 top-0 shadow-xl z-20 transition-all duration-300">
      {/* Brand */}
      <div className="p-6 flex items-center gap-3 border-b border-dcss-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
        <div>
          <h1 className="text-white font-bold text-lg tracking-wide">DCSS Tech</h1>
          <p className="text-xs text-gray-500">Field Engineer Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {navItems.map((item, idx) => {
            if (item.type === 'divider') {
              return <li key={idx} className="my-4 border-t border-dcss-800 mx-4"></li>;
            }
            
            const Icon = item.icon as React.ElementType;
            const isActive = currentCategory === item.id;

            return (
              <li key={idx} className="mb-1 px-3">
                <button
                  onClick={() => item.id && setCategory(item.id as CategoryFilter)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'hover:bg-dcss-800 hover:text-white'
                  }`}
                >
                  {Icon && <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Admin Section */}
        {user.role === 'ADMIN' && (
          <div className="mt-4 px-3">
            <div className="text-xs font-bold text-gray-500 uppercase px-3 mb-2 tracking-wider">管理者メニュー</div>
            <button
              onClick={onOpenUserManagement}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-dcss-800 hover:text-white"
            >
              <Users size={18} className="text-indigo-400" />
              <span className="text-sm font-medium">ユーザー管理</span>
            </button>
          </div>
        )}
      </nav>

      {/* User & Logout Section */}
      <div className="bg-dcss-800 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-200 flex items-center justify-center border border-blue-500/30">
            {user.role === 'ADMIN' ? <Shield size={16} /> : <UserIcon size={16} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm text-red-300 bg-red-900/20 hover:bg-red-900/40 border border-red-900/30 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          <span>ログアウト</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;