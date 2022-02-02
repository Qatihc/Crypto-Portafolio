import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CoinSymbol = styled.span`
  font-weight: 700;
`

const CoinName = styled.span`
  font-size: .65rem;
  color: var(--clr-gray-6);
`

const CoinNameCell = ({ row }) => {
  const { name, symbol } = row.original;
  return (
    <Container>
      <CoinSymbol className="symbol">{symbol}</CoinSymbol>
      <CoinName className="name">{name}</CoinName>
    </Container>
  );
}

export default CoinNameCell;