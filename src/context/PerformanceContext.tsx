import React, { createContext, useContext, useState, useEffect } from 'react';

interface PerformanceContextType {
  isLowPower: boolean;
  setLowPower: (val: boolean) => void;
  toggleLowPower: () => void;
  fps: number;
}

const PerformanceContext = createContext<PerformanceContextType>({
  isLowPower: false,
  setLowPower: () => {},
  toggleLowPower: () => {},
  fps: 60,
});

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLowPower, setIsLowPower] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return prefersReduced || (isMobile && window.innerWidth < 640);
    }
    return false;
  });

  const [fps, setFps] = useState<number>(60);

  // Simple runtime FPS meter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const toggleLowPower = () => setIsLowPower(prev => !prev);

  return (
    <PerformanceContext.Provider value={{ isLowPower, setLowPower: setIsLowPower, toggleLowPower, fps }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => useContext(PerformanceContext);
