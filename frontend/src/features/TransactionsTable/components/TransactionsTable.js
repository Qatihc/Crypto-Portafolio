import React, { useEffect, useState, useMemo } from 'react';
import { usePagination, useTable } from 'react-table';
import { useGetTransactionsCountQuery, useGetTransactionsQuery } from '../transactionSlice';
import formatDate from '../utils/formatDate';
import TableLayout from './TableLayout';


const TransactionsTable = () => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(15);

  const { data: totalTransactions } = useGetTransactionsCountQuery();
  const { data: response, isLoading } = useGetTransactionsQuery({ pageNumber: currentPage, pageSize });
  const transactions = response ? response.transactions : [];

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
      Header: 'Fecha',
      accessor: 'date'
    },
  ], [])

  const data = useMemo(() => {
    return transactions.map((coin) => {
      const { symbol, amount, price, date, _id } = coin;
      return {
        id: _id,
        symbol,
        amount,
        price,
        date: formatDate(date),
        total: amount * price
      }
    })
  }, [transactions])


  if (isLoading) return '...cargando...';

  const firstPage = 1;
  const lastPage = Math.ceil(totalTransactions / pageSize);
  const canPreviousPage = currentPage !== firstPage;
  const canNextPage = currentPage !== lastPage;
  return (
    <>
      <TableLayout
        columns={columns}
        data={data}
      />
      <div className="pagination">
        <div>current page {currentPage}</div>
        <button onClick={() => setCurrentPage(firstPage)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={!canNextPage}>
          {'qq>'}
        </button>{' '}
        <button onClick={() => setCurrentPage(lastPage)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
      </div>
    </>
  )
}

export default TransactionsTable;