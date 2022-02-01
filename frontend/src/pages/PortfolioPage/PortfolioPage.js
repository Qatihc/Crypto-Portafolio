import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/src/common';
import { Navigate } from 'react-router-dom';
import { CoinsTable } from '../../features/CoinsTable';
import { TransactionsTable } from '../../features/TransactionsTable';
import { Navbar, OpenNavbarButton } from '../../features/Navbar';
import styled from 'styled-components';
import { devices } from '~/src/common';
import { Route, Routes } from "react-router-dom";

const TableContainer = styled.div`
  max-width: 100%;
  display: flex;
  border-radius: var(--size-3);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  grid-column: 1/-1;
  grid-row: 2;
  margin: 0 var(--size-3);
  overflow-x: scroll;
  white-space: nowrap;
  background-color: var(--clr-gray-1);
  @media ${devices.largeScreen} {
    justify-content: center;
    grid-column: 3/-2;
  }
`

const PageTitle = styled.h1`
  grid-column: 3/-1;
  text-align: left;
  font-size: var(--size-5);
  font-size: 1.4rem;
  color: var(--clr-gray-8);
  margin-top: var(--size-7);
  @media ${devices.largeScreen} {
    grid-row: 1;
  }
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
      <Routes>
        <Route path="/coins" element={<CoinsTable/>}/>
        <Route path="/transactions" element={<TransactionsTable />}/>
        <Route path="/" element={<Navigate to="coins" />} />
      </Routes>
    </>
  )
}

export default PortfolioPage;