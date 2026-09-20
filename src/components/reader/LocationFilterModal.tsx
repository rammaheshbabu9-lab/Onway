import React, { useState, useMemo } from 'react';
import { 
  X, 
  MapPin, 
  Search, 
  RotateCcw, 
  Check, 
  ChevronRight, 
  Globe, 
  Building2, 
  Navigation,
  SlidersHorizontal,
  Sparkles,
  Zap
} from 'lucide-react';
import { 
  ALL_INDIAN_STATES, 
  IndianState, 
  getDistrictsForState, 
  getMandalsForDistrict,
  POPULAR_REGIONAL_SUGGESTIONS,
  RegionalCluster
} from '../../data/indianStates';
import { NewsItem } from '../../types';

interface LocationFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedState: string;
  selectedDistrict: string;
  selectedMandal: string;
  onApplyFilter: (state: string, district: string, mandal: string) => void;
  newsItems: NewsItem[];
}

export const LocationFilterModal: React.FC<LocationFilterModalProps> = ({
  isOpen,
  onClose,
  selectedState,
  selectedDistrict,
  selectedMandal,
  onApplyFilter,
  newsItems
}) => {
  const [tempState, setTempState] = useState<string>(selectedState || 'All India');
  const [tempDistrict, setTempDistrict] = useState<string>(selectedDistrict || 'All');
  const [tempMandal, setTempMandal] = useState<string>(selectedMandal || 'All');

  // Search queries for each level
  const [stateSearch, setStateSearch] = useState('');
  const [districtSearch, setDistrictSearch] = useState('');
  const [mandalSearch, setMandalSearch] = useState('');

  if (!isOpen) return null;

  // Filtered states list
  const filteredStates = ALL_INDIAN_STATES.filter(s => 
    s.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
    s.nameTe.toLowerCase().includes(stateSearch.toLowerCase()) ||
    s.code.toLowerCase().includes(stateSearch.toLowerCase())
  );

  // Available districts based on selected state
  const availableDistricts = getDistrictsForState(tempState);
  const filteredDistricts = availableDistricts.filter(d => 
    d.toLowerCase().includes(districtSearch.toLowerCase())
  );

  // Available mandals based on selected district and state
  const availableMandals = getMandalsForDistrict(tempDistrict, tempState);
  const filteredMandals = availableMandals.filter(m => 
    m.toLowerCase().includes(mandalSearch.toLowerCase())
  );

  // Calculate matching news items count in realtime
  const matchCount = newsItems.filter(item => {
    const matchState = tempState === 'All' || tempState === 'All India' || 
      item.state?.toLowerCase().includes(tempState.toLowerCase()) ||
      tempState.toLowerCase().includes(item.state?.toLowerCase() || '');

    const matchDistrict = tempDistrict === 'All' || tempDistrict === 'All Districts' || 
      item.district?.toLowerCase().includes(tempDistrict.toLowerCase()) ||
      tempDistrict.toLowerCase().includes(item.district?.toLowerCase() || '');

    const matchMandal = tempMandal === 'All' || tempMandal === 'All Mandals' || 
      !item.mandal || 
      item.mandal?.toLowerCase().includes(tempMandal.toLowerCase()) ||
      tempMandal.toLowerCase().includes(item.mandal?.toLowerCase() || '');

    return matchState && matchDistrict && matchMandal;
  }).length;

  // Handle "Suggest All / Reset"
  const handleResetAll = () => {
    setTempState('All India');
    setTempDistrict('All');
    setTempMandal('All');
    setStateSearch('');
    setDistrictSearch('');
    setMandalSearch('');
    onApplyFilter('All India', 'All', 'All');
    onClose();
  };

  const handleApply = () => {
    onApplyFilter(tempState, tempDistrict, tempMandal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-xs shadow-md">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                ప్రాంతీయ వార్తల ఫిల్టర్ (Location Filter)
              </h3>
              <p className="text-[11px] text-slate-400">
                రాష్ట్రం • జిల్లా • మండలం (State, District & Mandal)
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

        {/* Quick Suggest All / Reset Header Bar */}
        <div className="px-4 py-2.5 bg-slate-950/50 border-b border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="text-[11px] text-slate-400">ప్రస్తుత ఎంపిక:</span>
            <span className="font-bold text-rose-400">
              {tempState === 'All India' ? 'భారతదేశం (All India)' : tempState}
            </span>
            {tempDistrict !== 'All' && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <span className="font-semibold text-amber-400">{tempDistrict}</span>
              </>
            )}
            {tempMandal !== 'All' && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <span className="font-semibold text-emerald-400">{tempMandal}</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleResetAll}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors shrink-0"
            title="అన్ని ప్రాంతాలు చూపించు (Show All / Reset)"
          >
            <RotateCcw className="w-3 h-3 text-rose-400" />
            <span>అన్ని ప్రాంతాలు (Show All)</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">

          {/* ============================================================ */}
          {/* 🌟 POPULAR REGIONAL CLUSTERS / SUGGESTIONS (1-TAP AUTO FILL)   */}
          {/* ============================================================ */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-950/40 via-amber-950/20 to-slate-900 border border-rose-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5 uppercase tracking-wide">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>ప్రముఖ ప్రాంతాల సూచనలు (Quick Regional Clusters)</span>
              </span>
              <span className="text-[10px] text-slate-400">
                1-ట్యాప్ ఎంపిక
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
              {POPULAR_REGIONAL_SUGGESTIONS.map(cluster => {
                const isSelected = 
                  (cluster.state === 'All India' && (tempState === 'All India' || tempState === 'All')) ||
                  (cluster.state === tempState && cluster.district === tempDistrict && (cluster.mandal === tempMandal || cluster.mandal === 'All'));

                return (
                  <button
                    key={cluster.id}
                    type="button"
                    onClick={() => {
                      setTempState(cluster.state);
                      setTempDistrict(cluster.district);
                      setTempMandal(cluster.mandal);
                    }}
                    className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-rose-600/30 border-rose-500 shadow-md shadow-rose-900/30 text-white'
                        : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="text-[11px] font-bold leading-tight truncate">
                      {cluster.nameTe}
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[9px] text-slate-400">
                      <span className="truncate">{cluster.nameEn}</span>
                      <span className="px-1.5 py-0.2 rounded bg-slate-800 text-amber-400 font-mono text-[8px] font-bold">
                        {cluster.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* ============================================================ */}
          {/* 1. STATE SELECTION (రాష్ట్రం)                                  */}
          {/* ============================================================ */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-200 flex items-center gap-1.5 uppercase tracking-wide">
                <Globe className="w-3.5 h-3.5 text-rose-400" />
                <span>1. రాష్ట్రం ఎంపిక (State - 36 States & UTs)</span>
              </label>
              <span className="text-[10px] text-slate-400">
                {tempState}
              </span>
            </div>

            {/* Quick State Chips */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setTempState('All India');
                  setTempDistrict('All');
                  setTempMandal('All');
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  tempState === 'All India' || tempState === 'All'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                🇮🇳 All India (అన్నీ)
              </button>

              {[
                { name: 'Telangana', te: 'తెలంగాణ' },
                { name: 'Andhra Pradesh', te: 'ఆంధ్రప్రదేశ్' },
                { name: 'Karnataka', te: 'కర్ణాటక' },
                { name: 'Maharashtra', te: 'మహారాష్ట్ర' },
                { name: 'Tamil Nadu', te: 'తమిళనాడు' },
                { name: 'Delhi', te: 'ఢిల్లీ' }
              ].map(st => (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => {
                    setTempState(st.name);
                    setTempDistrict('All');
                    setTempMandal('All');
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                    tempState.toLowerCase() === st.name.toLowerCase()
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {st.te} ({st.name})
                </button>
              ))}
            </div>

            {/* State Search & Dropdown */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={stateSearch}
                onChange={e => setStateSearch(e.target.value)}
                placeholder="భారతదేశ రాష్ట్రం శోధించండి (Search 36 states/UTs)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* State selection select box */}
            <select
              value={tempState}
              onChange={e => {
                setTempState(e.target.value);
                setTempDistrict('All');
                setTempMandal('All');
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
            >
              <option value="All India" className="bg-slate-900 text-white font-bold">
                🇮🇳 All India (అన్ని రాష్ట్రాలు)
              </option>
              {filteredStates.map(st => (
                <option key={st.code} value={st.name} className="bg-slate-900 text-white">
                  {st.name} ({st.nameTe})
                </option>
              ))}
            </select>
          </div>

          {/* ============================================================ */}
          {/* 2. DISTRICT SELECTION (జిల్లా)                                */}
          {/* ============================================================ */}
          <div className="space-y-2 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-200 flex items-center gap-1.5 uppercase tracking-wide">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>2. జిల్లా ఎంపిక (District - All Over Districts)</span>
              </label>
              <span className="text-[10px] text-slate-400">
                {availableDistricts.length} జిల్లాలు అందుబాటులో ఉన్నాయి
              </span>
            </div>

            {/* District Quick Suggest Buttons */}
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar p-1 bg-slate-950/40 rounded-xl border border-slate-800/60">
              <button
                type="button"
                onClick={() => {
                  setTempDistrict('All');
                  setTempMandal('All');
                }}
                className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition-all ${
                  tempDistrict === 'All'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                అన్ని జిల్లాలు (All Districts)
              </button>

              {availableDistricts.slice(0, 16).map(dist => (
                <button
                  key={dist}
                  type="button"
                  onClick={() => {
                    setTempDistrict(dist);
                    setTempMandal('All');
                  }}
                  className={`px-2.5 py-0.5 rounded-md text-xs font-semibold transition-all ${
                    tempDistrict.toLowerCase() === dist.toLowerCase()
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>

            {/* District Search / Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={districtSearch}
                  onChange={e => setDistrictSearch(e.target.value)}
                  placeholder="జిల్లా పేరు శోధించండి..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <select
                value={tempDistrict}
                onChange={e => {
                  setTempDistrict(e.target.value);
                  setTempMandal('All');
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="All" className="bg-slate-900 text-white font-bold">
                  అన్ని జిల్లాలు (All Districts)
                </option>
                {filteredDistricts.map(dist => (
                  <option key={dist} value={dist} className="bg-slate-900 text-white">
                    {dist}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 3. MANDAL SELECTION (మండలం / ప్రాంతం)                         */}
          {/* ============================================================ */}
          <div className="space-y-2 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-200 flex items-center gap-1.5 uppercase tracking-wide">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>3. మండలం / పట్టణం (Mandal / Town / Area)</span>
              </label>
              <span className="text-[10px] text-slate-400">
                మండలాల సూచనలు (Suggest All)
              </span>
            </div>

            {/* Mandal Quick Suggest Chips */}
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar p-1 bg-slate-950/40 rounded-xl border border-slate-800/60">
              <button
                type="button"
                onClick={() => setTempMandal('All')}
                className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition-all ${
                  tempMandal === 'All'
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                అన్ని మండలాలు (All Mandals)
              </button>

              {availableMandals.map(mandal => (
                <button
                  key={mandal}
                  type="button"
                  onClick={() => setTempMandal(mandal)}
                  className={`px-2.5 py-0.5 rounded-md text-xs font-semibold transition-all ${
                    tempMandal.toLowerCase() === mandal.toLowerCase()
                      ? 'bg-emerald-500 text-black shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {mandal}
                </button>
              ))}
            </div>

            {/* Mandal Search / Custom Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={mandalSearch}
                  onChange={e => setMandalSearch(e.target.value)}
                  placeholder="మండలం శోధించండి..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={tempMandal}
                onChange={e => setTempMandal(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="All" className="bg-slate-900 text-white font-bold">
                  అన్ని మండలాలు (All Mandals)
                </option>
                {filteredMandals.map(m => (
                  <option key={m} value={m} className="bg-slate-900 text-white">
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {matchCount > 0 ? (
                <strong className="text-white">{matchCount} వార్తలు</strong>
              ) : (
                <span className="text-slate-400">సమీప వార్తలు</span>
              )} సిద్ధంగా ఉన్నాయి
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetAll}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              రీసెట్ (Reset)
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>ఫిల్టర్ వర్తింపజేయి (Apply)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
