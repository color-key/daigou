jest.mock('../request');

import {getUserName} from '../user';

it("test user name", () => {
  expect.assertions(1);
  return getUserName().then(name => expect(name).toEqual('fay-test'));
});