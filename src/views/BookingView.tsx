import React from 'react';
import { BookingWizard } from '../components/booking/BookingWizard';

export const BookingView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <BookingWizard />
    </div>
  );
};
