import React, {useEffect, useState} from 'react';
import {getTopCoinsPage} from '../../helper/apiCall';
import {isPageBottom} from '../../helper/isPageBottom';
import {CoinLoader} from '../CoinLoader';

import './style.css'

function TopCoins(){

  const [currentPage, setCurrentPage] = useState(1);
  const [topCoins, setTopCoins] = useState([]);
  const [coinsCache, setCoinsCache] = useState([])

  useEffect(async () => {
    const newTopCoins = (coinsCache[currentPage]) ? 
      coinsCache[currentPage] : await getTopCoinsPage(currentPage);
    if (!coinsCache[currentPage]) coinsCache[currentPage] = newTopCoins;
    setTopCoins(newTopCoins)
  }, [currentPage])

  return (
    <div class='coins-container'>
      {topCoins.length ? <CoinLoader coins={topCoins}/> : 'spainer'}
    </div>
  )
}



export {TopCoins};