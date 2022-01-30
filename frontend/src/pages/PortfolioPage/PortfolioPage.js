import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/src/common';
import { Navigate } from 'react-router-dom';
import { CoinsTable } from '../../features/CoinsTable';
import { TransactionsTable } from '../../features/TransactionsTable';
import { Navbar, OpenNavbarButton } from '../../features/Navbar';
import styled from 'styled-components';

import { Route, Routes } from "react-router-dom";

const TableContainer = styled.div`
  min-width: max-content;
  grid-column: 1/-1;
  grid-row: 2;
  background-color: red;
`

const PageTitle = styled.h1`
  grid-column: 2/-1;
  text-align: center;
  font-size: var(--size-5);
`

const PortfolioPage = () => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) return <Navigate to="/login" />

  return (
    <>
    <Navbar />
    <OpenNavbarButton />
    <Routes>
        <Route path="/coins" element={<PageTitle>Monedas</PageTitle>}/>
        <Route path="/transactions" element={<PageTitle>Transacciones</PageTitle>}/>
    </Routes>
    <TableContainer>
      <Routes>
        <Route path="/coins" element={<CoinsTable/>}/>
        <Route path="/transactions" element={<TransactionsTable />}/>
        <Route path="/" element={<Navigate to="coins" />} />
      </Routes>
    </TableContainer>
    </>
  )
}

export default PortfolioPage;