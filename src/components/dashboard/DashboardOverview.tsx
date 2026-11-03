import React, { useState } from 'react';
import { MAJOR_LANES, ACTIVE_SHIPMENTS } from '../../services/mockApi';
import { LiveTrackingGlobe } from './LiveTrackingGlobe';
import { MarketAlerts } from './MarketAlerts';
import { useNavigation } from '../../context/NavigationContext';
import { TrendingDown, TrendingUp, DollarSign, Activity, Ship, ShieldCheck, ArrowUpRight, Plus, Box } from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { navigateTo, userEmail } = useNavigation();
  const [activeTab, setActiveTab] = useState<'LANES' | 'SHIPMENTS' | 'ANALYTICS'>('LANES');

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-[#0b0b0d] text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dashboard Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4 font-mono text-xs">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-signal-emerald" />
              <span className="text-zinc-400">ORGANIZATION: GALAXYBRAIN SUPPLY CHAIN</span>
              <span className="text-zinc-600">•</span>
              <span className="text-copper-400">{userEmail}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Freight Telemetry & Predictive Fleet Command
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateTo('/book')}
              className="px-4 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-glow-electric transition"
            >
              <Plus className="w-4 h-4" />
              <span>BOOK SHIPMENT FROM FORECAST</span>
            </button>
          </div>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          
          <div className="glass-card rounded-2xl p-5 border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Active Freight Value</span>
              <DollarSign className="w-4 h-4 text-electric-400" />
            </div>
            <div className="text-2xl font-bold text-white">$42,840.00</div>
            <div className="text-[11px] text-signal-emerald flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14.2% vs last month</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Neural Model Accuracy</span>
              <Activity className="w-4 h-4 text-signal-emerald" />
            </div>
            <div className="text-2xl font-bold text-signal-emerald">94.2%</div>
            <div className="text-[11px] text-zinc-400">
              Evaluated over 1,240 voyage legs
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Saved via AI Timing</span>
              <TrendingDown className="w-4 h-4 text-copper-400" />
            </div>
            <div className="text-2xl font-bold text-copper-400">$4,120.00</div>
            <div className="text-[11px] text-zinc-400">
              -8.4% avg spot delta captured
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>TEU Active in Ocean/Air</span>
              <Box className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">148 TEU</div>
            <div className="text-[11px] text-zinc-400">
              3 Vessels • 1 B777 Cargo Flight
            </div>
          </div>

        </div>

        {/* Main Content Grid: Tables on Left, 3D Globe + Alerts on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8 cols): Trade Lanes & Active Shipments Table */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 border-white/10 space-y-6">
            
            {/* Table Tabs */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] font-mono text-xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('LANES')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    activeTab === 'LANES'
                      ? 'bg-copper-500/20 text-copper-300 border border-copper-500/40 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  PREDICTIVE LANES ({MAJOR_LANES.length})
                </button>
                <button
                  onClick={() => setActiveTab('SHIPMENTS')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    activeTab === 'SHIPMENTS'
                      ? 'bg-copper-500/20 text-copper-300 border border-copper-500/40 font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  ACTIVE VOYAGES ({ACTIVE_SHIPMENTS.length})
                </button>
              </div>

              <span className="text-[10px] text-zinc-500 hidden sm:inline">
                AUTO-REFRESH: 10 SEC
              </span>
            </div>

            {/* Table View */}
            {activeTab === 'LANES' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-zinc-500 text-[10px] uppercase">
                      <th className="pb-3">Trade Corridor</th>
                      <th className="pb-3">Mode</th>
                      <th className="pb-3">Current Spot</th>
                      <th className="pb-3">7d Delta</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {MAJOR_LANES.map((lane) => (
                      <tr key={lane.id} className="hover:bg-white/[0.02] transition">
                        <td className="py-3.5 pr-2">
                          <div className="font-bold text-white text-xs">{lane.name}</div>
                          <div className="text-[10px] text-zinc-500">Carrier: {lane.carrier}</div>
                        </td>
                        <td className="py-3.5 pr-2">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-300">
                            {lane.mode}
                          </span>
                        </td>
                        <td className="py-3.5 pr-2 font-bold text-white">
                          ${lane.currentRate} <span className="text-[10px] text-zinc-500 font-normal">{lane.rateUnit}</span>
                        </td>
                        <td className="py-3.5 pr-2">
                          <span
                            className={`font-semibold ${
                              lane.change7d < 0 ? 'text-signal-emerald' : 'text-signal-rose'
                            }`}
                          >
                            {lane.change7d > 0 ? `+${lane.change7d}%` : `${lane.change7d}%`}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => navigateTo('/book')}
                            className="px-2.5 py-1 rounded bg-copper-500/15 hover:bg-copper-500 text-copper-400 hover:text-space-950 font-bold text-[10px] transition"
                          >
                            LOCK QUOTE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-3 font-mono text-xs">
                {ACTIVE_SHIPMENTS.map((shp) => (
                  <div key={shp.id} className="p-4 rounded-xl bg-space-950 border border-white/[0.06] space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-white font-bold text-sm">{shp.vesselName}</span>
                        <div className="text-zinc-400 text-[11px]">{shp.lane} • {shp.containerId}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-electric-500/20 text-electric-300 text-[10px] font-bold">
                        {shp.status}
                      </span>
                    </div>

                    <div className="flex justify-between text-[11px] text-zinc-400 pt-1">
                      <span>Speed: {shp.speedKnots} kts</span>
                      <span>ETA: {shp.eta}</span>
                    </div>

                    <div className="h-1.5 w-full bg-space-850 rounded-full overflow-hidden">
                      <div className="h-full bg-copper-500" style={{ width: `${shp.progressPercent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column (5 cols): Live 3D Tracking Globe & Maritime Alerts */}
          <div className="lg:col-span-5 space-y-6">
            <LiveTrackingGlobe />
            <MarketAlerts />
          </div>

        </div>

      </div>
    </div>
  );
};
