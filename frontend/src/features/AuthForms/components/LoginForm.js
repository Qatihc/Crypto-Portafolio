import React, { useEffect } from "react";
import validateLoginForm from "../utils/validateLoginForm";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserError, resetUserError, login } from "~/src/common";

import { FormContainer, StyledForm, StyledInput, StyledSubmitButton, FormTitle, FormSubtitle, FormError } from "./StyledComponents";

const LoginForm = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetUserError());
  }, [])

  const requestError = useSelector(selectUserError);
  const handleSubmit = (formValues) => {
    dispatch(login(formValues));
  }

  return (
    <FormContainer>
      <FormTitle>Ingresa a tu portfolio.</FormTitle>
      <FormSubtitle>No tenes una cuenta? <Link to="/signup">Registrate</Link></FormSubtitle>
      <FormError>{requestError}</FormError>
      <StyledForm formValidator={validateLoginForm} onSubmit={handleSubmit} >
        <StyledInput name="username" label="Username" />
        <StyledInput name="password" label="Password" type="password" />
        <StyledSubmitButton >Log in</StyledSubmitButton>
      </StyledForm>
    </FormContainer>
  )
}

export default LoginForm;