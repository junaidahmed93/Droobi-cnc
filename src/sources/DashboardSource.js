
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const DashboardSource = {

  getDriporterLocations() {
    const user = loadState();
    if (user) {
      const token = user.token;
      const header = Object.assign({}, APIURL.API_HEADERS, { token });
      console.log('header', header);
      const URL = APIURL.GET_DRIPORTER_LOCATIONS;
      return new Promise((resolve, reject) => {
        request.get(URL)
          .accept(APIURL.APPLICATION_TYPE)
          .set(header)
          .timeout(30000)
          .end((err, response) => {
            if (response && response.text) {
              const driporterLocationInfo = [];
              const responseData = JSON.parse(response.text);
              if (responseData && responseData.success === true) {
                const allDriporter = responseData.data;

                for (let i = 0; i < allDriporter.length; i++) {
                  const t = Object.assign({}, allDriporter[i], { lat: allDriporter[i].latitude, lng: allDriporter[i].longitude });
                  driporterLocationInfo.push(t);
                }


                resolve({ requestedResult: true, data: driporterLocationInfo });
              }
              if (responseData && responseData.success === false) {
                console.log('62-----', response);
                const handleError = ErrorMapping.serverDefinedError(responseData);
                reject({ requestedResult: false, message: handleError });
              }
            } else {
              const handleError = ErrorMapping.unhandleError(err);
              reject({ requestedResult: false, message: handleError });
            }
          });
      });
    }
  },


};

export default DashboardSource;
