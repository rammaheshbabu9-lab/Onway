import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  Send, 
  User, 
  ShieldCheck, 
  FileText, 
  Camera,
  Trash2,
  Globe,
  Edit3,
  Phone,
  Mail,
  Award,
  Check,
  AlertTriangle,
  Languages
} from 'lucide-react';
import { NewsItem, LanguageCode, NewsCategory, ReporterProfile } from '../../types';
import { 
  ALL_INDIAN_STATES, 
  IndianState, 
  getMandalsForDistrict,
  NEWS_HEADING_SUGGESTIONS,
  NEWS_MATTER_SUGGESTIONS,
  REPORTER_ROLE_SUGGESTIONS,
  POPULAR_NEWS_TAGS
} from '../../data/indianStates';
import { isSupabaseConfigured } from '../../lib/supabase';

interface ProfileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishNews: (news: NewsItem) => void;
  selectedLanguage: LanguageCode | 'all';
  onSelectLanguage?: (lang: LanguageCode | 'all') => void;
  selectedDistrict: string;
  selectedState: string;
  userPublishedCount: number;
  userProfile: ReporterProfile;
  onUpdateProfile: (profile: ReporterProfile) => void;
  initialTab?: 'upload' | 'profile' | 'my_news';
  newsItems: NewsItem[];
  onDeleteNews: (newsId: string) => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80'
];

export const ProfileUploadModal: React.FC<ProfileUploadModalProps> = ({
  isOpen,
  onClose,
  onPublishNews,
  selectedLanguage,
  onSelectLanguage,
  selectedDistrict,
  selectedState,
  userPublishedCount,
  userProfile,
  onUpdateProfile,
  initialTab = 'upload',
  newsItems,
  onDeleteNews
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'profile' | 'my_news'>(initialTab);

  // Profile Edit State
  const [profName, setProfName] = useState(userProfile.name);
  const [profRole, setProfRole] = useState(userProfile.role);
  const [profEmail, setProfEmail] = useState(userProfile.email);
  const [profPhone, setProfPhone] = useState(userProfile.phone || '');
  const [profAvatar, setProfAvatar] = useState(userProfile.avatar);
  const [profState, setProfState] = useState(userProfile.state || selectedState || 'Telangana');
  const [profDistrict, setProfDistrict] = useState(userProfile.district || selectedDistrict || 'Warangal');
  const [profBio, setProfBio] = useState(userProfile.bio || 'ప్రజా సమస్యలపై నిరంతర నిజాయితీ రిపోర్టింగ్ (Journalist)');
  const [profLanguage, setProfLanguage] = useState<LanguageCode | 'all'>(userProfile.preferredLanguage || selectedLanguage || 'all');
  const [profileSavedMsg, setProfileSavedMsg] = useState(false);

  // News Upload State
  const [heading, setHeading] = useState('');
  const [matter, setMatter] = useState('');
  const [uploadLanguage, setUploadLanguage] = useState<LanguageCode>(
    selectedLanguage === 'all' ? 'te' : (selectedLanguage || 'te')
  );
  const [imagePreview, setImagePreview] = useState<string>('');
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [locationState, setLocationState] = useState(userProfile.state || selectedState || 'Telangana');
  const [locationDistrict, setLocationDistrict] = useState(userProfile.district || selectedDistrict || 'Warangal');
  const [locationMandal, setLocationMandal] = useState('Hanamkonda');
  const [category, setCategory] = useState<NewsCategory>('hyperlocal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showHeadingSuggestions, setShowHeadingSuggestions] = useState(false);
  const [showMatterSuggestions, setShowMatterSuggestions] = useState(false);

  // State for Delete Confirmation Modal (Okay / Cancel)
  const [deletingItem, setDeletingItem] = useState<NewsItem | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Filter all items uploaded by this user / profile
  const userUploadedNews = useMemo(() => {
    return newsItems.filter(item => 
      item.isUserUploaded === true || 
      (userProfile.name && item.author.name?.trim().toLowerCase() === userProfile.name?.trim().toLowerCase())
    );
  }, [newsItems, userProfile.name]);

  // Sync state whenever modal opens or userProfile changes
  useEffect(() => {
    if (isOpen) {
      setProfName(userProfile.name);
      setProfRole(userProfile.role);
      setProfEmail(userProfile.email);
      setProfPhone(userProfile.phone || '');
      setProfAvatar(userProfile.avatar);
      setProfState(userProfile.state || selectedState || 'Telangana');
      setProfDistrict(userProfile.district || selectedDistrict || 'Warangal');
      setProfBio(userProfile.bio || '');
      setProfLanguage(userProfile.preferredLanguage || selectedLanguage || 'all');
      setLocationState(userProfile.state || selectedState || 'Telangana');
      setLocationDistrict(userProfile.district || selectedDistrict || 'Warangal');
      setActiveTab(initialTab);
    }
  }, [isOpen, userProfile, selectedState, selectedDistrict, initialTab, selectedLanguage]);

  if (!isOpen) return null;

  // Selected state object for upload form
  const currentStateObj = ALL_INDIAN_STATES.find(s => s.name.toLowerCase() === locationState.toLowerCase()) || ALL_INDIAN_STATES[0];
  // Selected state object for profile edit
  const currentProfileStateObj = ALL_INDIAN_STATES.find(s => s.name.toLowerCase() === profState.toLowerCase()) || ALL_INDIAN_STATES[0];

  // Handle avatar file upload
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('దయచేసి సరైన ఫోటో ఫైల్ ఎంచుకోండి');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfAvatar(event.target?.result as string);
        setErrorMsg('');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle news image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('దయచేసి సరైన ఫోటో ఫైల్ ఎంచుకోండి (Please select a valid image)');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
        setErrorMsg('');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle video file selection
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setErrorMsg('దయచేసి సరైన వీడియో ఫైల్ ఎంచుకోండి (Please select a valid video)');
        return;
      }
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setErrorMsg('');
    }
  };

  // Preset sample news pictures for quick testing
  const samplePictures = [
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1080&q=80',
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1080&q=80',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1080&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1080&q=80'
  ];

  // Save Profile Changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profName.trim()) {
      setErrorMsg('దయచేసి మీ పేరు (Full Name) నమోదు చేయండి');
      return;
    }

    const updated: ReporterProfile = {
      name: profName.trim(),
      role: profRole.trim() || 'ధ్రువీకరించిన రిపోర్టర్ (Verified Reporter)',
      email: profEmail.trim() || 'reporter@onwaynews.com',
      phone: profPhone.trim(),
      avatar: profAvatar || PRESET_AVATARS[0],
      state: profState,
      district: profDistrict,
      bio: profBio.trim(),
      verified: true,
      preferredLanguage: profLanguage
    };

    onUpdateProfile(updated);
    if (onSelectLanguage) {
      onSelectLanguage(profLanguage);
    }
    setProfileSavedMsg(true);
    setErrorMsg('');
    setTimeout(() => {
      setProfileSavedMsg(false);
      setActiveTab('upload');
    }, 1200);
  };

  // Handle News Publish
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heading.trim()) {
      setErrorMsg('దయచేసి వార్త శీర్షిక (Heading) నమోదు చేయండి');
      return;
    }
    if (!matter.trim()) {
      setErrorMsg('దయచేసి వార్త సమాచారం (Matter) నమోదు చేయండి');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newNewsItem: NewsItem = {
        id: `news-user-${Date.now()}`,
        title: heading.trim(),
        summary: matter.trim(),
        category,
        language: uploadLanguage,
        state: locationState,
        district: locationDistrict,
        mandal: locationMandal,
        timestamp: 'ఇప్పుడే (Just now)',
        readCount: 1,
        likesCount: 1,
        sharesCount: 0,
        imageUrl: imagePreview || samplePictures[0],
        videoUrl: videoPreview || undefined,
        mediaType: videoPreview ? 'video' : 'image',
        author: {
          name: userProfile.name,
          role: userProfile.role,
          avatar: userProfile.avatar,
          verified: userProfile.verified
        },
        source: `${userProfile.name} (Citizen Desk)`,
        tags: [locationDistrict, locationState, category, 'LocalBuzz'],
        isBreaking: true,
        isUserUploaded: true
      };

      onPublishNews(newNewsItem);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-xs shadow-md">
              ON
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {activeTab === 'upload' 
                  ? 'వార్త అప్‌లోడ్ (Upload News)' 
                  : activeTab === 'my_news'
                  ? 'నా ప్రచురణలు (My Uploaded News)'
                  : 'ప్రొఫైల్ & భాషా ఎంపిక (Profile & Language)'}
              </h3>
              <p className="text-[11px] text-slate-400">
                OnWay News రిపోర్టర్ డెస్క్ & కంటెంట్ నిర్వహణ
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Controls (3 Tabs: Upload, My News with Delete, Profile with Language) */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/40 px-3 sm:px-4 pt-2 gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold border-b-2 transition-all shrink-0 ${
              activeTab === 'upload'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>వార్త అప్‌లోడ్</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('my_news')}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold border-b-2 transition-all shrink-0 ${
              activeTab === 'my_news'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>నా ప్రచురణలు (Delete)</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-rose-500/20 text-rose-300 font-mono border border-rose-500/30">
              {userUploadedNews.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold border-b-2 transition-all shrink-0 ${
              activeTab === 'profile'
                ? 'border-rose-500 text-rose-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Languages className="w-4 h-4 text-cyan-400" />
            <span>ప్రొఫైల్ & భాష</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto custom-scrollbar">
          {/* Active Profile Snapshot Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-rose-500" 
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                  <span>{userProfile.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {userProfile.role}
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1 text-rose-300">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>{userProfile.district}, {userProfile.state}</span>
                  </span>
                  {userProfile.phone && <span>• {userProfile.phone}</span>}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'profile' ? 'upload' : 'profile')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>{activeTab === 'profile' ? 'Upload' : 'Edit'}</span>
              </button>
              <div className="text-[10px] text-slate-400 font-mono">
                {userPublishedCount} వార్తలు
              </div>
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-medium animate-in fade-in">
              {errorMsg}
            </div>
          )}

          {profileSavedMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>మీ ప్రొఫైల్ వివరాలు విజయవంతంగా సేవ్ అయ్యాయి! (Profile Saved Successfully!)</span>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 1: UPLOAD NEWS FORM                                      */}
          {/* ============================================================ */}
          {activeTab === 'upload' && (
            <form onSubmit={handlePublish} className="space-y-4">
              {/* Language Selector for the News Item */}
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-rose-400" />
                    <span>ఈ వార్త ఏ భాషలో ఉంది? (News Language) *</span>
                  </label>
                  <span className="text-[10px] text-rose-400 font-mono font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                    {uploadLanguage.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {[
                    { code: 'te', label: 'తెలుగు' },
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिन्दी' },
                    { code: 'ta', label: 'தமிழ்' },
                    { code: 'kn', label: 'ಕನ್ನಡ' },
                  ].map(l => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setUploadLanguage(l.code as LanguageCode)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                        uploadLanguage === l.code
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-[1.02]'
                          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* News Heading */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-rose-400" />
                    <span>వార్త శీర్షిక (News Heading) *</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowHeadingSuggestions(!showHeadingSuggestions)}
                    className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{showHeadingSuggestions ? 'సూచనలు మూసివేయి' : '💡 శీర్షిక ఐడియాలు (Suggestions)'}</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={heading}
                  onChange={e => setHeading(e.target.value)}
                  placeholder="ఉదా: హైదరాబాద్‌లో మెట్రో విస్తరణ పనులకు ఆమోదం..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
                  required
                />

                {/* Interactive Heading Suggestions Panel */}
                {showHeadingSuggestions && (
                  <div className="p-3 bg-slate-950 rounded-2xl border border-amber-500/30 space-y-2.5 animate-in fade-in max-h-56 overflow-y-auto custom-scrollbar">
                    <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold border-b border-slate-800 pb-1.5">
                      <span>క్లిక్ చేసి శీర్షికను తక్షణమే నమోదు చేయండి:</span>
                      <span className="text-[10px] text-slate-400">All India & Local Ideas</span>
                    </div>
                    {NEWS_HEADING_SUGGESTIONS.map((catGroup, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-[10px] font-extrabold text-slate-400 flex items-center gap-1">
                          <span>{catGroup.icon}</span>
                          <span>{catGroup.category}</span>
                        </div>
                        <div className="space-y-1">
                          {catGroup.headings.map((hText, hIdx) => (
                            <button
                              key={hIdx}
                              type="button"
                              onClick={() => {
                                setHeading(hText);
                                setShowHeadingSuggestions(false);
                              }}
                              className="w-full text-left p-1.5 rounded-lg bg-slate-900/90 hover:bg-rose-950/40 hover:border-rose-500/50 border border-slate-800/80 text-[11px] text-slate-200 hover:text-white transition-all line-clamp-2"
                            >
                              • {hText}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* News Matter / Summary (50% screen content) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>వార్త సమాచారం (News Matter - 50% screen) *</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowMatterSuggestions(!showMatterSuggestions)}
                    className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20"
                  >
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>{showMatterSuggestions ? 'మూసివేయి' : '📝 సారాంశ నమూనాలు (Templates)'}</span>
                  </button>
                </div>

                <textarea
                  value={matter}
                  onChange={e => setMatter(e.target.value)}
                  rows={3}
                  placeholder="వార్త పూర్తి వివరాలు ఇక్కడ రాయండి (ముఖ్యమైన అంశాలు, ఎప్పుడు, ఎక్కడ జరిగింది)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors resize-none"
                  required
                />

                {/* Interactive Matter Templates Panel */}
                {showMatterSuggestions && (
                  <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-1.5 animate-in fade-in max-h-48 overflow-y-auto custom-scrollbar">
                    <div className="text-[11px] text-emerald-400 font-bold border-b border-slate-800 pb-1">
                      క్లిక్ చేసి సారాంశ నమూనాను జోడించండి:
                    </div>
                    {NEWS_MATTER_SUGGESTIONS.map((templateText, tIdx) => (
                      <button
                        key={tIdx}
                        type="button"
                        onClick={() => {
                          setMatter(templateText);
                          setShowMatterSuggestions(false);
                        }}
                        className="w-full text-left p-2 rounded-lg bg-slate-900/90 hover:bg-emerald-950/40 hover:border-emerald-500/50 border border-slate-800/80 text-[11px] text-slate-300 hover:text-white transition-all line-clamp-2"
                      >
                        ✍️ {templateText}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Picture Upload (Top 30% screen image) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>పైభాగం ఫోటో (Picture Upload - 30% Screen)</span>
                  </span>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => setImagePreview('')}
                      className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>తొలగించు</span>
                    </button>
                  )}
                </label>

                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      Picture Ready (30% view)
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => imageInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-slate-800 hover:border-emerald-500/60 rounded-2xl p-4 text-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition-all flex flex-col items-center justify-center gap-1.5"
                  >
                    <Camera className="w-6 h-6 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-200">
                      వార్తా ఫోటోను అప్‌లోడ్ చేయండి (Click to Select Photo)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      JPG, PNG, WebP (కెమెరా లేదా గ్యాలరీ)
                    </span>
                  </div>
                )}

                {/* Quick sample photo selector */}
                {!imagePreview && (
                  <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">శాంపిల్ ఫోటోలు:</span>
                    {samplePictures.map((pic, idx) => (
                      <img
                        key={idx}
                        src={pic}
                        alt="Sample"
                        onClick={() => setImagePreview(pic)}
                        className="w-9 h-9 rounded-lg object-cover cursor-pointer ring-1 ring-slate-800 hover:ring-rose-500 transition-all shrink-0"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Optional Video Upload */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-blue-400" />
                    <span>వీడియో అప్‌లోడ్ (Video Clip - ఐచ్ఛికం)</span>
                  </span>
                  {videoPreview && (
                    <button
                      type="button"
                      onClick={() => setVideoPreview('')}
                      className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>తొలగించు</span>
                    </button>
                  )}
                </label>

                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />

                {videoPreview ? (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-700 bg-black">
                    <video 
                      src={videoPreview} 
                      controls 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div 
                    onClick={() => videoInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-slate-800 hover:border-blue-500/60 rounded-2xl p-2.5 text-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition-all flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-semibold text-slate-300">
                      వీడియో క్లిప్ జోడించండి (MP4, WebM)
                    </span>
                  </div>
                )}
              </div>

              {/* ALL INDIA STATES & DISTRICTS SELECTION */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>భారతదేశ రాష్ట్రాల ఎంపిక (All India States) *</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    28 States & 8 UTs
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* State Selection Dropdown with all Indian States */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      రాష్ట్రం (Select State)
                    </label>
                    <select
                      value={locationState}
                      onChange={e => {
                        const newState = e.target.value;
                        setLocationState(newState);
                        const match = ALL_INDIAN_STATES.find(s => s.name === newState);
                        if (match && match.districts.length > 0) {
                          setLocationDistrict(match.districts[0]);
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                    >
                      {ALL_INDIAN_STATES.map(st => (
                        <option key={st.code} value={st.name} className="bg-slate-900 text-white">
                          {st.name} ({st.nameTe})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District Selection Dropdown */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      జిల్లా (Select District)
                    </label>
                    {currentStateObj && currentStateObj.districts.length > 0 ? (
                      <select
                        value={locationDistrict}
                        onChange={e => setLocationDistrict(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      >
                        {currentStateObj.districts.map(dist => (
                          <option key={dist} value={dist} className="bg-slate-900 text-white">
                            {dist}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={locationDistrict}
                        onChange={e => setLocationDistrict(e.target.value)}
                        placeholder="జిల్లా పేరు నమోదు చేయండి"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    )}
                  </div>
                </div>

                {/* Mandal / Area */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-slate-400">
                      మండలం / ప్రాంతం (Mandal / Town / Area)
                    </label>
                    <span className="text-[10px] text-rose-400">సూచనలు (Suggestions)</span>
                  </div>
                  <input
                    type="text"
                    value={locationMandal}
                    onChange={e => setLocationMandal(e.target.value)}
                    placeholder="ఉదా: హనుమకొండ, కూకట్‌పల్లి, తిరుపతి, కాజీపేట..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                  {/* Mandal quick chips */}
                  <div className="flex flex-wrap gap-1 pt-1 max-h-20 overflow-y-auto custom-scrollbar">
                    {getMandalsForDistrict(locationDistrict, locationState).slice(0, 15).map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setLocationMandal(m)}
                        className={`text-[10px] px-2 py-0.5 rounded-md transition-colors ${
                          locationMandal.toLowerCase() === m.toLowerCase()
                            ? 'bg-rose-600 text-white font-bold'
                            : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Publish News Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'ప్రచురించబడుతోంది...' : 'వార్తను ప్రచురించు (Publish News)'}</span>
                </button>
              </div>
            </form>
          )}

          {/* ============================================================ */}
          {/* TAB 2: MY UPLOADED NEWS (with DELETE option)                 */}
          {/* ============================================================ */}
          {activeTab === 'my_news' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>మీరు అప్‌లోడ్ చేసిన వార్తలు ({userUploadedNews.length})</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    మీరు ప్రచురించిన వార్తల జాబితా. అవసరం లేని వార్తలను ఇక్కడ నుండి తొలగించవచ్చు.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className="text-xs font-bold px-2.5 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow transition-all shrink-0"
                >
                  + కొత్త వార్త
                </button>
              </div>

              {/* List of uploaded news */}
              {userUploadedNews.length === 0 ? (
                <div className="py-12 px-4 text-center rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-200">
                      మీరు ఇంకా ఏ వార్తనూ ప్రచురించలేదు
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      మీ గ్రామ/పట్టణ/నగర సమస్యలు లేదా తాజా సమాచారాన్ని ఇప్పుడే ప్రజలకు తెలియజేయండి.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('upload')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-extrabold shadow-lg shadow-rose-600/20 transition-transform active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>వార్తను ఇప్పుడే అప్‌లోడ్ చేయండి</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {userUploadedNews.map(item => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col sm:flex-row gap-3 items-start justify-between group"
                    >
                      {/* Image Thumbnail & Details */}
                      <div className="flex gap-3 items-start flex-1 min-w-0">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-black uppercase bg-black/70 text-rose-300 backdrop-blur-sm">
                            {item.language}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          {/* Location & Time */}
                          <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
                            <span className="flex items-center gap-0.5 text-rose-400 font-semibold">
                              <MapPin className="w-2.5 h-2.5" />
                              <span>{item.district}{item.mandal ? ` (${item.mandal})` : ''}</span>
                            </span>
                            <span>•</span>
                            <span>{item.timestamp}</span>
                            {item.isBreaking && (
                              <span className="px-1.5 py-0.2 rounded bg-rose-600/80 text-white font-bold text-[9px]">
                                తాజా
                              </span>
                            )}
                          </div>

                          {/* News Title */}
                          <h5 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-rose-200 transition-colors">
                            {item.title}
                          </h5>

                          {/* Stats */}
                          <div className="flex items-center gap-3 pt-0.5 text-[10px] text-slate-400">
                            <span>👁️ {item.readCount?.toLocaleString()} వీక్షణలు</span>
                            <span>❤️ {item.likesCount?.toLocaleString()} లైక్స్</span>
                          </div>
                        </div>
                      </div>

                      {/* Delete Action Button */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80 shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => setDeletingItem(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-600 border border-rose-800/60 hover:border-rose-500 text-rose-300 hover:text-white text-xs font-bold transition-all shadow-sm active:scale-95 group/del"
                          title="ఈ వార్తను శాశ్వతంగా తొలగించండి (Delete this uploaded news)"
                        >
                          <Trash2 className="w-3.5 h-3.5 group-hover/del:animate-bounce text-rose-400 group-hover/del:text-white" />
                          <span>తొలగించు (Delete)</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: CREATE / EDIT PROFILE & LANGUAGE OPTIONS               */}
          {/* ============================================================ */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="border-b border-slate-800 pb-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-400">
                  మీ ప్రొఫైల్ వివరాలను సవరించండి (Edit Profile Details)
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  మీరు ప్రచురించే ప్రతి వార్తపై ఈ పేరు, ఫోటో మరియు హోదా కనిపిస్తాయి.
                </p>
              </div>

              {/* Profile Avatar Selection & Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-rose-400" />
                  <span>ప్రొఫైల్ ఫోటో (Profile Photo)</span>
                </label>

                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarFileChange}
                  className="hidden"
                />

                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={profAvatar}
                      alt="Profile Preview"
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-rose-500 shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-full shadow border border-slate-900 transition-transform active:scale-95"
                      title="Upload custom photo"
                    >
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5 text-rose-400" />
                      <span>గ్యాలరీ నుండి ఫోటో మార్చుకోండి</span>
                    </button>
                    
                    {/* Preset Avatars Selection */}
                    <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar">
                      {PRESET_AVATARS.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt="Avatar"
                          onClick={() => setProfAvatar(url)}
                          className={`w-7 h-7 rounded-full object-cover cursor-pointer ring-1 transition-all ${
                            profAvatar === url ? 'ring-2 ring-rose-500 scale-110' : 'ring-slate-700 opacity-60 hover:opacity-100'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-rose-400" />
                  <span>రిపోర్టర్ పేరు (Full Name) *</span>
                </label>
                <input
                  type="text"
                  value={profName}
                  onChange={e => setProfName(e.target.value)}
                  placeholder="ఉదా: శ్రీ రామ మహేష్ బాబు (Ram Mahesh Babu)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              {/* Role / Designation */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>హోదా / బాధ్యత (Role / Designation)</span>
                </label>
                <input
                  type="text"
                  value={profRole}
                  onChange={e => setProfRole(e.target.value)}
                  placeholder="ఉదా: ధ్రువీకరించిన రిపోర్టర్ (Verified Reporter) / సిటిజన్ జర్నలిస్ట్"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
                <div className="flex flex-wrap gap-1 pt-1 max-h-20 overflow-y-auto custom-scrollbar">
                  {REPORTER_ROLE_SUGGESTIONS.map((rolePreset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setProfRole(rolePreset)}
                      className={`text-[10px] px-2 py-0.5 rounded-md transition-colors ${
                        profRole === rolePreset
                          ? 'bg-amber-500 text-black font-bold'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-slate-700'
                      }`}
                    >
                      {rolePreset.split(' (')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-blue-400" />
                    <span>ఈమెయిల్ (Email)</span>
                  </label>
                  <input
                    type="email"
                    value={profEmail}
                    onChange={e => setProfEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>ఫోన్ నంబర్ (Phone)</span>
                  </label>
                  <input
                    type="tel"
                    value={profPhone}
                    onChange={e => setProfPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* ALL INDIA STATE & DISTRICT IN PROFILE */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>మీ స్వస్థలం / రిపోర్టింగ్ రాష్ట్రం (All India States)</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      రాష్ట్రం (State)
                    </label>
                    <select
                      value={profState}
                      onChange={e => {
                        const s = e.target.value;
                        setProfState(s);
                        const match = ALL_INDIAN_STATES.find(item => item.name === s);
                        if (match && match.districts.length > 0) {
                          setProfDistrict(match.districts[0]);
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                    >
                      {ALL_INDIAN_STATES.map(st => (
                        <option key={st.code} value={st.name} className="bg-slate-900 text-white">
                          {st.name} ({st.nameTe})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      జిల్లా (District)
                    </label>
                    {currentProfileStateObj && currentProfileStateObj.districts.length > 0 ? (
                      <select
                        value={profDistrict}
                        onChange={e => setProfDistrict(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      >
                        {currentProfileStateObj.districts.map(dist => (
                          <option key={dist} value={dist} className="bg-slate-900 text-white">
                            {dist}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={profDistrict}
                        onChange={e => setProfDistrict(e.target.value)}
                        placeholder="జిల్లా పేరు"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 block">
                  మీ గురించి పరిచయం / ట్యాగ్‌లైన్ (Bio)
                </label>
                <input
                  type="text"
                  value={profBio}
                  onChange={e => setProfBio(e.target.value)}
                  placeholder="ఉదా: తెలంగాణ మరియు జాతీయ వార్తల సమగ్ర నివేదిక..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200"
                />
              </div>

              {/* LANGUAGE PREFERENCES IN PROFILE (English, Hindi, Telugu, All Languages) */}
              <div className="space-y-2.5 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-cyan-400" />
                    <span>వార్తల భాషా ప్రాధాన్యత (News Language Options)</span>
                  </label>
                  <span className="text-[10px] text-cyan-300 font-bold bg-cyan-950/70 border border-cyan-800/50 px-2 py-0.5 rounded-full font-mono">
                    {profLanguage === 'all' ? 'అన్ని భాషలు' : profLanguage.toUpperCase()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  ఇంగ్లీష్ వారికి ఇంగ్లీష్, హిందీ వారికి హిందీ, తెలుగు వారికి తెలుగు లేదా అన్ని భాషల వార్తలు వీక్షించవచ్చు.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {[
                    { code: 'all', name: 'అన్ని భాషలు', sub: 'All Languages (Pan-India)', flag: '🌐' },
                    { code: 'en', name: 'English', sub: 'English Only News', flag: '🇬🇧' },
                    { code: 'te', name: 'తెలుగు', sub: 'Telugu News Only', flag: '🇮🇳' },
                    { code: 'hi', name: 'हिन्दी', sub: 'Hindi News Only', flag: '🇮🇳' },
                    { code: 'ta', name: 'தமிழ்', sub: 'Tamil News Only', flag: '🇮🇳' },
                    { code: 'kn', name: 'ಕನ್ನಡ', sub: 'Kannada News Only', flag: '🇮🇳' },
                  ].map(lang => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setProfLanguage(lang.code as LanguageCode | 'all')}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        profLanguage === lang.code
                          ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-950/50 scale-[1.02]'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base">{lang.flag}</span>
                        {profLanguage === lang.code && (
                          <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 text-[10px] font-black">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="mt-1.5">
                        <span className="block text-xs font-bold text-white leading-tight">
                          {lang.name}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-medium">
                          {lang.sub}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Profile Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Check className="w-4 h-4" />
                  <span>ప్రొఫైల్ వివరాలు & భాషను సేవ్ చేయండి (Save Settings)</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* DELETE CONFIRMATION POPUP MODAL (Okay & Cancel)              */}
      {/* ============================================================ */}
      {deletingItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-slate-900 border border-rose-500/40 rounded-3xl p-5 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">
                వార్తను తొలగించాలా? (Delete News?)
              </h4>
              <p className="text-xs text-slate-400">
                ఈ వార్తను మీ ప్రొఫైల్ మరియు లైవ్ ఫీడ్ నుండి శాశ్వతంగా తొలగించాలనుకుంటున్నారా?
              </p>
            </div>

            {/* News summary card */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left flex gap-2.5 items-center">
              <img
                src={deletingItem.imageUrl}
                alt={deletingItem.title}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {deletingItem.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {deletingItem.district}, {deletingItem.state}
                </div>
              </div>
            </div>

            {/* Action Buttons: Okay (Delete) & Cancel */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
              >
                రద్దు చేయి (Cancel)
              </button>

              <button
                type="button"
                onClick={() => {
                  if (deletingItem) {
                    onDeleteNews(deletingItem.id);
                    setDeletingItem(null);
                  }
                }}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 transition-transform active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>సరే, తొలగించు (Okay)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
