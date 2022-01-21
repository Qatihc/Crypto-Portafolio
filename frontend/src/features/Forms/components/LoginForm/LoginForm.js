import React from "react";
import Input from "../Input/Input";
import Form from "../Form/Form";
import FormContainer from "../FormContainer/FormContainer";

import validateLoginForm from "./utils/validateLoginForm";
import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { login } from "~/src/app/user/userSlice";



import styles from './LoginForm.module.css';
import SubmitButton from "../SubmitButton/SubmitButton";
import { Link } from "react-router-dom";


const LoginForm = () => {
  const { formValues, formErrors, handleChange } = useForm(validateLoginForm);
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formValues));
  }

  return (
    <FormContainer>
      <h2 className={styles.formTitle}>Ingresa a tu portfolio.</h2>
      <p className={styles.formSubtitle}>No tenes una cuenta? <Link to="/signup">Registrate</Link></p>
      <Form onInputChange={handleChange} formValues={formValues} formErrors={formErrors}>
        <Input name="username" label="Username"/>
        <Input name="password" label="Password" type="password"/>
        <SubmitButton onClick={handleSubmit}>Log in</SubmitButton>
      </Form>
    </FormContainer>
  )
}

export default LoginForm;