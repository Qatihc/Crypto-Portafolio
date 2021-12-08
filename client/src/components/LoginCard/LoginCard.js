import React, {useState, useContext} from 'react';
import {MainContext} from '../../context/MainContext';
import {login, storeJwt} from '../../services/authServices';

import {FormInput} from '../FormInput';

const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
  });
  const {jwt, setJwt, setUser} = useContext(MainContext);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await login(state.username, state.password, jwt);
    const {jwt, user} = response.data;
    if (user && jwt) {
      storeJwt(jwt);
      setJwt(jwt);
      setUser(user);
    }

    console.log(response);
  }

  const handleChange = e => {
    const inputName = e.target.name;
    if (state[inputName] !== undefined) {
      setState({...state, [inputName]: e.target.value});
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormInput type='text' placeholder='username' name='username' onChange={handleChange} value={state.username}/>
      <FormInput type='password' placeholder='password' name='password' onChange={handleChange} value={state.password}/>
      <input type='submit'/>
    </form>
  )
}

export default Login;