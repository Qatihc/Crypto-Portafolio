import React from "react";
import { useForm } from "../../hooks";
import { Form } from "../Form";
import { Input } from "../Input";
import validateLoginForm from "./utils/validateLoginForm";
import { login } from "../../api/authApi";

const LoginForm = () => {

  const { formValues, formErrors, handleChange } = useForm(validateLoginForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {err, data} = await login(formValues);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input name="username" label="Username" onChange={handleChange} value={formValues.username} errorMsg={formErrors.username}/>
        <Input name="password" type="password" label="Password" onChange={handleChange} value={formValues.password} errorMsg={formErrors.password}/>
        <input type="submit" value="Log in"></input>
      </Form>
    </>
  )
}

export default LoginForm;