/* Tiene como clave el input a validar, y como significado la funcion que realiza la validacion. */

const validateSignUpForm = {
  username: (username) => username !== 'test',
  password: (password) => true,
  password: (confirmPassword) => true,
}

export default validateSignUpForm;