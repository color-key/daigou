import {getLanguage} from '@/lib/user';
import en_US from './en_US';
import zh_CN from './zh_CN';

const locale = {
  en_US, zh_CN
};

export const getLocale = () => {
  const language = getLanguage();
  return locale[language];
};

export interface Type {
  id: string,
  text: string
}