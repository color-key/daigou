import publicKeyRegex from './regex/public-key';

export default (txt: string): boolean => {
  return publicKeyRegex.test(txt);
}