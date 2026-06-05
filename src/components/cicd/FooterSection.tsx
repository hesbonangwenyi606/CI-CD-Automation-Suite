import React, { useState } from 'react';
import { GitBranch, Send, Check, ExternalLink, Heart } from 'lucide-react';

const footerLinks = {
  Product: [
    { name: 'Pipeline Templates', href: '#pipelines' },
    { name: 'Features', href: '#features' },
    { name: 'Integrations', href: '#integrations' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Changelog', href: '#' },
    { name: 'Roadmap', href: '#' },
  ],
  Documentation: [
    { name: 'Getting Started', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'CLI Documentation', href: '#' },
    { name: 'SDK Libraries', href: '#' },
    { name: 'Pipeline Syntax', href: '#' },
    { name: 'Best Practices', href: '#' },
  ],
  Resources: [
    { name: 'Blog', href: '#' },
    { name: 'Community Forum', href: '#' },
    { name: 'Video Tutorials', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Webinars', href: '#' },
    { name: 'Open Source', href: '#' },
  ],
  Company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Partners', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Legal', href: '#' },
  ],
  Support: [
    { name: 'Help Center', href: '#' },
    { name: 'Status Page', href: '#', external: true },
    { name: 'Report a Bug', href: '#' },
    { name: 'Feature Request', href: '#' },
    { name: 'Slack Community', href: '#', external: true },
    { name: 'Enterprise Support', href: '#' },
  ],
};

const FooterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      const el = document.getElementById(href.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="footer" className="relative pt-24 pb-8">
      <div className="absolute inset-0 bg-[#0A0E27]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="bg-gradient-to-r from-[#0D1233] to-[#1A1F3A] border border-white/5 rounded-2xl p-8 sm:p-10 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-mono font-bold text-white mb-2">Stay in the Loop</h3>
            <p className="text-gray-400 mb-6">Get the latest updates on new features, integrations, and DevOps best practices.</p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 text-sm font-mono bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00D9FF]/30 focus:ring-1 focus:ring-[#00D9FF]/20"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="px-6 py-3 text-sm font-mono font-medium text-white bg-gradient-to-r from-[#00D9FF] to-[#0066FF] rounded-xl hover:shadow-lg hover:shadow-[#00D9FF]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" /> Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {link.name}
                      {'external' in link && link.external && <ExternalLink className="w-3 h-3" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#0066FF] flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-white" />
            </div>
            <span className="font-mono text-sm text-gray-400">PipelineCI</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</button>
            <button className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</button>
            <button className="text-xs text-gray-500 hover:text-white transition-colors">Cookie Policy</button>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-[#FF5F57]" />
            <span>for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
