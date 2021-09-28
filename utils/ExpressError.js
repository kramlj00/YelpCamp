class ExpressError extends Error {
  constructor(message, statusCode) {
    super(); // calling Error constructor
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;
