import BigNumber from "bignumber.js";
import {getUser} from "@/lib/user";
import {getJson} from "@fay-react/lib/fetch";
import {getErrorMessage} from "@/lib/fetch-error";
import {getDefaultCurrencyAccuracy} from "@/lib/currency/money-accuracy";

interface Type {
  [key: string]: string
}

export const currencyFullNameMap: Type = {
  'BTC': 'Bitcoin',
  'ETH': 'Ethereum',
  'LTC': 'Litecoin',
  'BCH': 'Bitcoin Cash',
  'BNB': 'Binance Coin',
  'USD': 'United States dollar',
  'USDT(OMNI)': 'Tether',
  'USDT(ERC20)': 'Tether',
};

export const currencyShortNameMap: Type = {
  'BTC': 'BTC',
  'ETH': 'ETH',
  'LTC': 'LTC',
  'BCH': 'BCH',
  'BNB': 'BNB',
  'USD': 'USD',
  'USDT(OMNI)': 'USDT(OMNI)',
  'USDT(ERC20)': 'USDT(ERC20)',
};

export const additionalFee: any = {
  'BTC': 0,
  'ETH': 0,
  'LTC': 0,
  'BCH': 0,
  'BNB': 0,
  'USD': 0,
  'USDT(OMNI)': 0.00000546,
  'USDT(ERC20)': 0,
};

export const minTransferAmount: any = {
  'BTC': 0.00001,
  'ETH': 0,
  'LTC': 0.00001,
  'BCH': 0.00001,
  'BNB': 0,
  'USD': 0,
  'USDT(OMNI)': 0,
  'USDT(ERC20)': 0,
}

export const getFeeUnit = (currency: string) => {
  switch (currency) {
    case currencyShortNameMap['USDT(OMNI)']:
      return 'BTC';
    case currencyShortNameMap['USDT(ERC20)']:
      return 'ETH';
    default:
      return currency;

  }
};

export const formatTotalAmount = (amount: string, fee: string, currency: string) => {
  const feeUnit = getFeeUnit(currency);
  const _fee = new BigNumber(fee).plus(additionalFee[currency]);
  if(feeUnit !== currency){
    return amount+currency+'+'+_fee+feeUnit;
  }else{
    return new BigNumber(amount).plus(_fee)+currency;
  }
};

const getExchangeRate = (currency: string, callback: Function) => {
  const user = getUser();
  const defaultCurrency = user.organization.defaultCurrency;
  getJson({path: baseUrl.malygos() + '/no-auth/coinMarket', data: {currency: defaultCurrency, coinSymbols: currency, batch: true}}).then(res => {
    if(res.status === 0){
      callback && callback(defaultCurrency, res.entity[currency]);
    }else{
      getErrorMessage(res).then((_errorMsg) => {
        // error
      });
    }
  })
};

export const getExchangePrice = (amount: string, fee: string, currency: string, callback: (price: string, defaultCurrency: string) => void) => {
  const feeUnit = getFeeUnit(currency);
  const _fee = new BigNumber(fee).plus(additionalFee[currency]);
  if(feeUnit === currency){
    getExchangeRate(currency, (defaultCurrency: string, exchangeRate: string) => {
      const price = new BigNumber(amount).plus(_fee).times(exchangeRate).toFixed(getDefaultCurrencyAccuracy(defaultCurrency));
      callback(price, defaultCurrency);
    })
  }else{
    getExchangeRate(currency, (_defaultCurrency: string, exchangeRate: string) => {
      const amountPrice = new BigNumber(amount).times(exchangeRate);
      getExchangeRate(feeUnit, (defaultCurrency: string, feeExchangeRate: string) => {
        const price = new BigNumber(_fee).times(feeExchangeRate).plus(amountPrice).toFixed(getDefaultCurrencyAccuracy(defaultCurrency));
        callback(price, defaultCurrency);
      })
    })
  }
};