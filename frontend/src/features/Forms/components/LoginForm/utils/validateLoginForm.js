/* Tiene como clave el input a validar, y como significado la funcion que realiza la validacion. */

const validateLoginForm = {
  username: ({ username }) => {
    if (!username) return 'Username must not be empty'
    return null;
  },
  password: ({ password }) => {
    if (!password) return 'Password must not be empty'
    return null
  }, 
}

export default validateLoginForm;