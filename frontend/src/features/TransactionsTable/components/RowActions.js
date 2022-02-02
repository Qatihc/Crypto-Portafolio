import React, { useEffect } from 'react';
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
  background: none;
  border: none;
  font-size: 1.6rem;
  width: 30px;
  height: 30px;
  color: var(--clr-gray-5);
  cursor: pointer;
  transition: all .3s ease-in-out;
  &:hover {
    color: var(--clr-accent-7);
  }
  &.confirm {
    color: var(--clr-accent-5);
  }
  &.cancel {
    color: var(--clr-danger-2);
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--size-5);
`

const RowActions = ({ row }) => { 
  const [updateTransaction] = useUpdateTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const dispatch = useDispatch();
  const { id } = row.original;
  const isEdit = useSelector(isRowEdit(id));
  const isDelete = useSelector(isRowDelete(id));

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
        <StyledButton onClick={handleEditRow}><AiOutlineEdit /></StyledButton>
        <StyledButton onClick={handleSelectRowForDelete}><AiOutlineDelete /></StyledButton>
      </>
    )
  }


  return (
    <ButtonContainer>
      {actionButtons}
    </ButtonContainer>
  )
}

export default RowActions;