import React, { useState } from 'react';
import { Check, X, Zap, Crown, Building2, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: { monthly: 29, annual: 24 },
    description: 'Perfect for small teams getting started with CI/CD automation.',
    icon: Zap,
    color: '#00D9FF',
    popular: false,
    cta: 'Start Free Trial',
    limits: {
      pipelines: '5 pipelines',
      builds: '1,000 builds/mo',
      environments: '2 environments',
      users: '5 team members',
    },
    features: [
      { name: 'GitHub Actions integration', included: true },
      { name: 'Docker containerization', included: true },
      { name: 'Basic security scanning', included: true },
      { name: 'Automated testing', included: true },
      { name: 'Email notifications', included: true },
      { name: 'Jenkins orchestration', included: false },
      { name: 'AWS multi-region deploy', included: false },
      { name: 'Advanced SAST/DAST', included: false },
      { name: 'Rollback mechanisms', included: false },
      { name: 'Priority support', included: false },
      { name: 'Custom integrations', included: false },
      { name: 'SLA guarantee', included: false },
    ],
  },
  {
    name: 'Professional',
    price: { monthly: 99, annual: 79 },
    description: 'For growing teams that need advanced automation and security.',
    icon: Crown,
    color: '#00FF88',
    popular: true,
    cta: 'Start Free Trial',
    limits: {
      pipelines: '25 pipelines',
      builds: '10,000 builds/mo',
      environments: '5 environments',
      users: '25 team members',
    },
    features: [
      { name: 'GitHub Actions integration', included: true },
      { name: 'Docker containerization', included: true },
      { name: 'Basic security scanning', included: true },
      { name: 'Automated testing', included: true },
      { name: 'Email + Slack notifications', included: true },
      { name: 'Jenkins orchestration', included: true },
      { name: 'AWS multi-region deploy', included: true },
      { name: 'Advanced SAST/DAST', included: true },
      { name: 'Rollback mechanisms', included: true },
      { name: 'Priority support', included: true },
      { name: 'Custom integrations', included: false },
      { name: 'SLA guarantee', included: false },
    ],
  },
  {
    name: 'Enterprise',
    price: { monthly: 0, annual: 0 },
    description: 'Custom solutions for large organizations with compliance needs.',
    icon: Building2,
    color: '#FFB800',
    popular: false,
    cta: 'Contact Sales',
    limits: {
      pipelines: 'Unlimited',
      builds: 'Unlimited',
      environments: 'Unlimited',
      users: 'Unlimited',
    },
    features: [
      { name: 'GitHub Actions integration', included: true },
      { name: 'Docker containerization', included: true },
      { name: 'Basic security scanning', included: true },
      { name: 'Automated testing', included: true },
      { name: 'All notification channels', included: true },
      { name: 'Jenkins orchestration', included: true },
      { name: 'AWS multi-region deploy', included: true },
      { name: 'Advanced SAST/DAST', included: true },
      { name: 'Rollback mechanisms', included: true },
      { name: 'Dedicated support', included: true },
      { name: 'Custom integrations', included: true },
      { name: '99.99% SLA guarantee', included: true },
    ],
  },
];

const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactEmail) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactFormOpen(false);
        setContactSubmitted(false);
        setContactEmail('');
      }, 2000);
    }
  };

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F3A] via-[#0D1233] to-[#0A0E27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/20 mb-4">
            <Crown className="w-3.5 h-3.5 text-[#FFB800]" />
            <span className="text-xs font-mono text-[#FFB800]">Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
            Start free. Scale as you grow. No hidden fees.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-white/5 border border-white/5 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-sm font-mono rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-sm font-mono rounded-lg transition-all flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Annual
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual;

            return (
              <div
                key={plan.name}
                className={`relative bg-[#0D1233]/60 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 ${
                  plan.popular
                    ? 'border-[#00FF88]/30 shadow-xl shadow-[#00FF88]/5 scale-[1.02] lg:scale-105'
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00FF88] to-[#00D9FF]" />
                )}

                <div className="p-6">
                  {/* Plan header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${plan.color}12`, border: `1px solid ${plan.color}25` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: plan.color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-mono font-semibold text-white">{plan.name}</h3>
                      </div>
                    </div>
                    {plan.popular && (
                      <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-400 mb-5">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    {price > 0 ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-mono font-bold text-white">${price}</span>
                        <span className="text-sm text-gray-500">/user/mo</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-mono font-bold text-white">Custom</div>
                    )}
                  </div>

                  {/* Limits */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {Object.entries(plan.limits).map(([key, value]) => (
                      <div key={key} className="px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5">
                        <div className="text-xs font-mono text-white">{value}</div>
                        <div className="text-[10px] text-gray-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => {
                      if (plan.name === 'Enterprise') {
                        setContactFormOpen(true);
                      }
                    }}
                    className={`w-full py-3 text-sm font-mono font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#00FF88] to-[#00D9FF] text-[#0A0E27] hover:shadow-lg hover:shadow-[#00FF88]/20'
                        : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-white/5 space-y-2.5">
                    {plan.features.map((feature) => (
                      <div key={feature.name} className="flex items-center gap-2.5">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-[#00FF88] shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-700 shrink-0" />
                        )}
                        <span className={`text-xs ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact form modal */}
        {contactFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setContactFormOpen(false)}>
            <div className="bg-[#0D1233] border border-white/10 rounded-2xl p-8 max-w-md w-full animate-fade-in" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-mono font-bold text-white mb-2">Contact Sales</h3>
              <p className="text-sm text-gray-400 mb-6">Get a custom quote for your enterprise needs.</p>

              {contactSubmitted ? (
                <div className="text-center py-8">
                  <Check className="w-12 h-12 text-[#00FF88] mx-auto mb-3" />
                  <p className="text-white font-mono">Thank you! We'll be in touch.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-gray-400 mb-1 block">Work Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-2.5 text-sm font-mono bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#00D9FF]/30 focus:ring-1 focus:ring-[#00D9FF]/20"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setContactFormOpen(false)}
                      className="flex-1 py-2.5 text-sm font-mono text-gray-400 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 text-sm font-mono font-medium text-[#0A0E27] bg-gradient-to-r from-[#00D9FF] to-[#0066FF] rounded-lg hover:shadow-lg hover:shadow-[#00D9FF]/20 transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;
