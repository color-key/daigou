import {getLanguage} from '../user';
import getDataByTemplate from '@fay-react/lib/getDataByTemplate';

interface Res {
  args?: object,
  status: string | number
}

const locales: any = {
  'zh_CN': () => import(/* webpackChunkName: "fetch-error~zh_CN", webpackPrefetch: true */'./zh_CN'),
  'en_US': () => import(/* webpackChunkName: "fetch-error~en_US", webpackPrefetch: true */'./en_US'),
};

export const getErrorMessage = async (fetchRes: Res) => {
  const language: any = getLanguage();
  const res = await locales[language]();
  const {args, status} = fetchRes;
  if(args){
    return getDataByTemplate(args, res.data[status] || res.data[-1]);
  }
  return res.data[status] || res.data[-1];
};