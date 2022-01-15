const validator = require('validator');
const inputErrorMessages = require('./inputErrorMessages')
const RequestError = require('../errorTypes/RequestError')

const strongPasswordOptions = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 0,
  minSymbols: 1,
}

const registerValidator = ({username, password, confirmPassword}) => {

  if (!username) return new RequestError(inputErrorMessages.noUsername, 400)
  if (!password) return new RequestError(inputErrorMessages.noPassword, 400)
  if (!confirmPassword) return new RequestError(inputErrorMessages.noConfirmPassword, 400)

  if (!validator.isStrongPassword(password, strongPasswordOptions)) return new RequestError(inputErrorMessages.notStrongPassword, 400)
  if (!validator.equals(password, confirmPassword)) return new RequestError(inputErrorMessages.notMatchingPassword, 400)

  return null
}

const changePasswordValidator = ({username, password, newPassword}) => {

  if (!username) return new RequestError(inputErrorMessages.noUsername, 400)
  if (!password) return new RequestError(inputErrorMessages.noPassword, 400)
  if (!newPassword) return new RequestError(inputErrorMessages.noNewPassword, 400)

  if (!validator.isStrongPassword(newPassword, strongPasswordOptions)) return new RequestError(inputErrorMessages.notStrongNewPassword, 400)
  return null
}

module.exports = {registerValidator, changePasswordValidator};