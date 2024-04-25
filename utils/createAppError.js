export class CreateAppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // NOTE: Operational errors handle exceptions like
    // Invalid path access, invalid input (Mongoose validation), fail to connect to server, fail to connect to database, request timeout, etc

    Error.captureStackTrace(this, this.constructor);
  }
}
