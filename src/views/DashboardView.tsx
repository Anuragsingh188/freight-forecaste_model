import React from 'react';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';

export const DashboardView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <DashboardOverview />
    </div>
  );
};
