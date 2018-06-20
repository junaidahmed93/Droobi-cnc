import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import ForgetPasswordSource from '../sources/ForgetPasswordSource';

export function forgetPasswordCodeSendSuccess() {
  const action = {
    type: CONSTANTS.FORGET_PASSWORD_CODE_SEND_SUCCESS,
  };
  return action;
}
export function forgetPasswordCodeSendFail() {
  const action = {
    type: CONSTANTS.FORGET_PASSWORD_CODE_SEND_FAIL,
  };
  return action;
}

export function forgetPasswordCodeVerifySucess(token) {
  const action = {
    type: CONSTANTS.FORGET_PASSWORD_CODE_VERIFY_SUCCESS,
    token,
  };
  return action;
}

export function forgetPasswordCodeVerifyFail() {
  const action = {
    type: CONSTANTS.FORGET_PASSWORD_CODE_VERIFY_FAIL,
  };
  return action;
}

function passwordResetSuccess() {
  const action = {
    type: CONSTANTS.PASSWORD_RESET_SUCCESS,
  };
  return action;
}

function passwordResetFail() {
  const action = {
    type: CONSTANTS.PASSWORD_RESET_FAIL,
  };
  return action;
}

export function resetAllForgetPasswordStates() {
  const action = {
    type: CONSTANTS.RESET_ALL_STATE,
  };
  return action;
}

export function sendCode(user) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return ForgetPasswordSource.sendCode(user)
      .then((response) => {
        dispatch(loaderActions.loaderStop());
        console.log('response', response);
        dispatch(forgetPasswordCodeSendSuccess());
      })
      .catch((error) => {
        dispatch(loaderActions.loaderStop());
        console.log('error', error);
        dispatch(forgetPasswordCodeSendFail());
      });
  };
}

export function verifyCode(code) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return ForgetPasswordSource.verifyCode(code)
      .then((token) => {
        console.log('response', token);
        dispatch(loaderActions.loaderStop());
        dispatch(forgetPasswordCodeVerifySucess(token));
      })
      .catch((error) => {
        console.log('error', error);
        dispatch(loaderActions.loaderStop());
        dispatch(forgetPasswordCodeVerifyFail());
      });
  };
}

export function setNewPassword(user) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return ForgetPasswordSource.setNewPassword(user)
      .then((response) => {
        console.log('response', response);
        dispatch(loaderActions.loaderStop());
        dispatch(passwordResetSuccess());
      })
      .catch((error) => {
        console.log('error', error);
        dispatch(loaderActions.loaderStop());
        dispatch(passwordResetFail());
      });
  };
}
