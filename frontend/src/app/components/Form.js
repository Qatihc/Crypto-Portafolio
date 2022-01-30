import React, { useState, useEffect } from 'react'
import useForm from '../hooks/useForm'
import useFormValidator from '../hooks/useFormValidator'
import { childrenByType, firstChildByType } from '../utils/selectChildrenByType'

import Input from './Input'
import SubmitButton from './SubmitButton'


const Form = ({ children, formValidator, onSubmit, className }) => {
  const [disableSubmit, setDisableSubmit] = useState(false);

  const inputChildren = childrenByType(children, Input);
  const submitButtonChild = firstChildByType(children, SubmitButton);
  const inputNames = inputChildren.map((child) => child.props.name)
  
  const { formValues, handleInputChange } = useForm(inputNames);
  /* Asumo que form validator no va a cambiar durante la ejecucion, y uso el hook condicionalmente ya que siempre ira a la misma rama. */
  const formErrors = formValidator ? useFormValidator(formValues, formValidator) : {};
  const isError = Object.values(formErrors).some(value => value);

  useEffect(() => {
    if (!disableSubmit) return;
    setDisableSubmit(isError)
  }, [formErrors])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isError) return setDisableSubmit(true);
    return onSubmit(formValues);
  }

  const transformInputChild = (child) => {
    const { name } = child.props;
    const value = formValues[name];
    const error = formErrors[name];
    return React.cloneElement(child, {
      onChange: handleInputChange,
      value,
      error,
      forceDisplayError: disableSubmit
    })
  }

  const transformSubmitButtonChild = (child) => {
    return React.cloneElement(child, {
      handleSubmit,
      disabled: disableSubmit
    })
  }

  return (
    <form className={className}>
      {inputChildren.map((child) => transformInputChild(child))}
      {transformSubmitButtonChild(submitButtonChild)}
    </form>
  )
}

export default Form;