import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializePages, goToPage } from '../transactionSlice';


const TransactionsTable = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(initializePages({}));
    dispatch(goToPage(1));
    dispatch(goToPage(2));
    dispatch(goToPage(3));
  }, [])

/*   const page = useSelector(selectCurrentPageTransactions); */
/*   console.log(page); */
  return ('hola')
}

export default TransactionsTable;