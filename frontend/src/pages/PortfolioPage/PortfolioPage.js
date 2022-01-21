import React, { useEffect } from 'react';
import { fetchPortfolio, selectAllCoins, selectPortfolioStatus } from '../../features/Portfolio/portfolioSlice';
import { Header } from '../../features/Portfolio'
import { useSelector, useDispatch } from 'react-redux';
import { STATUS } from '~/src/app/constants';
import { Table, TableHead } from '../../features/Tables';
import { currentUserSelector } from '../../app/user/userSlice';
import { Navigate } from 'react-router-dom';


const PortfolioPage = () => {
  const currentUser = useSelector(currentUserSelector);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPortfolio())
  }, [])
  const coins = useSelector(selectAllCoins);
  const portfolioStatus = useSelector(selectPortfolioStatus);
  const displayedCoins = coins.map((coin) => {
    return <li>{`${coin.symbol} ~ ${coin.amount} ~ $${coin.price} ~ $${Math.trunc(coin.price * coin.amount)}`}</li>
  })

  if (!currentUser) return <Navigate to="/login" />
  if (portfolioStatus == STATUS.LOADING) {
    return 'Cargando...'
  }

  return (
    <>
    <Header />
    <Table >
    </Table>
    </>
  )
}

export default PortfolioPage;