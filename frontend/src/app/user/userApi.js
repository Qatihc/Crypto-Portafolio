import axios from '../axiosClient';

const login = async (requestBody) => {
  try {
    const { data } = await axios.post('/auth/login', requestBody);
    return {
      currentUser: data.username,
      token: data.token
    };
  } catch (err) {
    throw new Error(err);
  }
}

const signup = async (requestBody) => {
  try {
    await axios.post('/auth/register', requestBody);
    return;
  } catch (err) {
    return new Error(err);
  }
}

export default { login, signup };