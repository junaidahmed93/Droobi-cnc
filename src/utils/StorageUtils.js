import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import { ENKEYRIPT } from '../constants/appConstants';


export const loadState = () => {
  const serializedState = localStorage.getItem('bits');
  if (serializedState === null) {
    return undefined;
  }
  const bytes = AES.decrypt(serializedState.toString(), ENKEYRIPT);
  return JSON.parse(bytes.toString(Utf8));
};

export const saveState = (state) => {
  const serializedState = AES.encrypt(JSON.stringify(state), ENKEYRIPT);
  localStorage.setItem('bits', serializedState);
};
