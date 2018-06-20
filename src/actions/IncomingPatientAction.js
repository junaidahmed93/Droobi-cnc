import CONSTANTS from '../constants/actionConstants';
import * as LoaderActions from './loaderActions';
import IncomingPatientSource from '../sources/IncomingPatientSource';

export function getIncomingPatientsSuccess(incomingPatient) {
  const action = {
    type: CONSTANTS.GET_INCOMING_PATIENTS_SUCCESS,
    incomingPatient,
  };
  return action;
}

export function getIncomingPatientsFail(message) {
  const action = {
    type: CONSTANTS.GET_INCOMING_PATIENTS_FAIL,
    message,
  };
  return action;
}

export function getAllIncomingPatients() {
  return dispatch =>
  // dispatch(LoaderActions.loaderStart());
    IncomingPatientSource.getAllIncomingPatients()
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        if (res && res.requestedResult === true) {
          console.log('res----------', res);
          const bookings = [];
          res.data.forEach((element) => {
            bookings.push(element);
          });
          dispatch(getIncomingPatientsSuccess(bookings));
        } else {
        }
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(getIncomingPatientsFail());
        console.log('addUserActions error', err);
      });
}

