import React, { useState } from 'react';
import { PerformanceProvider } from './context/PerformanceContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingView } from './views/LandingView';
import { LoginView } from './views/LoginView';
import { BookingView } from './views/BookingView';
import { PaymentView } from './views/PaymentView';
import { DashboardView } from './views/DashboardView';
import { WaitlistModal } from './components/common/WaitlistModal';

const AppContent: React.FC = () => {
  const { currentRoute, isTransitioning } = useNavigation();
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0b0b0d] text-white flex flex-col justify-between selection:bg-copper-500/30 selection:text-white">
      
      {/* Cinematic Warp / Page Transition Overlay */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none transition-all duration-500 ${
          isTransitioning
            ? 'opacity-100 bg-[#0b0b0d]/80 backdrop-blur-md'
            : 'opacity-0 bg-transparent'
        }`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="font-mono text-xs text-copper-400 tracking-widest uppercase flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-copper-500 animate-ping" />
            <span>CALIBRATING CAMERA VECTOR...</span>
          </div>
        </div>
      </div>

      {/* Global Navbar */}
      <Navbar onOpenWaitlist={() => setIsWaitlistOpen(true)} />

      {/* Main Routed Content */}
      <main className="flex-1">
        {currentRoute === '/' && <LandingView />}
        {currentRoute === '/login' && <LoginView />}
        {currentRoute === '/book' && <BookingView />}
        {currentRoute === '/pay' && <PaymentView />}
        {currentRoute === '/dashboard' && <DashboardView />}
      </main>

      {/* Global Footer (shown on landing, booking, dashboard) */}
      <Footer />

      {/* Global Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PerformanceProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </PerformanceProvider>
  );
};

export default App;
