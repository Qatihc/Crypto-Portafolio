import React from "react";
import { useForm } from "../../hooks";
import { Form } from "../Form";
import { Input } from "../Input";
import validateLoginForm from "./utils/validateLoginForm";
import { login } from "../../api";

/* import { useForm } from "react-hook-form"; */

const LoginForm = () => {

  const { formValues, formErrors, handleChange } = useForm(validateLoginForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formValues);
    console.log(res);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input name="username" label="Username" onChange={handleChange} value={formValues.username} />
        <Input name="password" type="password" label="Password" onChange={handleChange} value={formValues.password} />
        <input type="submit" value="Log in"></input>
      </Form>
    </>
  )
}

export default LoginForm;