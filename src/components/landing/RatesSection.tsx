import React, { useState, useEffect } from 'react';
import { mockApi, MAJOR_LANES } from '../../services/mockApi';
import { LaneForecast } from '../../types/freight';
import { LineChart, Calendar, TrendingDown, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface RatesSectionProps {
  timeframe: '7d' | '30d' | '90d';
  setTimeframe: (t: '7d' | '30d' | '90d') => void;
}

export const RatesSection: React.FC<RatesSectionProps> = ({ timeframe, setTimeframe }) => {
  const [selectedLaneId, setSelectedLaneId] = useState(MAJOR_LANES[0].id);
  const [forecast, setForecast] = useState<LaneForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const { navigateTo, setBookingData } = useNavigation();

  useEffect(() => {
    setLoading(true);
    mockApi.getForecastRates(selectedLaneId, timeframe).then((data) => {
      setForecast(data);
      setLoading(false);
    });
  }, [selectedLaneId, timeframe]);

  const activeLane = MAJOR_LANES.find((l) => l.id === selectedLaneId) || MAJOR_LANES[0];

  const handleBookWithForecast = () => {
    setBookingData((prev) => ({
      ...prev,
      origin: activeLane.origin.name,
      destination: activeLane.destination.name,
      mode: activeLane.mode,
      estimatedRate: activeLane.currentRate,
    }));
    navigateTo('/book');
  };

  return (
    <section className="relative min-h-screen py-24 px-4 md:px-8 flex flex-col justify-center z-10 pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-copper-400 uppercase tracking-widest">
              <LineChart className="w-3.5 h-3.5" />
              <span>LAYER 02 // 3D EXTRUDED RATE TERRAIN & NEURAL FORECAST</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-mono font-bold text-white tracking-tight">
              Predicted Rate Dynamics
            </h2>
            <p className="text-zinc-400 max-w-xl text-sm md:text-base font-sans">
              Dynamic 3D extruded terrain mapping future volatility. Select time horizons to inspect machine learning confidence bands and hedging advice.
            </p>
          </div>

          {/* Time Horizon Slider Tabs */}
          <div className="flex items-center space-x-1 p-1 rounded-xl bg-space-850/90 border border-white/10 font-mono text-xs">
            {(['7d', '30d', '90d'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeframe === t
                    ? 'bg-copper-500 text-space-950 font-bold shadow-glow-copper'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                NEXT {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Lane Selector Strip */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 font-mono text-xs">
          {MAJOR_LANES.slice(0, 5).map((lane) => (
            <button
              key={lane.id}
              onClick={() => setSelectedLaneId(lane.id)}
              className={`px-3.5 py-2 rounded-lg whitespace-nowrap border transition-all ${
                selectedLaneId === lane.id
                  ? 'border-copper-500 bg-copper-500/15 text-white font-medium'
                  : 'border-white/10 bg-space-850/60 text-zinc-400 hover:border-white/20'
              }`}
            >
              {lane.name}
            </button>
          ))}
        </div>

        {/* Rate Forecast Insight & Chart Window */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Visualizer Window */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 border-white/10 space-y-6">
            <div className="flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
                  Projected Spot Trajectory
                </span>
                <h3 className="text-white font-bold text-lg mt-0.5">{activeLane.name}</h3>
              </div>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1.5 text-zinc-400">
                  <span className="w-2.5 h-0.5 bg-copper-400 inline-block" />
                  <span>Predicted Spot</span>
                </span>
                <span className="flex items-center space-x-1.5 text-zinc-400">
                  <span className="w-2.5 h-2 rounded bg-copper-500/20 border border-dashed border-copper-500/40 inline-block" />
                  <span>95% Confidence Band</span>
                </span>
              </div>
            </div>

            {/* Simulated Interactive SVG Line + Band Graph */}
            <div className="relative h-64 w-full bg-space-950/70 rounded-xl p-4 border border-white/[0.06] flex flex-col justify-end">
              {loading || !forecast ? (
                <div className="flex items-center justify-center h-full text-zinc-500 font-mono text-xs">
                  Computing Bayesian Neural Weights...
                </div>
              ) : (
                <div className="relative w-full h-full flex items-end">
                  {/* SVG Area for Confidence Band & Prediction Line */}
                  <svg className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="bandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#e8805a" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#e8805a" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Generate SVG points */}
                    {(() => {
                      const pts = forecast.points;
                      const minRate = Math.min(...pts.map((p) => p.confidenceLower)) * 0.96;
                      const maxRate = Math.max(...pts.map((p) => p.confidenceUpper)) * 1.04;
                      const range = maxRate - minRate || 1;

                      const width = 100; // viewBox in percentage
                      const coords = pts.map((p, i) => {
                        const x = (i / (pts.length - 1)) * 100;
                        const y = 100 - ((p.rate - minRate) / range) * 85;
                        const yUpper = 100 - ((p.confidenceUpper - minRate) / range) * 85;
                        const yLower = 100 - ((p.confidenceLower - minRate) / range) * 85;
                        return { x, y, yUpper, yLower, p };
                      });

                      // Construct Band polygon path
                      const upperPath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x}% ${c.yUpper}%`).join(' ');
                      const lowerPath = coords.slice().reverse().map((c) => `L ${c.x}% ${c.yLower}%`).join(' ');
                      const bandD = `${upperPath} ${lowerPath} Z`;

                      // Line path
                      const lineD = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x}% ${c.y}%`).join(' ');

                      return (
                        <>
                          <path d={bandD} fill="url(#bandGrad)" />
                          <path d={lineD} fill="none" stroke="#e8805a" strokeWidth="2.5" />
                          {coords.map((c, idx) => (
                            <circle
                              key={idx}
                              cx={`${c.x}%`}
                              cy={`${c.y}%`}
                              r="3.5"
                              fill="#0b0b0d"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                            />
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                </div>
              )}

              {/* X-axis date labels */}
              <div className="flex justify-between font-mono text-[10px] text-zinc-500 pt-2 border-t border-white/10">
                {forecast?.points.filter((_, i) => i % Math.ceil(forecast.points.length / 5) === 0).map((pt, i) => (
                  <span key={i}>{pt.date}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-copper-400" />
                <span>3D extruded coordinate height correlates with rate volatility</span>
              </span>
              <span className="text-copper-400">MODEL ACCURACY: 94.2%</span>
            </div>
          </div>

          {/* AI Decision & Signal Card */}
          <div className="glass-card rounded-2xl p-6 border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  AI RECOMMENDATION
                </span>
                <span className="px-2 py-0.5 rounded bg-signal-emerald/10 border border-signal-emerald/30 text-signal-emerald font-mono text-xs">
                  {forecast?.confidenceScore || 94}% CONFIDENCE
                </span>
              </div>

              {forecast?.aiSignal === 'WAIT_RECOMMENDED' ? (
                <div className="p-4 rounded-xl bg-copper-500/10 border border-copper-500/30 space-y-2">
                  <div className="flex items-center space-x-2 text-copper-400 font-mono text-sm font-bold">
                    <TrendingDown className="w-4 h-4" />
                    <span>WAIT {forecast.recommendedWaitDays} DAYS TO BOOK</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Expected dip of <strong className="text-copper-400 font-mono">{forecast.expectedPriceDeltaPct}%</strong>. Carrier vessel deployments will release 14,000 TEU into the trade corridor.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-electric-500/10 border border-electric-500/30 space-y-2">
                  <div className="flex items-center space-x-2 text-electric-400 font-mono text-sm font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>LOCK SPOT QUOTE NOW</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Demand curve indicates impending rate spike. Locking today guarantees available space and shields from bunker adjustments.
                  </p>
                </div>
              )}

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                  <span className="text-zinc-500">Current Spot:</span>
                  <span className="text-white font-bold">${activeLane.currentRate}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                  <span className="text-zinc-500">Projected Delta:</span>
                  <span className="text-signal-emerald font-bold">{forecast?.expectedPriceDeltaPct}%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.06]">
                  <span className="text-zinc-500">Container Type:</span>
                  <span className="text-zinc-300">40ft High-Cube</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleBookWithForecast}
              className="w-full py-3.5 rounded-lg bg-copper-500 hover:bg-copper-400 text-space-950 font-mono text-xs font-bold tracking-wider uppercase transition shadow-glow-copper"
            >
              BOOK AT PROJECTED RATE →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
