export default class Validations {
  static validEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static basicValidations(id, value) {
    let re;
    switch (id) {
      case 'userRole':
      case 'fullName':
      case 'city':
      case 'country':
      case 'emergencyName':
      case 'relation':
      case 'guestName':
      case 'name':
      case 'hotelName':
      case 'nationality':
      case 'emergencyRelation': {
        re = /^[a-zA-Z ]+$/i;
        const verify = re.test(value) && (value && value.length > 0);
        return { valid: verify, message: 'Required a valid name' };
      }

      case 'insuranceNumber':
      case 'chassisNumber':
      case 'engineNumber':
      case 'numberPlate':
      case 'registrationNumber': {
        re = /^[0-9A-Z- ]+$/i;
        const verify = re.test(value) && (value && value.length > 0);
        return { valid: verify, message: 'Incorret Number' };
      }

      case 'flatOfficeNumber':
        if (value) {
          return { valid: value.length > 0, message: 'length should be greater than 1' };
        }

        return { valid: true };

      case 'floorNumber':
        if (value) {
          return { valid: value.length > 0, message: 'length should be greater than 1' };
        }

        return { valid: true };


      case 'contactNumber':
      case 'phoneNumber':
      case 'emergencyNumber':
        return { valid: (value && value.length > 5), message: 'Contact number incorrect' };

      case 'emiratesId':
        re = /^[0-9-]+$/;
        return { valid: re.test(value), message: 'Only number allowed' };

      case 'password':
        return { valid: (value && value.length > 4), message: 'Minimum 5 character required' };

      case 'emailAddress':
      case 'email':
        // eslint-disable-next-line
        re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return { valid: re.test(value), message: 'Invalid Email' };

      case 'maritalStatus':
        return { valid: (value && value.length > 3), message: 'Status can not be empty' };

      case 'cuurentAddress':
      case 'homeTownAddress':
      case 'address':
      case 'homeAddress':
        return { valid: (value && value.length > 5), message: 'Please insert complete address' };

      case 'passportNumber':
        return { valid: (value && value.length > 5), message: 'Incorrect passport number' };

      case 'passportCountry':
        re = /^[a-zA-Z ]+$/i;
        return { valid: re.test(value), message: 'Incorrect passport country' };

      case 'passportExpiry':
        return { valid: (value && value.length > 4), message: 'Incorrect expiry format' };

      case 'visaDetail':
        return { valid: (value && value.length > 4), message: 'Incorrect visa detail' };

      case 'model':
        return { valid: (value && value.length === 4), message: 'Incorrect year' };

      case 'workPermitId':
        return { valid: (value && value.length > 4), message: 'Invalid number' };

      case 'dateOfBirth':
        return { valid: (value && (value.toString()).length > 5), message: 'Date of birth must be valid' };

      case 'passportImage':
      case 'visaImage':
      case 'drivingLicense':
      case 'workPermit':
        return { valid: value, message: 'Image required' };

      case 'bookingLimit':
        return { valid: (value && (value.toString()).length > 0 && value > 0), message: 'Invalid number' };

      case 'latitude':
      case 'longitude':
        return { valid: value && (value.toString()).length > 5, message: 'Invalid cordinates' };

      default:
        return { valid: true, message: 'Valid input' };
    }
  }

  static generalValidations(id) {
    switch (id) {
      case 'guestName':
        return { valid: false, message: 'Required' };
      case 'contactNumber':
        return { valid: true, message: '' };
      case 'emailAddress':
        return { valid: false, message: 'Incorrect email' };

      default:
        return { valid: true, message: '' };
    }
  }
}
