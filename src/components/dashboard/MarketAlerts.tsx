import React from 'react';
import { RISK_INCIDENTS } from '../../services/mockApi';
import { AlertTriangle, Clock, ExternalLink, ShieldCheck } from 'lucide-react';

export const MarketAlerts: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-6 border-white/10 space-y-4 font-mono text-xs">
      
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-signal-amber animate-ping" />
          <span className="text-white font-bold tracking-wider">LIVE MARITIME & CARGO ADVISORIES</span>
        </div>
        <span className="text-[10px] text-zinc-500 uppercase">4 ACTIVE INCIDENTS</span>
      </div>

      <div className="space-y-3">
        {RISK_INCIDENTS.map((inc) => (
          <div
            key={inc.id}
            className="p-3.5 rounded-xl bg-space-950/80 border border-white/[0.06] hover:border-copper-500/30 transition space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">{inc.title}</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${
                  inc.severity === 'critical'
                    ? 'bg-rose-500/20 text-rose-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {inc.severity}
              </span>
            </div>

            <p className="text-zinc-400 text-[11px] font-sans">
              {inc.locationName} • Impact: +{inc.impactDelayDays} days delay on {inc.activeLanesAffected} trade lanes.
            </p>

            <div className="flex justify-between items-center pt-1 text-[10px] text-zinc-500">
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{inc.timestamp}</span>
              </span>
              <span className="text-copper-400 hover:underline cursor-pointer">AI Reroute Available</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
