import React from 'react';
import { firstChildByType } from '../../../app/utils/selectChildrenByType';
import TableHead from './TableHead';
import TableData from './TableData';


const Table = ({ children }) => {
  const TableHeadChild = firstChildByType(children, TableHead);
  return (
    <table>
      {TableHeadChild}
    </table>
  )
}

export default Table;