import React from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";

import { useDispatch } from "react-redux";

import validateSignUpForm from "./utils/validateSignUpForm";
import { signup } from "~/src/app/user/userSlice";
import styles from './SignUpForm.module.css'
import FormContainer from "../FormContainer/FormContainer";
import SubmitButton from "../SubmitButton/SubmitButton";
import { Link } from "react-router-dom";


const SignUpForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = (formValues) => {
    dispatch(signup(formValues));
  }

  return (
    <FormContainer>
      <h2 className={styles.formTitle}>Crea tu portfolio.</h2>
      <p className={styles.formSubtitle}>Ya tenes una cuenta? <Link to="/login">Logueate</Link></p>
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