import React, { useState } from 'react';
import { ACTIVE_SHIPMENTS } from '../../services/mockApi';
import { SceneContainer } from '../3d/SceneContainer';
import { usePerformance } from '../../context/PerformanceContext';
import { Navigation, Ship, Plane, Radio, Clock, ShieldCheck, MapPin } from 'lucide-react';

export const LiveTrackingGlobe: React.FC = () => {
  const [selectedShipment, setSelectedShipment] = useState(ACTIVE_SHIPMENTS[0]);
  const { isLowPower } = usePerformance();

  return (
    <div className="glass-card rounded-2xl p-6 border-white/10 space-y-6 font-mono text-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Navigation className="w-4 h-4 text-copper-400" />
          <h3 className="text-white font-bold text-sm">Active Fleet Orbital Radar</h3>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-signal-emerald animate-ping" />
          <span>SATELLITE AIS LIVE</span>
        </div>
      </div>

      {/* 3D Mini Globe Window */}
      <div className="relative h-64 w-full rounded-xl bg-space-950 border border-white/10 overflow-hidden flex items-center justify-center">
        {!isLowPower ? (
          <SceneContainer mode="MINI_GLOBE" />
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-2 text-zinc-500">
            <Radio className="w-8 h-8 text-copper-400 animate-pulse" />
            <p className="text-xs">2D Radar Telemetry Active</p>
          </div>
        )}

        {/* Telemetry HUD overlay */}
        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-space-900/90 border border-white/10 backdrop-blur-md flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
              TRACKING VESSEL
            </span>
            <span className="text-white font-bold text-xs">{selectedShipment.vesselName}</span>
          </div>
          <div className="text-right space-y-0.5">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
              TELEMETRY SPEED
            </span>
            <span className="text-copper-400 font-bold text-xs">{selectedShipment.speedKnots} KNOTS</span>
          </div>
        </div>
      </div>

      {/* Shipment Selector */}
      <div className="space-y-2">
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
          SELECT ACTIVE CONTAINER BILL OF LADING
        </span>
        <div className="space-y-2">
          {ACTIVE_SHIPMENTS.map((shp) => {
            const isSelected = selectedShipment.id === shp.id;
            return (
              <div
                key={shp.id}
                onClick={() => setSelectedShipment(shp)}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  isSelected
                    ? 'border-copper-500 bg-copper-500/15 text-white'
                    : 'border-white/[0.06] bg-space-950/60 text-zinc-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    {shp.mode === 'AIR' ? (
                      <Plane className="w-3.5 h-3.5 text-electric-400" />
                    ) : (
                      <Ship className="w-3.5 h-3.5 text-copper-400" />
                    )}
                    <span className="font-bold text-white text-xs">{shp.lane}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">{shp.trackingNumber}</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>ETA: {shp.eta}</span>
                    <span>{shp.progressPercent}% Completed</span>
                  </div>
                  <div className="h-1.5 w-full bg-space-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-copper-500 rounded-full"
                      style={{ width: `${shp.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
