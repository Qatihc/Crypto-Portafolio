import React, { useState } from 'react';
import styled from 'styled-components';
import { useBlockLayout, useTable } from 'react-table'
import { devices } from '~/src/common';

const Table = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
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
  const [hoveredRow, setHoveredRow] = useState(null);
  const tableInstance = useTable({ columns, data, defaultColumn, minRows:10 }, useBlockLayout );
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
        <TableRow>
          {headerGroups[0].headers.map((column) => (
            <TableData {...column.getHeaderProps()} className={column.id + ' ' + 'empty'}>
                <span>&nbsp;</span>
            </TableData>
          ))}
        </TableRow>
      )
    }
    return emptyRows
  }

  return (
    <>
      <Table {...getTableProps()} onMouseLeave={() => setHoveredRow(null)}>
        <thead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader {...column.getHeaderProps()} className={column.id}>
                  {column.render('Header')}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            row.isHover = hoveredRow === row.id
            const rowKey = row.original.id;
            return (
              <TableRow {...row.getRowProps()} key={rowKey} onMouseEnter={() => setHoveredRow(row.id)}>
                {row.cells.map(cell => {
                  const cellKey = cell.column.id;
                  return(
                    <TableData {...cell.getCellProps()} key={cellKey} className={cell.column.id}>
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