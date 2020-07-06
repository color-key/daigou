// tslint:disable-next-line:no-var-requires
const scard = process.env.NODE_ENV === 'production' ? require('@fay-react/electron/renderer/scard').default:require('../../../../keystore-electron/src/renderer/scard').default;
export default scard;
