import React, { useState } from 'react';
import { MAJOR_LANES } from '../../services/mockApi';
import { FreightMode, TradeLane } from '../../types/freight';
import { Ship, Plane, Truck, Train, Flame, TrendingUp, BarChart3, ChevronRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface DemandSectionProps {
  onSelectLane?: (laneId: string) => void;
  selectedLaneId?: string;
}

export const DemandSection: React.FC<DemandSectionProps> = ({ onSelectLane, selectedLaneId }) => {
  const [filterMode, setFilterMode] = useState<FreightMode | 'ALL'>('ALL');
  const { navigateTo, setBookingData } = useNavigation();

  const filteredLanes = MAJOR_LANES.filter(
    (lane) => filterMode === 'ALL' || lane.mode === filterMode
  );

  const handleBookLane = (lane: TradeLane) => {
    setBookingData((prev) => ({
      ...prev,
      origin: lane.origin.name,
      destination: lane.destination.name,
      mode: lane.mode,
      estimatedRate: lane.currentRate,
    }));
    navigateTo('/book');
  };

  return (
    <section className="relative min-h-screen py-24 px-4 md:px-8 flex flex-col justify-center z-10 pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        
        {/* Header telemetry */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-copper-400 uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            <span>LAYER 01 // GLOBAL DEMAND HEATMAP</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-white tracking-tight">
            Lane Demand & Capacity Saturation
          </h2>
          <p className="text-zinc-400 max-w-2xl text-sm md:text-base font-sans">
            Lanes pulse in heat colors calculated from aggregated booking order flows, vessel TEU commitments, and port container turnover velocity.
          </p>
        </div>

        {/* Mode Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {(['ALL', 'OCEAN', 'AIR', 'ROAD'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                filterMode === mode
                  ? 'bg-copper-500/20 border-copper-400 text-copper-300 shadow-glow-copper font-semibold'
                  : 'bg-space-850/80 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {mode === 'OCEAN' && <Ship className="w-3.5 h-3.5 inline mr-1.5" />}
              {mode === 'AIR' && <Plane className="w-3.5 h-3.5 inline mr-1.5" />}
              {mode === 'ROAD' && <Truck className="w-3.5 h-3.5 inline mr-1.5" />}
              {mode}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLanes.slice(0, 6).map((lane) => {
            const isSelected = selectedLaneId === lane.id;
            const isHighDemand = lane.demandIndex >= 80;

            return (
              <div
                key={lane.id}
                onClick={() => onSelectLane?.(lane.id)}
                className={`glass-card rounded-xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? 'border-copper-500/80 bg-space-800/90 shadow-glow-copper scale-[1.02]'
                    : 'hover:border-copper-500/40 hover:bg-space-850/90'
                }`}
              >
                {/* Glow indicator bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    isHighDemand
                      ? 'bg-gradient-to-r from-copper-500 to-amber-500'
                      : 'bg-gradient-to-r from-electric-500 to-emerald-500'
                  }`}
                />

                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                      {lane.mode}
                    </span>
                    <h3 className="font-mono text-sm font-bold text-white group-hover:text-copper-400 transition-colors pt-1">
                      {lane.name}
                    </h3>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-base font-bold text-white">
                      ${lane.currentRate.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-zinc-500">{lane.rateUnit}</div>
                  </div>
                </div>

                {/* Demand & Capacity Bars */}
                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-zinc-400">Demand Velocity Index</span>
                      <span className={isHighDemand ? 'text-amber-400 font-bold' : 'text-zinc-300'}>
                        {lane.demandIndex}/100
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-space-950 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isHighDemand ? 'bg-amber-500' : 'bg-copper-500'
                        }`}
                        style={{ width: `${lane.demandIndex}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-zinc-400">Committed Slot Capacity</span>
                      <span className="text-zinc-300">{lane.capacityUtilization}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-space-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-electric-500 rounded-full"
                        style={{ width: `${lane.capacityUtilization}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 text-[11px]">
                    Est. Transit: {lane.transitDays}d
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookLane(lane);
                    }}
                    className="text-copper-400 hover:text-white flex items-center space-x-1 group-hover:translate-x-1 transition-all"
                  >
                    <span>Instant Quote</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
