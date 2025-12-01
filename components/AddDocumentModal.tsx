import React, { useState } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { DocumentItem, EquipmentType } from '../types';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (doc: Omit<DocumentItem, 'id' | 'lastUpdated' | 'isFavorite'>) => void;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: EquipmentType.SERVER,
    manufacturer: '',
    modelSeries: '',
    boxLink: '',
    description: '',
    tags: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title: formData.title,
      type: formData.type,
      manufacturer: formData.manufacturer,
      modelSeries: formData.modelSeries,
      boxLink: formData.boxLink,
      description: formData.description,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
    });
    // Reset and close
    setFormData({
      title: '',
      type: EquipmentType.SERVER,
      manufacturer: '',
      modelSeries: '',
      boxLink: '',
      description: '',
      tags: ''
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-dcss-800 flex items-center gap-2">
            <Plus className="text-blue-600" size={24} />
            新規手順書の登録
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">手順書タイトル <span className="text-red-500">*</span></label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="例: HPE DL380 Gen10 - ファン交換手順"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
              />
            </div>

            {/* Manufacturer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">メーカー <span className="text-red-500">*</span></label>
              <input
                required
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                placeholder="例: HPE, Dell, Cisco"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Model Series */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">機種・シリーズ <span className="text-red-500">*</span></label>
              <input
                required
                name="modelSeries"
                value={formData.modelSeries}
                onChange={handleChange}
                placeholder="例: ProLiant Gen10"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリ <span className="text-red-500">*</span></label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {Object.values(EquipmentType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

             {/* Box Link */}
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Box 共有リンクURL <span className="text-red-500">*</span></label>
              <input
                required
                name="boxLink"
                value={formData.boxLink}
                onChange={handleChange}
                placeholder="https://app.box.com/..."
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-blue-600 underline-offset-2"
              />
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">説明・備考</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="作業の注意点や対象バージョンの詳細など"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
            </div>

            {/* Tags */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">タグ (カンマ区切り)</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="例: HDD, 交換, 緊急"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
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
              登録する
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddDocumentModal;