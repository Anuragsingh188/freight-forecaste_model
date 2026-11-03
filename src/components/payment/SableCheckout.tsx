import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { OrderSummary } from './OrderSummary';
import { PaymentForm } from './PaymentForm';
import { useNavigation } from '../../context/NavigationContext';
import { Check, ShieldCheck, Code, ArrowLeft } from 'lucide-react';

export const SableCheckout: React.FC = () => {
  const { invoiceData, navigateTo } = useNavigation();

  const [cardholderName, setCardholderName] = useState('A. HASIB');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('08/27');
  const [cvc, setCvc] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(true); // initial test state approved
  const [showCodeInspector, setShowCodeInspector] = useState(true);
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'css' | 'js'>('css');

  // Detect card brand
  const getBrand = () => {
    const raw = cardNumber.replace(/\s+/g, '');
    if (raw.startsWith('4')) return 'VISA' as const;
    if (raw.startsWith('5')) return 'MASTERCARD' as const;
    if (raw.startsWith('3')) return 'AMEX' as const;
    return 'CARD' as const;
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-[#0b0b0d] text-white flex flex-col items-center justify-center font-sans">
      
      {/* Top Browser Bar (as depicted in reference 2) */}
      <div className="w-full max-w-4xl mb-6">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-white/[0.08]">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="pl-3 font-semibold text-zinc-300">
              Payment Method — <span className="text-copper-400">HTML</span> • <span className="text-electric-400">CSS</span> • <span className="text-amber-400">JS</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo('/book')}
              className="hover:text-copper-400 transition flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Booking</span>
            </button>
            <span className="text-zinc-600">localhost / checkout</span>
          </div>
        </div>

        {/* Title Tag */}
        <div className="text-center pt-6 pb-4 space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
            COMPONENT • 90
          </p>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Payment Method <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Animation</span>
          </h1>
        </div>
      </div>

      {/* Main Split Sable Checkout Card Window */}
      <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden text-slate-900 transition-all">
        
        {/* Card Window Top Header Bar */}
        <div className="px-6 md:px-8 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-electric-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-mono text-xs font-bold tracking-wider text-slate-900">
              SABLE CHECKOUT
            </span>
          </div>

          {/* Stepper (Your bag -> Delivery -> Payment) */}
          <div className="flex items-center space-x-2 font-mono text-[11px] text-slate-500">
            <span className="flex items-center text-emerald-600 font-semibold space-x-1">
              <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">✓</span>
              <span>Your bag</span>
            </span>
            <span className="text-slate-300">—</span>
            <span className="flex items-center text-emerald-600 font-semibold space-x-1">
              <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">✓</span>
              <span>Delivery</span>
            </span>
            <span className="text-slate-300">—</span>
            <span className="flex items-center text-electric-600 font-bold space-x-1">
              <span className="w-4 h-4 rounded-full bg-electric-100 flex items-center justify-center text-[10px]">3</span>
              <span>Payment</span>
            </span>
          </div>
        </div>

        {/* Split Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Pane (3D Tilting Card & Order Summary) */}
          <div className="lg:col-span-5 p-6 md:p-8 bg-slate-50 border-r border-slate-100 flex flex-col justify-between space-y-6">
            <div className="py-2">
              <Card3D
                cardholderName={cardholderName}
                cardNumber={cardNumber}
                expiry={expiry}
                cvc={cvc}
                isFlipped={isFlipped}
                brand={getBrand()}
                isValid={isValid}
              />
            </div>

            <OrderSummary invoice={invoiceData} />
          </div>

          {/* Right Pane (Payment Details Form) */}
          <div className="lg:col-span-7 p-6 md:p-8 bg-white flex flex-col justify-center">
            <PaymentForm
              cardholderName={cardholderName}
              setCardholderName={setCardholderName}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              expiry={expiry}
              setExpiry={setExpiry}
              cvc={cvc}
              setCvc={setCvc}
              setIsFlipped={setIsFlipped}
              brand={getBrand()}
              isValid={isValid}
              setIsValid={setIsValid}
              totalAmount={invoiceData.total || 1248}
            />
          </div>

        </div>

      </div>

      {/* Bottom Code Snippets (from Reference Image 2: index.html, style.css, app.js) */}
      <div className="w-full max-w-4xl mt-8">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
            <Code className="w-4 h-4 text-copper-400" />
            <span>INTERACTIVE ENGINE CODE ARTIFACTS</span>
          </div>
          <button
            onClick={() => setShowCodeInspector(!showCodeInspector)}
            className="text-xs font-mono text-zinc-400 hover:text-white underline"
          >
            {showCodeInspector ? 'Hide Inspector' : 'Show Inspector'}
          </button>
        </div>

        {showCodeInspector && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {/* HTML snippet */}
            <div className="p-4 rounded-xl bg-space-850 border border-white/[0.08] space-y-2">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                <span>index.html</span>
              </div>
              <pre className="text-zinc-400 text-[11px] overflow-x-auto leading-relaxed">
{`<!-- the card IS the form -->
<div class="card-slot">
  <div class="card">
    <span class="glow glow-ok">
    <div class="card_tilt">
      <div class="card_inner">
        <div class="card_face front">
        <div class="card_face back">
    <input autocomplete="cc-number">`}
              </pre>
            </div>

            {/* CSS snippet (Spread Shadow explanation from reference 2) */}
            <div className="p-4 rounded-xl bg-space-850 border border-white/[0.08] space-y-2">
              <div className="flex items-center space-x-2 text-electric-400 font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-electric-500 inline-block" />
                <span>style.css</span>
              </div>
              <pre className="text-zinc-400 text-[11px] overflow-x-auto leading-relaxed">
{`/* a halo is a SPREAD SHADOW,
   never a radial fill: a gradient
   behind an opaque card hides light */
.glow-ok {
  box-shadow:
    0 0 26px 4px #1fb573,
    0 0 62px 18px #1fb573;
}
/* engraved, not printed */
.pan { text-shadow: 0 1px 0 rgba(255,255,255,.95); }`}
              </pre>
            </div>

            {/* JS snippet */}
            <div className="p-4 rounded-xl bg-space-850 border border-white/[0.08] space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                <span>app.js</span>
              </div>
              <pre className="text-zinc-400 text-[11px] overflow-x-auto leading-relaxed">
{`// Measured off the slot bounding BOX
const from = slot.getBoundingClientRect();
const grow = clamp(target.width * .44);

// the CVC is on the back, so
// the back is what you get:
cvc.onfocus = () => flip(true);
cvc.onblur = () => flip(false);`}
              </pre>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
