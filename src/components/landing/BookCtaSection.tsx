import React from 'react';
import { Box, ArrowRight, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const BookCtaSection: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <section className="relative min-h-screen py-24 px-4 md:px-8 flex flex-col justify-center items-center text-center z-10 pointer-events-auto">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Telemetry Tag */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-space-850/90 border border-copper-500/40 text-copper-400 font-mono text-xs">
          <Box className="w-3.5 h-3.5" />
          <span>LAYER 04 // DOCKING TERMINAL REACHED</span>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl font-mono font-bold text-white tracking-tight">
            From Forecast to Cargo in Motion.
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-base sm:text-lg font-sans leading-relaxed">
            The neural horizon has spoken. Lock your optimal rate, generate instant Bill of Lading documentation, and execute multi-modal checkout in seconds.
          </p>
        </div>

        {/* Action Gateway Card */}
        <div className="glass-card rounded-2xl p-6 md:p-8 border-copper-500/40 shadow-glow-copper space-y-6 text-left">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3 font-mono text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-signal-emerald animate-ping" />
              <span className="text-white font-semibold">RESERVED CONTAINER SLOT // ALLIANCE T-04</span>
            </div>
            <span className="text-copper-400 font-bold">LOCKED SPOT: $1,180.00 USD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <button
              onClick={() => navigateTo('/book')}
              className="p-4 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold flex items-center justify-between transition-all group shadow-glow-electric"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-electric-200 uppercase tracking-widest block">
                  Interactive Route Flow
                </span>
                <span className="text-sm">OPEN BOOKING WIZARD</span>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('/pay')}
              className="p-4 rounded-xl bg-space-800 hover:bg-space-700 border border-white/10 hover:border-copper-500/50 text-white font-semibold flex items-center justify-between transition-all group"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
                  3D Tilt Card Checkout
                </span>
                <span className="text-sm">SABLE 3D CHECKOUT</span>
              </div>
              <CreditCard className="w-5 h-5 text-copper-400 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-zinc-400">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-signal-emerald" />
              <span>Direct carrier EDI API integration • Zero hidden surcharges</span>
            </span>
            <span className="text-zinc-500">ISO 9001 / PCI COMPLIANT</span>
          </div>

        </div>

      </div>
    </section>
  );
};
