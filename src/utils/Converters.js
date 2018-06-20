import { store } from '../store';

export default class Converters {
  static dateConverter(timeStamp) {
    if (timeStamp) {
      let month,
        date;
      const dateObj = new Date(timeStamp);
      date = dateObj.getDate();
      month = dateObj.getMonth();
      const year = dateObj.getFullYear();
      month = ++month;
      month = (month.toString()).length === 1 ? `0${month}` : month;
      date = (date.toString()).length === 1 ? `0${date}` : date;
      const calDate = `${year}-${month}-${date}`;
      return calDate;
    }
  }

  static vehicleDateConverter(timeStamp) {
    if (timeStamp) {
      let month,
        date;
      const dateObj = new Date(timeStamp);
      date = dateObj.getDate();
      month = dateObj.getMonth();
      const year = dateObj.getFullYear();
      month = ++month;
      month = (month.toString()).length === 1 ? `0${month}` : month;
      date = (date.toString()).length === 1 ? `0${date}` : date;
      const calDate = `${date}/${month}/${year}`;
      return calDate;
    }
  }

  static timeConverter(timeStamp) {
    if (timeStamp) {
      // let UTCtime = new Date(timeStamp).toUTCString();
      // let dateObj = new Date(UTCtime)


      // let hours, minutes;
      // let dateObj = new Date(timeStamp);
      // hours = (dateObj.getHours().toString()).length === 1 ? "0" + dateObj.getHours() : dateObj.getHours();
      // minutes = (dateObj.getMinutes().toString()).length === 1 ? "0" + dateObj.getMinutes() : dateObj.getMinutes();
      // let calTime = hours + ":" + minutes;
      // console.log("callTIme", calTime);
      // return calTime;

      const UTCtime = timeStamp;
      const hours = UTCtime.substr(11, 2);
      const minutes = UTCtime.substr(14, 2);
      const calTime = `${hours}:${minutes}`;
      return calTime;
    }
    return '00-00';
  }

  static flightDateAndTime(flightDate, flightTime) {
    const year = flightDate.slice(0, 4);
    const month = flightDate.slice(5, 7);
    const date = flightDate.slice(8, 12);
    const hours = flightTime.slice(0, 2);
    const minutes = flightTime.slice(3, 5);

    return new Date(year, (Number(month) - 1), date, hours, minutes).getTime();
  }

  static flightDateAndTimeWithUTC(flightDate, flightTime) {
    const year = flightDate.slice(0, 4);
    const month = flightDate.slice(5, 7);
    const date = flightDate.slice(8, 12);
    const hours = flightTime.slice(0, 2);
    const minutes = flightTime.slice(3, 5);

    const actualFlightTime = new Date(year, (month - 1), date, hours, minutes);
    const FlightTimeUTC = new Date(actualFlightTime).toISOString();
    return FlightTimeUTC;
  }

  static LocalToUTC(time) {
    const t = new Date(time);
    const year = t.getFullYear();
    const month = t.getMonth();
    const date = t.getDate();
    const hours = t.getHours();
    const minutes = t.getMinutes();

    const actualTime = new Date(year, month, date, hours, minutes);
    const UTCconvertedTime = new Date(actualTime).toISOString();
    return UTCconvertedTime;
  }
  static airPortNameToRegionId(airportName) {
    const airportList = store.getState().CommonReducer.airportList.data || [];
    let regId;

    airportList.forEach((v) => {
      if (airportName === v.airportName) {
        regId = v.city.id;
      }
    });
    return regId;
  }

  static airPortNameTofsCode(airportName) {
    const airportList = store.getState().CommonReducer.airportList.data || [];
    let fsCode;

    airportList.forEach((v) => {
      if (airportName === v.airportName) {
        fsCode = v.fscode;
      }
    });
    return fsCode;
  }

  static serviceAreaNameToId(serviceAreaName) {
    const serviceAreaList = store.getState().CommonReducer.serviceAreaList.data || [];
    let serviceAreaId;

    serviceAreaList.forEach((v) => {
      if (serviceAreaName === v.serviceAreaName) {
        serviceAreaId = v.serviceAreaId;
      }
    });
    return serviceAreaId;
  }

  static flightNumberFormat(flightNumber) {
    const formattedNumber = `${flightNumber.substr(0, 2)} - ${flightNumber.substr(2)}`;
    return formattedNumber;
  }
}
