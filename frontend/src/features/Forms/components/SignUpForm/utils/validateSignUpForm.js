/* Tiene como clave el input a validar, y como significado la funcion que realiza la validacion. */

const validateSignUpForm = {
  username: ({ username }) => username !== 'test',
  password: (password) => {
    if (!password) return 'Password must not be empty'
    return null;
  },
  confirmPassword: ({ password, confirmPassword }) => {
    if (password !== confirmPassword) return 'Password must match.'
    return null;
  }
}

export default validateSignUpForm;