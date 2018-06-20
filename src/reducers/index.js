import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import loaderReducer from './loaderReducer';
import ForgetPasswordReducer from './ForgetPasswordReducer';
import DashboardReducer from './DashboardReducer';
import IncomingPatientReducer from './IncomingPatientReducer';

export default combineReducers({
  loginReducer,
  loaderReducer,
  ForgetPasswordReducer,
  DashboardReducer,
  IncomingPatientReducer,
});
