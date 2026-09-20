import React, { useState, useEffect } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Share2, 
  Heart, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  MessageCircle,
  Eye,
  Type,
  Maximize2
} from 'lucide-react';
import { NewsItem, LanguageCode } from '../../types';

interface NewsCardFlipProps {
  newsItems: NewsItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  onShareWhatsApp: (item: NewsItem) => void;
  selectedLanguage: LanguageCode;
}

export const NewsCardFlip: React.FC<NewsCardFlipProps> = ({
  newsItems,
  currentIndex,
  onNavigate,
  onShareWhatsApp,
  selectedLanguage
}) => {
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [isBookmarked, setIsBookmarked] = useState<Record<string, boolean>>({});
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFlipping, setIsFlipping] = useState<'up' | 'down' | null>(null);

  const currentItem = newsItems[currentIndex] || newsItems[0];

  // Stop speech when changing cards
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentIndex]);

  // Keyboard navigation for power readers (Arrow Up / Arrow Down)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, newsItems.length]);

  if (!currentItem) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-slate-400">
        <p className="text-base font-semibold">ఈ వర్గానికి సంబంధించిన వార్తలు ప్రస్తుతం లోడ్ అవుతున్నాయి...</p>
        <span className="text-xs text-slate-500 mt-2">No items found for the current filter. Try resetting location or category.</span>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < newsItems.length - 1) {
      setIsFlipping('down');
      setTimeout(() => {
        onNavigate(currentIndex + 1);
        setIsFlipping(null);
      }, 250);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipping('up');
      setTimeout(() => {
        onNavigate(currentIndex - 1);
        setIsFlipping(null);
      }, 250);
    }
  };

  const toggleLike = () => {
    setIsLiked(prev => ({ ...prev, [currentItem.id]: !prev[currentItem.id] }));
  };

  const toggleBookmark = () => {
    setIsBookmarked(prev => ({ ...prev, [currentItem.id]: !prev[currentItem.id] }));
  };

  const toggleAudioNarration = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${currentItem.title}. ${currentItem.summary}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      
      // Determine speech lang code
      const langMap: Record<LanguageCode, string> = {
        te: 'te-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        mr: 'mr-IN',
        gu: 'gu-IN',
        bn: 'bn-IN',
        en: 'en-IN'
      };
      utterance.lang = langMap[selectedLanguage] || 'en-IN';

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const fontClasses = {
    normal: 'text-[15px] sm:text-[16px] leading-relaxed',
    large: 'text-[17px] sm:text-[18px] leading-relaxed font-medium',
    xlarge: 'text-[19px] sm:text-[20px] leading-loose font-medium'
  }[fontSizeMultiplier];

  return (
    <div className="relative w-full max-w-xl mx-auto select-none">
      {/* Top reader progress & controls */}
      <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 bg-slate-900/80 rounded-t-2xl border-t border-x border-slate-800 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-rose-400">
            {currentIndex + 1}
          </span>
          <span className="text-slate-600">/</span>
          <span className="font-mono text-slate-400">{newsItems.length}</span>
          <span className="text-[11px] text-slate-500 hidden sm:inline ml-1">
            • 60-Word Magazine Card
          </span>
        </div>

        {/* Font scaler & Audio Narration */}
        <div className="flex items-center gap-1.5">
          <button
            id="tts-audio-btn"
            onClick={toggleAudioNarration}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
              isSpeaking 
                ? 'bg-amber-500 text-slate-950 animate-pulse' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title="Listen to News (Audio TTS)"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isSpeaking ? 'Speaking...' : 'Listen'}</span>
          </button>

          <button
            id="font-scaler-btn"
            onClick={() => {
              setFontSizeMultiplier(curr => 
                curr === 'normal' ? 'large' : curr === 'large' ? 'xlarge' : 'normal'
              );
            }}
            className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold"
            title="Adjust text size (Normal / Large / XL)"
          >
            <Type className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Magazine Flip Card Container */}
      <div 
        className={`relative w-full bg-slate-900 border border-slate-800 rounded-b-2xl overflow-hidden shadow-2xl transition-transform duration-300 ease-out ${
          isFlipping === 'down' 
            ? 'translate-y-6 opacity-0 scale-95' 
            : isFlipping === 'up' 
            ? '-translate-y-6 opacity-0 scale-95' 
            : 'translate-y-0 opacity-100 scale-100'
        }`}
      >
        {/* Visual Cover Image */}
        <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-950">
          <img
            src={currentItem.imageUrl}
            alt={currentItem.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="eager"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Badges on Image */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
            {currentItem.isBreaking && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase bg-rose-600 text-white shadow-lg animate-pulse">
                <Sparkles className="w-3 h-3" />
                Breaking News
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-slate-900/90 text-amber-300 border border-slate-700 backdrop-blur-sm">
              {currentItem.category}
            </span>
          </div>

          {/* Hyperlocal location tag at bottom-left of image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 font-medium">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-200">
              📍 {currentItem.state} • {currentItem.district} {currentItem.mandal ? `• ${currentItem.mandal}` : ''}
            </span>
            <span className="text-[11px] text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded">
              {currentItem.timestamp}
            </span>
          </div>
        </div>

        {/* Card Content: Title & 60-Word Summary */}
        <div className="p-4 sm:p-6 space-y-3 bg-slate-900">
          {/* Headline */}
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug">
            {currentItem.title}
          </h2>

          {/* 60-word Concise Summarized Body */}
          <p className={`text-slate-300 ${fontClasses}`}>
            {currentItem.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentItem.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-2 py-0.5 rounded text-[11px] bg-slate-800/80 text-slate-400 border border-slate-700/50 hover:text-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author & Verification Byline */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <img 
                src={currentItem.author.avatar} 
                alt={currentItem.author.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-700" 
              />
              <div>
                <div className="flex items-center gap-1 font-semibold text-slate-200">
                  <span>{currentItem.author.name}</span>
                  {currentItem.author.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  )}
                </div>
                <span className="text-[10px] text-slate-500">{currentItem.source}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-400 text-xs">
              <span className="flex items-center gap-1" title="Total Reads">
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                {(currentItem.readCount / 1000).toFixed(1)}k
              </span>
            </div>
          </div>
        </div>

        {/* Action Toolbar: Like, WhatsApp Share, Bookmark, Flip Controls */}
        <div className="px-4 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Heart / Like Button */}
            <button
              id={`like-btn-${currentItem.id}`}
              onClick={toggleLike}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isLiked[currentItem.id]
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Heart 
                className={`w-4 h-4 ${isLiked[currentItem.id] ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} 
              />
              <span>{currentItem.likesCount + (isLiked[currentItem.id] ? 1 : 0)}</span>
            </button>

            {/* WhatsApp Share Button (Famous Way2News feature) */}
            <button
              id="whatsapp-share-btn"
              onClick={() => onShareWhatsApp(currentItem)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all hover:scale-102"
              title="Share stylized card on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Card</span>
            </button>

            {/* Bookmark button */}
            <button
              id={`bookmark-btn-${currentItem.id}`}
              onClick={toggleBookmark}
              className={`p-2 rounded-xl text-xs transition-colors ${
                isBookmarked[currentItem.id]
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
              title="Save to bookmarks"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked[currentItem.id] ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>

          {/* Next / Previous Flip navigation buttons */}
          <div className="flex items-center gap-1">
            <button
              id="flip-prev-btn"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-200 border border-slate-800 transition-colors"
              title="Previous Story (Arrow Up)"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              id="flip-next-btn"
              onClick={handleNext}
              disabled={currentIndex === newsItems.length - 1}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all"
              title="Next Story (Arrow Down)"
            >
              <span>Next</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
