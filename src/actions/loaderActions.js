import CONSTANTS from '../constants/actionConstants';

export function loaderStart() {
  const action = {
    type: CONSTANTS.LOADER_START,
  };
  return action;
}
export function loaderStop() {
  const action = {
    type: CONSTANTS.LOADER_STOP,
  };
  return action;
}
