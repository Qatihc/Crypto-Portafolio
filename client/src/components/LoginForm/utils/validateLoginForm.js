/* Tiene como clave el input a validar, y como significado la funcion que realiza la validacion. */

const validateLoginForm = {
  username: (username) => username !== 'test',
  password: (password) => true, 
}

export default validateLoginForm;