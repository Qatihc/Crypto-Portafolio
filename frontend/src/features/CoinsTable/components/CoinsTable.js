import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useGetCoinsQuery, useGetCoinsCountQuery } from '../coinSlice';
import { TableData, TableHeader, TableRow, TableLayout, CoinNameCell, devices, formatNumber, DEFAULT_PAGE_SIZE, PageSelector, ScrollableContainer, TableActions } from '~/src/common';
import styled from 'styled-components';

const StyledTableRow = styled(TableRow)`
  &:nth-child(2n) {
    background-color: hsl(46, 84%, 91%);
  }
`

const CoinsTable = () => {
  const { data: count } = useGetCoinsCountQuery();

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(DEFAULT_PAGE_SIZE);

  let { data: coins, isLoading } = useGetCoinsQuery({ pageNumber: currentPage, pageSize });
  coins = coins || [];

  const columns = useMemo(() => [
    {
      Header: 'Nombre',
      accessor: 'symbol',
      Cell: ({ row }) => <CoinNameCell row={row}/>
    },
    {
      Header: 'Cantidad',
      accessor: 'amount'
    },
    {
      Header: 'Precio',
      accessor: 'price'
    },
    {
      Header: 'Total',
      accessor: 'total'
    },
    {
      Header: 'Market Cap',
      accessor: 'marketCap'
    },
    {
      Header: 'Cambio 24h',
      accessor: 'dailyChange'
    }
  ], [])

  const data = useMemo(() => {
    return coins.map((coin) => {
      let { symbol, name, amount, price, marketCap, dailyChange, _id } = coin;
      const total = formatNumber(amount * price);
      amount = formatNumber(amount);
      price = formatNumber(price);
      marketCap = formatNumber(marketCap);
      dailyChange = formatNumber(dailyChange);
      return {
        id: _id,
        symbol,
        name,
        amount,
        price,
        total,
        marketCap,
        dailyChange
      }
    })
  }, [coins])

  return (
    <>
    <TableActions>
      <PageSelector
          pageSize={pageSize}
          elementCount={count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
    </TableActions>
    < ScrollableContainer>
    <TableLayout 
        data={data}
        columns={columns}
        TableHeader={TableHeader}
        TableData={TableData}
        TableRow={StyledTableRow}
        pageSize={13}
      />
    </ScrollableContainer>

    </>
   )
}

export default CoinsTable;