import {localStorageLanguageEvent} from '../event/language';

const key = 'user';
const languageKey = 'language';

export type Locale = 'zh_CN' | 'en_US'

export const saveUser = (user: {}) => {
  window.sessionStorage.setItem(key, JSON.stringify(user));
};

export const removeUser = () => {
  window.sessionStorage.removeItem(key);
};

export const getUser = () => {
  const user = window.sessionStorage.getItem(key);
  return user && JSON.parse(user);
};

export const getDefaultCurrency = () => {
  const user = getUser();
  return user.organization.defaultCurrency;
};

export const saveLanguage = (language: Locale|null) => {
  if(language){
    if(language === getLanguage()){
      return;
    }
    window.localStorage.setItem(languageKey, language);
    localStorageLanguageEvent.newValue = language;
    window.dispatchEvent(localStorageLanguageEvent);
  }
};

export const getLanguage = () => {
  return window.localStorage.getItem(languageKey);
};