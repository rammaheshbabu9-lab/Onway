import React, { useState } from 'react';
import { 
  Play, 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Terminal, 
  Filter, 
  Search, 
  AlertTriangle, 
  Send, 
  ExternalLink,
  Smartphone,
  Globe2,
  FileCode2,
  Bug
} from 'lucide-react';
import { TestSuite, TestCase, TestStatus } from '../../types';

interface PlaywrightTestRunnerProps {
  suites: TestSuite[];
  onRunSuite: (suiteId: string) => void;
  onRunAll: () => void;
  isRunning: boolean;
  activeLogLines: string[];
  onSimulateSlackAlert: (message: string) => void;
  onSimulateEmailAlert: (subject: string, body: string) => void;
}

export const PlaywrightTestRunner: React.FC<PlaywrightTestRunnerProps> = ({
  suites,
  onRunSuite,
  onRunAll,
  isRunning,
  activeLogLines,
  onSimulateSlackAlert,
  onSimulateEmailAlert
}) => {
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(suites[0]?.id || '');
  const [statusFilter, setStatusFilter] = useState<'all' | 'passed' | 'failed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTerminalLogs, setShowTerminalLogs] = useState(true);

  const selectedSuite = suites.find(s => s.id === selectedSuiteId) || suites[0];

  const allTestCases = suites.flatMap(s => s.testCases);
  const totalPassed = allTestCases.filter(t => t.status === 'passed').length;
  const totalFailed = allTestCases.filter(t => t.status === 'failed').length;
  const totalCount = allTestCases.length;

  const filteredTestCases = selectedSuite.testCases.filter(tc => {
    if (statusFilter !== 'all' && tc.status !== statusFilter) return false;
    if (searchQuery && !tc.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleTriggerFailureAlert = () => {
    onSimulateSlackAlert(`🚨 [PLAYWRIGHT REGRESSION] Test Suite "Regional Localization & Brand Names" detected font clip in Telugu iPhone 15 Pro viewport. Immediate rollback suggested.`);
    onSimulateEmailAlert(`URGENT: Playwright Regression in OnWay News Telugu Edition`, `A regression has been detected during automated Playwright execution on branch main. Stack trace attached.`);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Quick Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold">
            PW
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Playwright End-to-End Test Engine</span>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                {totalPassed}/{totalCount} Passed
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Cross-browser automation (Mobile Chrome 390px, Chromium, WebKit, Firefox) across 8 regional languages
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onRunAll}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : 'fill-white'}`} />
            <span>{isRunning ? 'Executing Playwright...' : 'Run All (14 Tests)'}</span>
          </button>

          <button
            onClick={handleTriggerFailureAlert}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors"
            title="Simulate regression failure to test Slack & Email alerting"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Test Slack & Email Alert</span>
          </button>

          <button
            onClick={() => setShowTerminalLogs(!showTerminalLogs)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
              showTerminalLogs 
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{showTerminalLogs ? 'Hide Console' : 'Show Console'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Live Output Console */}
      {showTerminalLogs && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-xs font-mono text-slate-400 ml-2">
                playwright test --reporter=list,html,json --workers=4
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Runner Online
            </span>
          </div>

          <div className="p-4 font-mono text-xs text-slate-300 space-y-1 max-h-56 overflow-y-auto no-scrollbar bg-slate-950/90">
            {activeLogLines.map((line, idx) => (
              <div key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-slate-600 select-none">{idx + 1}</span>
                <span className={
                  line.includes('passed') || line.includes('✓') 
                    ? 'text-emerald-400 font-semibold' 
                    : line.includes('failed') || line.includes('error')
                    ? 'text-rose-400 font-bold'
                    : line.includes('running')
                    ? 'text-amber-400'
                    : 'text-slate-300'
                }>
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test Suites Layout: Sidebar of Suites + Main Test Cases List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Suites List */}
        <div className="space-y-2 bg-slate-900 border border-slate-800 rounded-2xl p-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
            Test Suites ({suites.length})
          </div>
          {suites.map(suite => (
            <div
              key={suite.id}
              onClick={() => setSelectedSuiteId(suite.id)}
              className={`p-3 rounded-xl cursor-pointer border transition-all ${
                selectedSuiteId === suite.id
                  ? 'bg-indigo-600/20 border-indigo-500/50 text-white'
                  : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-800/60 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs sm:text-sm truncate">
                  {suite.name}
                </h4>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {suite.testCases.length} Tests
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {suite.description}
              </p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                <span>Last run: {suite.lastRunTimestamp}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRunSuite(suite.id);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white transition-colors"
                >
                  Re-run
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Selected Suite Detailed Test Cases */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">
                {selectedSuite.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedSuite.description}
              </p>
            </div>
            
            {/* Filter controls */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter tests..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-2 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Test Cases Cards */}
          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {filteredTestCases.map(tc => (
              <div
                key={tc.id}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {tc.status === 'passed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h5 className="font-semibold text-xs sm:text-sm text-white">
                        {tc.title}
                      </h5>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {tc.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded shrink-0">
                    {tc.durationMs} ms
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-slate-500" />
                    Browser: <strong className="text-slate-300 font-mono">{tc.browser}</strong>
                  </span>
                  <span>
                    Assertions: <strong className="text-emerald-400 font-mono">{tc.assertionsCount}</strong>
                  </span>
                  <span>
                    Flakiness Score: <strong className="text-slate-300 font-mono">{tc.flakinessScore}%</strong>
                  </span>
                  {tc.language && (
                    <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded font-mono uppercase text-[10px]">
                      Lang: {tc.language}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
