
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const LogoutSource = {
  requestLogOutSource() {
    return new Promise((resolve, reject) => {
      resolve({ requestedResult: true });
    });
  },
};

export default LogoutSource;
