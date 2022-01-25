import React, { useEffect } from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { useDispatch, useSelector } from "react-redux";
import validateSignUpForm from "./utils/validateSignUpForm";
import { signup } from "~/src/app/user/userSlice";
import styles from './SignUpForm.module.css'
import FormContainer from "../FormContainer/FormContainer";
import SubmitButton from "../SubmitButton/SubmitButton";
import { Link } from "react-router-dom";
import { errorSelector, resetError } from "../../../../app/user/userSlice";


const SignUpForm = () => {
  const dispatch = useDispatch()
  const requestError = useSelector(errorSelector);
  useEffect(() => {
    dispatch(resetError());
  }, [])
  const handleSubmit = (formValues) => {
    dispatch(signup(formValues));
  }

  return (
    <FormContainer>
      <h2 className={styles.formTitle}>Crea tu portfolio.</h2>
      <p className={styles.formSubtitle}>Ya tenes una cuenta? <Link to="/login">Logueate</Link></p>
      <p className={styles.requestError}>{requestError}</p>
      <Form formValidator={validateSignUpForm} onSubmit={handleSubmit}>
        <Input name="username" label="Username" />
        <Input name="password" label="Password" type="password"/>
        <Input name="confirmPassword" type="password" label="Confirm password"/>
        <SubmitButton>Sign up</SubmitButton>
      </Form>
    </FormContainer>
  )
}

export default SignUpForm;