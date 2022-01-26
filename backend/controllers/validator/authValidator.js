const { check } = require('express-validator');
const validator = require('validator');
const errorMessages = require('./errorMessages');

const strongPasswordOptions = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0
}

const authValidator = (method) => {
  switch (method) {
    case 'login': {
      return [
        check('username', errorMessages.noUsername).exists(),
        check('password', errorMessages.noPassword).exists()
      ]
    }

    case 'register': {
      return [
        check('username', errorMessages.noUsername).exists(),
        check('password')
          .exists()
          .withMessage(errorMessages.noPassword)
          .custom((value) => {
            if (!validator.isStrongPassword(value, strongPasswordOptions)) {
              throw new Error(errorMessages.notStrongPassword);
            }
            return true
          }),
        check('confirmPassword')
          .exists()
          .withMessage(errorMessages.noConfirmPassword)
          .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(errorMessages.notMatchingPassword);
            }
            return true;
          }),
      ]
    }

    case 'changePassword': {
      return [
        check('username', errorMessages.noUsername).exists(),
        check('password', errorMessages.noPassword).exists(),
        check('newPassword')
          .exists()
          .withMessage(errorMessages.noNewPassword)
          .custom((value) => {
            if (!validator.isStrongPassword(value, strongPasswordOptions)) {
              throw new Error(errorMessages.notStrongNewPassword);
            }
            return true
          }),
      ]
    }
  }
}

module.exports = authValidator;