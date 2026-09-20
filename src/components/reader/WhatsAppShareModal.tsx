import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { NewsItem, LanguageConfig } from '../../types';

interface WhatsAppShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsItem: NewsItem | null;
  currentLangConfig: LanguageConfig;
}

export const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({
  isOpen,
  onClose,
  newsItem,
  currentLangConfig
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !newsItem) return null;

  const shareText = `*${newsItem.title}*\n\n${newsItem.summary}\n\n📍 ${newsItem.district}, ${newsItem.state}\n📲 Read full hyperlocal news on *${currentLangConfig.brandName}*: https://onwaynews.app/read/${newsItem.id}`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShareToWhatsApp = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleDownloadCard = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Trigger a direct link download simulation
      const link = document.createElement('a');
      link.href = newsItem.imageUrl;
      link.download = `OnWay-News-${newsItem.district}-${newsItem.id}.jpg`;
      link.target = '_blank';
      link.click();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                WhatsApp Status & Group Share Card
              </h3>
              <p className="text-[11px] text-slate-400">
                Generate high-engagement viral news card
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Preview Card (The actual stylized card output) */}
        <div className="p-4 bg-slate-950 flex justify-center">
          <div 
            id="whatsapp-rendered-card"
            className="w-full max-w-sm bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden text-slate-100"
          >
            {/* Top Brand Banner */}
            <div className="px-3 py-2 bg-gradient-to-r from-rose-700 via-red-600 to-amber-600 flex items-center justify-between text-white">
              <div className="flex items-center gap-1.5">
                <span className="bg-white text-rose-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                  ON
                </span>
                <span className="font-extrabold text-xs tracking-tight">
                  {currentLangConfig.brandName}
                </span>
              </div>
              <span className="text-[10px] font-semibold tracking-wide uppercase bg-black/30 px-2 py-0.5 rounded">
                Verified News
              </span>
            </div>

            {/* Visual Image with watermark */}
            <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
              <img
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-slate-200">
                <span className="bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm border border-slate-700 font-medium">
                  📍 {newsItem.district}, {newsItem.state}
                </span>
                <span className="bg-rose-600 px-2 py-0.5 rounded font-bold text-white uppercase text-[9px]">
                  {newsItem.category}
                </span>
              </div>
            </div>

            {/* Headline & 60-word content */}
            <div className="p-3.5 space-y-2">
              <h4 className="font-bold text-sm sm:text-[15px] leading-snug text-white">
                {newsItem.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                {newsItem.summary}
              </p>
            </div>

            {/* Card Footer Watermark */}
            <div className="px-3 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <div className="flex items-center gap-1">
                <span>Reporter: {newsItem.author.name}</span>
                {newsItem.author.verified && <CheckCircle2 className="w-3 h-3 text-blue-400" />}
              </div>
              <span className="text-amber-400 font-bold">OnWay News App</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleShareToWhatsApp}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share to WhatsApp</span>
            </button>
            <button
              onClick={handleDownloadCard}
              disabled={downloading}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>{downloading ? 'Preparing...' : 'Download Image'}</span>
            </button>
          </div>

          <button
            onClick={handleCopyText}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy News Summary & Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
