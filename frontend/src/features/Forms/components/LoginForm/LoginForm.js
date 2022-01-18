import React from "react";
import Input from "../Input/Input";
import Form from "../Form/Form";

import validateLoginForm from "./utils/validateLoginForm";
import useForm from "../../hooks/useForm";

const LoginForm = () => {

  const { formValues, formErrors, handleChange } = useForm(validateLoginForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
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