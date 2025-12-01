import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, AlertCircle, Layers, Hexagon } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (email: string, pass: string) => void;
  authError: string | null;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, authError }) => {
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-dcss-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300 border border-gray-100">
        
        {/* Custom Logo Header Area */}
        <div className="w-full bg-gradient-to-br from-dcss-900 via-dcss-800 to-dcss-600 p-10 flex flex-col items-center justify-center text-white relative overflow-hidden">
          
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-20 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Icon Logo */}
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-blue-500 blur-md opacity-40 rounded-full"></div>
              <div className="relative w-16 h-16 bg-gradient-to-tr from-gray-800 to-black rounded-xl border border-gray-700 shadow-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Layers className="text-blue-400" size={32} />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-lg p-1 border-2 border-dcss-900">
                  <Hexagon size={12} className="text-white fill-current" />
                </div>
              </div>
            </div>

            {/* Typography */}
            <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 text-center leading-tight">
              DCSS Technology
            </h1>
            
            <div className="flex items-center gap-3 mt-2 opacity-90">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-400"></div>
              <span className="text-sm font-semibold tracking-[0.3em] text-blue-100">JAPAN</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-400"></div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
            Field Engineer Portal
          </h2>
          <p className="text-xs text-center text-gray-500 mb-8">
            技術情報データベースへログイン
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Error Message */}
            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-lg flex items-center gap-2 animate-pulse">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="group">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 group-focus-within:text-blue-600 transition-colors">メールアドレス</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@dcsstech.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 group-focus-within:text-blue-600 transition-colors">パスワード</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-dcss-600 to-dcss-800 hover:from-dcss-500 hover:to-dcss-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-900/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              ログイン
              <ArrowRight size={18} />
            </button>

          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400">
              © {new Date().getFullYear()} DCSS Technology Japan. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthScreen;