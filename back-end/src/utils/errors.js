/**
 * Represents a NetflixError.
 */
class NetflixError extends Error {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.message = message;
    this.status = 500;
  }
}

/**
 * Represents a InvalidRequestError.
 */
class InvalidRequestError extends NetflixError {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * Represents a AuthorizationError.
 */
class AuthError extends NetflixError {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * Represents a PermissionError.
 */
class PermissionError extends NetflixError {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * Represents a DataError.
 */
class DataError extends NetflixError {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * Represents a StatusError.
 */
class StatusError extends NetflixError {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * Represents a ValidationError.
 */
class ValidationError extends NetflixError {
  /**
  * @param {error.message} message The error.message.
  */
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  NetflixError,
  InvalidRequestError,
  AuthError,
  DataError,
  PermissionError,
  StatusError,
  ValidationError,
};
