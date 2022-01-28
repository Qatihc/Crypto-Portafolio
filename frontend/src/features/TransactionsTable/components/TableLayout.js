import React, { useState } from 'react';
import { useTable } from 'react-table'

const TableLayout = ({ columns, data, defaultColumn, rowProps }) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const tableInstance = useTable({ columns, data, defaultColumn });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <>
      <table {...getTableProps()} onMouseLeave={() => setHoveredRow(null)}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            row.isHover = hoveredRow === row.id
            const rowKey = row.original.id;
            return (
              <tr {...row.getRowProps(rowProps)} key={rowKey} onMouseEnter={() => setHoveredRow(row.id)}>
                {row.cells.map(cell => {
                  const cellKey = cell.column.id;
                  return(
                    <td {...cell.getCellProps()} key={cellKey}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default TableLayout;