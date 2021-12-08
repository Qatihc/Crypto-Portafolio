import React from 'react';

import './style.css';

function Coin(props){
    let {symbol, image, current_price, price_change_percentage_24h} = props.coin;
    price_change_percentage_24h = price_change_percentage_24h
    const priceChangeDirection = (price_change_percentage_24h >= 0) ? 'positive-price-change' : 'negative-price-change'

    return(
        <div className='coin-wrap'>
                <img src={image} className='coin-img'/>
                <span className='coin-symbol'>{symbol}</span>
                <span className='coin-current-price'>{'($)' + current_price}</span>
                <span className={'coin-price-change-24h' + ' ' + priceChangeDirection}>{price_change_percentage_24h}</span>
        </div>
    )
}

export default Coin;