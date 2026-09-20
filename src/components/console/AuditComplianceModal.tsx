import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileSpreadsheet, 
  FileText, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Lock, 
  Download, 
  Printer, 
  Clock, 
  Building2,
  Users
} from 'lucide-react';
import { AuditLogEntry, UserProfile, UserRole } from '../../types';

interface AuditComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditLogs: AuditLogEntry[];
  currentUser: UserProfile;
  onExportCsv: () => void;
  onPrintReport: () => void;
}

export const AuditComplianceModal: React.FC<AuditComplianceModalProps> = ({
  isOpen,
  onClose,
  auditLogs,
  currentUser,
  onExportCsv,
  onPrintReport
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  if (!isOpen) return null;

  const filteredLogs = auditLogs.filter(log => {
    if (roleFilter !== 'ALL' && log.role !== roleFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        log.action.toLowerCase().includes(q) ||
        log.user.toLowerCase().includes(q) ||
        log.target.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const permissionsMatrix: Record<UserRole, string[]> = {
    SUPER_ADMIN: ['Dispatch Playwright Suites', 'Modify Deployment Pipelines', 'Access Audit Logs & PDF/CSV Export', 'Publish Hyperlocal Content', 'Manage Scheduled Builds'],
    QA_LEAD: ['Dispatch Playwright Suites', 'Approve Visual Baselines', 'Export Test & Audit Reports', 'Configure Slack & Email Alerts'],
    DEVOPS_ENGINEER: ['Dispatch Playwright Suites', 'Trigger Zero-Downtime Pipeline Rollouts', 'Configure Edge CDN Latency Ingress', 'Manage Alert Webhooks'],
    REGIONAL_EDITOR: ['Publish Hyperlocal Content', 'Curate Regional News Feed', 'Manage Local Buzz & Memes']
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Enterprise Audit Compliance & Role-Based Access Control (RBAC)</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
                  SOC-2 / ISO 27001 Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Detailed user activity logs, privilege boundaries, and instant export to PDF or CSV
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Session Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500" 
            />
            <div>
              <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <span>{currentUser.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {currentUser.role}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">{currentUser.email}</span>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Download CSV</span>
            </button>
            <button
              onClick={onPrintReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Printable PDF Report</span>
            </button>
          </div>
        </div>

        {/* Modal Body: RBAC Matrix + Audit Table */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* RBAC Privileges for active role */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <div className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Active Privileges for Role: <strong className="text-emerald-400">{currentUser.role}</strong></span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {permissionsMatrix[currentUser.role]?.map((perm, idx) => (
                <span key={idx} className="text-[11px] bg-slate-900 border border-slate-700/60 px-2 py-1 rounded text-slate-300 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  {perm}
                </span>
              ))}
            </div>
          </div>

          {/* Audit Logs Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search audit trail by user, action, or target..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              <option value="QA_LEAD">QA_LEAD</option>
              <option value="DEVOPS_ENGINEER">DEVOPS_ENGINEER</option>
              <option value="REGIONAL_EDITOR">REGIONAL_EDITOR</option>
            </select>
          </div>

          {/* Logs Table */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Timestamp (IST)</th>
                  <th className="p-2.5">User & Role</th>
                  <th className="p-2.5">Action Executed</th>
                  <th className="p-2.5">Target Resource</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 font-mono">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-2.5 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-2.5 text-white font-semibold">{log.user}</td>
                    <td className="p-2.5 text-indigo-300 font-bold">{log.action}</td>
                    <td className="p-2.5 text-slate-300 truncate max-w-[200px]">{log.target}</td>
                    <td className="p-2.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Total Audit Records: <strong className="text-white">{filteredLogs.length}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
