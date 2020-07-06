import {setMeta, getMeta} from '../index';

test('lib  meta', () => {
  setMeta('keystore', 'keystore');
  const content = getMeta('keystore');
  const content1 = getMeta('keystore1');
  expect(content).toEqual('keystore');
  expect(content1).toBeNull();
});