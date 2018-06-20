import CONSTANTS from '../constants/actionConstants';
// import * as NotificationActions from './NotificationActions';
import DashboardSource from '../sources/DashboardSource';

export function getDriporterLocationSuccess(driporterLocations) {
  // console.log('getUserSuccess', driporterLocations);
  const action = {
    type: CONSTANTS.GET_DRIPORTER_LOCATION_SUCCESS,
    driporterLocations,
  };
  return action;
}
export function getDriporterLocationFail() {
  const action = {
    type: CONSTANTS.GET_DRIPORTER_LOCATION_FAIL,
  };
  return action;
}


export function getDriportersLocation() {
  return dispatch =>
  // dispatch(loaderActions.loaderStart());
    DashboardSource.getDriporterLocations()
      .then((partner) => {
        // console.log('PARTNER', partner);
        // dispatch(loaderActions.loaderStop());
        dispatch(getDriporterLocationSuccess(partner.data));
      })
      .catch((err) => {
        dispatch(getDriporterLocationFail());
        // dispatch(loaderActions.loaderStop());
        // dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
}
