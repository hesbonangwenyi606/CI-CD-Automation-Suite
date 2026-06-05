import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Square } from 'lucide-react';

const demoLines = [
  { type: 'command', text: '$ pipeline init --template security-first' },
  { type: 'output', text: '  Initializing pipeline configuration...' },
  { type: 'success', text: '  Created .pipeline/config.yml' },
  { type: 'success', text: '  Created .pipeline/security.yml' },
  { type: 'output', text: '' },
  { type: 'command', text: '$ pipeline run --env staging' },
  { type: 'output', text: '  Triggering pipeline #1248 on branch main...' },
  { type: 'output', text: '' },
  { type: 'stage', text: '  [1/5] Build .......................... 2m 14s ✓' },
  { type: 'stage', text: '  [2/5] Unit Tests .................... 3m 22s ✓' },
  { type: 'stage', text: '  [3/5] Security Scan (SAST) .......... 1m 48s ✓' },
  { type: 'stage', text: '  [4/5] Container Scan (Trivy) ........ 0m 42s ✓' },
  { type: 'stage', text: '  [5/5] Deploy to Staging ............. 0m 45s ✓' },
  { type: 'output', text: '' },
  { type: 'success', text: '  Pipeline #1248 completed successfully!' },
  { type: 'info', text: '  Total time: 8m 51s | 0 vulnerabilities | 98.4% coverage' },
  { type: 'output', text: '' },
  { type: 'command', text: '$ pipeline promote staging production' },
  { type: 'output', text: '  Promoting build #1248 to production...' },
  { type: 'output', text: '  Running canary analysis (5% traffic)...' },
  { type: 'success', text: '  Canary healthy. Rolling out to 100%...' },
  { type: 'success', text: '  Production deployment complete!' },
];

const TerminalDemo: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startDemo = () => {
    setVisibleLines(0);
    setIsPlaying(true);
  };

  const stopDemo = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= demoLines.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 300);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command': return 'text-[#00D9FF]';
      case 'success': return 'text-[#00FF88]';
      case 'info': return 'text-[#FFB800]';
      case 'stage': return 'text-gray-300';
      default: return 'text-gray-500';
    }
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] to-[#0D1233]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 mb-4">
            <Terminal className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span className="text-xs font-mono text-[#00D9FF]">Live Demo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            See It in Action
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Watch a complete pipeline execution from commit to production in seconds.
          </p>
        </div>

        {/* Terminal */}
        <div className="bg-[#0D1233]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs font-mono text-gray-500">pipeline-cli — bash</span>
            </div>
            <div className="flex items-center gap-2">
              {!isPlaying ? (
                <button
                  onClick={startDemo}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-[#00FF88] bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-lg hover:bg-[#00FF88]/20 transition-all"
                >
                  <Play className="w-3 h-3" /> Run Demo
                </button>
              ) : (
                <button
                  onClick={stopDemo}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-[#FF5F57] bg-[#FF5F57]/10 border border-[#FF5F57]/20 rounded-lg hover:bg-[#FF5F57]/20 transition-all"
                >
                  <Square className="w-3 h-3" /> Stop
                </button>
              )}
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={containerRef}
            className="p-4 sm:p-6 h-96 overflow-y-auto font-mono text-sm leading-relaxed"
          >
            {visibleLines === 0 && !isPlaying && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Terminal className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm">Click "Run Demo" to see a pipeline in action</p>
                </div>
              </div>
            )}
            {demoLines.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={`${getLineColor(line.type)} animate-fade-in`}
                style={{ minHeight: line.text === '' ? '1rem' : undefined }}
              >
                {line.text}
              </div>
            ))}
            {isPlaying && visibleLines < demoLines.length && (
              <span className="inline-block w-2 h-4 bg-[#00D9FF] animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalDemo;
