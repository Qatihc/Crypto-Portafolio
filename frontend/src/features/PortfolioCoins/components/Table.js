import React from 'react';
import { useTable, useExpanded } from "react-table";

const Table = ({ columns, data, getExpandedRow }) => {
  const tableInstance = useTable({ columns, data }, useExpanded);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleRowExpanded,
    state: { expanded }
  } = tableInstance

  return (
   <table {...getTableProps()}>
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
         return (
           <>
           <tr {...row.getRowProps()} onClick={() => {toggleRowExpanded(row.id)}}>
             {row.cells.map(cell => {
               return (
                 <td {...cell.getCellProps()}>
                   {cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
           {row.isExpanded ? getExpandedRow(row) : null}
           </>
         )
       })}
     </tbody>
   </table>
  )
}

export default Table;