export class CreateAppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// NOTE: Operational errors handle exceptions like invalid path access, invalid input (Mongoose validation), fail to connect to server, fail to connect to database, request timeout, etc
