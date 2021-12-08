const isValidInput = (input, validator) => {
  return validator(input);
}

module.exports = isValidInput;