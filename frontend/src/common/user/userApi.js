import axios from '../axiosClient';

const login = async (requestBody) => {
  try {
    const { data } = await axios.post('/auth/login', requestBody);
    return data;
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) throw new Error(errors[0].msg);
    throw new Error(err.response.data);
  }
}

const signup = async (requestBody) => {
  try {
    console.log('try')
    await axios.post('/auth/register', requestBody);
    return;
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) throw new Error(errors[0].msg);
    throw new Error(err.response.data);
  }
}

export default { login, signup };