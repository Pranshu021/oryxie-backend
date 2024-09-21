let serverErorr;
let clientError;
let databaseError;

class CustomErrors extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  serverError = (message) => {
    this.name = "ServerError";
    (this.status = 500),
      (this.message = message || "Internal Server Error"),
      (this.userMessage = "Internal Server Error");
  };

  clientError = (message) => {
    this.name = "ClientError";
    this.status = 400;
    this.message = message || "Bad Request";
  };

  databaseError = (message) => {
    this.name = "DatabaseError";
    this.status = 500;
    this.message = message || "Database Connection Failed";
  };

  miscError = (message) => {
    this.name = "MiscError";
    this.status = 500;
    this.message = message || "An unknown error occurred";
  };

  error(message, errorType) {
    switch (errorType) {
      case 'serverError':
        this.serverError(message);
        break;
      case 'clientError':
        this.clientError(message);
        break;
      case 'databaseError':
        this.databaseError(message);
        break;
      case 'miscError':
        this.miscError(message);
        break;
      default:
        this.miscError(message);
    }
    throw this; 
  }
}

module.exports = CustomErrors;