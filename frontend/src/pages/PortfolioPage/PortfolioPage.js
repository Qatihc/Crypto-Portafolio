import React from 'react';
import { fetchPortfolio } from '../../features/Portfolio/portfolioSlice';
import { useSelector, useDispatch } from 'react-redux';

const PortfolioPage = () => {
  const dispatch = useDispatch()
  console.log('render')
  dispatch(fetchPortfolio())
  return (
    'hola'
  )
}

export default PortfolioPage;