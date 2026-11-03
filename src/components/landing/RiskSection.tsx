import React from 'react';
import { RISK_INCIDENTS } from '../../services/mockApi';
import { AlertTriangle, CloudLightning, Anchor, AlertOctagon, ArrowRight, ShieldAlert } from 'lucide-react';

export const RiskSection: React.FC = () => {
  return (
    <section className="relative min-h-screen py-24 px-4 md:px-8 flex flex-col justify-center z-10 pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-signal-amber uppercase tracking-widest">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>LAYER 03 // CLIMATE, CHOKEPOINT & PORT RISK OVERLAYS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-white tracking-tight">
            Anticipate Bottlenecks Before Departure
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm md:text-base font-sans">
            Weather disruptions, canal draft limits, and terminal labor actions are synthesized into risk particle clusters. Dynamic rerouting calculates alternate port corridors automatically.
          </p>
        </div>

        {/* Risk Incident Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {RISK_INCIDENTS.map((incident) => {
            const isCritical = incident.severity === 'critical';
            const isHigh = incident.severity === 'high';

            return (
              <div
                key={incident.id}
                className={`glass-card rounded-xl p-5 relative overflow-hidden transition-all duration-300 ${
                  isCritical
                    ? 'border-signal-rose/50 bg-space-850/90 shadow-glow-declined'
                    : isHigh
                    ? 'border-signal-amber/40 bg-space-850/90'
                    : 'border-white/10'
                }`}
              >
                {/* Status indicator bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    isCritical
                      ? 'bg-signal-rose'
                      : isHigh
                      ? 'bg-signal-amber'
                      : 'bg-electric-500'
                  }`}
                />

                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {incident.type === 'WEATHER' && <CloudLightning className="w-4 h-4 text-signal-amber" />}
                    {incident.type === 'CHOKEPOINT' && <AlertOctagon className="w-4 h-4 text-signal-rose" />}
                    {incident.type === 'CONGESTION' && <Anchor className="w-4 h-4 text-electric-400" />}
                    {incident.type === 'LABOR' && <ShieldAlert className="w-4 h-4 text-copper-400" />}
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold tracking-wider ${
                      isCritical
                        ? 'bg-signal-rose/20 text-signal-rose border border-signal-rose/30'
                        : isHigh
                        ? 'bg-signal-amber/20 text-signal-amber border border-signal-amber/30'
                        : 'bg-white/10 text-zinc-300'
                    }`}
                  >
                    {incident.severity}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <h3 className="font-mono text-sm font-bold text-white line-clamp-1">
                    {incident.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans">
                    {incident.locationName}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Expected Delay:</span>
                    <span className="text-white font-bold">+{incident.impactDelayDays} Days</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Lanes Impaired:</span>
                    <span className="text-copper-400 font-bold">{incident.activeLanesAffected} Corridors</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 pt-1">
                    Reported {incident.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Mitigation Banner */}
        <div className="glass-card rounded-2xl p-6 border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-signal-emerald/20 border border-signal-emerald flex items-center justify-center text-signal-emerald">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-semibold">AI Automated Reroute Simulation Engine Active</p>
              <p className="text-zinc-400 text-[11px] font-sans">
                Predictive buffer calculations have diverted 14 shipments via Suez & Cape of Good Hope, preserving delivery SLA with zero cost penalty.
              </p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg bg-space-800 hover:bg-space-700 text-copper-400 border border-copper-500/30 hover:border-copper-400 transition whitespace-nowrap">
            VIEW CONTINGENCY PLANS →
          </button>
        </div>

      </div>
    </section>
  );
};
