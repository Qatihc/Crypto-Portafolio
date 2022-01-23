import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllCoins } from '../../Portfolio/portfolioSlice';
import Table from './Table';

const CoinsTable = () => {
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
      const { symbol, amount, price } = coin;
      return {
        symbol,
        amount,
        price,
        total: amount * price
      }
    })
  }, [coins])

  const getExpandedRow = (row) => {
    const { symbol } = row.values;
    return (
      <tr>
        <td>{symbol}</td>
      </tr>
    )
  }

  return <Table columns={columns} data={data} getExpandedRow={getExpandedRow}/>
}

export default CoinsTable;