import React from 'react';
import { 
  Play, 
  Activity, 
  Clock, 
  Shield, 
  Share2, 
  Bell, 
  FileSpreadsheet, 
  Calendar, 
  CheckCircle2, 
  Server,
  Zap,
  Terminal
} from 'lucide-react';
import { UserProfile } from '../../types';

interface ConsoleHeaderProps {
  activeTab: 'playwright' | 'visual_regression' | 'pipelines' | 'trends' | 'audit';
  setActiveTab: (tab: 'playwright' | 'visual_regression' | 'pipelines' | 'trends' | 'audit') => void;
  onRunAllPlaywright: () => void;
  isRunningTests: boolean;
  onOpenAuditModal: () => void;
  onOpenScheduleModal: () => void;
  currentUser: UserProfile;
  passRatePercentage: number;
  activeEdgeLatencyMs: number;
}

export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
  activeTab,
  setActiveTab,
  onRunAllPlaywright,
  isRunningTests,
  onOpenAuditModal,
  onOpenScheduleModal,
  currentUser,
  passRatePercentage,
  activeEdgeLatencyMs
}) => {
  const canTriggerBuilds = currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'QA_LEAD' || currentUser.role === 'DEVOPS_ENGINEER';

  return (
    <div className="space-y-4">
      {/* Top Operations Stat Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <Terminal className="w-5 h-5" />
              </span>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>OnWay News • Engineering & Quality Operations Center</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Playwright v1.45 Ready
                  </span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated regression testing, multi-region CI/CD pipelines, visual diff validation & compliance audit
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="run-playwright-suite-btn"
              onClick={onRunAllPlaywright}
              disabled={isRunningTests || !canTriggerBuilds}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all"
              title={!canTriggerBuilds ? 'Requires QA Lead or DevOps role' : 'Trigger full Playwright test suite across 8 Indic languages'}
            >
              <Play className={`w-4 h-4 fill-white ${isRunningTests ? 'animate-spin' : ''}`} />
              <span>{isRunningTests ? 'Running Playwright Suite...' : 'Run Playwright Suite'}</span>
            </button>

            <button
              id="schedule-builds-btn"
              onClick={onOpenScheduleModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              title="Configure automated build schedule, Slack webhooks, and email alerts"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Schedule Builds & Alerts</span>
            </button>

            <button
              id="audit-compliance-btn"
              onClick={onOpenAuditModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              title="Audit Logs, Role-Based Access Control, CSV/PDF Export"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Audit & RBAC</span>
            </button>
          </div>
        </div>

        {/* Real-time Health Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/80">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
              <span>Playwright Pass Rate</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white mt-1">
              {passRatePercentage}%
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">14/14 Tests Passing</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
              <span>Edge CDN Latency</span>
              <Zap className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg font-bold text-white mt-1">
              {activeEdgeLatencyMs} ms
            </div>
            <span className="text-[10px] text-slate-400">Hyderabad / BLR Ingress</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
              <span>Platform Uptime</span>
              <Server className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-white mt-1">
              99.98%
            </div>
            <span className="text-[10px] text-blue-400 font-semibold">Zero Unscheduled Downtime</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
              <span>Scheduled Auto-Build</span>
              <Clock className="w-3.5 h-3.5 text-violet-400" />
            </div>
            <div className="text-lg font-bold text-white mt-1">
              Every 4h
            </div>
            <span className="text-[10px] text-slate-400">Next: in 1h 24m (IST)</span>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar border-b border-slate-800 pb-2">
        {[
          { id: 'playwright', label: 'Playwright Test Runner', count: '5 Suites' },
          { id: 'visual_regression', label: 'Visual Regression & Fonts', count: '3 Diffs' },
          { id: 'pipelines', label: 'Deployment Pipelines & Latency', count: '3 Active' },
          { id: 'trends', label: 'Historical Trends & A/B Analytics', count: '7 Days' },
          { id: 'audit', label: 'Compliance & RBAC Activity', count: 'Audit Log' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
              activeTab === tab.id ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
