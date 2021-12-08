import React, {useEffect, useContext} from 'react';
import {MainContext} from '../../context/MainContext';
import {APIURL} from '../../constants';
import axios from 'axios';

const Portfolio = () => {
  const {jwt} = useContext(MainContext);

  useEffect(async () => {
    const url = APIURL + '/portfolio'
    const headers = jwt ? {token: jwt} : {};
    const response = await axios({
      method: 'get',
      url,
      headers,
    });
    console.log(response.data);
  }, [])
  return (
    'portfolio'
  )
}

export default Portfolio;