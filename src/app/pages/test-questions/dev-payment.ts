import { environment } from '../../core/environment/environment';
import { MonoPaymentRequest } from '../../shared/models/monopayment';

class DataPayment {
  userId = crypto.randomUUID();
}

const dataPayment = new DataPayment();

export const dataDevPayment: MonoPaymentRequest = {
  amount: 2100,
  ccy: 980,
  merchantPaymInfo: {
    reference: '',
    destination: 'Оплата за тест на токсичні відносини',
    comment: '',
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
        sum: 210000,
        total: 420000,
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
  redirectUrl: '',
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
