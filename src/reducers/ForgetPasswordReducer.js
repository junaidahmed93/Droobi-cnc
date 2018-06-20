import CONSTANTS from '../constants/actionConstants';

const initialState = {
  codeSent: false,
  codeVerify: false,
  passwordChanged: false,
  resetToken: '',
};

const ForgetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.FORGET_PASSWORD_CODE_SEND_SUCCESS:
      return Object.assign({}, state, {
        codeSent: true,
      });
    case CONSTANTS.FORGET_PASSWORD_CODE_SEND_FAIL:
      return Object.assign({}, state, {
        codeSent: false,
      });
    case CONSTANTS.FORGET_PASSWORD_CODE_VERIFY_SUCCESS:
      return Object.assign({}, state, {
        codeVerify: true,
        resetToken: action.token,
      });
    case CONSTANTS.FORGET_PASSWORD_CODE_VERIFY_FAIL:
      return Object.assign({}, state, {
        codeVerify: false,
      });
    case CONSTANTS.PASSWORD_RESET_SUCCESS:
      return Object.assign({}, state, {
        passwordChanged: true,
      });
    case CONSTANTS.PASSWORD_RESET_FAIL:
      return Object.assign({}, state, {
        passwordChanged: false,
      });

    case CONSTANTS.RESET_ALL_STATE:
      return Object.assign({}, state, {
        codeSent: false,
        codeVerify: false,
        passwordChanged: false,
      });
    default:
      return state;
  }
};


export default ForgetPasswordReducer;
