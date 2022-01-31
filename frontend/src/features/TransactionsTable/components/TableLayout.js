import React, { useState } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table'

const Table = styled.table`
  display: block;
  font-size: 1rem;
  height: 100%
`
const Tr = styled.tr`
  transition: all .3s ease-in-out;
  &:hover {
    box-shadow: 
      0 1px 3px hsla(0, 0%, 0%, .2);
  }

`

const Thead = styled.thead`
  background-color: var(--clr-accent-10);
  color: var(--clr-gray-3);
`

const Td = styled.td`
  text-align: end;
  padding: 0 3rem;
`

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
      <Table {...getTableProps()} onMouseLeave={() => setHoveredRow(null)}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </Tr>
          ))}
        </Thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            row.isHover = hoveredRow === row.id
            const rowKey = row.original.id;
            return (
              <Tr {...row.getRowProps(rowProps)} key={rowKey} onMouseEnter={() => setHoveredRow(row.id)}>
                {row.cells.map(cell => {
                  const cellKey = cell.column.id;
                  return(
                    <Td {...cell.getCellProps()} key={cellKey}>
                      {cell.render('Cell')}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default TableLayout;