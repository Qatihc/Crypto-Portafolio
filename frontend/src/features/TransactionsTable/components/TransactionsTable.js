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
  const canNextPage = currentPageNumber !== pageCount;
  const canPreviousPage = currentPageNumber !== 1;

  const nextPage = () => {
    dispatch(goToPage(currentPageNumber + 1));
  }

  const previousPage = () => {
    dispatch(goToPage(currentPageNumber - 1));
  }

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

  const tableInstance = useTable(
    { 
      columns,
      data ,
      manualPagination: true,
      defaultPageSize: 20,
      minRows: 20,
      pageCount: useSelector(transactionSelectors.selectPageCount)
    }, 
    usePagination,
    );

  return (
    <>
      <TableLayout 
        {...tableInstance}
      />
      <div className="pagination">
        <button onClick={() => dispatch(gotoPage(0))} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'qq>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
      </div>
    </>
  )
}

export default TransactionsTable;