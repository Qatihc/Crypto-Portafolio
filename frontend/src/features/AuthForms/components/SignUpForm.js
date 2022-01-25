import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import validateSignUpForm from "../utils/validateSignUpForm";
import { Link } from "react-router-dom";
import { Form, Input, FormContainer, SubmitButton, selectUserError, resetUserError, signup } from "~/src/app";
import styles from '../styles/AuthForm.module.css'

const SignUpForm = () => {
  const dispatch = useDispatch()
  const requestError = useSelector(selectUserError);
  useEffect(() => {
    dispatch(resetUserError());
  }, [])
  const handleSubmit = (formValues) => {
    dispatch(signup(formValues));
  }

  const inputClassNames = {
    input: styles.input,
    error: styles.error,
    inputError: styles.inputError
  }

  return (
    <FormContainer className={styles.formContainer}>
      <h2 className={styles.formTitle}>Crea tu portfolio.</h2>
      <p className={styles.formSubtitle}>Ya tenes una cuenta? <Link to="/login">Logueate</Link></p>
      <p className={styles.requestError}>{requestError}</p>
      <Form formValidator={validateSignUpForm} onSubmit={handleSubmit} className={styles.form}>
        <Input name="username" label="Username" classNames={inputClassNames} />
        <Input name="password" label="Password" type="password" classNames={inputClassNames}/>
        <Input name="confirmPassword" type="password" label="Confirm password" classNames={inputClassNames}/>
        <SubmitButton className={styles.submitButton}>Sign up</SubmitButton>
      </Form>
    </FormContainer>
  )
}

export default SignUpForm;