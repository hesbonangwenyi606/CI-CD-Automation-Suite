import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "PipelineCI reduced our deployment time from 45 minutes to under 8. The security scanning alone has caught 3 critical vulnerabilities before they hit production.",
    author: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechScale Inc.",
    avatar: "SC",
    color: "#00D9FF",
  },
  {
    quote: "The multi-environment promotion with approval gates gives us the confidence to deploy 20+ times a day. Rollbacks are instant and painless.",
    author: "Marcus Johnson",
    role: "DevOps Lead",
    company: "CloudNative Co.",
    avatar: "MJ",
    color: "#00FF88",
  },
  {
    quote: "We migrated from 4 different CI/CD tools to PipelineCI. One platform, all our pipelines, zero maintenance headaches. Best decision we made this year.",
    author: "Emily Park",
    role: "CTO",
    company: "DataFlow Systems",
    avatar: "EP",
    color: "#FFB800",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1233] to-[#0A0E27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <Quote className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-mono text-gray-400">Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            Trusted by Engineering Teams
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See why thousands of teams choose PipelineCI for their deployment automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-[#0D1233]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-300 leading-relaxed mb-6">"{testimonial.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold"
                  style={{ background: `${testimonial.color}15`, color: testimonial.color, border: `1px solid ${testimonial.color}30` }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{testimonial.author}</div>
                  <div className="text-xs text-gray-500">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
