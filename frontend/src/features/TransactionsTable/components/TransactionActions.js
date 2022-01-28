import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEditRow, removeEditRow, isRowEdit } from '../transactionSlice';
import styles from './TransactionActions.module.css'

const TransactionActions = ({ row }) => { 
  const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);
  const dispatch = useDispatch();
  const { id } = row.original;
  const isHover = row.isHover
  const isEdit = useSelector(isRowEdit(id))

  const handleUpdateRow = () => {
    dispatch(addEditRow(id))
  }
  const handleDeleteRow = () => {
    setShowConfirmPrompt(true)
  }

  /* IS DELETE PROVISOINAL */ const isDelete = false;

  let actionButtons;
  if (isEdit) {
    actionButtons = <ConfirmAction onConfirm={() => alert('upda')} onCancel={() => dispatch(removeEditRow(id))}/>
  } 
  else if (isDelete) {
    /* TO DO */
  } 
  else {
    actionButtons = (
      <>
        <button onClick={handleUpdateRow}>Upda</button>
        <button onClick={handleDeleteRow}>Dele</button>
      </>
    )
  }

  if (!isHover && !isEdit && !isDelete) return null;

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