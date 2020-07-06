// tslint:disable-next-line:no-var-requires
const keyAuthConfirm = process.env.NODE_ENV === 'production' ? require('@fay-react/electron/renderer/keyAuth-confirm').default:require('../../../../keystore-electron/src/renderer/keyAuth-confirm').default;

export default keyAuthConfirm;
