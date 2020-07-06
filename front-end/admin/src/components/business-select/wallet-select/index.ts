import WalletSelect from './wallet-select';

export default WalletSelect;

export interface Wallet {
  walletId: number,
  walletName?: string,
  publicKey?: string,
}