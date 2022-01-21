import React from "react";
import Input from "../Input/Input";
import Form from "../Form/Form";
import FormContainer from "../FormContainer/FormContainer";
import validateLoginForm from "./utils/validateLoginForm";
import { useDispatch, useSelector } from "react-redux";
import { login, errorSelector } from "~/src/app/user/userSlice";
import styles from './LoginForm.module.css';
import SubmitButton from "../SubmitButton/SubmitButton";
import { Link } from "react-router-dom";


const LoginForm = () => {
  const dispatch = useDispatch()
  const submitError = useSelector(errorSelector);
  const handleSubmit = (formValues) => {
    dispatch(login(formValues));
  }

  return (
    <FormContainer>
      <h2 className={styles.formTitle}>Ingresa a tu portfolio.</h2>
      <p className={styles.formSubtitle}>No tenes una cuenta? <Link to="/signup">Registrate</Link></p>
      {submitError}
      <Form formValidator={validateLoginForm} onSubmit={handleSubmit}>
        <Input name="username" label="Username"/>
        <Input name="password" label="Password" type="password"/>
        <SubmitButton>Log in</SubmitButton>
      </Form>
    </FormContainer>
  )
}

export default LoginForm;