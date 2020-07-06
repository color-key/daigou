// tslint:disable-next-line:no-var-requires
const electron = process.env.NODE_ENV === 'production' ? require('@fay-react/electron/renderer/core').default:require('../../../../keystore-electron/src/renderer/core').default;
export default electron;
