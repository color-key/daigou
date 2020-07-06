import AddressSelect from './address-select';

export default AddressSelect;

export interface Address {
  id: string,
  coinSymbol: string,
  address: string
  icon?: string
}
