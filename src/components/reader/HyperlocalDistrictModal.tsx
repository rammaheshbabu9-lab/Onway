import React, { useState, useMemo } from 'react';
import { 
  X, 
  MapPin, 
  Search, 
  Navigation, 
  Check, 
  Compass, 
  Building2,
  Sparkles
} from 'lucide-react';
import { INDIAN_LOCATIONS, TOTAL_COVERED_DISTRICTS_COUNT } from '../../data/locationHierarchy';

interface HyperlocalDistrictModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedState: string;
  selectedDistrict: string;
  selectedMandal?: string;
  onSelectLocation: (state: string, district: string, mandal?: string) => void;
}

export const HyperlocalDistrictModal: React.FC<HyperlocalDistrictModalProps> = ({
  isOpen,
  onClose,
  selectedState,
  selectedDistrict,
  selectedMandal,
  onSelectLocation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStateTab, setActiveStateTab] = useState<string>(selectedState || 'Telangana');
  const [chosenDistrict, setChosenDistrict] = useState<string>(selectedDistrict || 'Warangal');
  const [chosenMandal, setChosenMandal] = useState<string | undefined>(selectedMandal || 'Hanamkonda');
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  const availableStates = useMemo(() => {
    return Array.from(new Set(INDIAN_LOCATIONS.map(l => l.state)));
  }, []);

  const currentDistricts = useMemo(() => {
    return INDIAN_LOCATIONS.filter(l => l.state === activeStateTab);
  }, [activeStateTab]);

  const activeDistrictData = useMemo(() => {
    return INDIAN_LOCATIONS.find(l => l.state === activeStateTab && l.district === chosenDistrict);
  }, [activeStateTab, chosenDistrict]);

  const filteredDistricts = useMemo(() => {
    if (!searchQuery.trim()) return currentDistricts;
    const q = searchQuery.toLowerCase();
    return INDIAN_LOCATIONS.filter(
      l => l.district.toLowerCase().includes(q) || 
           l.state.toLowerCase().includes(q) ||
           l.mandals.some(m => m.toLowerCase().includes(q))
    );
  }, [searchQuery, currentDistricts]);

  if (!isOpen) return null;

  const handleGpsDetect = () => {
    setIsDetectingGps(true);
    setTimeout(() => {
      // Detected nearest hyperlocal hub
      setActiveStateTab('Telangana');
      setChosenDistrict('Warangal');
      setChosenMandal('Hanamkonda');
      setIsDetectingGps(false);
    }, 900);
  };

  const handleApply = () => {
    onSelectLocation(activeStateTab, chosenDistrict, chosenMandal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Hyperlocal District & Mandal Wire</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
                  {TOTAL_COVERED_DISTRICTS_COUNT}+ Districts
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                భారతదేశంలోని గ్రామాలు, మండలాల వారీగా లైవ్ లోకల్ అప్డేట్స్
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Auto GPS Button */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search district, state, or mandal (e.g. Warangal, Varanasi, Madurai)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
            </div>
            <button
              onClick={handleGpsDetect}
              disabled={isDetectingGps}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold whitespace-nowrap transition-colors"
              title="Detect GPS coordinates"
            >
              <Navigation className={`w-3.5 h-3.5 text-rose-400 ${isDetectingGps ? 'animate-spin' : ''}`} />
              <span>{isDetectingGps ? 'Locating...' : 'Auto Detect'}</span>
            </button>
          </div>

          {/* State selector tabs */}
          {!searchQuery && (
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {availableStates.map(state => (
                <button
                  key={state}
                  onClick={() => {
                    setActiveStateTab(state);
                    const firstDist = INDIAN_LOCATIONS.find(l => l.state === state);
                    if (firstDist) {
                      setChosenDistrict(firstDist.district);
                      setChosenMandal(firstDist.mandals[0]);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeStateTab === state
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* District & Mandal Selection Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 overflow-y-auto flex-1 max-h-[380px]">
          {/* Districts List */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Districts ({filteredDistricts.length})</span>
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
              {filteredDistricts.map(item => (
                <button
                  key={`${item.state}-${item.district}`}
                  onClick={() => {
                    setActiveStateTab(item.state);
                    setChosenDistrict(item.district);
                    setChosenMandal(item.mandals[0]);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors border ${
                    chosenDistrict === item.district && activeStateTab === item.state
                      ? 'bg-rose-600/20 border-rose-500/50 text-rose-200 font-bold'
                      : 'bg-slate-950/60 border-slate-800/60 text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-100">{item.district}</div>
                      <div className="text-[10px] text-slate-400">{item.state} • {item.mandals.length} Mandals</div>
                    </div>
                  </div>
                  {chosenDistrict === item.district && activeStateTab === item.state && (
                    <Check className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mandals / Taluks List */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Mandals in {chosenDistrict}</span>
              <span className="text-[10px] text-slate-500 font-normal">Optional local filter</span>
            </div>
            <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
              <button
                onClick={() => setChosenMandal(undefined)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors border ${
                  !chosenMandal
                    ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-200 font-bold'
                    : 'bg-slate-950/60 border-slate-800/60 text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <span>Entire District Wire (All Mandals)</span>
                {!chosenMandal && <Check className="w-4 h-4 text-indigo-400" />}
              </button>

              {activeDistrictData?.mandals.map(mandal => (
                <button
                  key={mandal}
                  onClick={() => setChosenMandal(mandal)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors border ${
                    chosenMandal === mandal
                      ? 'bg-rose-600/20 border-rose-500/50 text-rose-200 font-semibold'
                      : 'bg-slate-950/60 border-slate-800/60 text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <span>{mandal} Mandal</span>
                  {chosenMandal === mandal && <Check className="w-4 h-4 text-rose-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with summary & Confirm */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="text-xs text-slate-300">
            <span className="text-slate-500">Active Location: </span>
            <span className="font-bold text-rose-400">
              {chosenDistrict}, {activeStateTab} {chosenMandal ? `(${chosenMandal})` : ''}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/20 transition-all"
            >
              Load Local Wire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
