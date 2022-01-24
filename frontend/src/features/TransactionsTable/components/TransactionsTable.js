import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, /* selectCurrentPageTransactions */ } from '../transactionSlice';


const TransactionsTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(fetchTransactions({offset: 0}));
  }, [])

/*   const page = useSelector(selectCurrentPageTransactions); */
/*   console.log(page); */
  return ('hola')
}

export default TransactionsTable;