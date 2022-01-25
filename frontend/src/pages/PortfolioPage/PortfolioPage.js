import React from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../app/user/userSlice';
import { Navigate } from 'react-router-dom';
import { CoinsTable } from '../../features/CoinsTable';
import { TransactionsTable } from '../../features/TransactionsTable';


const PortfolioPage = () => {
  const currentUser = useSelector(currentUserSelector);

  if (!currentUser) return <Navigate to="/login" />

  return (
    <>
      <CoinsTable/>
      <TransactionsTable />
    </>
  )
}

export default PortfolioPage;