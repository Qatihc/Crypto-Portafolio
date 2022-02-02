import React, { useState, useEffect, useMemo } from 'react';
import { isRowEdit, useGetTransactionsCountQuery, useGetTransactionsQuery } from '../transactionSlice';
import CreateTransactionForm from './createTransactionForm';
import RowActions from './RowActions';
import { useSelector } from 'react-redux';
import { CircleDialog } from '../../CircleDialog';
import EditableCell from './EditableCell';
import { TableData, TableHeader, TableRow, TableLayout, devices, formatNumber, formatDate } from '~/src/common';
import styled from 'styled-components';
import PageSelector from './PageSelector';

const ScrollableContainer = styled('div')`
  overflow: auto;
`
const TransactionTableData = styled(TableData)`
  &.symbol {
    font-weight: 700;
  }

  &.amount, &.price, &.total {
    justify-content: right;
  }
  &.date {
    width: 200px;
  }
  &.actions {
    width: 100px;
  }

  &.price::before, &.total::before {
    content: '$';
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

const TableActions = styled.div`
  display: flex;
  right: 0;
  justify-content: space-between;
  margin: var(--size-2) var(--size-5);
`

const StickyCircleDialog = styled(CircleDialog)`
`

const TransactionsTable = () => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ pageSize, setPageSize ] = useState(13);

  const { data: totalTransactions } = useGetTransactionsCountQuery();
  const { data: response, isLoading } = useGetTransactionsQuery({ pageNumber: currentPage, pageSize });
  const transactions = response ? response.transactions : [];

  /* Si borro la ultima transaccion de una pagina, y hay una pagina atras de esta, retrocedo a ella */
  if (transactions.length === 0 && currentPage !== 1) setCurrentPage(currentPage - 1)

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
      Header: '',
      accessor: 'actions',
      Cell: ({ row }) => <RowActions row={row}/>
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
  
  const defaultColumn = {
    Cell: ({ row, value, column }) => (column.canUpdate && useSelector(isRowEdit(row.original.id))) ? <EditableCell row={row} value={value} column={column} /> : value
  }

  return (
    <>
      <TableActions>
        <PageSelector 
          pageSize={pageSize}
          elementCount={totalTransactions}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <StickyCircleDialog buttonPosition='top'>
          <CreateTransactionForm />
        </StickyCircleDialog>
      </TableActions>
      <ScrollableContainer>
        <TableLayout
          columns={columns}
          data={data}
          defaultColumn={defaultColumn}
          pageSize={pageSize}
          TableHeader={TransactionTableHeader}
          TableData={TransactionTableData}
          TableRow={TransactionTableRow}
        />
      </ScrollableContainer>
    </>
  )
}


export default TransactionsTable;