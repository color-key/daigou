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

export interface Locale {
  lang: {
    "cancel": "取消",
    "know": "我知道了",
    "confirm": "确认",
    "submit": "提交",
    "submitting": "提交中",
    "finish": "完成"
  }
}