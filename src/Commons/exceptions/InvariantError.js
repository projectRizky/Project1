const ClientError = require('./ClientError');

class InvariantError extends ClientError {
  constructor(message, errors) {
    super(message, errors);
    this.name = 'InvariantError';

    this.errors = errors;
  }
}

module.exports = InvariantError;
