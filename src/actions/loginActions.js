import request from 'superagent';
import CONSTANTS from '../constants/actionConstants';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import * as loaderActions from './loaderActions';
import { saveState } from '../utils/StorageUtils';

export function requestInitiate() {
  const action = {
    type: CONSTANTS.REQUEST_INITIATE,
  };
  return action;
}
export function requestLogInUser(user) {
  const action = {
    user,
    type: CONSTANTS.LOGIN,
  };
  return action;
}
export function loginSuccess(user) {
  const action = {
    type: CONSTANTS.LOGIN_SUCCESS,
    user: Object.assign({}, user, {
      isLoggedIn: true,
    }),
  };
  return action;
}
export function loginFail(error) {
  const action = {
    type: CONSTANTS.LOGIN_FAIL,
    error,
  };
  return action;
}

const normalizeUser = (user) => {
  if (user && user.hotelDto) {
    return {
      userId: user.user.id || '',
      role: user.user.roles[0],
      name: user.user.name,
      token: user.auth.token || '',
      email: user.user.email || '',
      emiratesId: user.user.firstName || '',
      lastName: user.lastName || '',
      hotelId: user.hotelDto.id || '',
      hotelName: user.hotelDto.hotelName || '',
      hoteladdress: user.hotelDto.address || '',
      latitude: user.hotelDto.latitude || '',
      longitude: user.hotelDto.longitude || '',
      profileImage: user.profileImgae || '',
    };
  }

  return {
    userId: user.user.id || '',
    role: user.user.roles[0],
    name: user.user.name,
    token: user.auth.token || '',
    email: user.user.email || '',
    emiratesId: user.user.firstName || '',
    lastName: user.lastName || '',
    profileImage: user.profileImgae || '',
  };
};

const requestLoginSource = (user) => {
  const payload = { email: user.email.toString(), password: user.password.toString(), roleName: 'admin' };
  return new Promise((resolve, reject) => {
    request.post(APIURL.LOGIN_URL)
      .send(payload)
      .accept(APIURL.APPLICATION_TYPE)
      .set({
        'Content-Type': 'application/json',
        DeviceId: '12',
        OSVersion: 'Win10',
      })
      .timeout(30000)
      .end((err, response) => {
        if (response && response.text) {
          const responseData = JSON.parse(response.text);
          if (responseData && responseData.success === true) {
            console.log('58-----', responseData);

            const imagesName = responseData.data.user.displayImageUrl;
            if (imagesName) {
              const imageURL = APIURL.IMAGES.replace('{fileName}', imagesName);
              console.log('imageUrl', imageURL);
              const imgHeader = Object.assign({}, { token: responseData.data.auth.token });
              request.get(imageURL)
                .accept('image/jpeg')
                .set(imgHeader)
                .responseType('blob')
                .timeout(30000)
                .end((errInGetImg, responseGetImages) => {
                  if (responseGetImages) {
                    console.log('responseGetImages', responseGetImages);
                    const reader = new FileReader();
                    reader.readAsDataURL(responseGetImages.body);
                    reader.onloadend = () => {
                      const base64data = reader.result;
                      const finalResponse = Object.assign({}, responseData.data, { profileImgae: (responseGetImages && responseGetImages.statusCode === 406) ? '' : base64data });
                      resolve({ requestedResult: true, data: finalResponse });
                    };
                  } else {
                    const finalResponse = Object.assign({}, responseData.data, { profileImgae: '' });
                    resolve({ requestedResult: true, data: finalResponse });
                  }
                });
            } else {
              // resolved
              const finalResponse = Object.assign({}, responseData.data, { profileImgae: '' });
              resolve({ requestedResult: true, data: finalResponse });
            }
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
};


export function logInUser(user) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());

    const user = {
      user: {
        id: '123',
        roles: [{ id: '5', roleType: 'admin' }],
        name: 'Junaid',
        email: 'junaid.ahmed@venturedive.com',
        emiratesId: '0210',
        lastName: 'ahmed',
      },
      auth: { token: '123333' },
    };
    console.log('USER', user);
    const normalizedUser = normalizeUser(user);
    localStorage.setItem('LoggedInUser', JSON.stringify(normalizedUser));
    dispatch(loaderActions.loaderStop());
    saveState(normalizedUser);
    return dispatch(loginSuccess(normalizedUser));

    // return requestLoginSource(user)
    //   .then((res) => {
    //     dispatch(loaderActions.loaderStop());
    //     console.log('addUserActions response', res);
    //     const normalizedUser = normalizeUser(res.data);
    //     saveState(normalizedUser);
    //     // localStorage.setItem('LoggedInUser', JSON.stringify(normalizedUser));
    //     return dispatch(loginSuccess(normalizedUser));
    //   })
    //   .catch((err) => {
    //     dispatch(loaderActions.loaderStop());
    //   });
  };
}
