import React, {useState}  from 'react';
import {APIURL} from '../../constants'
import axios from 'axios';

import {FormInput} from '../FormInput';

const RegisterCard = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async e => {
    e.preventDefault();
    const url = APIURL + '/auth/register'
    const response = await axios.post(url, state);
    console.log(response);
  }

  const handleChange = e => {
    const inputName = e.target.name;
    setState({...state, [inputName]: e.target.value});
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormInput type='text' name='username' placeholder='username' onChange={handleChange}/>
      <FormInput type='password' name='password' placeholder='password' onChange={handleChange}/>
      <FormInput type='password' name='confirmPassword' placeholder='confirm password' onChange={handleChange}/>
      <input type='submit' />
    </form>
  )
}

export default RegisterCard;