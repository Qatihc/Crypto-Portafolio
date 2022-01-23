import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCoins, selectCoinById, fetchCoinTransactions } from '../../Portfolio/portfolioSlice';
import TableInstance from './TableInstance';

const CoinsTable = () => {
  const dispatch = useDispatch();
  const coins = useSelector(selectAllCoins)
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

  return <TableInstance columns={columns} data={data}/>
}

export default CoinsTable;