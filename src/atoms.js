import { atom } from 'recoil';

export const signupInput = atom({
  key: 'signupValue',
  default: { username: '', password: '', password2: '', email: '' },
});
