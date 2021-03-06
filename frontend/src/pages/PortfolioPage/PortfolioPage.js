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
  max-width: max-content;
  overflow: auto;
  grid-column: 1/-1;
  @media ${devices.largeScreen} {
    grid-column: 2/-1;
  }
`

const PageTitle = styled.h1`
  grid-column: 3/-1;
  text-align: left;
  font-size: var(--size-5);
  font-size: 1.4rem;
  color: var(--clr-gray-8);
  margin-left: var(--size-5);
  margin-top: var(--size-4);
  @media ${devices.largeScreen} {
    margin-top: var(--size-7);
    grid-row: 1;
  }
`
const PortfolioContainer = styled.div`
  max-width: max-content;
  margin-top: var(--size-5);
  overflow: auto;

  grid-column: 1/-1;
  @media ${devices.largeScreen} {
    grid-column: 2/-1;
    margin: auto;
  }
`

const PortfolioPage = () => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) return <Navigate to="/login" />

  return (
    <>
      <Navbar />
      <OpenNavbarButton />
      <PortfolioContainer>
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
      </PortfolioContainer>
    </>
  )
}

export default PortfolioPage;