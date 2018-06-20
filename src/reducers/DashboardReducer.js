import CONSTANTS from '../constants/actionConstants';

const initialState = {
  driporterLocations: [],
  driporterLocationsSuccess: false,
};
const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_DRIPORTER_LOCATION_SUCCESS:
      return {
        ...state, driporterLocations: action.driporterLocations, driporterLocationsSuccess: true,
      };

    case CONSTANTS.GET_DRIPORTER_LOCATION_FAIL:
      return {
        ...state, driporterLocationsSuccess: false,
      };
    default:
      return state;
  }
};
export default DashboardReducer;
