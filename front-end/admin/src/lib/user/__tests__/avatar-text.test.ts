import {getUserAvatarText} from '../avatar-text';

const name1 = 'Keystore';
const name2 = '费崇政';
const name3 = 'Fay 费';
const avatarTextName1 = 'Ke';
const avatarTextName2 = '政';

test('lib user avatar-text', () => {
  const _name1 = getUserAvatarText(name1);
  const _name2 = getUserAvatarText(name2);
  const _name3 = getUserAvatarText(name3);
  expect(_name1).toEqual(avatarTextName1);
  expect(_name2).toEqual(avatarTextName2);
  expect(_name3).toBeNull();
});
