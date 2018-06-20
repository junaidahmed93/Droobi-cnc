import CONSTANTS from '../constants/actionConstants';

const initialState = {
  bookings: [],
};
const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_BOOKING_SUCCESS: {
      const bookings = action && action.bookings ? action.bookings.reverse() : action.bookings;
      return {
        ...state, bookings,
      };
    }

    case CONSTANTS.GET_BOOKING_FAIL:
      return {
        ...state, bookings: [],
      };
    default:
      return state;
  }
};
export default bookingReducer;
