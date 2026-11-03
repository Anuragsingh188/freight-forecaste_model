export type FreightMode = 'OCEAN' | 'AIR' | 'ROAD' | 'RAIL';

export interface GeoLocation {
  name: string;
  code: string;
  lat: number;
  lng: number;
}

export interface TradeLane {
  id: string;
  name: string;
  origin: GeoLocation;
  destination: GeoLocation;
  mode: FreightMode;
  currentRate: number; // e.g. USD / FEU or / kg
  rateUnit: string;    // '$/FEU' | '$/kg' | '$/truckload'
  change7d: number;    // percentage, e.g. -4.8
  change30d: number;   // percentage, e.g. +12.3
  demandIndex: number; // 0 - 100
  capacityUtilization: number; // 0 - 100%
  riskScore: number;   // 0 - 100 (100 = critical congestion)
  transitDays: number;
  vesselOrFlight: string;
  carrier: string;
}

export interface ForecastPoint {
  date: string;
  rate: number;
  confidenceLower: number;
  confidenceUpper: number;
  demandFactor: number;
}

export interface LaneForecast {
  laneId: string;
  mode: FreightMode;
  timeframe: '7d' | '30d' | '90d';
  points: ForecastPoint[];
  aiSignal: 'BOOK_NOW' | 'WAIT_RECOMMENDED' | 'RATE_SPIKE_ALERT';
  recommendedWaitDays?: number;
  expectedPriceDeltaPct: number;
  confidenceScore: number; // 0 - 100%
  aiAnalysis: string;
}

export interface RiskIncident {
  id: string;
  title: string;
  locationName: string;
  lat: number;
  lng: number;
  type: 'CONGESTION' | 'WEATHER' | 'CHOKEPOINT' | 'LABOR';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  impactDelayDays: number;
  activeLanesAffected: number;
  timestamp: string;
}

export interface ActiveShipment {
  id: string;
  trackingNumber: string;
  lane: string;
  mode: FreightMode;
  status: 'IN_TRANSIT' | 'CUSTOMS_CLEARANCE' | 'PORT_DWELL' | 'FINAL_MILE';
  currentCoordinates: [number, number]; // lat, lng
  destination: string;
  eta: string;
  speedKnots: number;
  vesselName: string;
  containerId: string;
  progressPercent: number;
}

export interface BookingFormState {
  origin: string;
  destination: string;
  mode: FreightMode;
  cargoType: 'STANDARD_CONTAINER' | 'REEFER' | 'DANGEROUS_GOODS' | 'OVERSIZED';
  containerSize: '20FT' | '40FT_HC' | 'LCL_PALLET' | 'AIR_PALLET';
  weightKg: number;
  volumeCbm: number;
  readyDate: string;
  estimatedRate: number;
  currency: string;
  insuranceRequired: boolean;
  priorityDispatch: boolean;
}

export interface InvoiceBreakdown {
  baseFreight: number;
  bunkerAdjustmentFactor: number;
  terminalHandlingCharge: number;
  cargoInsurance: number;
  carbonOffset: number;
  estimatedTax: number;
  total: number;
}

export interface PayPalCaptureDetails {
  orderId: string;
  captureId: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  payerEmail: string;
  payerName: string;
  amount: number;
  currency: string;
  createTime: string;
  paymentMethod: 'PAYPAL_BALANCE' | 'PAY_IN_4' | 'PAYPAL_CREDIT' | 'CREDIT_CARD';
}
