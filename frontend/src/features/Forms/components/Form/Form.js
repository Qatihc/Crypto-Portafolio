import React, { useState, useEffect } from 'react'
import useForm from '../../hooks/useForm'
import useFormValidator from '../../hooks/useFormValidator'
import Input from '../Input/Input'
import SubmitButton from '../SubmitButton/SubmitButton'
import styles from './Form.module.css'

const Form = ({ children, formValidator, onSubmit, ...props }) => {
  const [disableSubmit, setDisableSubmit] = useState(false);

  const inputNames = React.Children.toArray(children)
    .filter((child) => child.type === Input)
    .map((child) => child.props.name)
  
  const { formValues, handleInputChange } = useForm(inputNames);
  const { formErrors } = useFormValidator(formValues, formValidator);
  const isError = Object.values(formErrors).some(value => value);

  useEffect(() => {
    if (!disableSubmit) return;
    setDisableSubmit(isError)
  }, [formErrors])

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isError) return setDisableSubmit(true);
    
    return onSubmit(formValues);
  }

  const transformSubmitButtonChild = (child) => {
    return React.cloneElement(child, {
      handleSubmit,
      disabled: disableSubmit
    })
  }

  return (
    <form className={styles.form} {...props}>
      {React.Children.map(children, (child) => {
        if (child.type === Input) return transformInputChild(child);
        if (child.type === SubmitButton) return transformSubmitButtonChild(child);
        return child;
      })}
    </form>
  )
}

export default Form;