import React, { useState } from 'react';
import { X, Save, UserPlus, Shield, User as UserIcon } from 'lucide-react';
import { UserAccount, UserRole } from '../types';

interface ManageUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: Omit<UserAccount, 'id'>) => void;
}

const ManageUsersModal: React.FC<ManageUsersModalProps> = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'GENERAL' as UserRole
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    });
    // Reset and close
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'GENERAL'
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-dcss-800 flex items-center gap-2">
            <UserPlus className="text-blue-600" size={24} />
            ユーザーアカウント追加
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">氏名 <span className="text-red-500">*</span></label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="例: 佐藤 健"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">メールアドレス <span className="text-red-500">*</span></label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@dcsstech.co.jp"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">パスワード <span className="text-red-500">*</span></label>
            <input
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">権限設定</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'GENERAL' }))}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg border text-sm font-medium transition-all ${
                  formData.role === 'GENERAL' 
                    ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <UserIcon size={16} />
                一般社員
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'ADMIN' }))}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg border text-sm font-medium transition-all ${
                  formData.role === 'ADMIN' 
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Shield size={16} />
                管理者
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {formData.role === 'ADMIN' 
                ? '※ ユーザー管理および手順書の編集・追加・削除が可能です。' 
                : '※ 手順書の閲覧・検索のみ可能です。'}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
            >
              <Save size={18} />
              追加する
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ManageUsersModal;