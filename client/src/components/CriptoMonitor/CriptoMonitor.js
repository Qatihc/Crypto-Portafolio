import React, { useEffect, useState } from 'react';
import {TopCoins} from '../TopCoins';
import {getSupportedCoins} from '../../helper/apiCall';
import {busquedaBinaria} from "../../helper/busquedaBinaria";
import {compararSupportedCoin} from '../../helper/compararSupportedCoin';

let supportedCoins = [];

function CriptoMonitor(props){

  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    const supportedCoins = await getSupportedCoins();
    setLoaded(true);
  }, [])

  function isSupportedCoin(coin){
    return busquedaBinaria(coin, supportedCoins, compararSupportedCoin) != -1;
  }

  return(
    <div className='main-wrap'>
      Header
      {(loaded) ? <TopCoins /> : "CARGANDO......"}
      Footer
    </div>
  )
}



export default CriptoMonitor;
