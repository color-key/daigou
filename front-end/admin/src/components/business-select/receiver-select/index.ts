import ReceiverSelect from './receiver-select';

export default ReceiverSelect;

export interface Address {
  id: string,
  name?: string,
  label?: string,
  coinSymbol: string,
  address: string
  icon?: string
  path?: number[]
  publicKey?: string
}

export interface Receiver {
  id?: string,
  name?: string,
  fromAddress?: string,
  address?: string,
  addressList: Address[]
}