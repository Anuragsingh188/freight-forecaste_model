import { InvoiceBreakdown, PayPalCaptureDetails } from '../types/freight';

export const DEFAULT_PAYPAL_CLIENT_ID = 'test'; // Standard PayPal Sandbox Client ID for test environments

export interface PayPalOrderPayload {
  intent: 'CAPTURE';
  purchase_units: Array<{
    reference_id: string;
    description: string;
    amount: {
      currency_code: string;
      value: string;
      breakdown: {
        item_total: { currency_code: string; value: string };
        tax_total: { currency_code: string; value: string };
        shipping?: { currency_code: string; value: string };
        handling?: { currency_code: string; value: string };
        insurance?: { currency_code: string; value: string };
      };
    };
    items?: Array<{
      name: string;
      description: string;
      quantity: string;
      unit_amount: { currency_code: string; value: string };
      category: 'DIGITAL_GOODS' | 'PHYSICAL_GOODS';
    }>;
  }>;
}

export const createPayPalOrderPayload = (
  invoice: InvoiceBreakdown,
  bookingReference: string = 'AETH-9482-NL'
): PayPalOrderPayload => {
  const itemTotal = (invoice.baseFreight + invoice.bunkerAdjustmentFactor + invoice.terminalHandlingCharge).toFixed(2);
  const taxTotal = invoice.estimatedTax.toFixed(2);
  const insuranceTotal = invoice.cargoInsurance.toFixed(2);
  const total = invoice.total.toFixed(2);

  return {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: bookingReference,
        description: `AETHER Freight Booking - Trade Corridor Slot #${bookingReference}`,
        amount: {
          currency_code: 'USD',
          value: total,
          breakdown: {
            item_total: { currency_code: 'USD', value: itemTotal },
            tax_total: { currency_code: 'USD', value: taxTotal },
            insurance: { currency_code: 'USD', value: insuranceTotal },
          },
        },
        items: [
          {
            name: 'Guaranteed Container Freight Slot (40ft HC)',
            description: 'Ocean Carrier Allocation with Real-Time Neural Rate Lock',
            quantity: '1',
            unit_amount: { currency_code: 'USD', value: itemTotal },
            category: 'PHYSICAL_GOODS',
          },
        ],
      },
    ],
  };
};

export const simulatePayPalCapture = async (
  orderId: string,
  amount: number,
  payerEmail: string = 'sb-buyer@business.example.com',
  paymentMethod: 'PAYPAL_BALANCE' | 'PAY_IN_4' | 'PAYPAL_CREDIT' | 'CREDIT_CARD' = 'PAYPAL_BALANCE'
): Promise<PayPalCaptureDetails> => {
  // Simulate network roundtrip with PayPal Payments API
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const randomCaptureHex = Math.random().toString(16).substring(2, 10).toUpperCase();

  return {
    orderId,
    captureId: `CAP-${randomCaptureHex}-USD`,
    status: 'COMPLETED',
    payerEmail,
    payerName: 'A. HASIB (VERIFIED SABLE BUYER)',
    amount,
    currency: 'USD',
    createTime: new Date().toISOString(),
    paymentMethod,
  };
};
