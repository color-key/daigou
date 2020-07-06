import {isIncludeChinese, isAllEnglish, isAllChinese} from '../index';

const includeChinese = 'abc我爱北京天安门---';
const english = 'I love Suzhou';
const chinese = '我爱北京天安门';

test('lib language', () => {
  expect(isIncludeChinese(includeChinese)).toBeTruthy();
  expect(isIncludeChinese(english)).toBeFalsy();
  expect(isIncludeChinese(chinese)).toBeTruthy();
  expect(isAllEnglish(includeChinese)).toBeFalsy();
  expect(isAllEnglish(english)).toBeTruthy();
  expect(isAllEnglish(chinese)).toBeFalsy();
  expect(isAllChinese(includeChinese)).toBeFalsy();
  expect(isAllChinese(english)).toBeFalsy();
  expect(isAllChinese(chinese)).toBeTruthy();
});