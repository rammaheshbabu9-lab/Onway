import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  Sliders, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Maximize2,
  Sparkles,
  Camera,
  Check
} from 'lucide-react';
import { VISUAL_REGRESSION_CASES } from '../../data/mockOperationsData';
import { VisualRegressionDiff } from '../../types';

export const VisualRegressionViewer: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(VISUAL_REGRESSION_CASES[0].id);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'slider' | 'diff-only'>('slider');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [approvedCases, setApprovedCases] = useState<Record<string, boolean>>({});

  const currentCase = VISUAL_REGRESSION_CASES.find(c => c.id === selectedCaseId) || VISUAL_REGRESSION_CASES[0];

  const handleApproveBaseline = (id: string) => {
    setApprovedCases(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <Camera className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Playwright Visual Regression Testing</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                  Tolerance &lt; 0.15%
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Pixel-by-pixel differential regression testing for Indic script ligatures, card margins, and responsive layouts
              </p>
            </div>
          </div>
        </div>

        {/* View Mode controls */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('slider')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === 'slider' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Diff Slider
          </button>
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === 'side-by-side' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Side by Side
          </button>
          <button
            onClick={() => setViewMode('diff-only')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === 'diff-only' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Diff Overlay
          </button>
        </div>
      </div>

      {/* Main Diff Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Component Selector Sidebar */}
        <div className="space-y-2 bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
            Tracked Components
          </div>
          {VISUAL_REGRESSION_CASES.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedCaseId(item.id)}
              className={`p-3 rounded-xl cursor-pointer border transition-all ${
                selectedCaseId === item.id
                  ? 'bg-violet-600/20 border-violet-500/50 text-white'
                  : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-800/60 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs truncate">{item.componentName}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {item.screenSize}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[11px]">
                <span className="text-slate-400">Mismatch:</span>
                <span className={`font-mono font-bold ${item.mismatchPercentage > 0.1 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {item.mismatchPercentage}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Comparison Stage */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{currentCase.componentName}</span>
                <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">
                  Viewport: {currentCase.screenSize}
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Baseline Snapshot vs Head Commit Output
              </p>
            </div>

            <button
              onClick={() => handleApproveBaseline(currentCase.id)}
              disabled={approvedCases[currentCase.id]}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{approvedCases[currentCase.id] ? 'Baseline Approved' : 'Approve Baseline'}</span>
            </button>
          </div>

          {/* Interactive Comparison Canvas */}
          {viewMode === 'slider' && (
            <div className="space-y-3">
              <div className="relative w-full h-80 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 select-none">
                {/* Baseline Image (Full Background) */}
                <img
                  src={currentCase.baselineUrl}
                  alt="Baseline"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Current Image with Clip Path controlled by slider */}
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={currentCase.currentUrl}
                    alt="Current Head"
                    className="w-full h-full object-cover"
                    style={{ minWidth: '100%', width: '100%', height: '100%' }}
                  />
                  {/* Subtle tint on current */}
                  <div className="absolute top-3 left-3 bg-indigo-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    Current Head
                  </div>
                </div>

                {/* Slider divider line */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-6 h-6 rounded-full bg-white text-slate-950 flex items-center justify-center text-[10px] font-bold shadow-lg">
                    ⇄
                  </div>
                </div>

                {/* Right label */}
                <div className="absolute top-3 right-3 bg-slate-900/90 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Golden Baseline
                </div>
              </div>

              {/* Slider Scrub Control */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">Current</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={e => setSliderPosition(Number(e.target.value))}
                  className="flex-1 accent-violet-500 cursor-pointer"
                />
                <span className="text-xs text-slate-400">Baseline</span>
              </div>
            </div>
          )}

          {viewMode === 'side-by-side' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <div className="p-2 bg-slate-900 text-xs font-semibold text-slate-300 border-b border-slate-800 flex justify-between">
                  <span>Golden Baseline Snapshot</span>
                  <span className="text-emerald-400 font-mono">v1.2.0</span>
                </div>
                <img src={currentCase.baselineUrl} alt="Baseline" className="w-full h-64 object-cover" />
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <div className="p-2 bg-slate-900 text-xs font-semibold text-slate-300 border-b border-slate-800 flex justify-between">
                  <span>Current PR / Build Snapshot</span>
                  <span className="text-indigo-400 font-mono">Head</span>
                </div>
                <img src={currentCase.currentUrl} alt="Current" className="w-full h-64 object-cover" />
              </div>
            </div>
          )}

          {viewMode === 'diff-only' && (
            <div className="relative h-80 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img src={currentCase.baselineUrl} alt="Diff" className="w-full h-full object-cover filter contrast-125 saturate-50" />
              <div className="absolute inset-0 bg-rose-500/10 pointer-events-none" />
              <div className="absolute bottom-4 bg-slate-900/90 border border-slate-700 px-4 py-2 rounded-xl text-center text-xs text-slate-300">
                <span className="font-bold text-emerald-400">Zero Critical Font Shifts.</span>
                <span className="ml-2 text-slate-400">Diff variance is 0.04% within acceptable threshold.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
