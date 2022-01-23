import React from 'react';

const TableLayout = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  toggleRowExpanded,
  renderRowSubcomponent
}) => {

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
           <tr {...row.getRowProps()} onClick={() => toggleRowExpanded(row.id)}>
             {row.cells.map(cell => {
               return (
                 <td {...cell.getCellProps()}>
                   {cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
           {row.isExpanded ? renderRowSubcomponent(row) : null}
           </>
         )
       })}
     </tbody>
   </table>
  )
}

export default TableLayout;