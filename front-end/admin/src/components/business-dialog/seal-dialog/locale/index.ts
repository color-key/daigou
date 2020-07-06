import {getLanguage} from '@/lib/user';
import en_US from './en_US';
import zh_CN from './zh_CN';

const locale: any = {
  en_US, zh_CN
};

export const getLocale: (<T>() => T) = () => {
  const language: any = getLanguage();
  return locale[language];
};

export interface Locale {
  lang: {
    sealIcon: {
      auditing:  any,
      complete: any,
      pending: any,
      expired: any,
      reject: any,
      cancel: any,
      pass: any,
      revoked: any,
    }
  }
}