import React, { useState } from 'react';
import { User, CreditCard, Calendar, Lock, Shield, Check, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigation } from '../../context/NavigationContext';

interface PaymentFormProps {
  cardholderName: string;
  setCardholderName: (val: string) => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  expiry: string;
  setExpiry: (val: string) => void;
  cvc: string;
  setCvc: (val: string) => void;
  setIsFlipped: (val: boolean) => void;
  brand: 'VISA' | 'MASTERCARD' | 'AMEX' | 'CARD';
  isValid: boolean | null;
  setIsValid: (val: boolean | null) => void;
  totalAmount: number;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  cardholderName,
  setCardholderName,
  cardNumber,
  setCardNumber,
  expiry,
  setExpiry,
  cvc,
  setCvc,
  setIsFlipped,
  brand,
  isValid,
  setIsValid,
  totalAmount,
}) => {
  const [saveCard, setSaveCard] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { navigateTo } = useNavigation();

  // Format card number with spaces 4-4-4-4
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
    setStatusMessage(null);

    // Instant validation check
    if (raw === '4242424242424242') {
      setIsValid(true);
    } else if (raw === '4000000000000002') {
      setIsValid(false);
    } else {
      setIsValid(null);
    }
  };

  // Format expiry MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 2) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setExpiry(raw);
    }
  };

  // Format CVC
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvc(raw);
  };

  // Quick fill test cards from reference
  const setTestCard = (type: 'APPROVE' | 'DECLINE') => {
    if (type === 'APPROVE') {
      setCardNumber('4242 4242 4242 4242');
      setCardholderName('A. HASIB');
      setExpiry('12/28');
      setCvc('123');
      setIsValid(true);
      setStatusMessage('Test card set: 4242 4242 4242 4242 (Will Approve)');
    } else {
      setCardNumber('4000 0000 0000 0002');
      setCardholderName('A. HASIB');
      setExpiry('08/26');
      setCvc('999');
      setIsValid(false);
      setStatusMessage('Test card set: 4000 0000 0000 0002 (Will Decline)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatusMessage(null);

    setTimeout(() => {
      setIsProcessing(false);
      const cleanNum = cardNumber.replace(/\s+/g, '');

      if (cleanNum === '4000000000000002') {
        setIsValid(false);
        setStatusMessage('Your card was declined: insufficient test reserve allocation.');
      } else {
        // Approve by default or on 4242
        setIsValid(true);
        setStatusMessage('Payment authorized successfully! Discharging Bill of Lading...');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#e8805a', '#1fb573'],
        });

        // Push to dashboard
        setTimeout(() => {
          navigateTo('/dashboard');
        }, 1800);
      }
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-zinc-800">
      
      {/* Title */}
      <div className="space-y-1">
        <h3 className="text-xl font-bold font-sans text-slate-900 tracking-tight">
          Payment details
        </h3>
        <p className="text-xs text-slate-500 font-sans">
          Enter your card to complete the transaction.
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-3.5 text-xs font-sans">
        
        {/* CARDHOLDER NAME */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
            CARDHOLDER NAME
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              required
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="A. HASIB"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 transition shadow-sm uppercase font-mono text-xs"
            />
          </div>
        </div>

        {/* CARD NUMBER */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
            CARD NUMBER
          </label>
          <div className="relative">
            <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              required
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="4242 4242 4242 4242"
              className={`w-full pl-10 pr-16 py-2.5 rounded-xl border bg-white text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 transition shadow-sm font-mono text-xs ${
                isValid === true
                  ? 'border-[#1fb573] focus:ring-[#1fb573]/20'
                  : isValid === false
                  ? 'border-[#ef4444] focus:ring-[#ef4444]/20'
                  : 'border-slate-200 focus:border-electric-500 focus:ring-electric-500/20'
              }`}
            />
            <span className="absolute right-3.5 top-2.5 text-[11px] font-bold text-slate-700 italic font-mono">
              {brand}
            </span>
          </div>
        </div>

        {/* EXPIRY & CVC */}
        <div className="grid grid-cols-2 gap-3">
          {/* EXPIRY DATE */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              EXPIRY DATE
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 transition shadow-sm font-mono text-xs"
              />
            </div>
          </div>

          {/* CVC (Focus flips the card!) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                CVC
              </label>
              <span className="text-[10px] text-slate-400">back of card</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                maxLength={4}
                value={cvc}
                onChange={handleCvcChange}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                placeholder="•••"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 transition shadow-sm font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Save Card Checkbox */}
        <div className="pt-1">
          <label className="flex items-start space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-electric-600 focus:ring-electric-500"
            />
            <div>
              <span className="text-xs font-semibold text-slate-800 block">
                Save this card for next time
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                Stored by Sable, never by the merchant
              </span>
            </div>
          </label>
        </div>

      </div>

      {/* Status banner */}
      {statusMessage && (
        <div
          className={`p-3 rounded-lg text-xs font-mono flex items-center space-x-2 ${
            isValid === false
              ? 'bg-rose-50 text-rose-700 border border-rose-200'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}
        >
          {isValid === false ? (
            <AlertCircle className="w-4 h-4 shrink-0" />
          ) : (
            <Check className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Big Blue Pay Button (matching reference) */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full py-3.5 rounded-xl bg-electric-600 hover:bg-electric-500 active:bg-electric-700 text-white font-sans font-bold text-sm tracking-wide transition shadow-lg hover:shadow-electric-500/30 flex items-center justify-center space-x-2 disabled:opacity-70 cursor-pointer"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Authorizing Sable Reserve...</span>
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span>Pay ${(totalAmount || 1248).toLocaleString('en-US', { minimumFractionDigits: 2 })} →</span>
          </>
        )}
      </button>

      {/* Trust Badges */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono gap-2 border-t border-slate-100">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
            <span>PCI-DSS Level 1</span>
          </span>
          <span className="flex items-center space-x-1">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>256-bit TLS</span>
          </span>
        </div>
        <span>Sable never stores your CVC</span>
      </div>

      {/* Test numbers strip (from reference 2) */}
      <div className="pt-3 border-t border-slate-100 text-center space-y-2">
        <p className="text-[11px] font-mono text-slate-500">
          Type a card. Reach for the CVC.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setTestCard('APPROVE')}
            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-[11px] font-mono text-slate-600 transition"
          >
            4242 4242 4242 4242 approves
          </button>
          <button
            type="button"
            onClick={() => setTestCard('DECLINE')}
            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-700 border border-slate-200 text-[11px] font-mono text-slate-600 transition"
          >
            4000 0000 0000 0002 declines
          </button>
        </div>
      </div>

    </form>
  );
};
