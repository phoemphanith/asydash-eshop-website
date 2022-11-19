import { userAuth } from './user-auth';

describe('userAuth', () => {
  it('should work', () => {
    expect(userAuth()).toEqual('user-auth');
  });
});
