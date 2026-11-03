import React, { useState } from 'react';
import { X, Check, Copy, Sparkles, Send } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [cargoType, setCargoType] = useState('OCEAN');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const inviteCode = 'AETH-9824-ALPHA';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-space-850 border border-copper-500/40 shadow-2xl p-6 md:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-copper-500/10 border border-copper-500/30 text-copper-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EARLY ACCESS WAITLIST</span>
              </div>
              <h2 className="text-xl font-mono font-bold text-white tracking-wide">
                Join the Private Alpha
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                Get proprietary neural freight forecasting feeds, real-time rate volatility alerts, and guaranteed spot capacity allocations.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 mb-1.5 uppercase tracking-wider text-[11px]">
                  Work Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-space-950 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-copper-500 focus:ring-1 focus:ring-copper-500 transition font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1.5 uppercase tracking-wider text-[11px]">
                  Primary Freight Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['OCEAN', 'AIR', 'ROAD', 'MULTI-MODAL'].map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setCargoType(mode)}
                      className={`py-2 px-3 rounded-lg border text-xs font-mono transition text-left ${
                        cargoType === mode
                          ? 'border-copper-500 bg-copper-500/15 text-copper-400'
                          : 'border-white/10 bg-space-900 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-copper-500 hover:bg-copper-400 text-space-950 font-mono text-xs font-bold tracking-widest uppercase transition shadow-glow-copper flex items-center justify-center space-x-2"
            >
              <span>REQUEST ALPHA ACCESS</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            <p className="text-[11px] font-mono text-zinc-500 text-center">
              Current queue: 1,420 supply chain teams. Invites dispatched weekly.
            </p>
          </form>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 mx-auto rounded-full bg-signal-emerald/20 border border-signal-emerald flex items-center justify-center text-signal-emerald">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-mono font-bold text-white">You're on the list!</h3>
              <p className="text-sm text-zinc-400">
                We've reserved your spot for <span className="text-copper-400 font-mono">{email}</span>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-space-950 border border-copper-500/30 text-left space-y-2 font-mono">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Your Priority Access Pass</span>
              <div className="flex items-center justify-between">
                <span className="text-copper-400 font-bold text-base tracking-wider">{inviteCode}</span>
                <button
                  onClick={copyCode}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded bg-space-800 text-xs text-zinc-300 hover:text-white border border-white/10"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-signal-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-space-800 hover:bg-space-700 text-zinc-300 font-mono text-xs border border-white/10 transition"
            >
              BACK TO PLATFORM
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
