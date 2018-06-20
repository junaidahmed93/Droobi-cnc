import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';

const ForgetPasswordSource = {
  sendCode(user) {
    console.log('user', user);
    const header = Object.assign({}, APIURL.API_HEADERS, { email: user.email.toString() });
    return new Promise((resolve, reject) => {
      request.get(APIURL.FORGET_PASSWORD)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            console.log('res', responseData);
            if (responseData && responseData.success === true) {
              resolve(responseData);
            } else {
              reject(responseData.errors[0].errorMessage);
            }
          } else {
            console.log('75', err);
            reject(err);
          }
        });
    });
  },
  verifyCode(user) {
    const header = Object.assign({}, APIURL.API_HEADERS, { code: user.code, deviceId: 123, OSVersion: 322 });
    const payload = { email: user.email, deviceToken: '33242' };
    return new Promise((resolve, reject) => {
      request.post(APIURL.FORGET_PASSWORD)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .send(payload)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            console.log('res', responseData);
            if (responseData && responseData.success === true) {
              resolve(responseData.data.auth.token);
            } else {
              reject(responseData.errors[0].errorMessage);
            }
          } else {
            console.log('75', err);
            reject(err);
          }
        });
    });
  },

  setNewPassword(user) {
    const header = Object.assign({}, APIURL.API_HEADERS, { token: user.token, password: user.password });
    return new Promise((resolve, reject) => {
      request.post(APIURL.SET_NEW_PASSWORD)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .send()
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            console.log('res', responseData);
            if (responseData && responseData.success === true) {
              resolve(responseData);
            } else {
              reject(responseData.errors[0].errorMessage);
            }
          } else {
            console.log('75', err);
            reject(err);
          }
        });
    });
  },
};

export default ForgetPasswordSource;
