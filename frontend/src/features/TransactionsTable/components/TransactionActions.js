import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEditRow, removeEditRow, isRowEdit, useUpdateTransactionMutation } from '../transactionSlice';
import styles from './TransactionActions.module.css'

const TransactionActions = ({ row }) => { 
  const [updateTransaction, { isLoading }] = useUpdateTransactionMutation();
  const dispatch = useDispatch();
  const { id } = row.original;
  const isHover = row.isHover
  const isEdit = useSelector(isRowEdit(id))
    /* IS DELETE PROVISOINAL */ const isDelete = false;

  if (!isHover && !isEdit && !isDelete) return null;

  const handleEditRow = () => {
    dispatch(addEditRow(id))
  }
  const handleUpdateRow = () => {
    updateTransaction({ transactionId: id, ...row.editedValues });
    dispatch(removeEditRow(id));
  }

  const handleDeleteRow = () => {
  }

  let actionButtons;
  if (isEdit) {
    actionButtons = <ConfirmAction onConfirm={handleUpdateRow} onCancel={() => dispatch(removeEditRow(id))}/>
  } 
  else if (isDelete) {
    /* TO DO */
  } 
  else {
    actionButtons = (
      <>
        <button onClick={handleEditRow}>Upda</button>
        <button onClick={handleDeleteRow}>Dele</button>
      </>
    )
  }


  return (
    <div className={styles.actionsContainer}>
      {actionButtons}
    </div>
  )
}

const ConfirmAction = ({ onConfirm, onCancel }) => {
  return (
    <>
      <button onClick={onConfirm}>si</button>
      <button onClick={onCancel}>no</button>
    </>
  )
}

export default TransactionActions;