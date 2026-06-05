import React, { useState } from 'react';
import {
  GitBranch, Server, Container, Cloud, Shield, TestTube,
  RotateCcw, Layers, Lock, BarChart3, Sparkles
} from 'lucide-react';

const features = [
  {
    icon: GitBranch,
    title: 'GitHub Actions',
    description: 'Native GitHub integration with matrix builds, reusable workflows, and environment secrets management.',
    color: '#00D9FF',
    details: ['Matrix strategy builds', 'Reusable workflows', 'OIDC authentication', 'Artifact caching'],
  },
  {
    icon: Server,
    title: 'Jenkins Orchestration',
    description: 'Enterprise Jenkins pipelines with shared libraries, distributed builds, and Blue Ocean visualization.',
    color: '#0066FF',
    details: ['Shared libraries', 'Distributed agents', 'Pipeline as Code', 'Blue Ocean UI'],
  },
  {
    icon: Container,
    title: 'Docker Containerization',
    description: 'Multi-stage Docker builds with layer caching, vulnerability scanning, and registry management.',
    color: '#00D9FF',
    details: ['Multi-stage builds', 'BuildKit caching', 'Registry mirroring', 'Image signing'],
  },
  {
    icon: Cloud,
    title: 'AWS Deployment',
    description: 'Automated deployments to ECS, EKS, Lambda, and S3 with CloudFormation and Terraform support.',
    color: '#FFB800',
    details: ['ECS/EKS deploys', 'Lambda functions', 'CloudFormation', 'Terraform IaC'],
  },
  {
    icon: Shield,
    title: 'Security Scanning',
    description: 'Comprehensive SAST/DAST scanning with Snyk, SonarQube, and Trivy for zero-vulnerability deployments.',
    color: '#FF5F57',
    details: ['SAST analysis', 'DAST testing', 'License compliance', 'CVE tracking'],
  },
  {
    icon: TestTube,
    title: 'Automated Testing',
    description: 'Full testing pyramid from unit to E2E with parallel execution, coverage gates, and flaky test detection.',
    color: '#00FF88',
    details: ['Parallel execution', 'Coverage gates', 'Flaky detection', 'Visual regression'],
  },
  {
    icon: RotateCcw,
    title: 'Rollback Mechanisms',
    description: 'Instant automated rollbacks with health checks, canary analysis, and blue-green deployment strategies.',
    color: '#FFB800',
    details: ['Canary analysis', 'Blue-green deploys', 'Health monitoring', 'Auto-rollback'],
  },
  {
    icon: Layers,
    title: 'Multi-Env Promotion',
    description: 'Structured environment promotion from dev to staging to production with approval gates and audit trails.',
    color: '#0066FF',
    details: ['Approval gates', 'Env promotion', 'Audit trails', 'Config management'],
  },
  {
    icon: Lock,
    title: 'Secrets Management',
    description: 'Centralized secrets with HashiCorp Vault integration, rotation policies, and encrypted at-rest storage.',
    color: '#FF5F57',
    details: ['Vault integration', 'Auto-rotation', 'Encrypted storage', 'Access policies'],
  },
  {
    icon: BarChart3,
    title: 'Pipeline Analytics',
    description: 'Real-time metrics, DORA metrics tracking, bottleneck analysis, and custom alerting dashboards.',
    color: '#00FF88',
    details: ['DORA metrics', 'Bottleneck analysis', 'Custom dashboards', 'Slack alerts'],
  },
];

const FeatureGrid: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-[#0A0E27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF88]" />
            <span className="text-xs font-mono text-[#00FF88]">Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            Everything You Need to Ship
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            10 enterprise-grade automation capabilities in a single platform.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isHovered = hoveredFeature === i;

            return (
              <div
                key={feature.title}
                className="group relative bg-[#0D1233]/60 backdrop-blur-xl border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  borderColor: isHovered ? `${feature.color}30` : undefined,
                  boxShadow: isHovered ? `0 0 40px ${feature.color}08` : undefined,
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-300"
                  style={{
                    background: `${feature.color}12`,
                    border: `1px solid ${feature.color}25`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>

                <h3 className="text-sm font-mono font-semibold text-white mb-1.5">{feature.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{feature.description}</p>

                {/* Detail tags */}
                <div className="flex flex-wrap gap-1">
                  {feature.details.map((detail) => (
                    <span
                      key={detail}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] text-gray-500 border border-white/5"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
