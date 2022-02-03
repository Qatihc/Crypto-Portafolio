import React, { useState } from 'react';
import styled from 'styled-components';
import { useBlockLayout, useTable } from 'react-table'
import { devices } from '~/src/common';

const Table = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  border-radius: 50px;
  border: 4px solid var(--clr-gray-3);
`

const TableLayout = ({ 
  columns,
  data,
  defaultColumn,
  pageSize,
  TableHeader,
  TableData,
  TableRow
}) => {
  const tableInstance = useTable({ columns, data, defaultColumn }, useBlockLayout );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  const getEmptyRows = () => {
    const emptyRows = [];
    const totalEmptyRows = pageSize - rows.length;
    for (let i = 0; i < totalEmptyRows; i++) {
      emptyRows.push(
        <TableRow key={i}>
          {headerGroups[0].headers.map((column) => (
            <TableData className={column.id + ' ' + 'empty'} key={column.id}>
                <span></span>
            </TableData>
          ))}
        </TableRow>
      )
    }
    return emptyRows
  }

  return (
    <>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader key={column.id} className={column.id}>
                  {column.render('Header')}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            const rowKey = row.original.id;
            return (
              <TableRow {...row.getRowProps()} key={rowKey}>
                {row.cells.map(cell => {
                  const cellKey = cell.column.id;
                  return(
                    <TableData key={cellKey} className={cell.column.id}>
                      {cell.render('Cell')}
                    </TableData>
                  )
                })}
              </TableRow>
            )
          })}
          {getEmptyRows()}
        </tbody>
      </Table>
    </>
  )
}

export default TableLayout;