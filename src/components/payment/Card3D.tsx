import React, { useState, useRef } from 'react';
import { Wifi, ShieldCheck, Lock } from 'lucide-react';

interface Card3DProps {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  isFlipped: boolean;
  brand: 'VISA' | 'MASTERCARD' | 'AMEX' | 'CARD';
  isValid: boolean | null; // true: green glow, false: red glow, null: neutral
}

export const Card3D: React.FC<Card3DProps> = ({
  cardholderName,
  cardNumber,
  expiry,
  cvc,
  isFlipped,
  brand,
  isValid,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Determine spread shadow halo from reference 2
  const glowClass =
    isValid === true
      ? 'glow-ok border-[#1fb573]'
      : isValid === false
      ? 'glow-declined border-[#ef4444]'
      : 'shadow-2xl border-white/20';

  const formattedNumber = cardNumber || '4242 4242 4242 4242';

  return (
    <div
      className="card-perspective w-full max-w-[360px] h-[210px] mx-auto select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className={`card-tilt-wrapper relative w-full h-full rounded-2xl transition-all duration-500 ${
          isFlipped ? 'card-flipped' : ''
        }`}
        style={{
          transform: isFlipped
            ? 'rotateY(180deg)'
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* FRONT FACE OF CARD */}
        <div
          className={`card-face absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden border backdrop-blur-xl ${glowClass}`}
          style={{
            background:
              'linear-gradient(135deg, #dbeafe 0%, #93c5fd 40%, #60a5fa 100%)',
            color: '#1e293b',
          }}
        >
          {/* Subtle light reflection glare */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 transition-opacity"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
            }}
          />

          {/* Top row: Chip & Contactless + SABLE RESERVE */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center space-x-3">
              {/* EMV Chip */}
              <div className="w-10 h-8 rounded-md bg-gradient-to-tr from-amber-200 via-amber-300 to-amber-100 border border-amber-400/80 shadow-sm relative overflow-hidden flex items-center justify-center">
                <div className="w-full h-[1px] bg-amber-500/50 absolute top-2.5" />
                <div className="w-full h-[1px] bg-amber-500/50 absolute bottom-2.5" />
                <div className="h-full w-[1px] bg-amber-500/50 absolute left-3.5" />
                <div className="h-full w-[1px] bg-amber-500/50 absolute right-3.5" />
              </div>
              <Wifi className="w-4 h-4 text-slate-700 rotate-90" />
            </div>

            <div className="text-right">
              <span className="font-mono text-[10px] tracking-widest font-bold text-slate-800 block">
                SABLE
              </span>
              <span className="font-mono text-[8px] tracking-[0.2em] text-slate-600 block">
                RESERVE
              </span>
            </div>
          </div>

          {/* Middle: Embossed Card Number */}
          <div className="z-10 tracking-[0.22em] font-mono text-lg font-bold text-slate-900 drop-shadow-sm">
            {formattedNumber}
          </div>

          {/* Bottom row: Cardholder, Expiry, Brand logo */}
          <div className="flex items-end justify-between z-10 font-mono">
            <div className="space-y-0.5">
              <span className="text-[8px] text-slate-600 tracking-wider uppercase block">
                CARDHOLDER
              </span>
              <span className="text-xs font-bold text-slate-900 tracking-wider uppercase block truncate max-w-[140px]">
                {cardholderName || 'A. HASIB'}
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[8px] text-slate-600 tracking-wider uppercase block">
                EXPIRES
              </span>
              <span className="text-xs font-bold text-slate-900 tracking-wider block">
                {expiry || '••/••'}
              </span>
            </div>

            <div className="font-bold tracking-wider text-sm text-slate-900 italic">
              {brand}
            </div>
          </div>
        </div>

        {/* BACK FACE OF CARD (Shown when CVC is focused) */}
        <div
          className={`card-face card-face-back absolute inset-0 w-full h-full rounded-2xl py-5 flex flex-col justify-between overflow-hidden border backdrop-blur-xl ${glowClass}`}
          style={{
            background:
              'linear-gradient(135deg, #bfdbfe 0%, #60a5fa 60%, #3b82f6 100%)',
            color: '#1e293b',
          }}
        >
          {/* Magnetic Stripe */}
          <div className="w-full h-10 bg-slate-950 mt-1 shadow-inner" />

          {/* Signature Strip & CVC */}
          <div className="px-6 flex items-center space-x-3">
            <div className="flex-1 h-8 bg-slate-100 rounded flex items-center justify-end px-3">
              <span className="font-mono text-[10px] text-slate-400 italic">
                Authorized Signature
              </span>
            </div>
            <div className="w-14 h-8 bg-white rounded border border-slate-300 flex items-center justify-center font-mono text-xs font-bold text-slate-900 shadow-sm">
              {cvc || '•••'}
            </div>
          </div>

          {/* Security footnote */}
          <div className="px-6 flex items-center justify-between text-[9px] font-mono text-slate-700">
            <span className="flex items-center space-x-1">
              <Lock className="w-2.5 h-2.5" />
              <span>CVC Security Verified</span>
            </span>
            <span>256-bit Tokenized</span>
          </div>
        </div>

      </div>
    </div>
  );
};
