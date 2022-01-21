import React, { useEffect } from 'react';
import { fetchPortfolio, selectAllCoins, selectPortfolioStatus } from '../../features/Portfolio/portfolioSlice';
import { useSelector, useDispatch } from 'react-redux';
import { STATUS } from '~/src/app/constants';


const PortfolioPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPortfolio())
  }, [])
  const coins = useSelector(selectAllCoins);
  const portfolioStatus = useSelector(selectPortfolioStatus); 
  const displayedCoins = coins.map((coin) => <li>{`${coin.symbol} ~ ${coin.amount}`}</li>)

  if (portfolioStatus == STATUS.LOADING) {
    return 'Cargando...'
  }

  return (
    <ul>
      {displayedCoins}
    </ul>
  )
}

export default PortfolioPage;