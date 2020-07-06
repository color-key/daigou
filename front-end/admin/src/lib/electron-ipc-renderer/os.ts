
// tslint:disable-next-line:no-var-requires
const os = process.env.NODE_ENV === 'production' ? require('@fay-react/electron/renderer/os').default:require('../../../../keystore-electron/src/renderer/os').default;
export default os;

