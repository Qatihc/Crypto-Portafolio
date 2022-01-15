import axios from './axios';

const login = async (requestBody) => {
  try {
    const { data } = await axios.post('/auth/login', requestBody);
    axios.defaults.headers.common['token'] = data.token;
    return data;
  } catch (err) {
    /* Agregar manejo de errores */
  }
}

export default login;