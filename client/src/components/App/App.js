import React, {useEffect, useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { retrieveJwt } from '../../services/authServices';
import { MainContext } from '../../context/MainContext';


import {HomePage} from '../../pages/HomePage'
import {RegisterPage} from '../../pages/RegisterPage'
import {LoginPage} from '../../pages/LoginPage'
import {PortfolioPage} from '../../pages/PortfolioPage'


import './style.css'

const App = () => {

  const {setJwt} = useContext(MainContext);

  useEffect(() => {
    const jwt = retrieveJwt();
    if (jwt) {
      setJwt(jwt);
    }
  }, []);

  return (
    <Router>
      <>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/portfolio'>Portfolio</Link></li>
      </ul>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route exact path='/login'>
          <LoginPage />
        </Route>
        <Route exact path='/register'>
          <RegisterPage />
        </Route>
        <Route exact path='/portfolio'>
          <PortfolioPage />
        </Route>
      </Switch>
      </>
    </Router>
  )
}


export {App}; 