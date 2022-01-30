import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/src/common';
import { Navigate } from 'react-router-dom';
import { CoinsTable } from '../../features/CoinsTable';
import { TransactionsTable } from '../../features/TransactionsTable';
import { Navbar } from '../../features/Navbar';
import styled from 'styled-components';

import { Route, Routes } from "react-router-dom";

const PageContainer = styled.div`
  display: grid;
  min-height: 100vh;
`

const PortfolioPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  if (!currentUser) return <Navigate to="/login" />

  return (
    <PageContainer>
      <Navbar />
      <Routes>
        <Route path="/coins" element={<CoinsTable/>}/>
        <Route path="/transactions" element={<TransactionsTable />}/>
      </Routes>
    </PageContainer>
  )
}

export default PortfolioPage;