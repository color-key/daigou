// tslint:disable-next-line:no-var-requires
const keyAuth = process.env.NODE_ENV === 'production' ? require('@fay-react/electron/renderer/keyAuth').default:require('../../../../keystore-electron/src/renderer/keyAuth').default;

export default keyAuth;
