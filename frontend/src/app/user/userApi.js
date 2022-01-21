import axios from '../axiosClient';

const login = async (requestBody) => {
  try {
    const { data } = await axios.post('/auth/login', requestBody);
    return data;
  } catch (err) {
    throw new Error(err.response.data);
  }
}

const signup = async (requestBody) => {
  try {
    await axios.post('/auth/register', requestBody);
    return;
  } catch (err) {
    throw new Error(err.response.data);
  }
}

export default { login, signup };