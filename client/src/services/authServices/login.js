import {APIURL} from '../../constants';
import axios from 'axios'

const login = async (username, password, token) => {
  const url = APIURL + '/auth/login';
  const request = (username && password)
    ? {data: {username, password,}}
    : {headers: {token}}
  const response = await axios({...request, method: 'post', url});
  return response;
}

export default login;