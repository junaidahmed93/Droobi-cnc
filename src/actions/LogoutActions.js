import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import LogoutSource from '../sources/LogoutSource';

export function requestLogOutUser() {
  const action = {
    type: CONSTANTS.LOGOUT_USER,
  };
  return action;
}
export function logOutSuccess() {
  const action = {
    type: CONSTANTS.LOG_OUT,
  };
  return action;
}
export function logOutFail(error) {
  const action = {
    type: CONSTANTS.LOGOUT_FAIL,
    error,
  };
  return action;
}


export function logOutUser() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return LogoutSource.requestLogOutSource()
      .then(() => {
        dispatch(loaderActions.loaderStop());
        dispatch(requestLogOutUser());
        localStorage.clear();
      })
      .catch((err) => {
        console.log('MOST IMPORTANT', err);
        dispatch(loaderActions.loaderStop());
      });
  };
}
