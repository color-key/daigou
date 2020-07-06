import {saveUser, removeUser, getUser, getLanguage, saveLanguage, getDefaultCurrency} from '../index';

const user = {
  id: 'keystore',
  organization: {
    defaultCurrency: 'USD'
  }
};


test('lib user', () => {
  saveUser(user);
  let _user = getUser();
  const _defaultCurrency = getDefaultCurrency();
  expect(_user.id).toEqual(user.id);
  expect(_defaultCurrency).toEqual(user.organization.defaultCurrency);
  removeUser();
  _user = getUser();
  expect(_user).toBeNull();
});

test('lib user language', () => {
  saveLanguage('en_US');
  let language = getLanguage();
  expect(language).toEqual('en_US');
  saveLanguage('zh_CN');
  language = getLanguage();
  expect(language).toEqual('zh_CN');
  saveLanguage(null);
  expect(language).toEqual('zh_CN');
  saveLanguage('zh_CN');
  expect(language).toEqual('zh_CN');
});