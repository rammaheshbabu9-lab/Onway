import React, { useState } from 'react';
import { 
  Server, 
  Activity, 
  Zap, 
  ShieldAlert, 
  GitCommit, 
  User, 
  CheckCircle, 
  Clock, 
  Radio, 
  AlertTriangle,
  RefreshCw,
  BellRing
} from 'lucide-react';
import { DEPLOYMENT_PIPELINES, LATENCY_EDGE_NODES } from '../../data/mockOperationsData';
import { DeploymentPipeline } from '../../types';

interface PipelineHealthDashboardProps {
  onSimulateDowntimeAlert: () => void;
}

export const PipelineHealthDashboard: React.FC<PipelineHealthDashboardProps> = ({
  onSimulateDowntimeAlert
}) => {
  const [pipelines, setPipelines] = useState<DeploymentPipeline[]>(DEPLOYMENT_PIPELINES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner with Downtime simulation & status */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Activity className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Active Deployment Pipelines & Edge Latency</span>
                <span className="flex items-center gap-1.5 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Multi-Region Healthy
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Continuous delivery, automated zero-downtime rollouts, and Indian edge CDN latency monitoring
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Telemetry</span>
          </button>

          <button
            onClick={onSimulateDowntimeAlert}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors"
            title="Simulate CDN edge node failure to test automated Slack/Email alert"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Simulate Node Alert</span>
          </button>
        </div>
      </div>

      {/* Latency Across Edge Nodes in India */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              Pan-India Edge CDN Nodes Latency (Real-time P95)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Avg Edge Response: <strong className="text-emerald-400">24.2 ms</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LATENCY_EDGE_NODES.map(node => (
            <div
              key={node.city}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                    <span>{node.city}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="text-[10px] text-slate-400">{node.region}</div>
                </div>
                <div className="text-right">
                  <span className="text-base font-mono font-bold text-emerald-400">
                    {node.latencyMs} ms
                  </span>
                  <div className="text-[10px] text-slate-500 font-mono">Optimal</div>
                </div>
              </div>

              {/* Progress bar of node capacity load */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Server Ingress Load</span>
                  <span className="font-mono">{node.loadPercentage}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${node.loadPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment Pipelines List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">
              Active Deployment Pipelines
            </h3>
          </div>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Zero-Downtime Rollout Ready
          </span>
        </div>

        <div className="space-y-2.5">
          {pipelines.map(pipe => (
            <div
              key={pipe.id}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <h4 className="font-bold text-xs sm:text-sm text-white">
                    {pipe.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {pipe.targetEnv}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <GitCommit className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate max-w-md">{pipe.lastCommit}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span>Author: <strong className="text-slate-300">{pipe.author}</strong></span>
                  <span>Deployed: <strong className="text-slate-300">{pipe.lastDeployed}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">SLA Uptime</div>
                  <div className="font-bold font-mono text-white text-sm">
                    {pipe.uptimePercentage}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">P95 Latency</div>
                  <div className="font-bold font-mono text-emerald-400 text-sm">
                    {pipe.latencyMs} ms
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
