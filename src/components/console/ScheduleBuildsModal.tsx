import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Bell, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Mail, 
  MessageSquare, 
  Plus, 
  Trash2,
  Save
} from 'lucide-react';

interface ScheduleBuildsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendSlackTest: (webhook: string) => void;
  onSendEmailTest: (emails: string[]) => void;
}

export const ScheduleBuildsModal: React.FC<ScheduleBuildsModalProps> = ({
  isOpen,
  onClose,
  onSendSlackTest,
  onSendEmailTest
}) => {
  const [scheduleInterval, setScheduleInterval] = useState('every_4h');
  const [slackWebhook, setSlackWebhook] = useState('https://hooks.slack.com/services/T00/B00/onway-news-alerts');
  const [emails, setEmails] = useState<string[]>([
    'rammaheshbabu0@gmail.com',
    'devops-alerts@onwaynews.in',
    'qa-leads@onwaynews.in'
  ]);
  const [newEmail, setNewEmail] = useState('');
  const [alertOnRegression, setAlertOnRegression] = useState(true);
  const [alertOnLatencySpike, setAlertOnLatencySpike] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAddEmail = () => {
    if (newEmail && newEmail.includes('@') && !emails.includes(newEmail)) {
      setEmails([...emails, newEmail]);
      setNewEmail('');
    }
  };

  const handleRemoveEmail = (target: string) => {
    setEmails(emails.filter(e => e !== target));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Automated Build Schedule & Alert Webhooks</span>
              </h3>
              <p className="text-xs text-slate-400">
                Configure continuous integration cron schedules, Slack channels, and failure email dispatch
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

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">
          {/* Automated Build Schedule Interval */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Automated Build Execution Cadence</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'every_1h', label: 'Every 1 Hour', desc: 'High-frequency monitoring' },
                { id: 'every_4h', label: 'Every 4 Hours', desc: 'Standard production cron (Recommended)' },
                { id: 'daily_0800', label: 'Daily at 08:00 IST', desc: 'Pre-morning traffic spike check' },
                { id: 'on_git_push', label: 'On Every Pull Request / Push', desc: 'Continuous pre-merge testing' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setScheduleInterval(opt.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                    scheduleInterval === opt.id
                      ? 'bg-amber-600/20 border-amber-500/50 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="font-semibold text-slate-200">{opt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Slack Webhook Configuration */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Slack Alerts Integration Webhook</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={slackWebhook}
                onChange={e => setSlackWebhook(e.target.value)}
                placeholder="https://hooks.slack.com/services/..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => onSendSlackTest(slackWebhook)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold whitespace-nowrap transition-colors"
                title="Send test ping to Slack"
              >
                Send Test
              </button>
            </div>
          </div>

          {/* Email Alert Recipients */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Email Notification Distribution List for Build Failures</span>
            </label>
            
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Add stakeholder or engineer email..."
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleAddEmail}
                className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
              <button
                onClick={() => onSendEmailTest(emails)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold whitespace-nowrap"
              >
                Ping Test Email
              </button>
            </div>

            {/* Email list chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {emails.map(email => (
                <span
                  key={email}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2"
                >
                  <span className="font-mono text-[11px]">{email}</span>
                  <button
                    onClick={() => handleRemoveEmail(email)}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Alert Trigger Rules */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <label className="text-xs font-bold text-slate-300">Automated Alert Triggers</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={alertOnRegression}
                  onChange={e => setAlertOnRegression(e.target.checked)}
                  className="rounded border-slate-800 text-amber-500 focus:ring-0"
                />
                <span>Alert team immediately if any Playwright test case fails</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={alertOnLatencySpike}
                  onChange={e => setAlertOnLatencySpike(e.target.checked)}
                  className="rounded border-slate-800 text-amber-500 focus:ring-0"
                />
                <span>Alert if Edge CDN P95 latency spikes over 50ms</span>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-xs text-emerald-400 font-semibold">
            {savedSuccess ? 'Configuration Saved!' : 'Active Scheduler Online'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-600/20 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Activate Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
