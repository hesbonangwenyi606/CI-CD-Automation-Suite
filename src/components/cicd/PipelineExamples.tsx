import React, { useState } from 'react';
import { GitBranch, Shield, Rocket, ChevronDown, ChevronUp, Copy, Check, Zap, Lock, Globe } from 'lucide-react';

const pipelines = [
  {
    id: 'basic-ci',
    title: 'Basic CI Pipeline',
    description: 'Automated testing and building on every push. Perfect for getting started with continuous integration.',
    icon: GitBranch,
    color: '#00D9FF',
    tags: ['GitHub Actions', 'Node.js', 'Jest'],
    stages: ['Checkout', 'Install', 'Lint', 'Test', 'Build'],
    metrics: { avgTime: '4m 12s', successRate: '98.2%', runsToday: 47 },
    yaml: `name: Basic CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: dist/`,
  },
  {
    id: 'full-cd',
    title: 'Full CD Pipeline',
    description: 'End-to-end deployment pipeline with staging, canary releases, and automated rollback capabilities.',
    icon: Rocket,
    color: '#00FF88',
    tags: ['Jenkins', 'Docker', 'AWS ECS', 'Terraform'],
    stages: ['Build', 'Unit Test', 'Docker Build', 'Stage Deploy', 'E2E Test', 'Canary', 'Production'],
    metrics: { avgTime: '12m 34s', successRate: '99.1%', runsToday: 18 },
    yaml: `pipeline {
  agent any
  environment {
    AWS_REGION = 'us-east-1'
    ECR_REPO = 'pipeline-ci/app'
  }
  stages {
    stage('Build & Test') {
      steps {
        sh 'npm ci && npm test'
      }
    }
    stage('Docker Build') {
      steps {
        sh """
          docker build -t \${ECR_REPO}:\${BUILD_NUMBER} .
          aws ecr get-login-password | docker login --username AWS --password-stdin \${ECR_REPO}
          docker push \${ECR_REPO}:\${BUILD_NUMBER}
        """
      }
    }
    stage('Deploy Staging') {
      steps {
        sh 'terraform apply -auto-approve -var="env=staging" -var="image_tag=\${BUILD_NUMBER}"'
        sh 'npm run test:e2e -- --env=staging'
      }
    }
    stage('Deploy Production') {
      input { message "Deploy to production?" }
      steps {
        sh 'terraform apply -auto-approve -var="env=production" -var="image_tag=\${BUILD_NUMBER}"'
      }
    }
  }
}`,
  },
  {
    id: 'security-first',
    title: 'Security-First Pipeline',
    description: 'Comprehensive security scanning with SAST, DAST, dependency audits, and container vulnerability analysis.',
    icon: Shield,
    color: '#FFB800',
    tags: ['Snyk', 'SonarQube', 'Trivy', 'OWASP ZAP'],
    stages: ['SAST Scan', 'Dependency Audit', 'Container Scan', 'DAST Scan', 'Compliance Check', 'Report'],
    metrics: { avgTime: '8m 56s', successRate: '97.8%', runsToday: 31 },
    yaml: `name: Security Pipeline
on:
  push:
    branches: [main, develop]
  schedule:
    - cron: '0 6 * * *'

jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: SonarQube Scan
        uses: sonarqube-community/sonarqube-scan-action@v3
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}

  dependency-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Snyk Security Check
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}

  container-scan:
    runs-on: ubuntu-latest
    needs: [sast]
    steps:
      - uses: actions/checkout@v4
      - name: Build Image
        run: docker build -t app:scan .
      - name: Trivy Container Scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'app:scan'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'

  dast:
    runs-on: ubuntu-latest
    needs: [container-scan]
    steps:
      - name: OWASP ZAP Scan
        uses: zaproxy/action-full-scan@v0.10
        with:
          target: \${{ vars.STAGING_URL }}`,
  },
];

const PipelineExamples: React.FC = () => {
  const [expandedPipeline, setExpandedPipeline] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedPipeline(expandedPipeline === id ? null : id);
  };

  const copyYaml = (id: string, yaml: string) => {
    navigator.clipboard.writeText(yaml).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="pipelines" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F3A] via-[#0D1233] to-[#0A0E27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 mb-4">
            <Zap className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span className="text-xs font-mono text-[#00D9FF]">Pipeline Templates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            Ready-to-Use Pipelines
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Start with battle-tested pipeline configurations. Customize for your stack in minutes.
          </p>
        </div>

        {/* Pipeline cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pipelines.map((pipeline) => {
            const Icon = pipeline.icon;
            const isExpanded = expandedPipeline === pipeline.id;
            const isCopied = copiedId === pipeline.id;

            return (
              <div
                key={pipeline.id}
                className="group bg-[#0D1233]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300"
                style={{ borderColor: isExpanded ? `${pipeline.color}30` : undefined }}
              >
                <div className="p-6">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${pipeline.color}15`, border: `1px solid ${pipeline.color}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: pipeline.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-mono font-semibold text-white">{pipeline.title}</h3>
                      <p className="text-sm text-gray-400 mt-1 leading-relaxed">{pipeline.description}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {pipeline.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/5 text-gray-400 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Pipeline stages mini */}
                  <div className="mb-5">
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">Stages</div>
                    <div className="flex flex-wrap gap-1.5">
                      {pipeline.stages.map((stage, i) => (
                        <div key={stage} className="flex items-center gap-1.5">
                          <span className="text-xs font-mono text-gray-300 px-2 py-0.5 rounded bg-white/5">{stage}</span>
                          {i < pipeline.stages.length - 1 && (
                            <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-center">
                      <div className="text-sm font-mono font-semibold" style={{ color: pipeline.color }}>{pipeline.metrics.avgTime}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Avg Time</div>
                    </div>
                    <div className="text-center border-x border-white/5">
                      <div className="text-sm font-mono font-semibold text-[#00FF88]">{pipeline.metrics.successRate}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Success</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-mono font-semibold text-white">{pipeline.metrics.runsToday}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Runs Today</div>
                    </div>
                  </div>

                  {/* Expand button */}
                  <button
                    onClick={() => toggleExpand(pipeline.id)}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 text-sm font-mono rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/5"
                  >
                    {isExpanded ? 'Hide' : 'View'} Configuration
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded YAML */}
                {isExpanded && (
                  <div className="border-t border-white/5 animate-fade-in">
                    <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02]">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                        {pipeline.id === 'full-cd' ? 'Jenkinsfile' : 'workflow.yml'}
                      </span>
                      <button
                        onClick={() => copyYaml(pipeline.id, pipeline.yaml)}
                        className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-[#00FF88]" /> : <Copy className="w-3.5 h-3.5" />}
                        {isCopied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="px-4 py-4 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed max-h-80 overflow-y-auto">
                      <code>{pipeline.yaml}</code>
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PipelineExamples;
