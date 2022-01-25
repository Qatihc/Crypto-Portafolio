/* Tiene como clave el input a validar, y como significado la funcion que realiza la validacion. */

const validateSignUpForm = {
  username: ({ username }) => {
    if (!username) return 'Username must not be empty'
    return null;
  },
  password: ({ password }) => {
    if (!password) return 'Password must not be empty'
    return null;
  },
  confirmPassword: ({ password, confirmPassword }) => {
    if (!confirmPassword) return 'Password must not be empty'
    if (password !== confirmPassword) return 'Passwords must be equal.'
    return null;
  }
}

export default validateSignUpForm;