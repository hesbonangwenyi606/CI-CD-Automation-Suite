import React, { useState, useEffect, useRef } from 'react';

interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  color: string;
}

const metrics: Metric[] = [
  { label: 'Pipelines Executed', value: 2847563, suffix: '+', color: '#00D9FF' },
  { label: 'Deployments Today', value: 12847, suffix: '', color: '#00FF88' },
  { label: 'Avg Build Time', value: 4.2, suffix: 'min', color: '#FFB800' },
  { label: 'Uptime', value: 99.99, suffix: '%', color: '#0066FF' },
  { label: 'Security Scans', value: 891204, suffix: '+', color: '#FF5F57' },
  { label: 'Teams Worldwide', value: 8500, suffix: '+', color: '#00D9FF' },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
  return num.toString();
};

const MetricsBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27] via-[#0D1233] to-[#0A0E27]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-2xl sm:text-3xl font-mono font-bold" style={{ color: metric.color }}>
                {metric.prefix || ''}{isVisible ? formatNumber(metric.value) : '0'}{metric.suffix}
              </div>
              <div className="text-xs text-gray-500 mt-1">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsBar;
