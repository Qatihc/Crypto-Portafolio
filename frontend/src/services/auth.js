import axios from './axios';
import { removeStoredUser, setStoredUser } from '../utils/storedUser';

const login = async (requestBody) => {
  try {
    const { data } = await axios.post('/auth/login', requestBody);
    axios.defaults.headers.common['token'] = data.token;
    setStoredUser(data);
    return { err: null, data };
  } catch (err) {
    return { err, data: null};
  }
}

const signup = async (requestBody) => {
  try {
    await axios.post('/auth/register', requestBody);
    return;
  } catch (err) {
    /* Agregar manejo de errores */
  }
}

const logout = () => {
  axios.defaults.headers.common['token'] = undefined;
  removeStoredUser();
}

export { login, signup, logout };