import React, { useState } from 'react';
import {Coin} from '../Coin';

function CoinLoader(props){
    const {coins} = props;
    const [loaded, setLoaded] = useState(false);

    return (
            coins.map(coin => {
                return <Coin coin={coin} key={coin.symbol}/>
            })
    )
}

export default CoinLoader;