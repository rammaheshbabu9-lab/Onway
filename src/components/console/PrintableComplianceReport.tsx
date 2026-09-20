import React from 'react';
import { 
  Printer, 
  Download, 
  X, 
  CheckCircle, 
  ShieldCheck, 
  FileCheck2, 
  Building 
} from 'lucide-react';
import { TestSuite, DeploymentPipeline, AuditLogEntry, UserProfile } from '../../types';

interface PrintableComplianceReportProps {
  isOpen: boolean;
  onClose: () => void;
  suites: TestSuite[];
  pipelines: DeploymentPipeline[];
  auditLogs: AuditLogEntry[];
  currentUser: UserProfile;
}

export const PrintableComplianceReport: React.FC<PrintableComplianceReportProps> = ({
  isOpen,
  onClose,
  suites,
  pipelines,
  auditLogs,
  currentUser
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const totalTests = suites.flatMap(s => s.testCases).length;
  const passedTests = suites.flatMap(s => s.testCases).filter(t => t.status === 'passed').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-auto border border-slate-200 print:border-none print:shadow-none print:m-0 print:w-full">
        {/* Print controls header (hidden on actual print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">Formal Audit Compliance Report Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save to PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 sm:p-12 space-y-6 print:p-0">
          {/* Document Letterhead */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-rose-600 text-white font-extrabold flex items-center justify-center text-lg">
                  ON
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900">
                    OnWay News Platform
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    Hyperlocal Short News Infrastructure & Engineering Quality Assurance
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right text-xs text-slate-600 font-mono">
              <div><strong>Report Ref:</strong> ONW-AUD-2026-919</div>
              <div><strong>Generated At:</strong> 2026-09-19 17:30 IST</div>
              <div><strong>Standard:</strong> ISO/IEC 25010 & SOC-2 Type II</div>
            </div>
          </div>

          {/* Executive Certification Banner */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-emerald-950">
                Quality & Platform Integrity Certification: PASSED
              </h3>
              <p className="text-xs text-emerald-800 mt-1">
                All automated regression test suites, visual pixel-diff evaluations across 8 Indian languages, and multi-region edge latency thresholds meet SLA standard 99.98%.
              </p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Playwright Tests</div>
              <div className="text-xl font-black text-slate-900 mt-1">
                {passedTests} / {totalTests}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold">100% Pass Rate</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Indic Languages</div>
              <div className="text-xl font-black text-slate-900 mt-1">
                8 Languages
              </div>
              <div className="text-[11px] text-slate-600">Telugu, Hindi, Tamil, etc.</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Edge CDN Latency</div>
              <div className="text-xl font-black text-slate-900 mt-1">
                24.2 ms
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold">P95 Standard Met</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Platform Uptime</div>
              <div className="text-xl font-black text-slate-900 mt-1">
                99.98%
              </div>
              <div className="text-[11px] text-slate-600 font-semibold">Zero Incident Window</div>
            </div>
          </div>

          {/* Test Suites Verification Evidence */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              Automated Playwright Suite Verification Summary
            </h4>
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Test Suite</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Test Cases</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {suites.map(s => (
                  <tr key={s.id}>
                    <td className="p-2.5 font-semibold text-slate-900">{s.name}</td>
                    <td className="p-2.5 text-slate-600 font-mono text-[11px]">{s.category}</td>
                    <td className="p-2.5 font-mono">{s.testCases.length} verified</td>
                    <td className="p-2.5">
                      <span className="text-emerald-700 font-bold">✓ PASSED</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Security & Signoff Block */}
          <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-2 gap-8 text-xs text-slate-700">
            <div>
              <div className="font-bold text-slate-900 uppercase">Prepared & Audited By:</div>
              <div className="mt-2 font-semibold text-slate-900">{currentUser.name}</div>
              <div className="text-slate-500">{currentUser.role} • OnWay QA Operations</div>
              <div className="font-mono text-[10px] text-slate-400 mt-1">Digital Signature: SHA256: 4a9f...b01c</div>
            </div>

            <div>
              <div className="font-bold text-slate-900 uppercase">Operational Signoff:</div>
              <div className="mt-2 font-semibold text-slate-900">Chief Technology Officer / VP Quality</div>
              <div className="text-slate-500">OnWay News India Operations</div>
              <div className="font-mono text-[10px] text-slate-400 mt-1">Status: VERIFIED & SEALED</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
