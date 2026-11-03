import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { FreightMode } from '../../types/freight';
import { RateForecastBand } from './RateForecastBand';
import { LogisticsShowcase } from './LogisticsShowcase';
import { Ship, Plane, Truck, Train, ArrowRight, ShieldCheck, Calendar, MapPin, Box, CheckCircle } from 'lucide-react';

export const BookingWizard: React.FC = () => {
  const { bookingData, setBookingData, updateInvoiceForBooking, navigateTo } = useNavigation();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [origin, setOrigin] = useState(bookingData.origin || 'Shanghai (CNSHA)');
  const [destination, setDestination] = useState(bookingData.destination || 'Rotterdam (NLRTM)');
  const [mode, setMode] = useState<FreightMode>(bookingData.mode || 'OCEAN');
  const [containerSize, setContainerSize] = useState(bookingData.containerSize || '40FT_HC');
  const [weightKg, setWeightKg] = useState(bookingData.weightKg || 21400);
  const [volumeCbm, setVolumeCbm] = useState(bookingData.volumeCbm || 68);
  const [readyDate, setReadyDate] = useState(bookingData.readyDate || '2026-11-04');
  const [insurance, setInsurance] = useState(true);
  const [priorityDispatch, setPriorityDispatch] = useState(true);

  // Dynamic calculated rate based on mode & container
  const baseRate =
    mode === 'OCEAN'
      ? containerSize === '40FT_HC' ? 1180 : 890
      : mode === 'AIR'
      ? Math.round(weightKg * 0.08)
      : 1450;

  const handleProceedToPayment = () => {
    setBookingData({
      origin,
      destination,
      mode,
      cargoType: 'STANDARD_CONTAINER',
      containerSize: containerSize as any,
      weightKg,
      volumeCbm,
      readyDate,
      estimatedRate: baseRate,
      currency: 'USD',
      insuranceRequired: insurance,
      priorityDispatch,
    });
    updateInvoiceForBooking(baseRate, insurance, priorityDispatch);
    navigateTo('/pay');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-[#0b0b0d] text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-4 font-mono text-xs">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
              AUTONOMOUS FREIGHT OS // DISPATCH
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Multi-Modal Booking Terminal
            </h1>
          </div>

          {/* Stepper */}
          <div className="flex items-center space-x-2">
            {[
              { num: 1, label: 'Route' },
              { num: 2, label: 'Cargo' },
              { num: 3, label: 'Lock & Pay' },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition ${
                  step === s.num
                    ? 'border-copper-500 bg-copper-500/20 text-copper-300 font-bold'
                    : step > s.num
                    ? 'border-signal-emerald/40 bg-signal-emerald/10 text-signal-emerald'
                    : 'border-white/10 text-zinc-500'
                }`}
              >
                <span>{step > s.num ? '✓' : s.num}.</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cinematic Multi-Modal Logistics Visualizer (Video frames reproduced) */}
        <LogisticsShowcase />

        {/* Main Grid: Form wizard on left, AI Rate Forecast on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Booking Form Wizard */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 md:p-8 border-white/10 space-y-6">
            
            {/* STEP 1: ROUTE & CORRIDOR */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-lg font-mono font-bold text-white">
                    Step 1: Select Trade Corridor & Transport Mode
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">
                    Choose origination and destination ports or international cargo airports.
                  </p>
                </div>

                {/* Mode Selector */}
                <div className="space-y-2 font-mono text-xs">
                  <label className="text-zinc-400 text-[11px] uppercase tracking-wider block">
                    Mode of Transport
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { m: 'OCEAN', label: 'Ocean FCL/LCL', icon: Ship },
                      { m: 'AIR', label: 'Air Express', icon: Plane },
                      { m: 'ROAD', label: 'Interstate Haul', icon: Truck },
                    ].map(({ m, label, icon: Icon }) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m as FreightMode)}
                        className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between h-24 ${
                          mode === m
                            ? 'border-copper-500 bg-copper-500/20 text-copper-300 shadow-glow-copper'
                            : 'border-white/10 bg-space-850/60 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-copper-400" />
                        <div>
                          <span className="font-bold block text-white text-xs">{m}</span>
                          <span className="text-[10px] text-zinc-400">{label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ports Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="block text-zinc-400 text-[11px] uppercase tracking-wider mb-1.5">
                      Port / Hub of Origin
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-copper-400 absolute left-3.5 top-3" />
                      <select
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white font-mono text-xs focus:border-copper-500 focus:outline-none"
                      >
                        <option value="Shanghai (CNSHA)">Shanghai Port (CNSHA)</option>
                        <option value="Singapore (SGSIN)">Port of Singapore (SGSIN)</option>
                        <option value="Los Angeles (USLAX)">Port of Los Angeles (USLAX)</option>
                        <option value="Frankfurt Cargo (FRA)">Frankfurt CargoCity (FRA)</option>
                        <option value="Dubai Jebel Ali (AEDXB)">Dubai Jebel Ali (AEDXB)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-[11px] uppercase tracking-wider mb-1.5">
                      Destination Port / Hub
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-electric-400 absolute left-3.5 top-3" />
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white font-mono text-xs focus:border-copper-500 focus:outline-none"
                      >
                        <option value="Rotterdam (NLRTM)">Port of Rotterdam (NLRTM)</option>
                        <option value="Hamburg (DEHAM)">Port of Hamburg (DEHAM)</option>
                        <option value="Tokyo Port (JPTYO)">Tokyo Port (JPTYO)</option>
                        <option value="Chicago O'Hare (ORD)">Chicago O'Hare (ORD)</option>
                        <option value="Mumbai Nhava Sheva (INBOM)">Nhava Sheva (INBOM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-mono text-xs font-bold flex items-center space-x-2 shadow-glow-electric transition"
                  >
                    <span>CONTINUE TO CARGO SPECS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CARGO & CONTAINER SPECIFICATIONS */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-lg font-mono font-bold text-white">
                    Step 2: Container Payload & Dispatch Date
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">
                    Specify payload parameters to calibrate slot allocations and terminal handling.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="block text-zinc-400 text-[11px] uppercase tracking-wider mb-1.5">
                      Container / Equipment Type
                    </label>
                    <select
                      value={containerSize}
                      onChange={(e) => setContainerSize(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white font-mono text-xs focus:border-copper-500 focus:outline-none"
                    >
                      <option value="40FT_HC">40' High Cube Container (68 CBM)</option>
                      <option value="20FT">20' Standard Dry Van (33 CBM)</option>
                      <option value="LCL_PALLET">LCL Pallet Consolidation</option>
                      <option value="AIR_PALLET">PMC / PAG Aircraft Pallet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-[11px] uppercase tracking-wider mb-1.5">
                      Cargo Ready Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-copper-400 absolute left-3.5 top-3" />
                      <input
                        type="date"
                        value={readyDate}
                        onChange={(e) => setReadyDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white font-mono text-xs focus:border-copper-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-[11px] uppercase tracking-wider mb-1.5">
                      Gross Weight (KG)
                    </label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white font-mono text-xs focus:border-copper-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-[11px] uppercase tracking-wider mb-1.5">
                      Volume (CBM)
                    </label>
                    <input
                      type="number"
                      value={volumeCbm}
                      onChange={(e) => setVolumeCbm(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-space-950 border border-white/10 text-white font-mono text-xs focus:border-copper-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Additional services */}
                <div className="p-4 rounded-xl bg-space-950 border border-white/[0.06] space-y-3 font-mono text-xs">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={insurance}
                      onChange={(e) => setInsurance(e.target.checked)}
                      className="rounded border-zinc-700 text-copper-500 focus:ring-copper-500"
                    />
                    <div className="flex-1 flex justify-between">
                      <span className="text-zinc-300">All-Risk Marine Cargo Insurance</span>
                      <span className="text-copper-400">+$48.00</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={priorityDispatch}
                      onChange={(e) => setPriorityDispatch(e.target.checked)}
                      className="rounded border-zinc-700 text-copper-500 focus:ring-copper-500"
                    />
                    <div className="flex-1 flex justify-between">
                      <span className="text-zinc-300">Guaranteed Priority Berth Window</span>
                      <span className="text-signal-emerald">FREE IN ALPHA</span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-space-850 hover:bg-space-800 text-zinc-300 font-mono text-xs border border-white/10"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-mono text-xs font-bold flex items-center space-x-2 shadow-glow-electric transition"
                  >
                    <span>REVIEW QUOTE SUMMARY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: QUOTE REVIEW & CHECKOUT GATE */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-lg font-mono font-bold text-white">
                    Step 3: Instant Quote Locked
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">
                    Quote is locked for 45 minutes against spot index fluctuations.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-space-950 border border-copper-500/40 space-y-4 font-mono text-xs">
                  <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
                    <span className="text-zinc-400">Corridor:</span>
                    <span className="text-white font-bold">{origin} → {destination}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
                    <span className="text-zinc-400">Equipment:</span>
                    <span className="text-zinc-200">{containerSize} ({weightKg.toLocaleString()} KG)</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/[0.08]">
                    <span className="text-zinc-400">Locked Freight Rate:</span>
                    <span className="text-2xl font-bold text-copper-400 font-mono">${baseRate.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between items-center text-zinc-400 text-[11px]">
                    <span className="flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-signal-emerald" />
                      <span>Includes Bunker & Terminal Handling Fees</span>
                    </span>
                    <span className="text-signal-emerald font-semibold">TOKEN READY</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-space-850 hover:bg-space-800 text-zinc-300 font-mono text-xs border border-white/10"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleProceedToPayment}
                    className="px-8 py-3.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-mono text-xs font-bold tracking-wider flex items-center space-x-2 shadow-glow-electric transition"
                  >
                    <span>PROCEED TO SABLE 3D CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: AI Rate Forecast Band */}
          <div className="lg:col-span-5 space-y-6">
            <RateForecastBand currentRate={baseRate} mode={mode} />

            {/* Extra assurance */}
            <div className="p-4 rounded-xl bg-space-850/60 border border-white/[0.06] text-xs font-mono space-y-2 text-zinc-400">
              <span className="text-white font-semibold block">AETHER GUARANTEE</span>
              <p className="text-[11px] font-sans leading-relaxed">
                If spot market indices drop below this quote prior to container vessel loading, our contract automatically settles at the lower index rate.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
