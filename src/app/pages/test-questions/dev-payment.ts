import { environment } from '../../core/environment/environment';
import { MonoPaymentRequest } from '../../shared/models/monopayment';

class DataPayment {
  redirectUrl = window.location.href;
  userId = crypto.randomUUID();
}

const dataPayment = new DataPayment();

export const dataDevPayment: MonoPaymentRequest = {
  amount: 2100,
  ccy: 980,
  merchantPaymInfo: {
    reference: '84d0070ee4e44667b31371d8f8813947',
    destination: 'Покупка щастя',
    comment: 'Покупка щастя',
    customerEmails: [],
    discounts: [
      {
        type: 'DISCOUNT',
        mode: 'PERCENT',
        value: 0.01,
      },
    ],
    basketOrder: [
      {
        name: 'Тест на токсичні відносини',
        qty: 1,
        sum: 2100,
        total: 4200,
        icon: null,
        unit: 'шт.',
        code: 'd21da1c47f3c45fca10a10c32518bdeb',
        barcode: null,
        header: null,
        footer: null,
        tax: [],
        uktzed: null,
        splitReceiverId: 'a1b2c3d4e5f6',
        discounts: [
          {
            type: 'DISCOUNT',
            mode: 'PERCENT',
            value: 0.01,
          },
        ],
      },
    ],
  },
  redirectUrl: dataPayment.redirectUrl,
  webHookUrl: environment.apiUrl + '/api/monopay/get-webhook',
  validity: 3600,
  paymentType: null,
  saveCardData: {
    saveCard: null,
    walletId: '69f780d841a0434aa535b08821f4822c',
  },
  agentFeePercent: 1.42,
  tipsEmployeeId: null,
  displayType: null,
};
