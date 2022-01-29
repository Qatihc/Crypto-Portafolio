import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEditRow, removeEditRow, isRowEdit, useUpdateTransactionMutation, addDeleteRow, removeDeleteRow, useDeleteTransactionMutation, isRowDelete } from '../transactionSlice';
import styles from './TransactionActions.module.css'

const TransactionActions = ({ row }) => { 
  const [updateTransaction] = useUpdateTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const dispatch = useDispatch();
  const { id } = row.original;
  const isHover = row.isHover;
  const isEdit = useSelector(isRowEdit(id));
  const isDelete = useSelector(isRowDelete(id));

  if (!isHover && !isEdit && !isDelete) return null;

  const handleEditRow = () => {
    dispatch(addEditRow(id))
  }
  const handleUpdateRow = () => {
    updateTransaction({ transactionId: id, ...row.editedValues });
    dispatch(removeEditRow(id));
  }

  const handleSelectRowForDelete = () => {
    dispatch(addDeleteRow(id))
  }

  const handleDeleteRow = () => {
    deleteTransaction({ transactionId: id });
  }

  let actionButtons;
  if (isEdit) {
    actionButtons = <ConfirmAction onConfirm={handleUpdateRow} onCancel={() => dispatch(removeEditRow(id))}/>
  } 
  else if (isDelete) {
    actionButtons = <ConfirmAction onConfirm={handleDeleteRow} onCancel={() => dispatch(removeDeleteRow(id))}/>
  } 
  else {
    actionButtons = (
      <>
        <button onClick={handleEditRow}>Upda</button>
        <button onClick={handleSelectRowForDelete}>Dele</button>
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