import React, { useState, useEffect } from 'react';
import {
  Activity, CheckCircle2, XCircle, Clock, Loader2,
  GitCommit, GitBranch, User, RefreshCw, Filter, Search
} from 'lucide-react';

type PipelineStatus = 'success' | 'failed' | 'running' | 'queued';

interface PipelineRun {
  id: number;
  name: string;
  branch: string;
  commit: string;
  commitMsg: string;
  author: string;
  status: PipelineStatus;
  duration: string;
  startedAt: string;
  stages: { name: string; status: PipelineStatus; duration: string }[];
}

const initialRuns: PipelineRun[] = [
  {
    id: 1247,
    name: 'deploy-production',
    branch: 'main',
    commit: 'a3f8c2d',
    commitMsg: 'feat: add user authentication flow',
    author: 'Sarah Chen',
    status: 'success',
    duration: '8m 12s',
    startedAt: '2 min ago',
    stages: [
      { name: 'Build', status: 'success', duration: '2m 14s' },
      { name: 'Test', status: 'success', duration: '3m 22s' },
      { name: 'Security', status: 'success', duration: '1m 48s' },
      { name: 'Deploy', status: 'success', duration: '48s' },
    ],
  },
  {
    id: 1246,
    name: 'security-scan',
    branch: 'develop',
    commit: 'b7e1d4f',
    commitMsg: 'fix: resolve XSS vulnerability in input handler',
    author: 'Marcus Johnson',
    status: 'running',
    duration: '3m 45s',
    startedAt: '4 min ago',
    stages: [
      { name: 'SAST', status: 'success', duration: '1m 12s' },
      { name: 'Deps Audit', status: 'success', duration: '45s' },
      { name: 'Container', status: 'running', duration: '1m 48s' },
      { name: 'DAST', status: 'queued', duration: '-' },
    ],
  },
  {
    id: 1245,
    name: 'deploy-staging',
    branch: 'feature/api-v2',
    commit: 'c9a2b3e',
    commitMsg: 'refactor: migrate to new API v2 endpoints',
    author: 'Alex Rivera',
    status: 'failed',
    duration: '5m 33s',
    startedAt: '12 min ago',
    stages: [
      { name: 'Build', status: 'success', duration: '2m 01s' },
      { name: 'Test', status: 'failed', duration: '3m 32s' },
      { name: 'Deploy', status: 'queued', duration: '-' },
    ],
  },
  {
    id: 1244,
    name: 'deploy-production',
    branch: 'main',
    commit: 'd5f7a1c',
    commitMsg: 'chore: update dependencies and security patches',
    author: 'Emily Park',
    status: 'success',
    duration: '7m 48s',
    startedAt: '28 min ago',
    stages: [
      { name: 'Build', status: 'success', duration: '1m 58s' },
      { name: 'Test', status: 'success', duration: '3m 11s' },
      { name: 'Security', status: 'success', duration: '1m 42s' },
      { name: 'Deploy', status: 'success', duration: '57s' },
    ],
  },
  {
    id: 1243,
    name: 'nightly-security',
    branch: 'main',
    commit: 'e2b9c8a',
    commitMsg: 'scheduled: nightly security scan and compliance check',
    author: 'CI Bot',
    status: 'success',
    duration: '12m 04s',
    startedAt: '1 hr ago',
    stages: [
      { name: 'SAST', status: 'success', duration: '3m 22s' },
      { name: 'DAST', status: 'success', duration: '5m 18s' },
      { name: 'Compliance', status: 'success', duration: '2m 44s' },
      { name: 'Report', status: 'success', duration: '40s' },
    ],
  },
  {
    id: 1242,
    name: 'deploy-staging',
    branch: 'feature/dashboard',
    commit: 'f1d3e6b',
    commitMsg: 'feat: implement real-time dashboard metrics',
    author: 'Jordan Lee',
    status: 'queued',
    duration: '-',
    startedAt: 'Just now',
    stages: [
      { name: 'Build', status: 'queued', duration: '-' },
      { name: 'Test', status: 'queued', duration: '-' },
      { name: 'Deploy', status: 'queued', duration: '-' },
    ],
  },
];

const statusConfig: Record<PipelineStatus, { color: string; bg: string; label: string }> = {
  success: { color: '#00FF88', bg: 'rgba(0,255,136,0.1)', label: 'Success' },
  failed: { color: '#FF5F57', bg: 'rgba(255,95,87,0.1)', label: 'Failed' },
  running: { color: '#00D9FF', bg: 'rgba(0,217,255,0.1)', label: 'Running' },
  queued: { color: '#6B7280', bg: 'rgba(107,114,128,0.1)', label: 'Queued' },
};

const StatusIcon: React.FC<{ status: PipelineStatus; size?: number }> = ({ status, size = 16 }) => {
  switch (status) {
    case 'success': return <CheckCircle2 style={{ width: size, height: size, color: '#00FF88' }} />;
    case 'failed': return <XCircle style={{ width: size, height: size, color: '#FF5F57' }} />;
    case 'running': return <Loader2 style={{ width: size, height: size, color: '#00D9FF' }} className="animate-spin" />;
    case 'queued': return <Clock style={{ width: size, height: size, color: '#6B7280' }} />;
  }
};

const StatusDashboard: React.FC = () => {
  const [runs, setRuns] = useState(initialRuns);
  const [filterStatus, setFilterStatus] = useState<PipelineStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRun, setExpandedRun] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate a new run appearing
      const newRun: PipelineRun = {
        id: runs[0].id + 1,
        name: 'deploy-production',
        branch: 'main',
        commit: Math.random().toString(36).substring(2, 9),
        commitMsg: 'fix: hotfix for production issue #' + Math.floor(Math.random() * 1000),
        author: 'Auto Deploy',
        status: 'running',
        duration: '0m 12s',
        startedAt: 'Just now',
        stages: [
          { name: 'Build', status: 'running', duration: '0m 12s' },
          { name: 'Test', status: 'queued', duration: '-' },
          { name: 'Deploy', status: 'queued', duration: '-' },
        ],
      };
      setRuns([newRun, ...runs.slice(0, 5)]);
      setIsRefreshing(false);
    }, 1000);
  };

  const filteredRuns = runs.filter((run) => {
    const matchesStatus = filterStatus === 'all' || run.status === filterStatus;
    const matchesSearch = searchQuery === '' ||
      run.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.commitMsg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.branch.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <section id="dashboard" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0D1233] to-[#1A1F3A]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/20 mb-4">
            <Activity className="w-3.5 h-3.5 text-[#FFB800]" />
            <span className="text-xs font-mono text-[#FFB800]">Live Dashboard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            Pipeline Status
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Real-time visibility into every pipeline run across all environments.
          </p>
        </div>

        {/* Dashboard container */}
        <div className="bg-[#0D1233]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-white/5">
            <div className="flex items-center gap-2 flex-wrap">
              {(['all', 'success', 'running', 'failed', 'queued'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                    filterStatus === status
                      ? 'bg-white/10 text-white border border-white/10'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {status === 'all' ? 'All' : statusConfig[status].label}
                  {status !== 'all' && (
                    <span className="ml-1.5 text-gray-600">
                      {runs.filter(r => r.status === status).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search pipelines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-56 pl-9 pr-3 py-1.5 text-xs font-mono bg-white/5 border border-white/5 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#00D9FF]/30 focus:ring-1 focus:ring-[#00D9FF]/20"
                />
              </div>
              <button
                onClick={handleRefresh}
                className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Table header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2.5 text-[10px] font-mono text-gray-500 uppercase tracking-wider border-b border-white/5 bg-white/[0.01]">
            <div className="col-span-1">Status</div>
            <div className="col-span-3">Pipeline</div>
            <div className="col-span-3">Commit</div>
            <div className="col-span-2">Author</div>
            <div className="col-span-1">Duration</div>
            <div className="col-span-2">Started</div>
          </div>

          {/* Pipeline runs */}
          <div className="divide-y divide-white/[0.03]">
            {filteredRuns.map((run) => {
              const config = statusConfig[run.status];
              const isExpanded = expandedRun === run.id;

              return (
                <div key={run.id}>
                  <div
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-4 py-3 hover:bg-white/[0.02] cursor-pointer transition-colors"
                    onClick={() => setExpandedRun(isExpanded ? null : run.id)}
                  >
                    {/* Status */}
                    <div className="sm:col-span-1 flex items-center gap-2 sm:gap-0">
                      <StatusIcon status={run.status} />
                      <span className="sm:hidden text-xs font-mono text-gray-400">{config.label}</span>
                    </div>

                    {/* Pipeline name */}
                    <div className="sm:col-span-3 flex items-center gap-2">
                      <span className="text-sm font-mono text-white">#{run.id}</span>
                      <span className="text-sm text-gray-300">{run.name}</span>
                    </div>

                    {/* Commit */}
                    <div className="sm:col-span-3 flex items-center gap-2 min-w-0">
                      <div className="flex items-center gap-1 shrink-0">
                        <GitBranch className="w-3 h-3 text-gray-600" />
                        <span className="text-xs font-mono text-[#00D9FF]">{run.branch}</span>
                      </div>
                      <span className="text-xs text-gray-500 truncate">{run.commitMsg}</span>
                    </div>

                    {/* Author */}
                    <div className="sm:col-span-2 flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#00D9FF]/30 to-[#0066FF]/30 flex items-center justify-center shrink-0">
                        <User className="w-3 h-3 text-gray-400" />
                      </div>
                      <span className="text-xs text-gray-400 truncate">{run.author}</span>
                    </div>

                    {/* Duration */}
                    <div className="sm:col-span-1 flex items-center">
                      <span className="text-xs font-mono text-gray-400">{run.duration}</span>
                    </div>

                    {/* Started */}
                    <div className="sm:col-span-2 flex items-center">
                      <span className="text-xs text-gray-500">{run.startedAt}</span>
                    </div>
                  </div>

                  {/* Expanded stages */}
                  {isExpanded && (
                    <div className="px-4 pb-4 animate-fade-in">
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-3">Pipeline Stages</div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          {run.stages.map((stage, i) => (
                            <React.Fragment key={stage.name}>
                              <div className="flex-1 flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                <StatusIcon status={stage.status} size={14} />
                                <div>
                                  <div className="text-xs font-mono text-white">{stage.name}</div>
                                  <div className="text-[10px] text-gray-500">{stage.duration}</div>
                                </div>
                              </div>
                              {i < run.stages.length - 1 && (
                                <div className="hidden sm:flex items-center">
                                  <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredRuns.length === 0 && (
            <div className="px-4 py-12 text-center">
              <Search className="w-8 h-8 text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500 font-mono">No pipeline runs match your filters</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StatusDashboard;
