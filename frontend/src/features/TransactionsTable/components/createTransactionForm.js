import React from 'react';
import styled from 'styled-components';
import { Form, Input, SubmitButton } from "~/src/common";
import { useCreateTransactionMutation } from '../transactionSlice';

const FormContainer = styled.div`
  display: flex;
  max-width: 90vw;
  flex-direction: column;
  gap: var(--size-6);
  padding: var(--size-7);
  background-color: var(--clr-gray-3);
  border: 2px solid var(--clr-accent-7);
  border-radius: 7px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`

const FormTitle = styled.h3`
  text-align: center;
  color: var(--clr-gray-8);
`

const StyledInput = styled(Input)`
  border: none;
  max-width: 75vw;
  background-color: var(--clr-gray-1);
  border-radius: 5px;
  box-shadow: 1px -1px var(--clr-gray-3);
  padding: var(--size-3);
  margin-bottom: var(--size-5);
`
const StyledSubmitButton = styled(SubmitButton)`
  padding: var(--size-2);
  font-size: 1rem;
  border-radius: 3px;
  text-transform: lowercase;
  font-variant: small-caps;
  font-weight: 700;
  color: var(--clr-gray-7);
  border: 2px solid var(--clr-gray-7);
  background-color: var(--clr-accent-1);
  cursor: pointer;
  transition: all .3s ease-in-out;
  &:hover {
    background-color: var(--clr-gray-3);
  }
`
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const createTransactionForm = () => {
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

  const onSubmit = (formValues, resetValues) => {
    createTransaction(formValues);
    resetValues();
  }

  return (
    <FormContainer>
      <FormTitle>Crear nueva transaccion</FormTitle>
      <StyledForm onSubmit={onSubmit}>
        <StyledInput name="symbol" label="Nombre"/>
        <StyledInput name="amount" label="Cantidad" type="number"/>
        <StyledInput name="price" label="Precio" type="number"/>
        <StyledSubmitButton>Agregar transaccion</StyledSubmitButton>
      </StyledForm>
    </FormContainer>
  )
}

export default createTransactionForm;