import React from 'react';
import { 
  Newspaper, 
  TerminalSquare, 
  Smartphone, 
  Tablet, 
  Monitor, 
  MapPin, 
  Globe2, 
  ShieldCheck, 
  Bell, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { LanguageCode, UserRole, UserProfile } from '../types';
import { LANGUAGE_CONFIGS } from '../data/mockNews';

interface NavbarProps {
  currentMode: 'reader' | 'console';
  setCurrentMode: (mode: 'reader' | 'console') => void;
  selectedLanguage: LanguageCode;
  setSelectedLanguage: (lang: LanguageCode) => void;
  deviceView: 'mobile' | 'tablet' | 'desktop';
  setDeviceView: (device: 'mobile' | 'tablet' | 'desktop') => void;
  selectedDistrict: string;
  selectedState: string;
  onOpenLocationModal: () => void;
  currentUser: UserProfile;
  onSwitchRole: (role: UserRole) => void;
  activeAlertsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  setCurrentMode,
  selectedLanguage,
  setSelectedLanguage,
  deviceView,
  setDeviceView,
  selectedDistrict,
  selectedState,
  onOpenLocationModal,
  currentUser,
  onSwitchRole,
  activeAlertsCount
}) => {
  const currentLangConfig = LANGUAGE_CONFIGS.find(l => l.code === selectedLanguage) || LANGUAGE_CONFIGS[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand & Regional Adaptation */}
        <div className="flex items-center gap-3">
          <div 
            id="brand-logo"
            onClick={() => setCurrentMode('reader')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center text-white font-extrabold shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl tracking-tighter">ON</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                  {currentLangConfig.brandName}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block truncate max-w-[280px]">
                {currentLangConfig.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Mode Switcher & Device Controls */}
        <div className="flex items-center gap-2">
          {/* Reader vs QA Console Toggle */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
            <button
              id="mode-switch-reader"
              onClick={() => setCurrentMode('reader')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentMode === 'reader'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>News App</span>
            </button>
            <button
              id="mode-switch-console"
              onClick={() => setCurrentMode('console')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentMode === 'console'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <TerminalSquare className="w-3.5 h-3.5" />
              <span>QA & Pipelines</span>
              {activeAlertsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
          </div>

          {/* Device viewport frame toggle (when in Reader mode) */}
          {currentMode === 'reader' && (
            <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                id="viewport-mobile"
                title="Mobile Viewport (390px Magazine Flip)"
                onClick={() => setDeviceView('mobile')}
                className={`p-1.5 rounded-lg transition-colors ${
                  deviceView === 'mobile'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                id="viewport-tablet"
                title="Tablet Viewport (768px)"
                onClick={() => setDeviceView('tablet')}
                className={`p-1.5 rounded-lg transition-colors ${
                  deviceView === 'tablet'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                id="viewport-desktop"
                title="Desktop Magazine Spread"
                onClick={() => setDeviceView('desktop')}
                className={`p-1.5 rounded-lg transition-colors ${
                  deviceView === 'desktop'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Controls: Hyperlocal Location, Language, Role */}
        <div className="flex items-center gap-2">
          {/* Location Picker (Hyperlocal) */}
          <button
            id="hyperlocal-location-btn"
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 text-xs font-medium text-slate-200 transition-colors"
            title="Change Hyperlocal District / Mandal"
          >
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate max-w-[90px] sm:max-w-[130px]">
              {selectedDistrict}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* 8 Indian Languages Selector */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 text-xs font-medium cursor-pointer">
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{currentLangConfig.nativeLabel}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
              <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 flex items-center justify-between">
                <span>Select Language (8 Indic)</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
              <div className="max-h-72 overflow-y-auto mt-1 space-y-1">
                {LANGUAGE_CONFIGS.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-left transition-colors ${
                      selectedLanguage === lang.code
                        ? 'bg-rose-600/20 text-rose-300 border border-rose-500/30'
                        : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-100">{lang.nativeLabel} ({lang.label})</div>
                      <div className="text-[10px] text-slate-400">{lang.brandName}</div>
                    </div>
                    <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
                      {lang.activeUsers}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RBAC Role Switcher */}
          <div className="relative group hidden sm:block">
            <button
              id="rbac-role-btn"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 text-xs text-slate-200"
              title="Current RBAC Role"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11px] text-emerald-300 font-semibold">
                {currentUser.role.replace('_', ' ')}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            <div className="absolute right-0 mt-1 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
              <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                Switch RBAC Persona
              </div>
              <div className="space-y-1 mt-1">
                {(['SUPER_ADMIN', 'QA_LEAD', 'DEVOPS_ENGINEER', 'REGIONAL_EDITOR'] as UserRole[]).map(role => (
                  <button
                    key={role}
                    onClick={() => onSwitchRole(role)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      currentUser.role === role
                        ? 'bg-indigo-600/20 text-indigo-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{role.replace('_', ' ')}</span>
                    {currentUser.role === role && <span className="text-emerald-400 text-xs">Active</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
