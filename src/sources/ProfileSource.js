
import request from 'superagent';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import Converters from '../utils/Converters';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const editProfileDataMapping = (profile) => {
  console.log('Opsporter Edit', profile);
  const pro = {
    name: profile.name,
    email: profile.email,
    phoneNumber: profile.phoneNumber,
    country: profile.nationality,
    deviceToken: '46783463hjg',
    roleName: 'admin',
    registerType: 'normal',
    emiratesId: profile.emiratesId,
    city: profile.city,
    nationality: profile.nationality,
    emergencyName: profile.emergencyName,
    emergencyNumber: profile.emergencyNumber,
    emergencyRelation: profile.emergencyRelation,
    dateOfBirth: Converters.dateConverter(profile.dateOfBirth),

    roles: [
      { id: profile.roles[0].id, roleType: profile.roles[0].roleType },
    ],

    imagesDtoList: {
      imagesList: [
        {
          // "fileName": "profile.jpg",
          fileName: 'profile.jpg',
          type: 'display',
          images: profile.profilePictureBaseUrl,

        },
      ],
    },

  };


  return pro;
};

const ProfileSource = {
  getProfileDetails(id) {
    console.log('WHICH ID', id);
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    const url = APIURL.OPSPORTER_PROFILE.replace('{id}', id);
    console.log('url', url);
    return new Promise((resolve, reject) => {
      request.get(url)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('23-----', responseData);
              const imagesName = responseData.data.displayImageUrl;
              const imageURL = APIURL.IMAGES.replace('{fileName}', imagesName);
              console.log('imageUrl', imageURL);
              const imgHeader = Object.assign({}, { token });
              request.get(imageURL)
                .accept('image/jpeg')
                .set(imgHeader)
                .responseType('blob')
                .timeout(30000)
                .end((errInGetImg, responseGetImages) => {
                  console.log('responseGetImages', responseGetImages);
                  const reader = new FileReader();
                  reader.readAsDataURL(responseGetImages.body);
                  reader.onloadend = () => {
                    const base64data = reader.result;
                    // resolve(base64data)
                    const finalResponse = Object.assign({}, responseData.data, { profileImgae: base64data });
                    resolve({ requestedResult: true, data: finalResponse });
                  };
                });
            }
            if (responseData && responseData.success === false) {
              console.log('28-----', response);
              const handleError = ErrorMapping.serverDefinedError(responseData);
              resolve({ requestedResult: false, message: handleError });
            }
          } else {
            const handleError = ErrorMapping.unhandleError(err);
            reject({ requestedResult: false, message: handleError });
          }
        });
    });
  },
  updateProfile(profile) {
    const token = loadState().token;
    const header = Object.assign({}, { token, deviceId: '123' });
    const payload = Object.assign({}, editProfileDataMapping(profile), { id: profile.id });
    const parseOb = JSON.stringify(payload);

    return new Promise((resolve, reject) => {
      request.put(APIURL.UPDATE_USER)
      // .send(data)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .field('userDetails', parseOb)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('58-----', response);
              browserHistory.push('/home/admin/main');
              resolve({ requestedResult: true, data: responseData.data });
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
  },
};

export default ProfileSource;
