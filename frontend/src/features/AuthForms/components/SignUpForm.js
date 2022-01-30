import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import validateSignUpForm from "../utils/validateSignUpForm";
import { Link } from "react-router-dom";
import { selectUserError, resetUserError, signup } from "~/src/app";
import styles from '../styles/AuthForm.module.css'

import { FormContainer, StyledForm, StyledInput, StyledSubmitButton, FormTitle, FormSubtitle, FormError } from "./StyledComponents";


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
      <FormTitle>Crea tu portfolio.</FormTitle>
      <FormSubtitle>Ya tenes una cuenta? <Link to="/login">Logueate</Link></FormSubtitle>
      <FormError>{requestError}</FormError>
      <StyledForm formValidator={validateSignUpForm} onSubmit={handleSubmit} >
        <StyledInput name="username" label="Username" />
        <StyledInput name="password" label="Password" type="password" />
        <StyledInput name="confirmPassword" type="password" label="Confirm password" />
        <StyledSubmitButton>Sign up</StyledSubmitButton>
      </StyledForm>
    </FormContainer>
  )
}

export default SignUpForm;