import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCoins, fetchCoins } from '../coinSlice';

import Table from './Table';


const CoinsTable = () => {
  const dispatch = useDispatch();
  const coins = useSelector(selectAllCoins)
  useEffect(() => {
    dispatch(fetchCoins());
  }, [])

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
    }
  ], [])

  const data = useMemo(() => {
    return coins.map((coin) => {
      const { symbol, amount, price, _id } = coin;
      return {
        id: _id,
        symbol,
        amount,
        price,
        total: amount * price
      }
    })
  }, [coins])

  return (
    <Table data={data} columns={columns} />
   )
}

export default CoinsTable;