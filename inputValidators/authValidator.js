const validator = require('validator');
const inputErrorMessages = require('./inputErrorMessages')

const strongPasswordOptions = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 0,
  minSymbols: 1,
}

const registerValidator = (input) => {
  const {username, password, confirmPassword} = input;

  if (!username) return {err: inputErrorMessages.noUser}
  if (!password) return {err: inputErrorMessages.noPassword}
  if (!confirmPassword) return {err: inputErrorMessages.noConfirmPassword}

  if (!validator.isStrongPassword(password, strongPasswordOptions)) return {err: inputErrorMessages.notStrongPassword}
  if (!validator.equals(password, confirmPassword)) return {err: inputErrorMessages.notMatchingPassword}

  return {err: null}
}

const changePasswordValidator = (input) => {
  const {username, password, newPassword} = input;

  if (!username) return {err: inputErrorMessages.noUser}
  if (!password) return {err: inputErrorMessages.noPassword}
  if (!newPassword) return {err: inputErrorMessages.noNewPassword}

  if (!validator.isStrongPassword(newPassword, strongPasswordOptions)) return {err: inputErrorMessages.notStrongNewPassword}
  return {err: null}
}

module.exports = {registerValidator, changePasswordValidator};