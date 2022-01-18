import axios from './axiosClient';

const login = async (requestBody) => {
  try {
    const { data } = await axios.post('/auth/login', requestBody);
/*     axios.defaults.headers.common['token'] = data.token;
    setStoredUser(data); */
    return data;
  } catch (err) {
    console.log('api err',err);
    throw new Error(err);
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
/*   axios.defaults.headers.common['token'] = null;
  removeStoredUser(); */
}

export default { login, signup, logout };