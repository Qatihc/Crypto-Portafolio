const validator = require('validator');

const strongPasswordOptions = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 0,
  minSymbols: 1,
}

const registerValidator = (input) => {
  const {username, password, confirmPassword} = input;

  return (
    (username && password && confirmPassword) &&
    validator.isStrongPassword(password, strongPasswordOptions) &&
    validator.equals(password, confirmPassword)
  )
}

const changePasswordValidator = (input) => {
  const {username, password, newPassword} = input;

  return (
    (username && password && newPassword) &&
    validator.isStrongPassword(newPassword, strongPasswordOptions)
  )
}

module.exports = {registerValidator, changePasswordValidator};