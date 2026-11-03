import React from 'react';
import { Activity, Radio, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.06] bg-[#08080a] py-10 px-4 md:px-8 font-mono text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Reference 1 style monospace info */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-zinc-400">informationOS 0.9</span>
            <span>by</span>
            <span className="text-copper-400 font-semibold tracking-wider">AETHER FREIGHT</span>
          </div>
          <p className="text-[11px] text-zinc-600">
            copyright GalaxyBrain, Inc 2026. All rights reserved.
          </p>
        </div>

        {/* Center: System telemetry */}
        <div className="flex items-center space-x-6 text-[11px]">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-emerald animate-ping" />
            <span className="text-zinc-400">ORBITAL AI ENGINE: NOMINAL</span>
          </div>
          <div className="flex items-center space-x-1.5 hidden sm:flex">
            <Radio className="w-3.5 h-3.5 text-electric-400" />
            <span className="text-zinc-400">GLOBAL AIS FEEDS: 182,400 VESSELS</span>
          </div>
        </div>

        {/* Right: Contact & Security */}
        <div className="flex items-center space-x-4">
          <a
            href="mailto:hello@galaxybrain.com"
            className="text-zinc-400 hover:text-copper-400 underline decoration-zinc-700 underline-offset-4 transition"
          >
            hello@galaxybrain.com
          </a>
          <span className="text-zinc-700">|</span>
          <span className="flex items-center space-x-1 text-[11px] text-zinc-500">
            <Shield className="w-3 h-3 text-signal-emerald" />
            <span>PCI-DSS LEVEL 1</span>
          </span>
        </div>

      </div>
    </footer>
  );
};
