import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter, 
  Sparkles, 
  ArrowUpRight, 
  PieChart, 
  SlidersHorizontal,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { HISTORICAL_TREND_POINTS, AB_TEST_EXPERIMENTS } from '../../data/mockOperationsData';

interface HistoricalTrendsAnalyticsProps {
  onExportCsv: () => void;
  onExportPdf: () => void;
}

export const HistoricalTrendsAnalytics: React.FC<HistoricalTrendsAnalyticsProps> = ({
  onExportCsv,
  onExportPdf
}) => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [selectedMetric, setSelectedMetric] = useState<'passRate' | 'duration' | 'runs'>('passRate');

  // Chart data calculations
  const maxRuns = Math.max(...HISTORICAL_TREND_POINTS.map(p => p.runs));
  const maxDuration = Math.max(...HISTORICAL_TREND_POINTS.map(p => p.avgDurationMs));

  return (
    <div className="space-y-4">
      {/* Header & Date Range Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <TrendingUp className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Historical Test Trends & Regional Analytics</span>
                <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                  Daily Telemetry Active
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Filter system performance by custom timeframes, inspect regional A/B tests & export compliance audits
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Time Range Filter */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['24h', '7d', '30d', '90d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                  timeRange === range ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Export Actions */}
          <button
            onClick={onExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            title="Download CSV report"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onExportPdf}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            title="Open printable / PDF audit summary"
          >
            <FileText className="w-3.5 h-3.5 text-rose-400" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* SVG Interactive Trend Visualizer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Playwright Execution Trends ({timeRange.toUpperCase()})</span>
            </h3>
            <p className="text-xs text-slate-400">
              Visualizing pass rate stability, runtime duration, and total automated runs
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedMetric('passRate')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                selectedMetric === 'passRate' ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400'
              }`}
            >
              Pass Rate %
            </button>
            <button
              onClick={() => setSelectedMetric('duration')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                selectedMetric === 'duration' ? 'bg-amber-600 text-white' : 'bg-slate-950 text-slate-400'
              }`}
            >
              Avg Latency (ms)
            </button>
            <button
              onClick={() => setSelectedMetric('runs')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                selectedMetric === 'runs' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
              }`}
            >
              Test Volume
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Chart Bars */}
        <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2">
          {HISTORICAL_TREND_POINTS.map((pt, idx) => {
            const heightPercent = 
              selectedMetric === 'passRate'
                ? ((pt.passed - 95) / 5) * 80 + 20
                : selectedMetric === 'duration'
                ? (pt.avgDurationMs / maxDuration) * 100
                : (pt.runs / maxRuns) * 100;

            const barColor = 
              selectedMetric === 'passRate'
                ? 'bg-gradient-to-t from-emerald-600 to-teal-400'
                : selectedMetric === 'duration'
                ? 'bg-gradient-to-t from-amber-600 to-yellow-400'
                : 'bg-gradient-to-t from-indigo-600 to-violet-400';

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono bg-slate-950 border border-slate-700 px-2 py-1 rounded text-white shadow-xl text-center pointer-events-none mb-1 whitespace-nowrap">
                  <div><strong>{pt.date}</strong></div>
                  <div>Pass: {pt.passed}%</div>
                  <div>Avg: {pt.avgDurationMs}ms</div>
                  <div>Runs: {pt.runs}</div>
                </div>

                {/* The Bar */}
                <div 
                  className={`w-full max-w-[48px] rounded-t-lg transition-all duration-500 ${barColor} group-hover:brightness-125 shadow-md`}
                  style={{ height: `${Math.max(heightPercent, 12)}%` }}
                />

                {/* X-axis date */}
                <span className="text-[11px] font-medium text-slate-400 mt-1 whitespace-nowrap">
                  {pt.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regional A/B Testing Experiments Engine */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <h3 className="text-sm font-bold text-white">
              Regional A/B Testing & Cultural Conversion Flows
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Optimizing regional engagement across Indian language cohorts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AB_TEST_EXPERIMENTS.map(exp => (
            <div
              key={exp.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    50/50 Traffic Split
                  </span>
                  <h4 className="font-bold text-sm text-white mt-1">
                    {exp.name}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-base font-mono font-bold text-emerald-400">
                    +{exp.ctr}% CTR
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {exp.description}
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-900 text-center">
                <div className="p-2 rounded bg-slate-900">
                  <div className="text-[10px] text-slate-500">Impressions</div>
                  <div className="font-mono text-xs font-bold text-slate-200">
                    {(exp.impressions / 1000).toFixed(0)}k
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-900">
                  <div className="text-[10px] text-slate-500">Avg Read Time</div>
                  <div className="font-mono text-xs font-bold text-amber-400">
                    {exp.avgReadTimeSec}s
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-900">
                  <div className="text-[10px] text-slate-500">Bounce Rate</div>
                  <div className="font-mono text-xs font-bold text-blue-400">
                    {exp.bounceRate}%
                  </div>
                </div>
              </div>

              <div className="text-xs text-emerald-300 font-semibold bg-emerald-950/40 border border-emerald-800/50 p-2 rounded-lg flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Winner: {exp.winningMetric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
