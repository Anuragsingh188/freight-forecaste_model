import React from 'react';
import { Play, ArrowRight, ShieldCheck, Activity, Globe2, Compass } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface HeroSectionProps {
  onOpenDemo: () => void;
  onOpenWaitlist: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo, onOpenWaitlist }) => {
  const { navigateTo } = useNavigation();

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 md:px-8 z-10 pointer-events-auto">
      
      {/* Top telemetry badge */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-space-850/80 border border-copper-500/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-copper-500 animate-ping" />
          <span className="text-xs font-mono text-copper-400 font-medium tracking-wider">
            GLOBAL FREIGHT NEURAL ENGINE v2.6 ACTIVE
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-xs font-mono text-zinc-400">
          <span className="flex items-center space-x-1.5">
            <Globe2 className="w-3.5 h-3.5 text-electric-400" />
            <span>42 TRADE CORRIDORS MONITORED</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-signal-emerald" />
            <span>AIS LATENCY: 22ms</span>
          </span>
        </div>
      </div>

      {/* Center Main Hero & Reference 1 Play Button Motif */}
      <div className="max-w-4xl mx-auto text-center space-y-6 my-auto">
        
        <div className="space-y-4">
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-copper-400">
            AETHER FREIGHT PLATFORM
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-mono font-bold tracking-tight text-white leading-tight">
            See the freight market <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-copper-400 via-orange-300 to-electric-400">
              before it moves.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-sans leading-relaxed">
            Neural forecasting for ocean, air, road, and rail rates. Detect volatility, analyze lane congestion before ships sail, and lock instant spot bookings directly from the forecast.
          </p>
        </div>

        {/* Center Play Button Motif (directly matching Reference Image 1) */}
        <div className="pt-2 flex flex-col items-center justify-center space-y-3">
          <button
            onClick={onOpenDemo}
            aria-label="Play 30-second product demo briefing"
            className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/[0.08] hover:bg-copper-500/20 border border-white/20 hover:border-copper-400 backdrop-blur-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-glow-copper cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-copper-500/30 group-hover:bg-copper-500 flex items-center justify-center transition-all duration-300">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5 fill-white group-hover:scale-110 transition-transform" />
            </div>
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full border border-copper-500/40 animate-ping opacity-30" />
          </button>
          <span className="font-mono text-xs text-zinc-400 tracking-wider">
            PLAY 30s PRODUCT DEMO
          </span>
        </div>

        {/* Primary CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
          <button
            onClick={() => navigateTo('/book')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-electric-600 hover:bg-electric-500 text-white font-semibold tracking-wider flex items-center justify-center space-x-2 shadow-glow-electric transition-all"
          >
            <span>LAUNCH INSTANT BOOKING</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenWaitlist}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-space-850 hover:bg-space-800 text-copper-400 border border-copper-500/40 hover:border-copper-400 transition-all flex items-center justify-center space-x-2"
          >
            <span>JOIN VIP ALPHA</span>
          </button>
        </div>

      </div>

      {/* Bottom Live Market Ticker */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="glass-card rounded-xl px-4 py-3 flex items-center justify-between font-mono text-xs overflow-x-auto gap-6 border-white/[0.07]">
          <div className="flex items-center space-x-2 text-zinc-400 shrink-0">
            <Activity className="w-3.5 h-3.5 text-copper-500 animate-pulse" />
            <span className="text-[11px] uppercase tracking-widest">LIVE LANE SPOT RATES:</span>
          </div>

          <div className="flex items-center space-x-8 shrink-0 text-[11px]">
            <div className="flex items-center space-x-2">
              <span className="text-zinc-400">CNSHA → NLRTM:</span>
              <span className="text-white font-bold">$3,180</span>
              <span className="text-signal-emerald">-5.4% (BUY)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-zinc-400">USLAX → JPTYO:</span>
              <span className="text-white font-bold">$1,840</span>
              <span className="text-signal-rose">+2.1% (PEAK)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-zinc-400">FRA → ORD (AIR):</span>
              <span className="text-white font-bold">$3.85/kg</span>
              <span className="text-signal-emerald">-2.3% (SOFT)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-zinc-400">SGSIN → DEHAM:</span>
              <span className="text-white font-bold">$2,950</span>
              <span className="text-signal-emerald">-7.6% (DIP)</span>
            </div>
          </div>

          <div className="text-[11px] text-zinc-500 hidden xl:block shrink-0">
            SCROLL TO EXPLORE 3D STORY ↓
          </div>
        </div>
      </div>

    </section>
  );
};
