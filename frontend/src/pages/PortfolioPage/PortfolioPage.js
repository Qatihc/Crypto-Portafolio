import React, { useEffect } from 'react';
import { fetchPortfolio, selectPortfolioStatus } from '../../features/Portfolio/portfolioSlice';
import { useSelector, useDispatch } from 'react-redux';
import { STATUS } from '~/src/app/constants';
import { currentUserSelector } from '../../app/user/userSlice';
import { Navigate } from 'react-router-dom';
import { CoinsTable } from '../../features/PortfolioCoins';


const PortfolioPage = () => {
  const currentUser = useSelector(currentUserSelector);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPortfolio())
  }, [])

  const portfolioStatus = useSelector(selectPortfolioStatus);

  if (!currentUser) return <Navigate to="/login" />
  if (portfolioStatus == STATUS.LOADING) {
    return 'Cargando...'
  }

  return (
    <>
      <CoinsTable/>
    </>
  )
}

export default PortfolioPage;