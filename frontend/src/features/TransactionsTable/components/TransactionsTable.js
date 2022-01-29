import React, { useEffect, useState, useMemo } from 'react';
import { isRowEdit, useGetTransactionsCountQuery, useGetTransactionsQuery } from '../transactionSlice';
import formatDate from '../utils/formatDate';
import CreateTransactionForm from './createTransactionForm';
import TableLayout from './TableLayout';
import TransactionActions from './TransactionActions';
import { useSelector } from 'react-redux';
import styles from './TableLayout.module.css'

const EditableCell = ({ row, value: initialValue, column }) => {
  const columnName = column.id;
  if (!row.editedValues) row.editedValues = {};
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    /* Esta bugueado, si trato de volver al valor original con una update no actualiza y manda el valor anterior. Arreglar. */
    if (row.original[columnName] !== value) {
      row.editedValues[columnName] = value;
    }
  }, [value]);

  const type = (column.type) ? column.type : 'text';

  const handleChange = (e) => {
    console.log(row)
    setValue(e.target.value)
  }

  return <input type={type} value={value} onChange={handleChange}/>
}

const TransactionsTable = () => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(15);

  const { data: totalTransactions } = useGetTransactionsCountQuery();
  const { data: response, isLoading } = useGetTransactionsQuery({ pageNumber: currentPage, pageSize });
  const transactions = response ? response.transactions : [];

  /* Type es un atributo que defini yo, usado para saber que tipo de input mostrar al modificar la celda correspondiente a cada columna. */
  const columns = useMemo(() => [
    {
      Header: 'Nombre',
      accessor: 'symbol',
      type: 'text',
      canUpdate: false
    },
    {
      Header: 'Cantidad',
      accessor: 'amount',
      type: 'number',
      canUpdate: true,
    },
    {
      Header: 'Precio',
      accessor: 'price',
      type: 'number',
      canUpdate: true
    },
    {
      Header: 'Total',
      accessor: 'total',
      type: 'number',
      canUpdate: false
    },
    {
      Header: 'Fecha',
      accessor: 'date',
      type: 'date',
      canUpdate: false,
    },
    {
      Header: 'Acciones',
      accessor: 'actions',
      Cell: ({ row }) => <TransactionActions row={row}/>
    }
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
  
  const defaultColumn = {
    Cell: ({ row, value, column }) => (column.canUpdate && useSelector(isRowEdit(row.original.id))) ? <EditableCell row={row} value={value} column={column} /> : value
  }

  return (
    <>
      <CreateTransactionForm />
      <TableLayout
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
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