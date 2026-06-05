import React, { useState, useEffect } from 'react';
import { GitCommit, Package, Shield, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

const stages = [
  { icon: GitCommit, label: 'Commit', color: '#00D9FF', time: '0s' },
  { icon: Package, label: 'Build', color: '#0066FF', time: '2m 14s' },
  { icon: Shield, label: 'Security Scan', color: '#FFB800', time: '1m 48s' },
  { icon: CheckCircle2, label: 'Test', color: '#00FF88', time: '3m 22s' },
  { icon: Rocket, label: 'Deploy', color: '#00FF88', time: '45s' },
];

const HeroSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0D1233] to-[#1A1F3A]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="text-sm font-mono text-[#00D9FF]">v3.2.0 — Now with AI-powered pipeline optimization</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-mono font-bold text-white mb-6 leading-tight">
            Ship Code with
            <br />
            <span className="bg-gradient-to-r from-[#00D9FF] via-[#0066FF] to-[#00FF88] bg-clip-text text-transparent">
              Confidence
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Enterprise-grade CI/CD automation with built-in security scanning,
            multi-environment deployments, and intelligent rollback mechanisms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById('pipelines')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-[#00D9FF] to-[#0066FF] rounded-xl hover:shadow-xl hover:shadow-[#00D9FF]/20 transition-all flex items-center gap-2"
            >
              Explore Pipelines
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 text-base font-medium text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all"
            >
              View Live Dashboard
            </button>
          </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0D1233]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs font-mono text-gray-500">pipeline-runner — main branch</span>
            </div>

            {/* Pipeline stages */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
              {stages.map((stage, i) => {
                const Icon = stage.icon;
                const isActive = i <= activeStage;
                const isCurrentlyActive = i === activeStage;
                const isHovered = hoveredStage === i;

                return (
                  <React.Fragment key={stage.label}>
                    <div
                      className="relative flex flex-col items-center cursor-pointer group"
                      onMouseEnter={() => setHoveredStage(i)}
                      onMouseLeave={() => setHoveredStage(null)}
                    >
                      {/* Stage circle */}
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? 'bg-gradient-to-br shadow-lg'
                            : 'bg-white/5 border border-white/10'
                        } ${isCurrentlyActive ? 'scale-110' : 'group-hover:scale-105'}`}
                        style={isActive ? {
                          backgroundImage: `linear-gradient(135deg, ${stage.color}20, ${stage.color}40)`,
                          boxShadow: isCurrentlyActive ? `0 0 30px ${stage.color}30` : 'none',
                          border: `1px solid ${stage.color}50`,
                        } : {}}
                      >
                        <Icon
                          className="w-6 h-6 transition-colors duration-500"
                          style={{ color: isActive ? stage.color : '#4B5563' }}
                        />
                      </div>

                      {/* Label */}
                      <span className={`mt-2 text-xs font-mono transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                        {stage.label}
                      </span>

                      {/* Hover tooltip */}
                      {isHovered && (
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-[#1A1F3A] border border-white/10 rounded-lg px-4 py-2.5 shadow-xl animate-fade-in whitespace-nowrap z-20">
                          <div className="text-xs font-mono text-white">{stage.label}</div>
                          <div className="text-xs text-gray-400 mt-0.5">Duration: {stage.time}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00FF88]' : 'bg-gray-600'}`} />
                            <span className="text-[10px] text-gray-400">{isActive ? 'Completed' : 'Pending'}</span>
                          </div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#1A1F3A] border-r border-b border-white/10" />
                        </div>
                      )}
                    </div>

                    {/* Connector */}
                    {i < stages.length - 1 && (
                      <div className="hidden sm:block flex-1 h-0.5 mx-2 relative overflow-hidden rounded-full bg-white/5">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                          style={{
                            width: i < activeStage ? '100%' : '0%',
                            background: `linear-gradient(90deg, ${stages[i].color}, ${stages[i + 1].color})`,
                          }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Stats row */}
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Build Time', value: '8m 09s', color: '#00D9FF' },
                { label: 'Success Rate', value: '99.7%', color: '#00FF88' },
                { label: 'Deployments', value: '1,247', color: '#0066FF' },
                { label: 'Vulnerabilities', value: '0 Critical', color: '#FFB800' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-lg font-mono font-semibold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
