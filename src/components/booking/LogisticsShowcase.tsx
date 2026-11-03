import React, { useState, useEffect } from 'react';
import { Truck, Ship, Plane, Box, ArrowRight, Play, CheckCircle2, ChevronRight, Shield, Anchor } from 'lucide-react';

export const LogisticsShowcase: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // 4 Cinematic stages inspired by the PDF video frames:
  // 0: Port Reach Stacker Crane & Container Loading
  // 1: Highway Semi-Truck & Top-Down Road Curve
  // 2: Ocean Container Vessel Navigating Sea Corridors
  // 3: Air Freight Cargo Aircraft in Flight
  const stages = [
    {
      title: 'Container Crane & Port Stacking Yard',
      subtitle: 'EVERYTHING YOUR FREIGHT NEEDS. UNDER ONE GROUP.',
      mode: 'INTERMODAL DOCK',
      desc: 'Precision reach stacker loads 40ft High-Cube container onto heavy transport hauler with automated gate weight verification.',
      icon: Box,
    },
    {
      title: 'Overland Hauler Highway Navigation',
      subtitle: 'RELIABILITY AT EVERY MILESTONE.',
      mode: 'DOMESTIC & INTERSTATE',
      desc: 'Top-down aerial tracking monitors axle weight, route fuel efficiency, and real-time highway corridor transit ETA.',
      icon: Truck,
    },
    {
      title: 'Ocean Megaship Transoceanic Transit',
      subtitle: 'LOGISTICS THAT POWERS GLOBAL COMMERCE.',
      mode: 'OCEAN FREIGHT',
      desc: 'Deepwater container vessel cutting through oceanic swell with satellite AIS telemetry and reefing climate sensors.',
      icon: Ship,
    },
    {
      title: 'Express Air Cargo Transpacific Lift',
      subtitle: 'FAST ISSUE RESOLUTION & AIR MOBILITY.',
      mode: 'AIR FREIGHT',
      desc: 'Wide-body B777-F cargo aircraft delivering time-critical high-value cargo with guaranteed customs clearance.',
      icon: Plane,
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  return (
    <div className="w-full rounded-2xl glass-card border border-white/10 overflow-hidden text-white font-sans">
      
      {/* Visual Canvas Area with SVG / CSS Animation for each stage */}
      <div className="relative h-64 sm:h-80 w-full bg-[#08080c] overflow-hidden flex items-center justify-center p-6 border-b border-white/[0.08]">
        
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8805a08_1px,transparent_1px),linear-gradient(to_bottom,#e8805a08_1px,transparent_1px)] bg-[size:28px_28px]" />

        {/* STAGE 0: REACH STACKER CRANE LOADING CONTAINER ONTO TRUCK (PDF Page 1) */}
        {activeStage === 0 && (
          <div className="relative w-full max-w-xl flex flex-col items-center justify-center animate-fadeIn">
            <svg viewBox="0 0 600 240" className="w-full h-auto">
              {/* Ground level */}
              <line x1="20" y1="200" x2="580" y2="200" stroke="#334155" strokeWidth="3" />
              
              {/* Stacked Containers at Port */}
              <rect x="50" y="140" width="80" height="58" fill="#e8805a" stroke="#ffffff" strokeWidth="1" rx="2" />
              <rect x="50" y="80" width="80" height="58" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" rx="2" />
              <rect x="135" y="140" width="80" height="58" fill="#10b981" stroke="#ffffff" strokeWidth="1" rx="2" />

              {/* Reach Stacker Crane Arm */}
              <path d="M 120 180 L 220 50 L 320 110" fill="none" stroke="#60a5fa" strokeWidth="8" strokeLinecap="round" />
              <circle cx="220" cy="50" r="12" fill="#2563eb" />
              <line x1="320" y1="110" x2="320" y2="135" stroke="#f8fafc" strokeWidth="2" strokeDasharray="3,3" />

              {/* Suspended Container */}
              <g className="animate-bounce" style={{ animationDuration: '3s' }}>
                <rect x="280" y="125" width="80" height="40" fill="#f8fafc" stroke="#e8805a" strokeWidth="2" rx="2" />
                <text x="320" y="148" fill="#0b0b0d" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  AETH 40HC
                </text>
              </g>

              {/* Semi-Truck Chassis receiving container */}
              <g transform="translate(360, 160)">
                {/* Truck Cab */}
                <path d="M 70 0 L 110 0 L 125 18 L 125 38 L 70 38 Z" fill="#1e293b" stroke="#e8805a" strokeWidth="1.5" />
                {/* Cab window */}
                <polygon points="90,6 108,6 120,18 90,18" fill="#93c5fd" opacity="0.8" />
                {/* Trailer Flatbed */}
                <rect x="-80" y="24" width="150" height="6" fill="#475569" />
                {/* Wheels */}
                <circle cx="-60" cy="36" r="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="-40" cy="36" r="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="35" cy="36" r="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="55" cy="36" r="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="105" cy="36" r="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
              </g>
            </svg>
            <div className="absolute top-2 left-4 font-mono text-[11px] text-copper-400">
              PORT CRANE AUTOMATION // BERTH 04
            </div>
          </div>
        )}

        {/* STAGE 1: TOP-DOWN VIEW OF TRUCK ROUNDING HIGHWAY CURVE (PDF Page 2) */}
        {activeStage === 1 && (
          <div className="relative w-full max-w-xl flex flex-col items-center justify-center animate-fadeIn">
            <svg viewBox="0 0 600 240" className="w-full h-auto">
              {/* Curving 2-lane asphalt highway */}
              <path
                d="M 50 120 C 250 120, 320 40, 550 40"
                fill="none"
                stroke="#1e293b"
                strokeWidth="70"
                strokeLinecap="round"
              />
              <path
                d="M 50 120 C 250 120, 320 40, 550 40"
                fill="none"
                stroke="#f8fafc"
                strokeWidth="2"
                strokeDasharray="12,12"
              />

              {/* Top-down Semi-Truck navigating curve */}
              <g transform="translate(290, 85) rotate(-22)">
                {/* White container top */}
                <rect x="-55" y="-14" width="80" height="28" fill="#f8fafc" stroke="#e8805a" strokeWidth="1.5" rx="2" />
                <line x1="-35" y1="-14" x2="-35" y2="14" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="-15" y1="-14" x2="-15" y2="14" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="5" y1="-14" x2="5" y2="14" stroke="#e2e8f0" strokeWidth="1" />
                {/* Cab top */}
                <rect x="27" y="-12" width="24" height="24" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" rx="3" />
                {/* Side Mirrors */}
                <rect x="36" y="-16" width="3" height="4" fill="#38bdf8" />
                <rect x="36" y="12" width="3" height="4" fill="#38bdf8" />
              </g>

              {/* Waypoint Telemetry Target */}
              <circle cx="480" cy="40" r="18" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,4" className="animate-spin" />
              <circle cx="480" cy="40" r="4" fill="#10b981" />
            </svg>
            <div className="absolute top-2 left-4 font-mono text-[11px] text-signal-emerald">
              GPS TELEMETRICS: 68 MPH • HIGHWAY INTERSTATE 80
            </div>
          </div>
        )}

        {/* STAGE 2: MASSIVE OCEAN CONTAINER VESSEL (PDF Page 3 & 4) */}
        {activeStage === 2 && (
          <div className="relative w-full max-w-xl flex flex-col items-center justify-center animate-fadeIn">
            <svg viewBox="0 0 600 240" className="w-full h-auto">
              {/* Deep blue ocean gradient */}
              <rect x="20" y="20" width="560" height="200" rx="12" fill="#0369a1" opacity="0.35" />
              
              {/* Ocean Wakes */}
              <path d="M 300 30 L 180 210" stroke="#bae6fd" strokeWidth="3" opacity="0.6" strokeDasharray="8,6" />
              <path d="M 300 30 L 420 210" stroke="#bae6fd" strokeWidth="3" opacity="0.6" strokeDasharray="8,6" />

              {/* Megaship Bird's-Eye View */}
              <g transform="translate(300, 110)">
                {/* Ship Hull */}
                <path
                  d="M 0 -75 C 18 -50, 22 40, 20 75 L -20 75 C -22 40, -18 -50, 0 -75 Z"
                  fill="#0f172a"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                {/* Colored Stacked Containers */}
                {[-45, -25, -5, 15, 35].map((y, idx) => (
                  <g key={idx}>
                    <rect x="-14" y={y} width="13" height="16" fill={idx % 2 === 0 ? '#e8805a' : '#3b82f6'} rx="1" />
                    <rect x="1" y={y} width="13" height="16" fill={idx % 3 === 0 ? '#10b981' : '#f59e0b'} rx="1" />
                  </g>
                ))}
                {/* Bridge Deck Tower */}
                <rect x="-12" y="55" width="24" height="12" fill="#f8fafc" rx="1" />
              </g>

              {/* Ship speed badge */}
              <g transform="translate(420, 140)">
                <rect x="0" y="0" width="130" height="42" fill="#0f172a" rx="6" stroke="#38bdf8" strokeWidth="1" />
                <text x="12" y="18" fill="#94a3b8" fontSize="9" fontFamily="monospace">SPEED: 21.4 KNOTS</text>
                <text x="12" y="32" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">SUEZ TRAFFIC CLEAR</text>
              </g>
            </svg>
            <div className="absolute top-2 left-4 font-mono text-[11px] text-electric-400">
              AETHER TITAN V.088 // TRANSIT DAY 14 OF 28
            </div>
          </div>
        )}

        {/* STAGE 3: AIR FREIGHT B777-F CARGO AIRCRAFT (PDF Page 4) */}
        {activeStage === 3 && (
          <div className="relative w-full max-w-xl flex flex-col items-center justify-center animate-fadeIn">
            <svg viewBox="0 0 600 240" className="w-full h-auto">
              {/* Cloud layers */}
              <ellipse cx="140" cy="180" rx="110" ry="35" fill="#1e293b" opacity="0.4" />
              <ellipse cx="460" cy="190" rx="120" ry="40" fill="#1e293b" opacity="0.5" />
              
              {/* Jet contrail */}
              <line x1="80" y1="110" x2="270" y2="110" stroke="#f8fafc" strokeWidth="3" opacity="0.4" strokeDasharray="14,8" />

              {/* Cargo Aircraft Top/Quarter Profile */}
              <g transform="translate(320, 110)">
                {/* Fuselage */}
                <ellipse cx="0" cy="0" rx="65" ry="12" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" />
                {/* Wings */}
                <polygon points="-15,0 -40,-65 5,-65 20,0" fill="#cbd5e1" stroke="#0284c7" strokeWidth="1" />
                <polygon points="-15,0 -40,65 5,65 20,0" fill="#cbd5e1" stroke="#0284c7" strokeWidth="1" />
                {/* Tail fins */}
                <polygon points="-55,0 -68,-25 -50,-25 -42,0" fill="#e8805a" />
                <polygon points="-55,0 -68,25 -50,25 -42,0" fill="#e8805a" />
                {/* Engine pods */}
                <ellipse cx="-5" cy="-35" rx="16" ry="6" fill="#475569" />
                <ellipse cx="-5" cy="35" rx="16" ry="6" fill="#475569" />
              </g>

              {/* Altitude & Flight Number */}
              <g transform="translate(60, 40)">
                <rect x="0" y="0" width="145" height="42" fill="#0f172a" rx="6" stroke="#e8805a" strokeWidth="1" />
                <text x="12" y="18" fill="#94a3b8" fontSize="9" fontFamily="monospace">ALTITUDE: FL380</text>
                <text x="12" y="32" fill="#e8805a" fontSize="10" fontWeight="bold" fontFamily="monospace">ETA: TODAY 21:30</text>
              </g>
            </svg>
            <div className="absolute top-2 left-4 font-mono text-[11px] text-copper-400">
              AIR EXPRESS // CARGO JET B777-F SKYWAY
            </div>
          </div>
        )}

      </div>

      {/* Stage Controller Bar & Service Badges */}
      <div className="p-5 bg-space-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
        
        {/* Stage Selection Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {stages.map((stg, idx) => {
            const Icon = stg.icon;
            const isSelected = activeStage === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveStage(idx);
                  setIsPlaying(false);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition ${
                  isSelected
                    ? 'border-copper-500 bg-copper-500/20 text-copper-300 font-bold shadow-glow-copper'
                    : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{stg.mode}</span>
              </button>
            );
          })}
        </div>

        {/* Narrative Description & Play/Pause */}
        <div className="flex items-center space-x-3 text-right">
          <p className="text-zinc-400 text-xs hidden lg:block max-w-sm">
            {stages[activeStage].desc}
          </p>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded bg-space-800 text-zinc-300 hover:text-white border border-white/10 shrink-0"
            title={isPlaying ? 'Pause sequence' : 'Play sequence'}
          >
            {isPlaying ? 'PAUSE' : 'AUTO-PLAY'}
          </button>
        </div>

      </div>

    </div>
  );
};
