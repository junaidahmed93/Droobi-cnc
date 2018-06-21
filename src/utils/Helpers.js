import _ from 'lodash';
import Validations from './Validations';
import { getfieldsName, getOptionalFieldsName, allOptionalInput } from './FieldsName';
import isStringContainSpaces from './utils';
import { store } from '../store';

function composeErrorMessage(error, title) {
  let message = title;
  error.forEach((v) => {
    message += `<li>${v}</li>`;
  });
  if (error.length > 0) {
    return `${message}</ul>`;
  }

  return message = '';
}

function getOptionalFeilds(v, formName) {
  const optionalFields = getOptionalFieldsName(formName);
  if (optionalFields && optionalFields.length > 0) {
    for (let i = 0; i < optionalFields.length; i += 1) {
      if (v === optionalFields[i]) {
        return true;
      }
    }
  }
}

export function formsValidation(formData, formName) {
  const keys = getfieldsName(formName);
  const fieldError = [];
  const emptyFields = [];

  if (_.isEmpty(formData)) {
    return { warning: true, template: 'Please fill out the form' };
  }
  Object.keys(keys).forEach((v) => {
    if (!getOptionalFeilds(v, formName)) {
      const formsData = formData[v] ? formData[v].toString() : formData[v];
      if (_.isEmpty(formsData)) {
        emptyFields.push(keys[v]);
      }
    }

    const validationResult = Validations.basicValidations(v, formData[v]);
    if (validationResult && !validationResult.valid) {
      fieldError.push(`${keys[v]} : ${validationResult.message}`);
    }
  });
  const emptyFieldTitle = '<strong>These fields are empty:</strong><br/><ul>';
  const emptyFieldCheck = composeErrorMessage(emptyFields, emptyFieldTitle);
  if (emptyFieldCheck !== '') {
    return { warning: true, label: 'Please fill out the form', template: emptyFieldCheck };
  }

  const errorFieldTitle = '<strong>Please fill correct information:</strong><br/><ul>';
  const errorText = composeErrorMessage(fieldError, errorFieldTitle);
  if (errorText !== '') {
    return { warning: true, template: errorText };
  }

  return { warning: false };
}

function checkAllOptionalInput(id) {
  for (let i = 0; i < allOptionalInput.length; i += 1) {
    if (id === allOptionalInput[i]) {
      return true;
    }
  }
}


export function onInputBlur(id, value) {
  if (typeof value === 'number') {
    value = value.toString();
  }
  if (isStringContainSpaces(value) || _.isEmpty(value)) {
    if (checkAllOptionalInput(id)) {
      return { error: '', color: '#0D5BD5' };
    }

    return { error: 'This field is required.', color: '#f44336' };
  }
  const validationResult = Validations.basicValidations(id, value);
  if (validationResult && validationResult.valid) {
    return { error: '', color: '#0D5BD5' };
  }

  return { error: validationResult && validationResult.message ? validationResult.message : 'ERROR', color: '#f44336' };
}

export function onInputChange(id, value) {
  if (typeof value === 'number') {
    value = value.toString();
  }
  if (isStringContainSpaces(value) || _.isEmpty(value)) {
    if (checkAllOptionalInput(id)) { // Run time checking
      return { error: '', color: '#0D5BD5' };
    }

    return { error: 'This field is required.', color: '#f44336' };
  }
  return { error: '', color: '#0D5BD5' };
}

export function getCountries() {
  const countryList = store.getState().CommonReducer.countryList.data || [];
  const countries = [];
  const nationalities = [];

  countryList.forEach((v) => {
    countries.push(v.name);
    nationalities.push(v.nationality);
  });

  return [countries, nationalities];
}

export function getServicesAreas() {
  const serviceAreaList = store.getState().CommonReducer.serviceAreaList.data || [];
  const services = [];

  serviceAreaList.forEach((v) => {
    services.push(v.serviceAreaName);
  });

  return services;
}

export function getAirports() {
  const airportList = store.getState().CommonReducer.airportList.data || [];
  const airports = [];

  airportList.forEach((v) => {
    airports.push(v.airportName);
  });

  return airports;
}

export function getAirporterNameFromId(id) {
  const airportList = store.getState().CommonReducer.airportList.data || [];
  let airportName;

  airportList.forEach((v) => {
    if (id === v.city.id) {
      airportName = v.airportName;
    }
  });

  return airportName;
}

export function getServiceAreaFromId(id) {
  const airportList = store.getState().CommonReducer.serviceAreaList.data || [];
  let serviceAreaName;

  airportList.forEach((v) => {
    if (id === v.serviceAreaId) {
      serviceAreaName = v.serviceAreaName;
    }
  });

  return serviceAreaName;
}

export function removePrefixSymbol(contactNumber) {
  if (contactNumber) {
    if (contactNumber.charAt(0) === '+') {
      return contactNumber.substr(1);
    }
  }
}

export function getAirportFromDeptLoc(airportLocation) {
  if (airportLocation) {
    if (airportLocation.indexOf('↵') > 0) {
      return airportLocation.substr(0, airportLocation.indexOf('↵'));
    }
    if (airportLocation.indexOf('Airport') > 0) {
      const i = airportLocation.indexOf('Airport');
      return airportLocation.substr(0, i + 7);
    }

    return airportLocation;
  }
}

export function getTerminalFromDeptLoc(airportLocation) {
  if (airportLocation) {
    if (airportLocation.indexOf('↵') > 0) {
      return airportLocation.substr((airportLocation.indexOf('↵') + 1));
    }
    if (airportLocation.indexOf('Airport') > 0) {
      const i = airportLocation.indexOf('Airport');
      return airportLocation.substr(i + 7);
    }
    return '-';
  }
}

// It will be used for Parsing Flight Number and Flight date & return according to FightStats API requirement.
export function flightStatsInputParser(flightInfo) {
  const flightNumber = flightInfo.flightNumber;
  let flightDate = flightInfo.flightDate;

  const carrier = flightNumber.substr(0, 2);
  const flightCode = flightNumber.substr(2);
  flightDate = flightDate.replace(/-/g, '/');

  return [carrier, flightCode, flightDate];
}
