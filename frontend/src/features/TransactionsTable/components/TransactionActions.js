import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEditRow, removeEditRow, isRowEdit, useUpdateTransactionMutation, addDeleteRow, removeDeleteRow, useDeleteTransactionMutation, isRowDelete } from '../transactionSlice';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import styled from 'styled-components';


const ConfirmAction = ({ onConfirm, onCancel }) => {
  return (
    <>
      <StyledButton className='confirm' onClick={onConfirm}><AiOutlineCheck /></StyledButton>
      <StyledButton className='cancel' onClick={onCancel}><AiOutlineClose /></StyledButton>
    </>
  )
}

const StyledButton = styled.button`
  visibility: ${({ hide }) => hide ? 'hidden' : 'visible'};
  background: none;
  border: none;
  font-size: 1.6rem;
  width: 30px;
  height: 30px;
  color: var(--clr-gray-8);
  cursor: pointer;
  &.confirm {
    color: green;
  }
  &.cancel {
    color: red;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const TransactionActions = ({ row }) => { 
  const [updateTransaction] = useUpdateTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const dispatch = useDispatch();
  const { id } = row.original;
  const isHover = row.isHover;
  const isEdit = useSelector(isRowEdit(id));
  const isDelete = useSelector(isRowDelete(id));

  const hideButtons = (!isHover && !isEdit && !isDelete);

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
        <StyledButton hide={hideButtons} onClick={handleEditRow}><AiOutlineEdit /></StyledButton>
        <StyledButton hide={hideButtons} onClick={handleSelectRowForDelete}><AiOutlineDelete /></StyledButton>
      </>
    )
  }


  return (
    <ButtonContainer>
      {actionButtons}
    </ButtonContainer>
  )
}

export default TransactionActions;