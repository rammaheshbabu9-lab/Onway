import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Share2, 
  Heart, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  MessageCircle, 
  Play, 
  Pause,
  MapPin,
  Sparkles,
  Camera,
  Maximize2,
  SlidersHorizontal,
  Languages,
  Trash2,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { NewsItem, LanguageCode, ReporterProfile } from '../../types';
import { ALL_INDIAN_STATES } from '../../data/indianStates';

// Comprehensive UI Translations based on active/selected language
const UI_TRANSLATIONS: Record<string, {
  allIndia: string;
  reportDisclaimer: string;
  yourStory: string;
  delete: string;
  deleteConfirmTitle: string;
  deleteConfirmDesc: string;
  cancel: string;
  confirmDelete: string;
  share: string;
  audio: string;
  save: string;
  like: string;
  post: string;
  postNews: string;
  prev: string;
  next: string;
  breaking: string;
  filterLocation: string;
  allPill: string;
}> = {
  en: {
    allIndia: 'All India',
    reportDisclaimer: 'This report was submitted by a verified local reporter. Follow OnWay News for real-time updates.',
    yourStory: 'Your Post',
    delete: 'Delete',
    deleteConfirmTitle: 'Delete this news?',
    deleteConfirmDesc: 'This news published by you will be permanently removed.',
    cancel: 'Cancel',
    confirmDelete: 'Yes, Delete',
    share: 'Share',
    audio: 'Audio',
    save: 'Save',
    like: 'Like',
    post: 'Post',
    postNews: 'Upload / Post News',
    prev: 'Previous News',
    next: 'Next News',
    breaking: 'BREAKING',
    filterLocation: 'Filter by State, District & Mandal',
    allPill: 'All',
  },
  te: {
    allIndia: 'భారతదేశం',
    reportDisclaimer: 'ఈ సమాచారం స్థానిక రిపోర్టర్ ద్వారా నివేదించబడింది. తాజా అప్‌డేట్‌ల కొరకు OnWay News ను ఫాలో అవ్వండి.',
    yourStory: 'మీ ప్రచురణ',
    delete: 'తొలగించు',
    deleteConfirmTitle: 'ఈ వార్తను తొలగించాలా?',
    deleteConfirmDesc: 'మీరు ప్రచురించిన ఈ వార్త శాశ్వతంగా తొలగించబడుతుంది.',
    cancel: 'రద్దు చేయి',
    confirmDelete: 'సరే, తొలగించు',
    share: 'షేర్',
    audio: 'వాయిస్',
    save: 'సేవ్',
    like: 'లైక్',
    post: '+ వార్త',
    postNews: 'వార్తను అప్‌లోడ్ చేయండి',
    prev: 'మునుపటి వార్త',
    next: 'తరువాతి వార్త',
    breaking: 'తాజా వార్త',
    filterLocation: 'రాష్ట్రం, జిల్లా, మండలం ఫిల్టర్',
    allPill: 'అన్నీ',
  },
  hi: {
    allIndia: 'अखिल भारत',
    reportDisclaimer: 'यह जानकारी स्थानीय संवाददाता द्वारा रिपोर्ट की गई है। ताज़ा अपडेट के लिए OnWay News को फ़ॉलो करें।',
    yourStory: 'आपकी पोस्ट',
    delete: 'हटाएं',
    deleteConfirmTitle: 'क्या यह समाचार हटाना चाहते हैं?',
    deleteConfirmDesc: 'आपके द्वारा प्रकाशित यह समाचार हमेशा के लिए हटा दिया जाएगा।',
    cancel: 'रद्द करें',
    confirmDelete: 'हाँ, हटाएं',
    share: 'शेयर',
    audio: 'ऑडियो',
    save: 'सहेजें',
    like: 'पसंद',
    post: '+ समाचार',
    postNews: 'समाचार अपलोड करें',
    prev: 'पिछला समाचार',
    next: 'अगला समाचार',
    breaking: 'ताज़ा ख़बर',
    filterLocation: 'राज्य, जिला और मंडल फ़िल्टर',
    allPill: 'सभी',
  },
  ta: {
    allIndia: 'அனைத்து இந்தியா',
    reportDisclaimer: 'இந்த தகவல் உள்ளூர் நிருபரால் தெரிவிக்கப்பட்டது. சமீபத்திய புதுப்பிப்புகளுக்கு OnWay News-ஐப் பின்தொடரவும்.',
    yourStory: 'உங்கள் செய்தி',
    delete: 'நீக்கு',
    deleteConfirmTitle: 'இந்த செய்தியை நீக்க வேண்டுமா?',
    deleteConfirmDesc: 'நீங்கள் வெளியிட்ட இந்த செய்தி நிரந்தரமாக நீக்கப்படும்.',
    cancel: 'ரத்து செய்',
    confirmDelete: 'ஆம், நீக்கு',
    share: 'பகிர்',
    audio: 'ஆடியோ',
    save: 'சேமி',
    like: 'விருப்பம்',
    post: '+ செய்தி',
    postNews: 'செய்தியைப் பதிவேற்றவும்',
    prev: 'முந்தைய செய்தி',
    next: 'அடுத்த செய்தி',
    breaking: 'முக்கிய செய்தி',
    filterLocation: 'மாநிலம், மாவட்டம் வடிகட்டி',
    allPill: 'அனைத்தும்',
  },
  kn: {
    allIndia: 'ಅಖಿಲ ಭಾರತ',
    reportDisclaimer: 'ಈ ಮಾಹಿತಿಯನ್ನು ಸ್ಥಳೀಯ ವರದಿಗಾರರು ವರದಿ ಮಾಡಿದ್ದಾರೆ. ಇತ್ತೀಚಿನ ಅಪ್‌ಡೇಟ್‌ಗಳಿಗಾಗಿ OnWay News ಅನ್ನು ಫಾಲೋ ಮಾಡಿ.',
    yourStory: 'ನಿಮ್ಮ ಸುದ್ದಿ',
    delete: 'ಅಳಿಸಿ',
    deleteConfirmTitle: 'ಈ ಸುದ್ದಿಯನ್ನು ಅಳಿಸಬೇಕೇ?',
    deleteConfirmDesc: 'ನೀವು ಪ್ರಕಟಿಸಿದ ಈ ಸುದ್ದಿಯನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಲಾಗುತ್ತದೆ.',
    cancel: 'ರದ್ದುಮಾಡಿ',
    confirmDelete: 'ಹೌದು, ಅಳಿಸಿ',
    share: 'ಹಂಚಿಕೊಳ್ಳಿ',
    audio: 'ಆಡಿಯೋ',
    save: 'ಉಳಿಸಿ',
    like: 'ಮೆಚ್ಚು',
    post: '+ ಸುದ್ದಿ',
    postNews: 'ಸುದ್ದಿಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    prev: 'ಹಿಂದಿನ ಸುದ್ದಿ',
    next: 'ಮುಂದಿನ ಸುದ್ದಿ',
    breaking: 'ತಾಜಾ ಸುದ್ದಿ',
    filterLocation: 'ರಾಜ್ಯ, ಜಿಲ್ಲೆ ಶೋಧಕ',
    allPill: 'ಎಲ್ಲಾ',
  },
  ml: {
    allIndia: 'അഖിലേന്ത്യാ',
    reportDisclaimer: 'ഈ വിവരം പ്രാദേശിക റിപ്പോർട്ടർ റിപ്പോർട്ട് ചെയ്തതാണ്. ഏറ്റവും പുതിയ അപ്‌ഡേറ്റുകൾക്കായി OnWay News പിന്തുടരുക.',
    yourStory: 'നിങ്ങളുടെ പോസ്റ്റ്',
    delete: 'ഡിലീറ്റ്',
    deleteConfirmTitle: 'ഈ വാർത്ത നീക്കം ചെയ്യണോ?',
    deleteConfirmDesc: 'നിങ്ങൾ പ്രസിദ്ധീകരിച്ച ഈ വാർത്ത ശാശ്വതമായി നീക്കം ചെയ്യപ്പെടും.',
    cancel: 'റദ്ദാക്കുക',
    confirmDelete: 'അതെ, നീക്കം ചെയ്യുക',
    share: 'പങ്കിടുക',
    audio: 'ഓഡിയോ',
    save: 'സേവ്',
    like: 'ഇഷ്ടം',
    post: '+ വാർത്ത',
    postNews: 'വാർത്ത അപ്‌ലോഡ് ചെയ്യുക',
    prev: 'മുമ്പത്തെ വാർത്ത',
    next: 'അടുത്ത വാർത്ത',
    breaking: 'ബ്രേക്കിംഗ്',
    filterLocation: 'സംസ്ഥാനം, ജില്ല ഫിൽട്ടർ',
    allPill: 'എല്ലാം',
  },
  mr: {
    allIndia: 'अखिल भारत',
    reportDisclaimer: 'ही माहिती स्थानिक वार्ताहराने दिली आहे. ताज्या अपडेट्ससाठी OnWay News ला फॉलो करा.',
    yourStory: 'तुमची पोस्ट',
    delete: 'हटवा',
    deleteConfirmTitle: 'ही बातमी हटवायची आहे का?',
    deleteConfirmDesc: 'तुमच्या द्वारे प्रकाशित ही बातमी कायमची हटवली जाईल.',
    cancel: 'रद्द करा',
    confirmDelete: 'होय, हटवा',
    share: 'शेअर',
    audio: 'ऑडिओ',
    save: 'जतन करा',
    like: 'पसंत',
    post: '+ बातमी',
    postNews: 'बातमी अपलोड करा',
    prev: 'मागील बातमी',
    next: 'पुढील बातमी',
    breaking: 'ताजी बातमी',
    filterLocation: 'राज्य, जिल्हा फिल्टर',
    allPill: 'सर्व',
  },
  gu: {
    allIndia: 'સમગ્ર ભારત',
    reportDisclaimer: 'આ માહિતી સ્થાનિક પત્રકાર દ્વારા જણાવવામાં આવી છે. તાજા અપડેટ્સ માટે OnWay News ફોલો કરો.',
    yourStory: 'તમારી પોસ્ટ',
    delete: 'કાઢી નાખો',
    deleteConfirmTitle: 'શું આ સમાચાર કાઢી નાખવા છે?',
    deleteConfirmDesc: 'તમારા દ્વારા પ્રકાશિત આ સમાચાર કાયમ માટે કાઢી નાખવામાં આવશે.',
    cancel: 'રદ કરો',
    confirmDelete: 'હા, કાઢી નાખો',
    share: 'શેર',
    audio: 'ઓડિયો',
    save: 'સાચવો',
    like: 'પસંદ',
    post: '+ સમાચાર',
    postNews: 'સમાચાર અપલોડ કરો',
    prev: 'પાછલા સમાચાર',
    next: 'આગલા સમાચાર',
    breaking: 'તાજા સમાચાર',
    filterLocation: 'રાજ્ય, જિલ્લો ફિલ્ટર',
    allPill: 'બધું',
  },
  bn: {
    allIndia: 'সমগ্র ভারত',
    reportDisclaimer: 'এই তথ্যটি স্থানীয় সাংবাদিক রিপোর্ট করেছেন। সর্বশেষ আপডেটের জন্য OnWay News অনুসরণ করুন।',
    yourStory: 'আপনার পোস্ট',
    delete: 'মুছুন',
    deleteConfirmTitle: 'এই সংবাদটি মুছতে চান?',
    deleteConfirmDesc: 'আপনার প্রকাশিত এই সংবাদটি স্থায়ীভাবে মুছে যাবে।',
    cancel: 'বাতিল',
    confirmDelete: 'হ্যাঁ, মুছুন',
    share: 'শেয়ার',
    audio: 'অডিও',
    save: 'সংরক্ষণ',
    like: 'পছন্দ',
    post: '+ সংবাদ',
    postNews: 'সংবাদ আপলোড করুন',
    prev: 'পূর্ববর্তী খবর',
    next: 'পরবর্তী খবর',
    breaking: 'ব্রেকিং',
    filterLocation: 'রাজ্য, জেলা ফিল্টার',
    allPill: 'সব',
  }
};

interface FullScreenNewsViewerProps {
  newsItems: NewsItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  onShareWhatsApp: (item: NewsItem) => void;
  selectedLanguage: LanguageCode | 'all';
  onOpenProfileUpload: () => void;
  userPublishedCount: number;
  userProfile?: ReporterProfile;
  selectedState?: string;
  selectedDistrict?: string;
  selectedMandal?: string;
  onOpenLocationFilter?: () => void;
  onSelectLanguage?: (lang: LanguageCode | 'all') => void;
  onDeleteNews?: (newsId: string) => void;
}

export const FullScreenNewsViewer: React.FC<FullScreenNewsViewerProps> = ({
  newsItems,
  currentIndex,
  onNavigate,
  onShareWhatsApp,
  selectedLanguage,
  onOpenProfileUpload,
  userPublishedCount,
  userProfile,
  selectedState = 'All India',
  selectedDistrict = 'All',
  selectedMandal = 'All',
  onOpenLocationFilter,
  onSelectLanguage,
  onDeleteNews
}) => {
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [isBookmarked, setIsBookmarked] = useState<Record<string, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<'next' | 'prev' | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wheelLockRef = useRef<boolean>(false);

  const currentItem = newsItems[currentIndex] || newsItems[0];

  // Determine active UI language: if user picked a language filter, use that; otherwise use article language or fallback to English
  const effectiveLang: LanguageCode = (
    (selectedLanguage !== 'all' ? selectedLanguage : (currentItem?.language as LanguageCode)) || 'en'
  );
  const t = UI_TRANSLATIONS[effectiveLang] || UI_TRANSLATIONS.en;

  const isCurrentUsersNews = Boolean(
    currentItem && (
      currentItem.isUserUploaded ||
      (userProfile?.name && currentItem.author?.name === userProfile.name)
    )
  );

  // Stop speech when changing cards
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsVideoPlaying(true);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < newsItems.length - 1 && !isTransitioning) {
      setIsTransitioning('next');
      setTimeout(() => {
        onNavigate(currentIndex + 1);
        setIsTransitioning(null);
      }, 250);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning('prev');
      setTimeout(() => {
        onNavigate(currentIndex - 1);
        setIsTransitioning(null);
      }, 250);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, newsItems.length]);

  // Wheel scrolling (debounced so one flick advances one story)
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaY) > 25) {
      wheelLockRef.current = true;
      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 500);
    }
  };

  // Touch Swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      // Swiped UP -> Go to Next news
      handleNext();
    } else if (diff < -45) {
      // Swiped DOWN -> Go to Previous news
      handlePrev();
    }
    setTouchStart(null);
  };

  // Speech Narration
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${currentItem.title}. ${currentItem.summary}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      const langMap: Record<LanguageCode, string> = {
        te: 'te-IN', hi: 'hi-IN', ta: 'ta-IN', kn: 'kn-IN',
        ml: 'ml-IN', mr: 'mr-IN', gu: 'gu-IN', bn: 'bn-IN', en: 'en-IN'
      };
      const articleLang = currentItem.language as LanguageCode;
      const targetLang = (articleLang && langMap[articleLang]) 
        || (selectedLanguage !== 'all' && langMap[selectedLanguage as LanguageCode]) 
        || 'te-IN';
      utterance.lang = targetLang;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const toggleLike = () => {
    setIsLiked(prev => ({ ...prev, [currentItem.id]: !prev[currentItem.id] }));
  };

  const toggleBookmark = () => {
    setIsBookmarked(prev => ({ ...prev, [currentItem.id]: !prev[currentItem.id] }));
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  if (!currentItem) {
    return (
      <div className="h-[100dvh] w-full flex items-center justify-center bg-black text-white">
        <p>వార్తలు లోడ్ అవుతున్నాయి...</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 w-full h-[100dvh] bg-black overflow-hidden select-none flex flex-col justify-between"
    >
      {/* ============================================================ */}
      {/* 1. TOP 30% SCREEN: PICTURE / VIDEO MEDIA                      */}
      {/* ============================================================ */}
      <div 
        className={`relative w-full h-[30vh] min-h-[190px] max-h-[35vh] bg-slate-950 overflow-hidden shrink-0 transition-all duration-300 ${
          isTransitioning === 'next' 
            ? '-translate-y-4 opacity-50' 
            : isTransitioning === 'prev' 
            ? 'translate-y-4 opacity-50' 
            : 'translate-y-0 opacity-100'
        }`}
      >
        {currentItem.videoUrl ? (
          <div className="relative w-full h-full flex items-center justify-center bg-black" onClick={toggleVideoPlayback}>
            <video
              ref={videoRef}
              src={currentItem.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {!isVideoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={currentItem.imageUrl}
              alt={currentItem.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
              loading="eager"
            />
          </div>
        )}

        {/* Top Vignette Overlay for header readability */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none z-20" />
        
        {/* Bottom subtle shadow transition into headline */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        {/* Top Floating Header: Brand + Location + Prominent Language Options on Top (No profile button on top) */}
        <div className="absolute top-0 inset-x-0 z-30 flex flex-col gap-1.5 p-2 sm:px-4 sm:py-2.5">
          {/* Top Row: Brand & Interactive Location Filter */}
          <div className="flex items-center justify-between gap-2">
            {/* Brand watermark & Story Counter */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-xs shadow-md">
                ON
              </div>
              <span className="text-xs font-black tracking-tight text-white drop-shadow hidden xs:inline">
                OnWay
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-black/60 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                {currentIndex + 1}/{newsItems.length}
              </span>
            </div>

            {/* Interactive All India Location Filter Button (State > District > Mandal) */}
            {onOpenLocationFilter && (
              <button
                onClick={onOpenLocationFilter}
                className="flex items-center gap-1.5 bg-slate-950/85 hover:bg-slate-900 border border-rose-500/50 hover:border-rose-400 rounded-full px-2.5 py-1 backdrop-blur-md transition-all shadow-md active:scale-95 group max-w-[170px] xs:max-w-[210px] sm:max-w-[260px]"
                title={t.filterLocation}
              >
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex items-center gap-1 text-[11px] font-bold text-white truncate text-left">
                  <span className="truncate">
                    {selectedState === 'All India' ? t.allIndia : selectedState}
                  </span>
                  {selectedDistrict && selectedDistrict !== 'All' && (
                    <span className="text-amber-400 text-[10px] truncate hidden xs:inline">
                      • {selectedDistrict}
                    </span>
                  )}
                  {selectedMandal && selectedMandal !== 'All' && (
                    <span className="text-emerald-400 text-[10px] truncate hidden sm:inline">
                      • {selectedMandal}
                    </span>
                  )}
                </div>
                <SlidersHorizontal className="w-2.5 h-2.5 text-slate-400 shrink-0 ml-0.5" />
              </button>
            )}
          </div>

          {/* Prominent Language Bar: Brought right up to the top! */}
          {onSelectLanguage && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
              {[
                { code: 'all', label: t.allPill, flag: '🌐' },
                { code: 'en', label: 'English', flag: '🇬🇧' },
                { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
                { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
                { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
                { code: 'kn', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
              ].map(l => {
                const isActive = selectedLanguage === l.code;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => onSelectLanguage(l.code as LanguageCode | 'all')}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 transition-all active:scale-95 shadow-sm ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/30 ring-1 ring-cyan-300'
                        : 'bg-black/70 hover:bg-slate-800 text-slate-300 border border-slate-700/80 hover:border-slate-500 backdrop-blur-md'
                    }`}
                  >
                    <span className="text-[11px]">{l.flag}</span>
                    <span>{l.label}</span>
                    {isActive && <span className="text-[10px] font-black text-cyan-200">✓</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. HEADLINE & 50% MATTER CONTAINER                           */}
      {/* ============================================================ */}
      <div 
        className={`flex-1 flex flex-col justify-between p-3.5 sm:p-5 max-w-3xl w-full mx-auto relative z-20 overflow-hidden transition-all duration-300 ${
          isTransitioning === 'next' 
            ? 'translate-y-4 opacity-50' 
            : isTransitioning === 'prev' 
            ? '-translate-y-4 opacity-50' 
            : 'translate-y-0 opacity-100'
        }`}
      >
        {/* HEADLINE SECTION (Immediately below picture) */}
        <div className="space-y-2 pr-14 sm:pr-16 shrink-0">
          {/* Badges: Breaking Tag, District, State, Time */}
          <div className="flex flex-wrap items-center gap-1.5">
            {currentItem.isBreaking && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-rose-600 text-white shadow animate-pulse">
                <Sparkles className="w-2.5 h-2.5" />
                {t.breaking}
              </span>
            )}
            <button 
              type="button"
              onClick={onOpenLocationFilter}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-900 border border-slate-800 hover:border-rose-500/60 text-slate-200 transition-colors"
              title={t.filterLocation}
            >
              <MapPin className="w-3 h-3 text-rose-400" />
              <span>{currentItem.district}{currentItem.mandal ? ` (${currentItem.mandal})` : ''}, {currentItem.state}</span>
            </button>
            <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {currentItem.timestamp}
            </span>
          </div>

          {/* Bold News Headline (శీర్షిక) */}
          <h1 className="text-base sm:text-xl md:text-2xl font-black text-white leading-snug tracking-tight">
            {currentItem.title}
          </h1>
        </div>

        {/* 50% MATTER SECTION (Story Details) */}
        <div className="my-2 h-[48vh] sm:h-[50vh] max-h-[52vh] flex flex-col justify-between bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md relative overflow-hidden mr-14 sm:mr-16">
          {/* Scrollable Matter Text */}
          <div className="overflow-y-auto pr-1 space-y-3 flex-1 custom-scrollbar">
            <p className="text-sm sm:text-base md:text-[17px] text-slate-100 leading-relaxed font-normal tracking-wide">
              {currentItem.summary}
            </p>

            {/* Contextual report attribution in the active language */}
            <div className="pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>
                {t.reportDisclaimer}
              </span>
            </div>
          </div>

          {/* Reporter Byline / Credit at bottom of Matter Box */}
          <div className="pt-2.5 mt-1 flex items-center justify-between text-xs text-slate-300 shrink-0">
            <div className="flex items-center gap-2">
              <img 
                src={currentItem.author.avatar} 
                alt={currentItem.author.name}
                className="w-7 h-7 rounded-full object-cover ring-1.5 ring-rose-500" 
              />
              <div>
                <div className="font-bold text-white text-xs flex items-center gap-1.5">
                  <span>{currentItem.author.name}</span>
                  {currentItem.author.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  )}
                  {isCurrentUsersNews && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                      {t.yourStory}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400">
                  {currentItem.source}
                </div>
              </div>
            </div>

            {/* Quick Delete option if this news was uploaded by current user */}
            {isCurrentUsersNews && onDeleteNews && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-950/80 hover:bg-rose-600 border border-rose-800/80 hover:border-rose-500 text-rose-300 hover:text-white text-[11px] font-bold transition-all shadow-sm active:scale-95"
                title={t.delete}
              >
                <Trash2 className="w-3 h-3" />
                <span>{t.delete}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. RIGHT FLOATING ACTION BAR: Like, WhatsApp, TTS, Prev/Next  */}
      {/* ============================================================ */}
      <div className="absolute right-2.5 sm:right-5 top-[32vh] z-30 flex flex-col items-center gap-2.5">
        {/* Like Button */}
        <button
          onClick={toggleLike}
          className={`flex flex-col items-center justify-center w-11 h-11 rounded-2xl backdrop-blur-md border transition-all ${
            isLiked[currentItem.id]
              ? 'bg-rose-600 text-white border-rose-400 scale-105 shadow-lg shadow-rose-600/40'
              : 'bg-slate-900/90 hover:bg-slate-800 text-white border-slate-700'
          }`}
          title={t.like}
        >
          <Heart className={`w-4 h-4 ${isLiked[currentItem.id] ? 'fill-white' : ''}`} />
          <span className="text-[9px] font-bold font-mono leading-none mt-0.5">
            {currentItem.likesCount + (isLiked[currentItem.id] ? 1 : 0)}
          </span>
        </button>

        {/* WhatsApp Share Card Button */}
        <button
          onClick={() => onShareWhatsApp(currentItem)}
          className="flex flex-col items-center justify-center w-11 h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/40 transition-all hover:scale-105 active:scale-95"
          title="Share to WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-[8px] font-bold leading-none mt-0.5">{t.share}</span>
        </button>

        {/* Audio TTS Listen */}
        <button
          onClick={toggleSpeech}
          className={`flex flex-col items-center justify-center w-11 h-11 rounded-2xl backdrop-blur-md border transition-all ${
            isSpeaking
              ? 'bg-amber-500 text-black border-amber-300 animate-pulse'
              : 'bg-slate-900/90 hover:bg-slate-800 text-white border-slate-700'
          }`}
          title={t.audio}
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
          <span className="text-[8px] font-bold leading-none mt-0.5">{t.audio}</span>
        </button>

        {/* Bookmark */}
        <button
          onClick={toggleBookmark}
          className={`flex flex-col items-center justify-center w-11 h-11 rounded-2xl backdrop-blur-md border transition-all ${
            isBookmarked[currentItem.id]
              ? 'bg-amber-600 text-white border-amber-400'
              : 'bg-slate-900/90 hover:bg-slate-800 text-white border-slate-700'
          }`}
          title={t.save}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked[currentItem.id] ? 'fill-white' : ''}`} />
          <span className="text-[8px] font-bold leading-none mt-0.5">{t.save}</span>
        </button>

        {/* Post / Upload Story Button */}
        {onOpenProfileUpload && (
          <button
            onClick={onOpenProfileUpload}
            className="flex flex-col items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/40 transition-all hover:scale-105 active:scale-95"
            title={t.postNews}
          >
            <Plus className="w-4 h-4" />
            <span className="text-[8px] font-bold leading-none mt-0.5">{t.post}</span>
          </button>
        )}

        {/* Vertical Flip Navigation Arrows */}
        <div className="flex flex-col gap-1.5 pt-1">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-9 h-9 rounded-xl bg-slate-900/90 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-white border border-slate-700 flex items-center justify-center transition-colors"
            title={t.prev}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === newsItems.length - 1}
            className="w-9 h-9 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-30 disabled:pointer-events-none text-white shadow-lg shadow-rose-600/30 flex items-center justify-center transition-colors"
            title={t.next}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal for Card Viewer (Okay / Cancel) */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-slate-900 border border-rose-500/40 rounded-3xl p-5 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">
                {t.deleteConfirmTitle}
              </h4>
              <p className="text-xs text-slate-400">
                {t.deleteConfirmDesc}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left flex gap-2.5 items-center">
              <img
                src={currentItem.imageUrl}
                alt={currentItem.title}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {currentItem.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {currentItem.district}, {currentItem.state}
                </div>
              </div>
            </div>

            {/* Action Buttons: Okay (Delete) & Cancel */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
              >
                {t.cancel}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onDeleteNews) {
                    onDeleteNews(currentItem.id);
                    setShowDeleteConfirm(false);
                  }
                }}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 transition-transform active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.confirmDelete}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
