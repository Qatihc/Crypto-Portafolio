const validator = require('validator');
const inputErrorMessages = require('./inputErrorMessages')
const RequestError = require('../errorTypes/RequestError')

const changeUsernameValidator = ({ newUsername }) => {
  if (!newUsername) return new RequestError(inputErrorMessages.noNewUsername, 400)
  return null
}

module.exports = {changeUsernameValidator}