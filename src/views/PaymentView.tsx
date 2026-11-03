import React from 'react';
import { SableCheckout } from '../components/payment/SableCheckout';

export const PaymentView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <SableCheckout />
    </div>
  );
};
