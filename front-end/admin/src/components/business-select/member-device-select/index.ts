import _default from './member-device-select';

export default _default;

export interface Device {
  serialNumber: string,
  name: string,
  publicKey: string,
  rootPublicKey?: string
}