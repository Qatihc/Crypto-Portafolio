module.exports = class RequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RequestError';
    this.status = 401;
  }
}