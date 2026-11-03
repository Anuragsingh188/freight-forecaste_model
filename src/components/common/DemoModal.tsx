import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle2, TrendingDown, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const { navigateTo } = useNavigation();
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setSeconds(0);
      setIsPlaying(true);
      return;
    }

    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 30) {
            setIsPlaying(false);
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  if (!isOpen) return null;

  const demoSteps = [
    { at: 0, title: 'Step 1: Ingesting Global Satellite Telemetry & Port Congestion' },
    { at: 8, title: 'Step 2: AI Neural Forecasting Predicts Rate Drop on Shanghai → Rotterdam' },
    { at: 18, title: 'Step 3: Automated Spot Rate Lock & Optimal 4-Day Window Recommendation' },
    { at: 25, title: 'Step 4: Instant 1-Click Booking & Live Container Positioning' },
  ];

  const currentStep = demoSteps.slice().reverse().find(s => seconds >= s.at) || demoSteps[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-2xl bg-space-850 border border-copper-500/30 shadow-2xl overflow-hidden">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-space-900/90 font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-copper-500 animate-pulse" />
            <span className="text-copper-400 font-semibold tracking-wider">AETHER FORECAST // 30s INTERACTIVE BRIEFING</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation Display */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="relative aspect-video rounded-xl bg-space-950 border border-white/10 overflow-hidden flex flex-col justify-between p-6">
            
            {/* Top overlay */}
            <div className="flex justify-between items-start font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-zinc-500 tracking-widest">Active Neural Pass</span>
                <p className="text-white font-medium">{currentStep.title}</p>
              </div>
              <div className="px-2.5 py-1 rounded bg-copper-500/20 border border-copper-500/40 text-copper-400 font-mono text-[11px]">
                00:{seconds < 10 ? `0${seconds}` : seconds} / 00:30
              </div>
            </div>

            {/* Interactive animated stage graphics */}
            <div className="py-4 my-auto flex flex-col items-center justify-center space-y-4">
              {seconds < 10 && (
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-copper-500/60 animate-spin flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-copper-500 shadow-glow-copper" />
                  </div>
                  <p className="text-zinc-400 font-mono text-xs">Calibrating 420,000+ AIS ship signals & port wait queues...</p>
                </div>
              )}

              {seconds >= 10 && seconds < 20 && (
                <div className="w-full max-w-md p-4 rounded-xl bg-space-800/90 border border-copper-500/40 space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-400">SHANGHAI → ROTTERDAM</span>
                    <span className="text-signal-emerald font-bold flex items-center">
                      <TrendingDown className="w-3.5 h-3.5 mr-1" />
                      -8.4% EXPECTED
                    </span>
                  </div>
                  <div className="h-12 w-full flex items-end space-x-1.5 pt-2">
                    {[65, 78, 92, 85, 72, 60, 52, 48, 45, 46, 50].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t transition-all duration-500 ${
                          i >= 7 ? 'bg-signal-emerald' : 'bg-copper-500/70'
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono text-center">Optimal Booking Window identified in T+4 Days</p>
                </div>
              )}

              {seconds >= 20 && (
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-signal-emerald/20 border border-signal-emerald flex items-center justify-center text-signal-emerald">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="font-mono">
                    <p className="text-white text-sm font-semibold">Quote Rate Locked: $1,180.00</p>
                    <p className="text-zinc-400 text-xs">Estimated Savings: $280.00 (94% Model Confidence)</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Scrubber */}
            <div className="space-y-2">
              <div className="w-full h-1.5 bg-space-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-copper-500 transition-all duration-300"
                  style={{ width: `${(seconds / 30) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 rounded hover:text-white"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => { setSeconds(0); setIsPlaying(true); }}
                    className="p-1 rounded hover:text-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-copper-400">DEMO RECORDING • 60 FPS HD</span>
              </div>
            </div>

          </div>

          {/* Modal Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center space-x-2 text-zinc-400 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-signal-emerald" />
              <span>Full commercial API access available on enterprise plan.</span>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  navigateTo('/book');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-electric-600 hover:bg-electric-500 text-white font-mono text-xs font-semibold flex items-center justify-center space-x-2 shadow-glow-electric transition"
              >
                <span>TEST LIVE BOOKING</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
