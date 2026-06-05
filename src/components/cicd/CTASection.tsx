import React from 'react';
import { ArrowRight, GitBranch, Shield, Rocket } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] to-[#0D1233]" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D9FF]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/20 flex items-center justify-center">
            <GitBranch className="w-6 h-6 text-[#00D9FF]" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-[#00FF88]" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-[#FFB800]" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-6">
          Ready to Automate Your
          <br />
          <span className="bg-gradient-to-r from-[#00D9FF] via-[#00FF88] to-[#FFB800] bg-clip-text text-transparent">
            Deployment Pipeline?
          </span>
        </h2>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Join 8,500+ engineering teams shipping code faster and more securely.
          Start your free trial today — no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group px-8 py-4 text-base font-mono font-medium text-white bg-gradient-to-r from-[#00D9FF] to-[#0066FF] rounded-xl hover:shadow-xl hover:shadow-[#00D9FF]/20 transition-all flex items-center gap-2"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById('pipelines')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-base font-mono font-medium text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all"
          >
            View Pipeline Templates
          </button>
        </div>

        <p className="text-xs text-gray-600 mt-6 font-mono">
          Free 14-day trial • No credit card • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default CTASection;
