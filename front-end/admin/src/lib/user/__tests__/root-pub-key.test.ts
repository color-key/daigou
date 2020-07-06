import {saveRootPubKey, MainRootPublickeyArray, TestRootPublickeyArray} from '../root-pub-key';
import '@/test-utils';

test('lib user avatar-text', () => {
  let save = false;
  for(const pubKey of TestRootPublickeyArray){
    save = saveRootPubKey(pubKey);
    expect(save).toBeTruthy();
  }
  for(const pubKey of MainRootPublickeyArray){
    save = saveRootPubKey(pubKey);
    expect(save).toBeTruthy();
  }
  save = saveRootPubKey('');
  expect(save).toBeFalsy();
});
