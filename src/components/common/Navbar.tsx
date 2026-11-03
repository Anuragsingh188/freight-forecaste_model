import React from 'react';
import { useNavigation, AppRoute } from '../../context/NavigationContext';
import { usePerformance } from '../../context/PerformanceContext';
import { Cpu, Zap, ShieldCheck, ChevronRight, User } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const { currentRoute, navigateTo, isAuthenticated, logout } = useNavigation();
  const { isLowPower, toggleLowPower, fps } = usePerformance();

  const navItems: { label: string; route: AppRoute }[] = [
    { label: 'FORECAST', route: '/' },
    { label: 'BOOKING FLOW', route: '/book' },
    { label: 'SABLE CHECKOUT', route: '/pay' },
    { label: 'FLEET TELEMETRY', route: '/dashboard' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 bg-[#0b0b0d]/75 backdrop-blur-md border-b border-white/[0.07] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigateTo('/')}>
          <div className="relative w-8 h-8 rounded-lg bg-space-850 border border-copper-500/50 flex items-center justify-center shadow-glow-copper">
            <span className="w-2.5 h-2.5 rounded-full bg-copper-500 animate-ping absolute opacity-60" />
            <span className="w-2 h-2 rounded-full bg-copper-500" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono font-bold tracking-widest text-sm text-white group-hover:text-copper-400 transition-colors">
                AETHER
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-copper-500/10 text-copper-400 border border-copper-500/30">
                v2.6
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono tracking-wider hidden sm:block">
              PREDICTIVE FREIGHT OS
            </p>
          </div>
        </div>

        {/* Center Nav items */}
        <nav className="hidden lg:flex items-center space-x-1 p-1 rounded-full bg-space-850/80 border border-white/[0.06]">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => navigateTo(item.route)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-copper-500/15 text-copper-400 border border-copper-500/40 shadow-glow-copper'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Telemetry + Low Power Toggle + Auth/Waitlist */}
        <div className="flex items-center space-x-3">
          
          {/* Low Power / 3D Fallback Mode Switcher */}
          <button
            onClick={toggleLowPower}
            title={isLowPower ? 'Switch to High-Performance 3D Mode' : 'Switch to Low-Power 2D Fallback Mode'}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-space-800/90 border border-white/[0.08] hover:border-white/20 transition text-[11px] font-mono"
          >
            {isLowPower ? (
              <>
                <Zap className="w-3.5 h-3.5 text-signal-amber animate-pulse" />
                <span className="text-zinc-300">2D ECO</span>
              </>
            ) : (
              <>
                <Cpu className="w-3.5 h-3.5 text-copper-400" />
                <span className="text-copper-400 font-semibold">{fps} FPS 3D</span>
              </>
            )}
          </button>

          {/* User state / Waitlist button */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateTo('/dashboard')}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-space-800 border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300"
              >
                <User className="w-3.5 h-3.5 text-signal-emerald" />
                <span className="hidden sm:inline">DASHBOARD</span>
              </button>
              <button
                onClick={logout}
                className="text-[11px] font-mono text-zinc-400 hover:text-signal-rose underline pl-1"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateTo('/login')}
                className="px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white transition"
              >
                LOGIN
              </button>
              
              {/* Reference 1 outline button: "join waitlist →" */}
              <button
                onClick={onOpenWaitlist}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded border border-white/30 hover:border-copper-400 bg-transparent text-xs font-mono text-white hover:text-copper-400 transition-all shadow-sm hover:shadow-glow-copper"
              >
                <span>join waitlist</span>
                <ChevronRight className="w-3 h-3 text-copper-400" />
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};
