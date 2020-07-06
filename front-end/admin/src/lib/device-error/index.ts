import {getLanguage} from '../user';
import getDataByTemplate from '@fay-react/lib/getDataByTemplate';

interface Res {
  args?: object,
  status: string
}

const locales: any = {
  'zh_CN': () => import(/* webpackChunkName: "device-error~zh_CN", webpackPrefetch: true */'./zh_CN'),
  'en_US': () => import(/* webpackChunkName: "device-error~en_US", webpackPrefetch: true */'./en_US'),
};

export const getDeviceErrorMessage = async (deviceRes: Res) => {
  const language: any = getLanguage();
  const res = await locales[language]();
  const {args, status} = deviceRes;
  if(args){
    return getDataByTemplate(args, res.data[status] || res.data[-1]);
  }
  return res.data[status] || res.data[-1];
};