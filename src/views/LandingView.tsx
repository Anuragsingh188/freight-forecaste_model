import React, { useState, useEffect, useRef } from 'react';
import { SceneContainer } from '../components/3d/SceneContainer';
import { LowPowerView } from '../components/fallback/LowPowerView';
import { usePerformance } from '../context/PerformanceContext';
import { HeroSection } from '../components/landing/HeroSection';
import { DemandSection } from '../components/landing/DemandSection';
import { RatesSection } from '../components/landing/RatesSection';
import { RiskSection } from '../components/landing/RiskSection';
import { BookCtaSection } from '../components/landing/BookCtaSection';
import { DemoModal } from '../components/common/DemoModal';
import { WaitlistModal } from '../components/common/WaitlistModal';

export const LandingView: React.FC = () => {
  const { isLowPower } = usePerformance();
  const [activeSection, setActiveSection] = useState<number>(0);
  const [selectedLaneId, setSelectedLaneId] = useState<string>('lane-shanghai-rotterdam');
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // Monitor scroll position to synchronize activeSection for 3D Camera Rig
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const index = Math.min(4, Math.floor((scrollY + windowHeight * 0.35) / windowHeight));
      setActiveSection(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b0b0d] text-white selection:bg-copper-500/30 selection:text-white">
      
      {/* Background 3D Canvas / 2D Low Power Fallback */}
      <div className="fixed inset-0 w-full h-full z-0">
        {!isLowPower ? (
          <SceneContainer
            mode="LANDING"
            activeSection={activeSection}
            highlightedLaneId={selectedLaneId}
            timeframe={timeframe}
          />
        ) : (
          <LowPowerView activeSection={activeSection} />
        )}
      </div>

      {/* Floating Section Index Indicator (Monospace telemetry) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end space-y-3 font-mono text-[11px] pointer-events-none">
        {[
          { idx: 0, label: '00 // GLOBE' },
          { idx: 1, label: '01 // DEMAND' },
          { idx: 2, label: '02 // RATES' },
          { idx: 3, label: '03 // RISK' },
          { idx: 4, label: '04 // BOOK' },
        ].map((sec) => (
          <div
            key={sec.idx}
            className={`flex items-center space-x-2 transition-all duration-300 ${
              activeSection === sec.idx
                ? 'text-copper-400 font-bold translate-x-0'
                : 'text-zinc-600 translate-x-2'
            }`}
          >
            <span>{sec.label}</span>
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                activeSection === sec.idx
                  ? 'bg-copper-400 scale-125 shadow-glow-copper'
                  : 'bg-zinc-700'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Scroll Story Sections */}
      <div className="relative z-10">
        <HeroSection
          onOpenDemo={() => setIsDemoOpen(true)}
          onOpenWaitlist={() => setIsWaitlistOpen(true)}
        />

        <DemandSection
          selectedLaneId={selectedLaneId}
          onSelectLane={(id) => setSelectedLaneId(id)}
        />

        <RatesSection
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />

        <RiskSection />

        <BookCtaSection />
      </div>

      {/* Modals */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

    </div>
  );
};
