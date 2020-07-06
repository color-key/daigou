// import device from '@fay-react/electron/renderer/device';
// if(process.env.NODE_ENV === 'development'){
//
// }
// import device from '../../../keystore-electron/src/renderer/device';

// tslint:disable-next-line:no-var-requires
const node = process.env.NODE_ENV === 'production' ? require('@fay-react/electron/renderer/node').default:require('../../../../keystore-electron/src/renderer/node').default;
export default node;
