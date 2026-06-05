import React, { useState } from 'react';
import { Puzzle, ExternalLink } from 'lucide-react';

interface Integration {
  name: string;
  category: string;
  color: string;
  description: string;
  status: 'stable' | 'beta' | 'coming-soon';
}

const integrations: Integration[] = [
  { name: 'GitHub', category: 'Source Control', color: '#FFFFFF', description: 'Full GitHub integration with webhooks, status checks, and PR automation.', status: 'stable' },
  { name: 'GitLab', category: 'Source Control', color: '#FC6D26', description: 'GitLab CI/CD pipeline triggers and merge request integration.', status: 'stable' },
  { name: 'Bitbucket', category: 'Source Control', color: '#0052CC', description: 'Bitbucket Pipelines integration with branch-based workflows.', status: 'stable' },
  { name: 'Slack', category: 'Notifications', color: '#4A154B', description: 'Real-time pipeline notifications with interactive Slack messages.', status: 'stable' },
  { name: 'Jira', category: 'Project Mgmt', color: '#0052CC', description: 'Automatic Jira ticket updates and deployment tracking.', status: 'stable' },
  { name: 'Kubernetes', category: 'Orchestration', color: '#326CE5', description: 'Native K8s deployment with Helm charts and rolling updates.', status: 'stable' },
  { name: 'Datadog', category: 'Monitoring', color: '#632CA6', description: 'Pipeline metrics and deployment tracking in Datadog dashboards.', status: 'stable' },
  { name: 'PagerDuty', category: 'Incident Mgmt', color: '#06AC38', description: 'Automatic incident creation on pipeline failures.', status: 'stable' },
  { name: 'Vault', category: 'Secrets', color: '#FFEC6E', description: 'HashiCorp Vault secrets injection and rotation management.', status: 'stable' },
  { name: 'Grafana', category: 'Monitoring', color: '#F46800', description: 'Pipeline dashboards and alerting with Grafana integration.', status: 'stable' },
  { name: 'ArgoCD', category: 'GitOps', color: '#EF7B4D', description: 'GitOps-based continuous delivery for Kubernetes.', status: 'beta' },
  { name: 'Vercel', category: 'Deployment', color: '#FFFFFF', description: 'Preview deployments and production releases on Vercel.', status: 'stable' },
  { name: 'Cloudflare', category: 'CDN', color: '#F38020', description: 'Edge deployment and cache purging automation.', status: 'beta' },
  { name: 'Azure DevOps', category: 'CI/CD', color: '#0078D7', description: 'Azure Pipelines integration with boards and repos.', status: 'coming-soon' },
];

const statusBadge = {
  stable: { label: 'Stable', color: '#00FF88', bg: 'rgba(0,255,136,0.1)' },
  beta: { label: 'Beta', color: '#FFB800', bg: 'rgba(255,184,0,0.1)' },
  'coming-soon': { label: 'Coming Soon', color: '#6B7280', bg: 'rgba(107,114,128,0.1)' },
};

const IntegrationGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(integrations.map(i => i.category)))];

  const filtered = selectedCategory === 'All'
    ? integrations
    : integrations.filter(i => i.category === selectedCategory);

  return (
    <section id="integrations" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] to-[#0D1233]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 mb-4">
            <Puzzle className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span className="text-xs font-mono text-[#00D9FF]">Integrations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            Connects With Everything
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            14+ integrations with your favorite tools. More added every month.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30'
                  : 'text-gray-500 hover:text-gray-300 bg-white/[0.02] border border-white/5 hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((integration, i) => {
            const badge = statusBadge[integration.status];
            const isHovered = hoveredIdx === i;

            return (
              <div
                key={integration.name}
                className="group bg-[#0D1233]/60 backdrop-blur-xl border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  borderColor: isHovered ? `${integration.color}20` : undefined,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-mono font-bold"
                      style={{ background: `${integration.color}10`, color: integration.color, border: `1px solid ${integration.color}20` }}
                    >
                      {integration.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-mono font-semibold text-white">{integration.name}</h3>
                      <span className="text-[10px] text-gray-500">{integration.category}</span>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                    style={{ color: badge.color, background: badge.bg }}
                  >
                    {badge.label}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-3">{integration.description}</p>

                <button className="flex items-center gap-1 text-[11px] font-mono text-gray-500 hover:text-[#00D9FF] transition-colors group-hover:text-[#00D9FF]">
                  View docs <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IntegrationGrid;
