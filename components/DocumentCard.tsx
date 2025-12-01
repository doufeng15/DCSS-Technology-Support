import React from 'react';
import { DocumentItem, EquipmentType } from '../types';
import { ExternalLink, Star, FileText, Clock, Tag, Pencil } from 'lucide-react';

interface DocumentCardProps {
  doc: DocumentItem;
  toggleFavorite: (id: string) => void;
  onEdit: (doc: DocumentItem) => void;
  onOpenDetail: (doc: DocumentItem) => void;
  canEdit: boolean;
}

const getBadgeColor = (type: EquipmentType) => {
  switch (type) {
    case EquipmentType.SERVER: return 'bg-purple-100 text-purple-800';
    case EquipmentType.STORAGE: return 'bg-green-100 text-green-800';
    case EquipmentType.NETWORK: return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const DocumentCard: React.FC<DocumentCardProps> = ({ doc, toggleFavorite, onEdit, onOpenDetail, canEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex flex-col h-full group">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase ${getBadgeColor(doc.type)}`}>
            {doc.type}
          </span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(doc.id);
            }}
            className="text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none"
          >
            <Star size={18} fill={doc.isFavorite ? "gold" : "none"} className={doc.isFavorite ? "text-yellow-400" : ""} />
          </button>
        </div>
        
        {/* Clickable Title for Detail View */}
        <button 
          onClick={() => onOpenDetail(doc)}
          className="text-left w-full group-hover:underline decoration-blue-500 decoration-2 underline-offset-2 focus:outline-none"
        >
          <h3 className="font-bold text-gray-800 text-lg mb-1 leading-tight group-hover:text-blue-700 transition-colors">
            {doc.title}
          </h3>
        </button>
        
        <div className="text-xs text-gray-500 mb-4 font-medium">
          {doc.manufacturer} • {doc.modelSeries}
        </div>

        {doc.description && (
          <p className="text-xs text-gray-600 mb-4 line-clamp-2">
            {doc.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1 mb-4">
          {doc.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded text-[10px] text-gray-500">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 rounded-b-xl flex justify-between items-center">
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <Clock size={12} />
          Updated {doc.lastUpdated}
        </div>
        
        <div className="flex items-center gap-3">
          {canEdit && (
            <button 
              onClick={() => onEdit(doc)}
              className="text-gray-400 hover:text-blue-600 p-1 rounded transition-colors"
              title="情報を編集"
            >
              <Pencil size={14} />
            </button>
          )}
          <a 
            href={doc.boxLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold text-box-blue hover:underline"
          >
            <FileText size={14} />
            Boxで開く
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;