import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePagination, useTable } from 'react-table';
import { initializePages, goToPage, transactionSelectors } from '../transactionSlice';
import TableLayout from './TableLayout';


const TransactionsTable = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(initializePages({}));
    dispatch(goToPage(1));
  }, [])

  const currentPageNumber = useSelector(transactionSelectors.selectCurrentPageNumber);
  const pageCount = useSelector(transactionSelectors.selectPageCount);
  const transactions = useSelector(transactionSelectors.selectCurrentPageTransactions);

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
    return transactions.map((coin) => {
      const { symbol, amount, price, _id } = coin;
      return {
        id: _id,
        symbol,
        amount,
        price,
        total: amount * price
      }
    })
  }, [transactions])

  return (
    <>
      <TableLayout
        columns={columns}
        data={data}
      />
    </>
  )
}

export default TransactionsTable;