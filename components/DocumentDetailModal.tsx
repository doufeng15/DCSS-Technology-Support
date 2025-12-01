import React from 'react';
import { X, ExternalLink, Calendar, Tag, Server, CheckCircle2, Info } from 'lucide-react';
import { DocumentItem, EquipmentType } from '../types';

interface DocumentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  doc: DocumentItem | null;
  onTagClick: (tagName: string) => void;
}

const getBadgeColor = (type: EquipmentType) => {
  switch (type) {
    case EquipmentType.SERVER: return 'bg-purple-100 text-purple-800';
    case EquipmentType.STORAGE: return 'bg-green-100 text-green-800';
    case EquipmentType.NETWORK: return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const DocumentDetailModal: React.FC<DocumentDetailModalProps> = ({ isOpen, onClose, doc, onTagClick }) => {
  if (!isOpen || !doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header with Pattern */}
        <div className="relative bg-dcss-900 p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 p-4">
            <button 
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="relative z-10">
            <span className={`inline-block px-3 py-1 rounded text-xs font-bold tracking-wider uppercase mb-3 ${getBadgeColor(doc.type)} border border-white/10`}>
              {doc.type}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
              {doc.title}
            </h2>
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <Server size={14} />
              <span>{doc.manufacturer}</span>
              <span className="text-blue-200/50">•</span>
              <span>{doc.modelSeries}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          
          {/* Main Description */}
          <div className="prose prose-blue max-w-none">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">概要・手順詳細</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {doc.description || "この手順書には詳細な説明が登録されていません。Boxファイルを確認してください。"}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">更新情報</h4>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar size={18} className="text-blue-500" />
                <span className="font-medium">{doc.lastUpdated}</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">メーカー・シリーズ</h4>
              <div className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 size={18} className="text-green-500" />
                <span className="font-medium">{doc.manufacturer} / {doc.modelSeries}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <Tag size={16} />
              関連タグ
              <span className="text-xs font-normal text-gray-400 ml-2">※クリックしてAI解説を表示</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {doc.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className="group relative px-3 py-1 bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-700 rounded-full text-sm font-medium border border-gray-200 hover:border-blue-200 transition-all flex items-center gap-1"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-1 -right-1 text-blue-500">
                    <Info size={10} fill="currentColor" />
                  </span>
                  #{tag}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer / Action */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-between items-center">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            閉じる
          </button>
          <a
            href={doc.boxLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 bg-box-blue hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            <ExternalLink size={20} />
            Boxでファイルを開く
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailModal;