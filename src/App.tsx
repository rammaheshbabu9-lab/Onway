import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Sparkles,
  User,
  Share2
} from 'lucide-react';

import { 
  LanguageCode, 
  NewsCategory, 
  NewsItem, 
  UserRole, 
  UserProfile,
  ReporterProfile,
  TestSuite,
  AuditLogEntry
} from './types';
import { LANGUAGE_CONFIGS, MOCK_NEWS_DATA } from './data/mockNews';
import { 
  INITIAL_TEST_SUITES, 
  INITIAL_USER_PROFILES, 
  DEPLOYMENT_PIPELINES, 
  INITIAL_AUDIT_LOGS 
} from './data/mockOperationsData';

import { FullScreenNewsViewer } from './components/reader/FullScreenNewsViewer';
import { ProfileUploadModal } from './components/reader/ProfileUploadModal';
import { WhatsAppShareModal } from './components/reader/WhatsAppShareModal';
import { LocationFilterModal } from './components/reader/LocationFilterModal';
import { fetchSupabaseNews, insertSupabaseNews, isSupabaseConfigured } from './lib/supabase';

const DEFAULT_REPORTER_PROFILE: ReporterProfile = {
  name: 'Ram Mahesh Babu',
  role: 'ధ్రువీకరించిన రిపోర్టర్ (Verified Reporter)',
  email: 'rammaheshbabu0@gmail.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  state: 'Telangana',
  district: 'Warangal',
  bio: 'ప్రజా సమస్యలపై నిరంతర నిజాయితీ రిపోర్టింగ్ (Citizen Journalist)',
  verified: true
};

export default function App() {
  // Master News State (allows publishing new user news in realtime)
  const [newsList, setNewsList] = useState<NewsItem[]>(MOCK_NEWS_DATA);

  // User / Reporter Profile with Local Persistence
  const [reporterProfile, setReporterProfile] = useState<ReporterProfile>(() => {
    try {
      const saved = localStorage.getItem('onway_reporter_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return DEFAULT_REPORTER_PROFILE;
  });

  // Localization & Regional Language Preference (English, Hindi, Telugu, All Languages)
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | 'all'>(() => reporterProfile.preferredLanguage || 'all');
  
  // All-India 3-Tier Regional Filter: State, District, Mandal
  const [activeStateFilter, setActiveStateFilter] = useState('All India');
  const [activeDistrictFilter, setActiveDistrictFilter] = useState('All');
  const [activeMandalFilter, setActiveMandalFilter] = useState('All');
  const [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false);

  // Legacy district & mandal selections for profile defaults
  const [selectedDistrict, setSelectedDistrict] = useState('Warangal');
  const [selectedMandal, setSelectedMandal] = useState<string | undefined>('Hanamkonda');

  // Reader active news card index
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Profile & News Upload Modal state
  const [isProfileUploadOpen, setIsProfileUploadOpen] = useState(false);
  const [userPublishedCount, setUserPublishedCount] = useState(2);

  // WhatsApp share card modal
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [activeShareItem, setActiveShareItem] = useState<NewsItem | null>(null);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'alert' | 'info' } | null>(null);

  const triggerToast = (text: string, type: 'success' | 'alert' | 'info' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync with Supabase on mount if configured
  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchSupabaseNews().then(supabaseArticles => {
        if (supabaseArticles && supabaseArticles.length > 0) {
          setNewsList(prev => [...supabaseArticles, ...prev]);
          triggerToast('⚡ Supabase Cloud నుండి తాజా వార్తలు లోడ్ అయ్యాయి!', 'success');
        }
      });
    }
  }, []);

  const currentLangConfig = useMemo(() => {
    if (selectedLanguage === 'all') return LANGUAGE_CONFIGS[0];
    return LANGUAGE_CONFIGS.find(l => l.code === selectedLanguage) || LANGUAGE_CONFIGS[0];
  }, [selectedLanguage]);

  // Handle updating user profile (Name, Role, Avatar, State, District, Preferred Language, etc.)
  const handleUpdateProfile = (newProfile: ReporterProfile) => {
    setReporterProfile(newProfile);
    if (newProfile.preferredLanguage) {
      setSelectedLanguage(newProfile.preferredLanguage);
    }
    try {
      localStorage.setItem('onway_reporter_profile', JSON.stringify(newProfile));
    } catch (e) {
      console.error(e);
    }
    triggerToast(`🎉 ప్రొఫైల్ & భాషా ప్రాధాన్యత సేవ్ అయ్యాయి! (${newProfile.name})`, 'success');
  };

  // Handle deleting a user-uploaded news item
  const handleDeleteNews = (newsId: string) => {
    setNewsList(prev => prev.filter(item => item.id !== newsId));
    setUserPublishedCount(c => Math.max(0, c - 1));
    triggerToast('🗑️ వార్త విజయవంతంగా తొలగించబడింది (News Deleted)', 'alert');
  };

  // Filtered news based on State, District, Mandal, and Language (English, Hindi, Telugu, All)
  const filteredNewsList = useMemo(() => {
    // 1. Language Filter
    let list = newsList;
    if (selectedLanguage && selectedLanguage !== 'all') {
      const byLang = list.filter(item => item.language === selectedLanguage);
      if (byLang.length > 0) {
        list = byLang;
      }
    }

    // 2. Location Filters
    const isAllState = !activeStateFilter || activeStateFilter === 'All' || activeStateFilter === 'All India';
    const isAllDistrict = !activeDistrictFilter || activeDistrictFilter === 'All' || activeDistrictFilter === 'All Districts';
    const isAllMandal = !activeMandalFilter || activeMandalFilter === 'All' || activeMandalFilter === 'All Mandals';

    if (isAllState && isAllDistrict && isAllMandal) {
      return list;
    }

    const matched = list.filter(item => {
      const matchState = isAllState || 
        item.state?.toLowerCase().includes(activeStateFilter.toLowerCase()) ||
        activeStateFilter.toLowerCase().includes(item.state?.toLowerCase() || '');

      const matchDistrict = isAllDistrict || 
        item.district?.toLowerCase().includes(activeDistrictFilter.toLowerCase()) ||
        activeDistrictFilter.toLowerCase().includes(item.district?.toLowerCase() || '');

      const matchMandal = isAllMandal || 
        !item.mandal || 
        item.mandal?.toLowerCase().includes(activeMandalFilter.toLowerCase()) ||
        activeMandalFilter.toLowerCase().includes(item.mandal?.toLowerCase() || '');

      return matchState && matchDistrict && matchMandal;
    });

    return matched.length > 0 ? matched : list;
  }, [newsList, selectedLanguage, activeStateFilter, activeDistrictFilter, activeMandalFilter]);

  const handleApplyLocationFilter = (state: string, district: string, mandal: string) => {
    setActiveStateFilter(state);
    setActiveDistrictFilter(district);
    setActiveMandalFilter(mandal);
    setCurrentNewsIndex(0);

    if ((state === 'All India' || state === 'All') && (district === 'All') && (mandal === 'All')) {
      triggerToast('🇮🇳 భారతదేశంలోని అన్ని ప్రాంతాల వార్తలు (Suggest All)', 'info');
    } else {
      const labelParts = [];
      if (state && state !== 'All India' && state !== 'All') labelParts.push(state);
      if (district && district !== 'All') labelParts.push(district);
      if (mandal && mandal !== 'All') labelParts.push(mandal);
      triggerToast(`📍 ఫిల్టర్: ${labelParts.join(' > ')}`, 'info');
    }
  };

  // Handle Publishing New News from the Profile Modal
  const handlePublishNews = async (newNews: NewsItem) => {
    setNewsList(prev => [newNews, ...prev]);
    setCurrentNewsIndex(0);
    setUserPublishedCount(c => c + 1);

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (isSupabaseConfigured) {
      const saved = await insertSupabaseNews(newNews);
      if (saved) {
        triggerToast('🎉 వార్త ప్రచురించబడింది & Supabase Cloud లో భద్రపరచబడింది!', 'success');
      } else {
        triggerToast('🎉 వార్త స్థానికంగా ప్రచురించబడింది!', 'success');
      }
    } else {
      triggerToast('🎉 వార్త విజయవంతంగా ప్రచురించబడింది! (News Published)', 'success');
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-black text-white overflow-hidden select-none font-sans">
      {/* Floating Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300 pointer-events-none">
          <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-2xl border text-xs font-semibold backdrop-blur-md ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/95 text-emerald-200 border-emerald-500/60 shadow-emerald-950/40'
              : toastMessage.type === 'alert'
              ? 'bg-rose-950/95 text-rose-200 border-rose-500/60 shadow-rose-950/40'
              : 'bg-indigo-950/95 text-indigo-200 border-indigo-500/60 shadow-indigo-950/40'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📱 FULL-SCREEN PICTURE NEWS FEED (WITH VERTICAL SCROLL NAVIGATION)         */}
      {/* ========================================================================= */}
      <FullScreenNewsViewer
        newsItems={filteredNewsList}
        currentIndex={currentNewsIndex}
        onNavigate={setCurrentNewsIndex}
        onShareWhatsApp={(item) => {
          setActiveShareItem(item);
          setIsWhatsAppModalOpen(true);
        }}
        selectedLanguage={selectedLanguage}
        onOpenProfileUpload={() => setIsProfileUploadOpen(true)}
        userPublishedCount={userPublishedCount}
        userProfile={reporterProfile}
        selectedState={activeStateFilter}
        selectedDistrict={activeDistrictFilter}
        selectedMandal={activeMandalFilter}
        onOpenLocationFilter={() => setIsLocationFilterOpen(false ? false : true)}
        onSelectLanguage={setSelectedLanguage}
        onDeleteNews={handleDeleteNews}
      />

      {/* ========================================================================= */}
      {/* 📍 ALL INDIA LOCATION FILTER MODAL (STATE, DISTRICT, MANDAL, SUGGEST ALL)  */}
      {/* ========================================================================= */}
      <LocationFilterModal
        isOpen={isLocationFilterOpen}
        onClose={() => setIsLocationFilterOpen(false)}
        selectedState={activeStateFilter}
        selectedDistrict={activeDistrictFilter}
        selectedMandal={activeMandalFilter}
        onApplyFilter={handleApplyLocationFilter}
        newsItems={newsList}
      />

      {/* ========================================================================= */}
      {/* 👤 PROFILE & NEWS UPLOAD MODAL (EDIT PROFILE, ALL INDIA STATES, MATTER)    */}
      {/* ========================================================================= */}
      <ProfileUploadModal
        isOpen={isProfileUploadOpen}
        onClose={() => setIsProfileUploadOpen(false)}
        onPublishNews={handlePublishNews}
        selectedLanguage={selectedLanguage}
        selectedDistrict={selectedDistrict}
        selectedState={reporterProfile.state || 'Telangana'}
        userPublishedCount={userPublishedCount}
        userProfile={reporterProfile}
        onUpdateProfile={handleUpdateProfile}
        onSelectLanguage={setSelectedLanguage}
        onDeleteNews={handleDeleteNews}
        newsItems={newsList}
      />

      {/* ========================================================================= */}
      {/* 📲 WHATSAPP STYLIZED CARD SHARE MODAL                                      */}
      {/* ========================================================================= */}
      <WhatsAppShareModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        newsItem={activeShareItem}
        currentLangConfig={currentLangConfig}
      />
    </div>
  );
}

