import React, { createContext, useContext, useState } from 'react';
import { BookingFormState, InvoiceBreakdown } from '../types/freight';
import { mockApi } from '../services/mockApi';

export type AppRoute = '/' | '/login' | '/book' | '/pay' | '/dashboard';

interface NavigationContextType {
  currentRoute: AppRoute;
  isTransitioning: boolean;
  navigateTo: (route: AppRoute) => void;
  bookingData: BookingFormState;
  setBookingData: React.Dispatch<React.SetStateAction<BookingFormState>>;
  invoiceData: InvoiceBreakdown;
  updateInvoiceForBooking: (rate: number, insurance: boolean, priority: boolean) => void;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  userEmail: string;
}

const defaultBooking: BookingFormState = {
  origin: 'Shanghai (CNSHA)',
  destination: 'Rotterdam (NLRTM)',
  mode: 'OCEAN',
  cargoType: 'STANDARD_CONTAINER',
  containerSize: '40FT_HC',
  weightKg: 21400,
  volumeCbm: 68,
  readyDate: '2026-11-04',
  estimatedRate: 1180, // Matches $1,180 reserve freight from Sable reference
  currency: 'USD',
  insuranceRequired: true,
  priorityDispatch: true,
};

const NavigationContext = createContext<NavigationContextType>({
  currentRoute: '/',
  isTransitioning: false,
  navigateTo: () => {},
  bookingData: defaultBooking,
  setBookingData: () => {},
  invoiceData: mockApi.calculateInvoice(1180, true, true),
  updateInvoiceForBooking: () => {},
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  userEmail: '',
});

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('/');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<BookingFormState>(defaultBooking);
  const [invoiceData, setInvoiceData] = useState<InvoiceBreakdown>(() =>
    mockApi.calculateInvoice(defaultBooking.estimatedRate, true, true)
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('a.hasib@galaxybrain.io');

  const updateInvoiceForBooking = (rate: number, insurance: boolean, priority: boolean) => {
    setInvoiceData(mockApi.calculateInvoice(rate, insurance, priority));
  };

  const navigateTo = (route: AppRoute) => {
    if (route === currentRoute) return;
    setIsTransitioning(true);
    // Smooth cinematic warp duration
    setTimeout(() => {
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }, 450);
  };

  const login = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
    // Cinematic push-through transition directly into dashboard or booking
    navigateTo('/dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigateTo('/');
  };

  return (
    <NavigationContext.Provider
      value={{
        currentRoute,
        isTransitioning,
        navigateTo,
        bookingData,
        setBookingData,
        invoiceData,
        updateInvoiceForBooking,
        isAuthenticated,
        login,
        logout,
        userEmail,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
