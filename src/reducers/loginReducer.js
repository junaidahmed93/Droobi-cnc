import CONSTANTS from '../constants/actionConstants';
import initialState from '../store/initialState';

const loginReducer = (state = initialState.loginReducer, action) => {
  switch (action.type) {
    case CONSTANTS.REQUEST_INITIATE:
      return {
        ...state,
        error: '',
        user: {},
        isLoggedIn: false,
      };

    case CONSTANTS.LOGIN:
      return Object.assign({}, state, {
        user: action.user,
        isLoggedIn: true,
      });

    case CONSTANTS.LOGIN_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        user: {},
      });

    case CONSTANTS.USER_STORAGE:
      return Object.assign({}, state, {
        user: action.user,
      });

    case CONSTANTS.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
        error: '',
        isLoggedIn: true,
      });

    case CONSTANTS.LOGOUT_USER:
      return Object.assign({}, state, {
        user: {},
        error: '',
        isLoggedIn: false,
      });

    default:
      return state;
  }
};
export default loginReducer;
