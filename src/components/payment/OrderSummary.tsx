import React from 'react';
import { InvoiceBreakdown } from '../../types/freight';
import { ShieldCheck, Info } from 'lucide-react';

interface OrderSummaryProps {
  invoice: InvoiceBreakdown;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ invoice }) => {
  return (
    <div className="w-full max-w-[360px] mx-auto rounded-xl p-5 bg-white/[0.03] border border-white/[0.08] font-sans">
      
      <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-3">
        YOUR ORDER
      </div>

      <div className="space-y-2 text-xs">
        {/* Main Line Item */}
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold text-white">Reserve membership</div>
            <div className="text-[10px] text-zinc-500 font-mono">Annual • renews Nov 2027</div>
          </div>
          <span className="font-mono font-medium text-white">
            ${invoice.baseFreight.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Priority delivery */}
        <div className="flex justify-between items-center pt-1 text-zinc-400">
          <span>Priority delivery</span>
          <span className="text-zinc-300 font-mono text-[11px]">Included</span>
        </div>

        {/* Fuel Surcharge & Handling */}
        <div className="flex justify-between items-center text-zinc-400">
          <span>Bunker Surcharge (BAF)</span>
          <span className="text-zinc-300 font-mono text-[11px]">${invoice.bunkerAdjustmentFactor.toFixed(2)}</span>
        </div>

        {/* Cargo Insurance */}
        {invoice.cargoInsurance > 0 && (
          <div className="flex justify-between items-center text-zinc-400">
            <span>Cargo Insurance</span>
            <span className="text-zinc-300 font-mono text-[11px]">${invoice.cargoInsurance.toFixed(2)}</span>
          </div>
        )}

        {/* Estimated tax */}
        <div className="flex justify-between items-center pt-1 text-zinc-400">
          <span>Estimated tax</span>
          <span className="text-zinc-300 font-mono text-[11px]">${invoice.estimatedTax.toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-white/[0.08] my-4" />

      {/* Total due today */}
      <div className="flex justify-between items-baseline font-sans">
        <span className="text-xs text-zinc-400">Total due today</span>
        <span className="text-2xl font-bold font-mono text-white tracking-tight">
          ${(invoice.total || 1248).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </div>

    </div>
  );
};
