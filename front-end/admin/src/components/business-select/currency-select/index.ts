import CurrencySelect from './currency-select';

export default CurrencySelect;

export interface Token {
  coinType: number,
  name: string,
}

export interface WalletToken {
  path: number[],
  publicKey: string,
  name: string,
  coinType?: number,
}

export interface Currency {
  path?: number[],
  publicKey?: string,
  address?: string,
  name: string,
  icon?: string,
  coinType?: number,
}