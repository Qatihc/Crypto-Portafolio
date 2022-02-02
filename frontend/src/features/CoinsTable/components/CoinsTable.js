import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useGetCoinsQuery } from '../coinSlice';
import { TableData, TableHeader, TableRow, TableLayout, CoinNameCell, devices, formatNumber } from '~/src/common';

import Table from './Table';
import styled from 'styled-components';

const StyledTableRow = styled(TableRow)`
  &:nth-child(2n) {
    background-color: hsl(46, 84%, 91%);
  }
`

const CoinsTable = () => {
  let { data: coins, isLoading } = useGetCoinsQuery();
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
    <div>
      <TableLayout 
        data={data}
        columns={columns}
        TableHeader={TableHeader}
        TableData={TableData}
        TableRow={StyledTableRow}
        pageSize={13}
        />
    </div>
   )
}

export default CoinsTable;