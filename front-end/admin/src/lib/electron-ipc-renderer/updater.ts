// tslint:disable-next-line:no-var-requires
const updater = process.env.NODE_ENV === 'production' ? require('@fay-react/electron/renderer/updater').default:require('../../../../keystore-electron/src/renderer/updater').default;
export default updater;

// tslint:disable-next-line:no-var-requires
export const channels = process.env.NODE_ENV === 'production' ? require('@fay-react/electron/channel/updater'):require('../../../../keystore-electron/src/channel/updater');
