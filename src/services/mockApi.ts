import { TradeLane, LaneForecast, RiskIncident, ActiveShipment, InvoiceBreakdown } from '../types/freight';

export const MAJOR_LANES: TradeLane[] = [
  {
    id: 'lane-shanghai-rotterdam',
    name: 'Shanghai (CNSHA) → Rotterdam (NLRTM)',
    origin: { name: 'Shanghai Port', code: 'CNSHA', lat: 31.2304, lng: 121.4737 },
    destination: { name: 'Port of Rotterdam', code: 'NLRTM', lat: 51.9244, lng: 4.4777 },
    mode: 'OCEAN',
    currentRate: 3180,
    rateUnit: '$/FEU',
    change7d: -5.4,
    change30d: 14.8,
    demandIndex: 88,
    capacityUtilization: 94,
    riskScore: 68,
    transitDays: 28,
    vesselOrFlight: 'Ever Apex V.049W',
    carrier: 'Ocean Alliance'
  },
  {
    id: 'lane-lax-tokyo',
    name: 'Los Angeles (USLAX) → Tokyo (JPTYO)',
    origin: { name: 'Port of Los Angeles', code: 'USLAX', lat: 33.7432, lng: -118.2673 },
    destination: { name: 'Tokyo Port', code: 'JPTYO', lat: 35.6186, lng: 139.7898 },
    mode: 'OCEAN',
    currentRate: 1840,
    rateUnit: '$/FEU',
    change7d: 2.1,
    change30d: -8.2,
    demandIndex: 72,
    capacityUtilization: 82,
    riskScore: 24,
    transitDays: 14,
    vesselOrFlight: 'ONE Infinity V.102E',
    carrier: 'THE Alliance'
  },
  {
    id: 'lane-singapore-hamburg',
    name: 'Singapore (SGSIN) → Hamburg (DEHAM)',
    origin: { name: 'Port of Singapore', code: 'SGSIN', lat: 1.3521, lng: 103.8198 },
    destination: { name: 'Port of Hamburg', code: 'DEHAM', lat: 53.5511, lng: 9.9937 },
    mode: 'OCEAN',
    currentRate: 2950,
    rateUnit: '$/FEU',
    change7d: -7.6,
    change30d: 9.1,
    demandIndex: 84,
    capacityUtilization: 91,
    riskScore: 42,
    transitDays: 22,
    vesselOrFlight: 'CMA CGM Palais V.802',
    carrier: 'CMA CGM'
  },
  {
    id: 'lane-dubai-mumbai',
    name: 'Dubai (AEDXB) → Mumbai (INBOM)',
    origin: { name: 'Jebel Ali', code: 'AEDXB', lat: 25.0118, lng: 55.0617 },
    destination: { name: 'Nhava Sheva Port', code: 'INBOM', lat: 18.9499, lng: 72.9515 },
    mode: 'OCEAN',
    currentRate: 980,
    rateUnit: '$/FEU',
    change7d: 3.5,
    change30d: 6.8,
    demandIndex: 65,
    capacityUtilization: 78,
    riskScore: 19,
    transitDays: 4,
    vesselOrFlight: 'Maersk Danube V.42',
    carrier: 'Maersk 2M'
  },
  {
    id: 'lane-frankfurt-chicago-air',
    name: 'Frankfurt (FRA) → Chicago O\'Hare (ORD)',
    origin: { name: 'Frankfurt CargoCity', code: 'FRA', lat: 50.0379, lng: 8.5622 },
    destination: { name: 'Chicago O\'Hare Cargo', code: 'ORD', lat: 41.9742, lng: -87.9073 },
    mode: 'AIR',
    currentRate: 3.85,
    rateUnit: '$/kg',
    change7d: -2.3,
    change30d: 11.4,
    demandIndex: 92,
    capacityUtilization: 96,
    riskScore: 35,
    transitDays: 1,
    vesselOrFlight: 'LH Cargo B777-F #822',
    carrier: 'Lufthansa Cargo'
  },
  {
    id: 'lane-shenzhen-incheon-air',
    name: 'Shenzhen (SZX) → Incheon (ICN)',
    origin: { name: 'Shenzhen Bao\'an', code: 'SZX', lat: 22.6393, lng: 113.8107 },
    destination: { name: 'Incheon International', code: 'ICN', lat: 37.4602, lng: 126.4407 },
    mode: 'AIR',
    currentRate: 2.15,
    rateUnit: '$/kg',
    change7d: 6.2,
    change30d: 4.0,
    demandIndex: 79,
    capacityUtilization: 87,
    riskScore: 28,
    transitDays: 1,
    vesselOrFlight: 'Korean Air Cargo KE542',
    carrier: 'SkyTeam Cargo'
  },
  {
    id: 'lane-rotterdam-warsaw-road',
    name: 'Rotterdam (NLRTM) → Warsaw (PLWAW)',
    origin: { name: 'Rotterdam Europort', code: 'NLRTM', lat: 51.9244, lng: 4.4777 },
    destination: { name: 'Warsaw Intermodal Park', code: 'PLWAW', lat: 52.2297, lng: 21.0122 },
    mode: 'ROAD',
    currentRate: 1420,
    rateUnit: '$/truckload',
    change7d: -1.2,
    change30d: 3.4,
    demandIndex: 74,
    capacityUtilization: 85,
    riskScore: 15,
    transitDays: 2,
    vesselOrFlight: 'Trans-Euro Fleet 108',
    carrier: 'Aether Ground'
  }
];

export const RISK_INCIDENTS: RiskIncident[] = [
  {
    id: 'risk-1',
    title: 'Panama Canal Transits Reduced',
    locationName: 'Panama Canal Chokepoint',
    lat: 9.08,
    lng: -79.68,
    type: 'CHOKEPOINT',
    severity: 'critical',
    impactDelayDays: 6.5,
    activeLanesAffected: 14,
    timestamp: '2 hours ago'
  },
  {
    id: 'risk-2',
    title: 'Typhoon Warning: East China Sea',
    locationName: 'East China Sea / Ningbo Outer Anchorage',
    lat: 29.86,
    lng: 122.5,
    type: 'WEATHER',
    severity: 'high',
    impactDelayDays: 3.2,
    activeLanesAffected: 28,
    timestamp: '4 hours ago'
  },
  {
    id: 'risk-3',
    title: 'Rotterdam Automated Gate Upgrade',
    locationName: 'Maasvlakte II, Rotterdam',
    lat: 51.96,
    lng: 4.04,
    type: 'CONGESTION',
    severity: 'moderate',
    impactDelayDays: 1.8,
    activeLanesAffected: 9,
    timestamp: '6 hours ago'
  },
  {
    id: 'risk-4',
    title: 'Singapore Bunkering Anchorage Queue',
    locationName: 'Singapore Eastern Anchorage',
    lat: 1.25,
    lng: 103.95,
    type: 'CONGESTION',
    severity: 'moderate',
    impactDelayDays: 1.2,
    activeLanesAffected: 18,
    timestamp: '11 hours ago'
  }
];

export const ACTIVE_SHIPMENTS: ActiveShipment[] = [
  {
    id: 'shp-0921',
    trackingNumber: 'AETH-9482-NL',
    lane: 'Shanghai → Rotterdam',
    mode: 'OCEAN',
    status: 'IN_TRANSIT',
    currentCoordinates: [12.8, 48.2], // Gulf of Aden
    destination: 'Rotterdam (NLRTM)',
    eta: 'Nov 8, 14:00 UTC',
    speedKnots: 19.4,
    vesselName: 'AETHER TITAN V.088',
    containerId: 'MEDU8392019 [40HC]',
    progressPercent: 68
  },
  {
    id: 'shp-1044',
    trackingNumber: 'AETH-3108-US',
    lane: 'Frankfurt → Chicago O\'Hare',
    mode: 'AIR',
    status: 'IN_TRANSIT',
    currentCoordinates: [54.2, -35.6], // North Atlantic
    destination: 'Chicago (ORD)',
    eta: 'Today, 21:30 UTC',
    speedKnots: 480,
    vesselName: 'AERO-CARGO B777-F',
    containerId: 'ULD-AKE-44012',
    progressPercent: 82
  },
  {
    id: 'shp-2209',
    trackingNumber: 'AETH-7721-JP',
    lane: 'Los Angeles → Tokyo',
    mode: 'OCEAN',
    status: 'PORT_DWELL',
    currentCoordinates: [33.74, -118.26],
    destination: 'Tokyo (JPTYO)',
    eta: 'Nov 14, 08:00 UTC',
    speedKnots: 0.1,
    vesselName: 'PACIFIC HORIZON',
    containerId: 'MSKU9920188 [40HC]',
    progressPercent: 12
  }
];

export const mockApi = {
  getLanes: async (): Promise<TradeLane[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MAJOR_LANES), 150));
  },

  getForecastRates: async (laneId: string, timeframe: '7d' | '30d' | '90d'): Promise<LaneForecast> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lane = MAJOR_LANES.find(l => l.id === laneId) || MAJOR_LANES[0];
        const count = timeframe === '7d' ? 7 : timeframe === '30d' ? 15 : 24;
        const base = lane.currentRate;
        const isDipExpected = lane.change7d < 0;

        const points = Array.from({ length: count }, (_, i) => {
          const dayOffset = timeframe === '7d' ? i : timeframe === '30d' ? i * 2 : i * 4;
          const date = new Date(Date.now() + dayOffset * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          
          // Generate realistic forecast curves with confidence bounds
          const trend = isDipExpected ? Math.sin((i / count) * Math.PI) * -0.08 : Math.sin((i / count) * Math.PI) * 0.06;
          const noise = (Math.random() - 0.5) * 0.02;
          const predictedRate = Math.round(base * (1 + trend + noise));
          const spread = Math.round(base * (0.03 + (i / count) * 0.07));

          return {
            date,
            rate: predictedRate,
            confidenceLower: predictedRate - spread,
            confidenceUpper: predictedRate + spread,
            demandFactor: Math.min(100, Math.max(40, Math.round(lane.demandIndex + (Math.random() - 0.5) * 10)))
          };
        });

        resolve({
          laneId: lane.id,
          mode: lane.mode,
          timeframe,
          points,
          aiSignal: isDipExpected ? 'WAIT_RECOMMENDED' : 'BOOK_NOW',
          recommendedWaitDays: isDipExpected ? 4 : undefined,
          expectedPriceDeltaPct: isDipExpected ? -8.4 : 5.2,
          confidenceScore: 94,
          aiAnalysis: isDipExpected
            ? 'AI model predicts capacity release over the next 4 days. Ocean carrier vessel additions will cause spot rates to soften ~8.4% before rebounding.'
            : 'Lane demand velocity is escalating sharply (+14% WoW). Available slot capacity is 94% committed. Locking spot quote immediately protects against pending bunker surcharges.'
        });
      }, 200);
    });
  },

  getRiskIncidents: async (): Promise<RiskIncident[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(RISK_INCIDENTS), 100));
  },

  getActiveShipments: async (): Promise<ActiveShipment[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(ACTIVE_SHIPMENTS), 120));
  },

  calculateInvoice: (baseFreight: number, hasInsurance: boolean = true, isPriority: boolean = true): InvoiceBreakdown => {
    const baf = Math.round(baseFreight * 0.08); // Fuel surcharge
    const thc = 120; // Terminal handling
    const insurance = hasInsurance ? 48 : 0;
    const carbonOffset = 14;
    const subtotal = baseFreight + baf + thc + insurance + carbonOffset;
    const estimatedTax = Math.round(subtotal * 0.055);
    const total = subtotal + estimatedTax;

    return {
      baseFreight,
      bunkerAdjustmentFactor: baf,
      terminalHandlingCharge: thc,
      cargoInsurance: insurance,
      carbonOffset,
      estimatedTax,
      total
    };
  }
};
