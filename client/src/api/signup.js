import axios from './axios';

const signup = async (requestBody) => {
  try {
    await axios.post('/auth/register', requestBody);
    return;
  } catch (err) {
    /* Agregar manejo de errores */
  }
}

export default signup;