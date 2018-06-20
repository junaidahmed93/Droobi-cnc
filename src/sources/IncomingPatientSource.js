import momentTZ from 'moment-timezone';
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';
import { patientData } from '../utils/data';

const data = patientData;
const IncomingPatientSource = {
  getAllIncomingPatients() {
    return new Promise((resolve, reject) => {
      const updatedPatientData = [];
      const check = JSON.parse(localStorage.getItem('patient'));
      console.log('check', check);
      if (check) {
        const patientData1 = JSON.parse(localStorage.getItem('patient'));
        patientData1.forEach((element) => {
          let heartBeat = element.heartRate;
          if (heartBeat > 140) {
            heartBeat = 100;
          }
          const random = Math.floor((Math.random() * 100) / 10);
          let color,
            newHeartRate = heartBeat;
          let ETA = Number(element.ETA) - 1;
          if (ETA < 1) {
            ETA = 0;
          }
          if (random > 5) {
            newHeartRate = Number(heartBeat) + (random);
            color = 'red';
          } else {
            newHeartRate = Number(heartBeat) - (random);
            color = 'green';
          }

          const finalObj = Object.assign({}, element, { color, heartRate: newHeartRate, ETA });
          updatedPatientData.push(finalObj);
        });
        localStorage.setItem('patient', JSON.stringify(updatedPatientData));
        resolve({ requestedResult: true, data: updatedPatientData });
      } else {
        patientData.forEach((element) => {
          const heatBeat = element.heartRate;
          const random = Math.floor((Math.random() * 100) / 10);
          let color,
            newHeartRate = element.heartRate;
          if (random > 5) {
            newHeartRate = Number(element.heartRate) + (random);
            color = 'red';
          } else {
            newHeartRate = Number(element.heartRate) - (random);
            color = 'green';
          }

          const finalObj = Object.assign({}, element, { color, heartRate: newHeartRate });
          updatedPatientData.push(finalObj);
        });
        localStorage.setItem('patient', JSON.stringify(updatedPatientData));
        resolve({ requestedResult: true, data: updatedPatientData });
      }
    });
  },
};

export default IncomingPatientSource;
