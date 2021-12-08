import React, {useContext} from 'react';
import {MainContext} from '../../context/MainContext';

const HomePage = () => {
  const {jwt, setJwt, user} = useContext(MainContext);
  return (
    <div>
      {user.username}
    </div>
  )
}

export default HomePage;