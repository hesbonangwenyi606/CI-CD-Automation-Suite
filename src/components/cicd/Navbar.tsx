import React, { useState } from 'react';
import { GitBranch, Menu, X, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E27]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#0066FF] flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-white" />
            </div>
            <span className="font-mono font-semibold text-white text-lg tracking-tight">PipelineCI</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5">
                Product <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {productOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-[#1A1F3A] border border-white/10 rounded-xl shadow-2xl p-2 animate-fade-in">
                  <button onClick={() => scrollTo('pipelines')} className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Pipeline Templates</button>
                  <button onClick={() => scrollTo('features')} className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Features</button>
                  <button onClick={() => scrollTo('dashboard')} className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Live Dashboard</button>
                  <button onClick={() => scrollTo('integrations')} className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Integrations</button>
                </div>
              )}
            </div>
            <button onClick={() => scrollTo('pricing')} className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5">Pricing</button>
            <button onClick={() => scrollTo('tech')} className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5">Tech Stack</button>
            <button onClick={() => scrollTo('footer')} className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md hover:bg-white/5">Docs</button>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">Sign In</button>
            <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#00D9FF] to-[#0066FF] rounded-lg hover:shadow-lg hover:shadow-[#00D9FF]/20 transition-all">
              Start Free Trial
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0E27]/95 backdrop-blur-xl border-t border-white/5 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            <button onClick={() => scrollTo('pipelines')} className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Pipeline Templates</button>
            <button onClick={() => scrollTo('features')} className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Features</button>
            <button onClick={() => scrollTo('dashboard')} className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Live Dashboard</button>
            <button onClick={() => scrollTo('pricing')} className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Pricing</button>
            <button onClick={() => scrollTo('tech')} className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">Tech Stack</button>
            <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
              <button className="px-3 py-2.5 text-sm text-gray-300 hover:text-white text-left">Sign In</button>
              <button className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#00D9FF] to-[#0066FF] rounded-lg text-center">Start Free Trial</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
