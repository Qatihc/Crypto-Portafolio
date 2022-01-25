import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../app/';
import { Navigate } from 'react-router-dom';
import { CoinsTable } from '../../features/CoinsTable';
import { TransactionsTable } from '../../features/TransactionsTable';


const PortfolioPage = () => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) return <Navigate to="/login" />

  return (
    <>
      <CoinsTable/>
      <TransactionsTable />
    </>
  )
}

export default PortfolioPage;