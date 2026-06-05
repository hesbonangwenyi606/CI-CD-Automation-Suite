import React, { useState } from 'react';
import { Cpu } from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  color: string;
  description: string;
  icon: React.ReactNode;
}

const techItems: TechItem[] = [
  {
    name: 'GitHub Actions',
    category: 'CI/CD',
    color: '#00D9FF',
    description: 'Cloud-native CI/CD with matrix builds and reusable workflows',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'Jenkins',
    category: 'CI/CD',
    color: '#D33833',
    description: 'Enterprise automation server with 1800+ plugins',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M5.5 9.5c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5m3 0c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-6c.55 0 1 .45 1 1h8c0-.55.45-1 1-1s1 .45 1 1c0 2.76-2.24 5-5 5s-5-2.24-5-5c0-.55.45-1 1-1z"/>
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'Containers',
    color: '#2496ED',
    description: 'Container platform for consistent build environments',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.186.186 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm15.767.376c-.453-.16-.932-.17-1.395-.07a2.18 2.18 0 00-.238-.543c.38-.31.665-.71.84-1.16.03-.08-.02-.16-.1-.18a.155.155 0 00-.18.1c-.16.41-.42.77-.76 1.05a2.14 2.14 0 00-1.14-.67c-.08-.02-.16.03-.18.11-.02.08.03.16.11.18.72.2 1.2.78 1.32 1.48-1.41.51-2.32 1.82-2.32 3.36 0 .08.07.15.15.15s.15-.07.15-.15c0-1.76 1.17-3.14 2.85-3.35.45-.05.91.02 1.33.2.07.03.16 0 .19-.08.03-.07 0-.16-.08-.19z"/>
      </svg>
    ),
  },
  {
    name: 'AWS',
    category: 'Cloud',
    color: '#FF9900',
    description: 'Cloud infrastructure with ECS, EKS, Lambda, and S3',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.296.072-.583.16-.863.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.28-.144.616-.264 1.01-.36a4.84 4.84 0 011.244-.152c.95 0 1.644.216 2.091.647.44.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 01.311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.2l-1.923 6.17c-.048.16-.104.264-.168.312a.549.549 0 01-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.272-.15.32-.065.056-.177.088-.32.088zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.216-.151-.248-.215a.563.563 0 01-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 00.415-.758.777.777 0 00-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 01-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415a3.62 3.62 0 011.013-.136c.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 01.24.2.43.43 0 01.071.263v.375c0 .168-.064.256-.184.256a.83.83 0 01-.303-.096 3.652 3.652 0 00-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
      </svg>
    ),
  },
  {
    name: 'Snyk',
    category: 'Security',
    color: '#4C4A73',
    description: 'Developer-first security for dependencies and containers',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 1.5L2 6.5v5c0 5.55 4.27 10.74 10 12 5.73-1.26 10-6.45 10-12v-5L12 1.5zm0 2.18l7 3.5v3.82c0 4.42-3.01 8.54-7 9.93-3.99-1.39-7-5.51-7-9.93V7.18l7-3.5z"/>
        <path d="M12 7l-4 2v3c0 2.76 1.72 5.33 4 6.18 2.28-.85 4-3.42 4-6.18V9l-4-2z" opacity="0.3"/>
      </svg>
    ),
  },
  {
    name: 'SonarQube',
    category: 'Security',
    color: '#4E9BCD',
    description: 'Continuous code quality and security analysis',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M15.685.386l-.465.766c3.477 2.112 5.744 5.766 5.744 9.848 0 6.627-5.373 12-12 12-1.347 0-2.644-.222-3.856-.636l-.244.83A12.574 12.574 0 0012.964 24c7.18 0 13-5.82 13-13 0-4.418-2.449-8.476-6.279-10.614zM8.27 21.559l.192-.842A10.46 10.46 0 012.5 11.5c0-4.145 2.41-7.725 5.9-9.428l-.41-.79C4.26 3.08 1.5 6.97 1.5 11.5c0 4.076 2.147 7.645 5.37 9.655l.4.404z"/>
        <path d="M12 5.5a6 6 0 100 12 6 6 0 000-12zm0 10.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"/>
      </svg>
    ),
  },
  {
    name: 'Trivy',
    category: 'Security',
    color: '#1904DA',
    description: 'Comprehensive vulnerability scanner for containers and IaC',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    name: 'Terraform',
    category: 'IaC',
    color: '#7B42BC',
    description: 'Infrastructure as Code for multi-cloud provisioning',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M1.5 1.5v7.91l6.86 3.955V5.455L1.5 1.5zm7.86 0v7.91l6.86 3.955V5.455L9.36 1.5zm7.86 4.455v7.91l6.86-3.955V1.5l-6.86 3.955zM9.36 14.59v7.91l6.86-3.955v-7.91L9.36 14.59z"/>
      </svg>
    ),
  },
];

const TechStack: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(techItems.map(t => t.category)))];

  const filteredTech = selectedCategory === 'All'
    ? techItems
    : techItems.filter(t => t.category === selectedCategory);

  return (
    <section id="tech" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-[#0A0E27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#0066FF]" />
            <span className="text-xs font-mono text-[#0066FF]">Technology Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            Built on Industry Leaders
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Powered by the most trusted tools in the DevOps ecosystem.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-mono rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30'
                  : 'text-gray-500 hover:text-gray-300 bg-white/[0.02] border border-white/5 hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTech.map((tech, i) => {
            const isHovered = hoveredTech === i;

            return (
              <div
                key={tech.name}
                className="group bg-[#0D1233]/60 backdrop-blur-xl border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all duration-300 cursor-pointer text-center"
                onMouseEnter={() => setHoveredTech(i)}
                onMouseLeave={() => setHoveredTech(null)}
                style={{
                  borderColor: isHovered ? `${tech.color}30` : undefined,
                  boxShadow: isHovered ? `0 0 40px ${tech.color}08` : undefined,
                }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ color: tech.color, background: `${tech.color}10` }}
                >
                  {tech.icon}
                </div>
                <h3 className="text-sm font-mono font-semibold text-white mb-1">{tech.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-500">{tech.category}</span>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{tech.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
