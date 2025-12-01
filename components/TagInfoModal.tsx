import React, { useEffect, useState } from 'react';
import { X, Globe, Sparkles, Loader2, ExternalLink } from 'lucide-react';
import { explainTechnicalTerm, ExplanationResult } from '../services/geminiService';

interface TagInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  tagName: string | null;
}

const TagInfoModal: React.FC<TagInfoModalProps> = ({ isOpen, onClose, tagName }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExplanationResult | null>(null);

  useEffect(() => {
    if (isOpen && tagName) {
      const fetchData = async () => {
        setLoading(true);
        setResult(null);
        const data = await explainTechnicalTerm(tagName);
        setResult(data);
        setLoading(false);
      };
      fetchData();
    }
  }, [isOpen, tagName]);

  if (!isOpen || !tagName) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 to-blue-900 p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
              <Sparkles className="text-yellow-300" size={24} />
            </div>
            <div>
              <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider">AI Technical Explanation</p>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                #{tagName}
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4">
              <Loader2 className="animate-spin text-blue-600" size={40} />
              <p className="text-gray-500 font-medium animate-pulse">
                Webから最新情報を収集中...
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Main Explanation */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="prose prose-sm md:prose-base prose-blue max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {result.text}
                </div>
              </div>

              {/* Sources / Grounding */}
              {result.sources.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-3">
                    <Globe size={16} />
                    参照元・関連リンク
                  </h3>
                  <ul className="space-y-2">
                    {result.sources.map((source, idx) => (
                      <li key={idx}>
                        <a 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-sm text-blue-700 hover:text-blue-900 hover:underline group"
                        >
                          <ExternalLink size={14} className="mt-0.5 shrink-0 opacity-70 group-hover:opacity-100" />
                          <span className="truncate">{source.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <p className="text-[10px] text-gray-400 text-center mt-4">
                Powered by Gemini • Google Search Grounding
              </p>
            </div>
          ) : (
             <div className="text-center text-gray-500 py-10">
               情報を取得できませんでした。
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagInfoModal;