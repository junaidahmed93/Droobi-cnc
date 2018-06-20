export default class ErrorMapping {
  static unhandleError(errorResponse) {
    if (errorResponse && errorResponse.message) {
      if (typeof errorResponse.message === 'string') {
        if (errorResponse.message.length) {
          return errorResponse.message;
        }

        return errorResponse.message.substr(0, 50);
      }

      return 'Request terminated: Please contact to support.';
    }

    return 'Request could not completed. Please contact to support.';
  }

  static serverDefinedError(response) {
    if (response && response.errors && response.errors[0]) {
      if (response.errors[0].errorMessage) {
        return response.errors[0].errorMessage;
      }

      return 'Error occured: Please contact to support';
    }

    return 'Server could not complete your request';
  }
}
