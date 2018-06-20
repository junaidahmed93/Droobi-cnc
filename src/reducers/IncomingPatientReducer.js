import CONSTANTS from '../constants/actionConstants';

const initialState = {
  incomingPatient: [],
};
const IncomingPatientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_INCOMING_PATIENTS_SUCCESS: {
      const incomingPatient = action.incomingPatient;
      return {
        ...state, incomingPatient,
      };
    }

    case CONSTANTS.GET_INCOMING_PATIENTS_FAIL:
      return {
        ...state, incomingPatient: [],
      };
    default:
      return state;
  }
};
export default IncomingPatientReducer;
