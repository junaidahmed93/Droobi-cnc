import CONSTANTS from '../constants/actionConstants';

const initialState = {
  isLoading: 0,
};
const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.LOADER_START:
      state.isLoading += 1;
      return {
        ...state,
      };

    case CONSTANTS.LOADER_STOP:
      state.isLoading = state.isLoading > 0 ? (state.isLoading - 1) : 0;
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default loaderReducer;
