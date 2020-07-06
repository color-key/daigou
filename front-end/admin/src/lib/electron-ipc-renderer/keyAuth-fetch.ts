// tslint:disable-next-line:no-var-requires
const keyAuthFetch = process.env.NODE_ENV === 'production' ? require('@fay-react/electron/renderer/keyAuth-fetch').default:require('../../../../keystore-electron/src/renderer/keyAuth-fetch').default;

export default keyAuthFetch;
