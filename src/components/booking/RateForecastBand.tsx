import React from 'react';
import { TrendingDown, ShieldAlert, CheckCircle, Info, Zap } from 'lucide-react';

interface RateForecastBandProps {
  currentRate: number;
  mode: string;
}

export const RateForecastBand: React.FC<RateForecastBandProps> = ({ currentRate, mode }) => {
  const isDropExpected = true;
  const savingsPct = 8.4;
  const savingsUsd = Math.round(currentRate * (savingsPct / 100));
  const optimalDate = 'Nov 4, 2026';

  return (
    <div className="glass-card rounded-2xl p-6 border-white/10 space-y-5 font-mono text-xs text-white">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
          NEURAL RATE INTELLIGENCE
        </span>
        <span className="px-2 py-0.5 rounded bg-signal-emerald/20 text-signal-emerald border border-signal-emerald/30 text-[11px] font-bold">
          94% CONFIDENCE
        </span>
      </div>

      {/* Decision Signal Banner */}
      <div className="p-4 rounded-xl bg-copper-500/15 border border-copper-500/40 space-y-2">
        <div className="flex items-center space-x-2 text-copper-400 font-bold text-sm">
          <TrendingDown className="w-4 h-4" />
          <span>RECOMMENDATION: WAIT 4 DAYS</span>
        </div>
        <p className="text-zinc-300 font-sans text-xs leading-relaxed">
          Ocean Alliance is releasing additional capacity on this corridor. Waiting until <strong className="text-white font-mono">{optimalDate}</strong> is forecast to save <strong className="text-signal-emerald font-mono">${savingsUsd} (-{savingsPct}%)</strong>.
        </p>
      </div>

      {/* Trajectory comparison matrix */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06]">
          <span className="text-zinc-400">Current Spot Rate:</span>
          <span className="text-white font-bold text-sm">${currentRate.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06]">
          <span className="text-zinc-400">Target Low (T+4 Days):</span>
          <span className="text-signal-emerald font-bold text-sm">
            ${(currentRate - savingsUsd).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-white/[0.06]">
          <span className="text-zinc-400">Risk of Rate Spike:</span>
          <span className="text-signal-amber font-semibold">Low (6% probability)</span>
        </div>
      </div>

      {/* Interactive Micro Rate Curve */}
      <div className="space-y-1 pt-1">
        <div className="flex justify-between text-[10px] text-zinc-500">
          <span>Today</span>
          <span className="text-signal-emerald font-bold">Optimal Window (T+4)</span>
          <span>T+14</span>
        </div>
        <div className="h-2 w-full bg-space-950 rounded-full flex overflow-hidden">
          <div className="w-1/4 bg-copper-500" />
          <div className="w-1/3 bg-signal-emerald animate-pulse" />
          <div className="w-5/12 bg-space-700" />
        </div>
      </div>

      <div className="p-3 rounded-xl bg-space-850/80 border border-white/[0.06] text-[11px] text-zinc-400 flex items-start space-x-2">
        <Zap className="w-3.5 h-3.5 text-copper-400 shrink-0 mt-0.5" />
        <span className="font-sans">
          You can lock this quote now, or enable <strong className="text-white">Auto-Execute at Target Dip</strong> to trigger automated booking when the rate threshold hits.
        </span>
      </div>

    </div>
  );
};
