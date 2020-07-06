import isPublicKey from '../public-key';

test('lib publicKey', () => {
  expect(isPublicKey('123')).toBeFalsy();
  expect(isPublicKey('111111111111111111111111111111111111111111111111111111111111666666')).toBeTruthy();
});