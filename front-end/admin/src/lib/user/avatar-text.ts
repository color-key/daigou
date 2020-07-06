import {isAllChinese, isAllEnglish} from '../language';

export const getUserAvatarText = (text: string) => {
  if(isAllEnglish(text)){
    return text.trim().substr(0, 2).trim();
  }else if(isAllChinese(text)){
    return text.trim().substr(text.trim().length-1, 1);
  }
  return null;
};