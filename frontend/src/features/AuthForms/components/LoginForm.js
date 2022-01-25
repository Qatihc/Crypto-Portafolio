import React, { useEffect } from "react";
import validateLoginForm from "../utils/validateLoginForm";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, FormContainer, SubmitButton, selectUserError, resetUserError, login } from "~/src/app";

import styles from '../styles/AuthForm.module.css'

const LoginForm = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetUserError());
  }, [])

  const requestError = useSelector(selectUserError);
  const handleSubmit = (formValues) => {
    dispatch(login(formValues));
  }

  const inputClassNames = {
    input: styles.input,
    error: styles.error,
    inputError: styles.inputError
  }

  return (
    <FormContainer className={styles.formContainer}>
      <h2 className={styles.formTitle}>Ingresa a tu portfolio.</h2>
      <p className={styles.formSubtitle}>No tenes una cuenta? <Link to="/signup">Registrate</Link></p>
      <p className={styles.requestError}>{requestError}</p>
      <Form formValidator={validateLoginForm} onSubmit={handleSubmit} className={styles.form}>
        <Input name="username" label="Username" classNames={inputClassNames}/>
        <Input name="password" label="Password" type="password" classNames={inputClassNames}/>
        <SubmitButton className={styles.submitButton}>Log in</SubmitButton>
      </Form>
    </FormContainer>
  )
}

export default LoginForm;