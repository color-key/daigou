const en = /^[ a-zA-Z]+$/;
const zh = /^[ \u4E00-\u9FA5]+$/;

export const isAllChinese = (text: string) => {
  return zh.test(text);
};

export const isIncludeChinese = (text: string) => {
  return escape(text).indexOf( "%u" ) > -1;
};

export const isAllEnglish = (text: string) => {
  return en.test(text);
};