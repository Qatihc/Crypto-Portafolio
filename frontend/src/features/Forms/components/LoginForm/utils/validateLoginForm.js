/* Tiene como clave el input a validar, y como significado la funcion que realiza la validacion. */

const validateLoginForm = {
  username: ({ username }) => {
    if (username !== 'test') return 'username must be test'
    return null;
  },
  password: ({ password }) => {
    return null
  }, 
}

export default validateLoginForm;