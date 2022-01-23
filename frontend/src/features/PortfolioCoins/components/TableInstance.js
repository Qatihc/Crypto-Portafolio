import React from 'react';
import { useTable, useExpanded } from "react-table";
import CoinTransactionsSubtable from './CoinTransactionsSubtable';
import TableLayout from "./TableLayout";

const TableInstance = ({ columns, data }) => {
  const tableInstance = useTable({ 
    columns,
    data,
    autoResetExpanded: false
  }, useExpanded);
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleRowExpanded
  } = tableInstance

  const renderRowSubcomponent = (row) => {
    return <CoinTransactionsSubtable row={row} />
  }

  return (
    <TableLayout 
      getTableProps={getTableProps} 
      getTableBodyProps={getTableBodyProps}
      headerGroups={headerGroups}
      rows={rows}
      prepareRow={prepareRow}
      toggleRowExpanded={toggleRowExpanded}
      renderRowSubcomponent={renderRowSubcomponent}
    />
  )
}

export default TableInstance;
