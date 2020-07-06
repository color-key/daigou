import {getJson} from '@fay-react/lib/fetch';
import {getUser} from '../user';
import {getDefaultCurrencyAccuracy} from './money-accuracy';
import BigNumber from "bignumber.js";

export const getExchangePrice = (coinSymbols: string, price: number) => {
  const user = getUser();
  const currency = user.organization.defaultCurrency;
  return new Promise<any>((resolve, reject) => {
    getJson({path: baseUrl.malygos() + '/no-auth/coinMarket', data: {currency, coinSymbols, batch: true}}).then(res => {
      if(res.status === 0){
        resolve({defaultCurrency: currency, price: (new BigNumber(price).times(res.entity[coinSymbols])).toFixed(getDefaultCurrencyAccuracy(currency))});
      }else{
        reject(res.message);
      }
    })
  });
};
