import React, { useState } from 'react';
import { SceneContainer } from '../components/3d/SceneContainer';
import { usePerformance } from '../context/PerformanceContext';
import { useNavigation } from '../context/NavigationContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login } = useNavigation();
  const { isLowPower } = usePerformance();

  const [email, setEmail] = useState('a.hasib@galaxybrain.io');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [warpActive, setWarpActive] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setWarpActive(true);

    // Trigger camera push-through transition (600-900ms)
    setTimeout(() => {
      login(email);
    }, 800);
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#0b0b0d] overflow-hidden transition-all duration-700 ${
        warpActive ? 'scale-110 opacity-0 blur-sm' : 'scale-100 opacity-100'
      }`}
    >
      {/* 3D Wireframe Scene Backdrop (Hand / Container motif on the left) */}
      <div className="absolute inset-0 w-full h-full z-0">
        {!isLowPower && <SceneContainer mode="LOGIN" />}
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#e8805a_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column (Reference 1 inspired visual narrative) */}
        <div className="lg:col-span-7 space-y-6 text-left hidden lg:block pointer-events-none">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-space-850/90 border border-copper-500/40 text-copper-400 font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEURAL INTERFACE INITIALIZED</span>
          </div>
          
          <h1 className="text-4xl font-mono font-bold text-white tracking-tight leading-tight">
            Connect directly to <br />
            <span className="text-copper-400">global freight telematics.</span>
          </h1>

          <p className="text-sm text-zinc-400 max-w-md font-sans leading-relaxed">
            Proprietary neural rate forecasts, vessel booking capacity, and automatic Bill of Lading generation under unified command.
          </p>

          <div className="pt-4 flex items-center space-x-6 font-mono text-xs text-zinc-500">
            <span>informationOS 0.9</span>
            <span>•</span>
            <span>GalaxyBrain Infrastructure</span>
          </div>
        </div>

        {/* Right Column: Glassmorphic Auth Card */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
            
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-copper-400">
                AETHER FREIGHT AUTH
              </span>
              <h2 className="text-2xl font-bold font-mono text-white">
                Sign in to Terminal
              </h2>
              <p className="text-xs text-zinc-400 font-sans">
                Access your real-time shipment radar and predictive spot index.
              </p>
            </div>

            {/* Google SSO Button */}
            <button
              type="button"
              onClick={() => login('a.hasib@galaxybrain.io')}
              className="w-full py-3 px-4 rounded-xl bg-space-850 hover:bg-space-800 border border-white/10 text-white font-mono text-xs flex items-center justify-center space-x-3 transition hover:border-white/20"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-white/[0.08]" />
              <span className="absolute bg-[#121217] px-3 font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                or email access
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 mb-1.5 uppercase tracking-wider text-[11px]">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-copper-500 focus:ring-1 focus:ring-copper-500 transition font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-zinc-400 uppercase tracking-wider text-[11px]">
                    Password
                  </label>
                  <a href="#forgot" className="text-[11px] text-copper-400 hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-copper-500 focus:ring-1 focus:ring-copper-500 transition font-mono text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 rounded-xl bg-copper-500 hover:bg-copper-400 text-space-950 font-bold uppercase tracking-widest text-xs transition shadow-glow-copper flex items-center justify-center space-x-2"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Engaging Warp Transition...</span>
                  </>
                ) : (
                  <>
                    <span>AUTHENTICATE & ENTER</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-500 border-t border-white/[0.06]">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-signal-emerald" />
                <span>Zero-Trust Enclave</span>
              </span>
              <span>256-bit TLS</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
