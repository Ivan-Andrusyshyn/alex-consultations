export interface MonoPaymentRequest {
  amount: number;
  ccy: number;
  merchantPaymInfo: {
    reference: string;
    destination: string;
    comment: string;
    customerEmails: string[];
    discounts?: Array<{
      type: string | null;
      mode: string | null;
      value: number | null;
    }>;
    basketOrder: Array<{
      name: string;
      qty: number;
      sum: number;
      total: number;
      icon?: string | null;
      unit?: string;
      code?: string;
      barcode?: string | null;
      header?: string | null;
      footer?: string | null;
      tax?: any[];
      uktzed?: string | null;
      splitReceiverId?: string;
      discounts?: Array<{
        type: string | null;
        mode: string | null;
        value: number | null;
      }>;
    }>;
  };
  redirectUrl: string;
  webHookUrl: string;
  validity: number;
  paymentType?: string | null;
  qrId?: string;
  code?: string;
  saveCardData?: {
    saveCard: boolean | null;
    walletId: string;
  };
  agentFeePercent: number;
  tipsEmployeeId?: string | null;
  displayType?: string | null;
}
