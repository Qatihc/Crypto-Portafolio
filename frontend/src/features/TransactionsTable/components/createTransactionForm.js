import React from 'react';
import { Form, Input, SubmitButton } from "~/src/common";
import { useCreateTransactionMutation } from '../transactionSlice';
const createTransactionForm = () => {
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

  const onSubmit = (formValues) => {
    createTransaction(formValues);
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Input name="symbol" label="Nombre"/>
        <Input name="amount" label="Cantidad" type="number"/>
        <Input name="price" label="Precio" type="number"/>
        <SubmitButton>Agregar</SubmitButton>
      </Form>
    </div>
  )
}

export default createTransactionForm;