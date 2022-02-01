import React, { useState, useMemo } from 'react';
import { isRowEdit, useGetTransactionsCountQuery, useGetTransactionsQuery } from '../transactionSlice';
import formatDate from '../utils/formatDate';
import CreateTransactionForm from './createTransactionForm';
import TableLayout from './TableLayout';
import TransactionActions from './TransactionActions';
import { useSelector } from 'react-redux';
import { CircleDialog } from '../../CircleDialog';
import styles from 'styled-components';
import EditableCell from './EditableCell';
import { TableData, TableHeader, TableRow } from '~/src/common';
import styled from 'styled-components';
import formatNumber from '../utils/formatNumber';

const Container = styles.div`
  display: flex;
  flex-direction: column;
`

const TransactionTableData = styled(TableData)`
  text-align: center;
  &.amount, &.price, &.total {
    text-align: right;
  }
  &.date {
    width: 200px;
  }
  &.actions {
    width: 100px;
  }

  &.price::before, &.total::before {
    content: '$ ';
  }
  /* No muestro simbolo de moneda en las celdas vacias */
  &.empty::before {
    content: '';
  }
`
const TransactionTableHeader = styled(TableHeader)`
  text-align: center;
  &.amount, &.price, &.total {
    text-align: right;
  }
  &.date {
    width: 200px;
  }
  &.actions {
    width: 100px;
  }
`

const TransactionTableRow = styled(TableRow)`
`

const TransactionsTable = () => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(15);

  const { data: totalTransactions } = useGetTransactionsCountQuery();
  const { data: response, isLoading } = useGetTransactionsQuery({ pageNumber: currentPage, pageSize });
  const transactions = response ? response.transactions : [];

  /* Si borro la ultima transaccion de una pagina, y hay una pagina atras de esta, paso a mostrar esta */
  if (transactions.length === 0 && currentPage !== 1) setCurrentPage(currentPage - 1)
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
      canUpdate: true,
    },
    {
      Header: 'Total',
      accessor: 'total',
      type: 'number',
      canUpdate: false,
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
      let { symbol, amount, price, date, _id } = coin;
      const total = formatNumber(amount * price);
      amount = formatNumber(amount);
      price = formatNumber(price);
      date = formatDate(date);
      return {
        id: _id,
        symbol,
        amount,
        price,
        date,
        total,
      }
    })
  }, [transactions])


  if (isLoading) return '...cargando...';

  const firstPage = 1;
  const lastPage = Math.ceil(totalTransactions / pageSize);
  const canPreviousPage = currentPage > firstPage;
  const canNextPage = currentPage < lastPage;
  
  const defaultColumn = {
    Cell: ({ row, value, column }) => (column.canUpdate && useSelector(isRowEdit(row.original.id))) ? <EditableCell row={row} value={value} column={column} /> : value
  }

  return (
    <Container>
      <CircleDialog>
        <CreateTransactionForm />
      </CircleDialog>
      <TableLayout
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
        pageSize={pageSize}
        TableHeader={TransactionTableHeader}
        TableData={TransactionTableData}
        TableRow={TransactionTableRow}
      />
      <div className="pagination">
        
        <button onClick={() => setCurrentPage(firstPage)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        {currentPage} {' '}
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={!canNextPage}>
          {'qq>'}
        </button>{' '}
        <button onClick={() => setCurrentPage(lastPage)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
      </div>
    </Container>
  )
}

export default TransactionsTable;