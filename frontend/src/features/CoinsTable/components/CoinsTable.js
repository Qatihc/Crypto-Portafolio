import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useGetCoinsQuery } from '../coinSlice';

import Table from './Table';


const CoinsTable = () => {
  let { data: coins, isLoading } = useGetCoinsQuery();
  coins = coins || [];

  const columns = useMemo(() => [
    {
      Header: 'Nombre',
      accessor: 'symbol'
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
      const { symbol, amount, price, marketCap, dailyChange, _id } = coin;
      return {
        id: _id,
        symbol,
        amount,
        price,
        total: amount * price,
        marketCap,
        dailyChange
      }
    })
  }, [coins])

  return (
    <div>
      <Table data={data} columns={columns} />
    </div>
   )
}

export default CoinsTable;