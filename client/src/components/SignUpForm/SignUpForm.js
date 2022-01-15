import React from "react";
import { useForm } from "../../hooks";
import { Form } from "../Form";
import { Input } from "../Input";
import { signup } from "../../api";

import validateSignUpForm from "./utils/validateSignUpForm";

const SignUpForm = () => {

  const { formValues, formErrors, handleChange } = useForm(validateSignUpForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formValues);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input name="username" label="Username" onChange={handleChange} value={formValues.username} />
        <Input name="password" type="password" label="Password" onChange={handleChange} value={formValues.password} />
        <Input name="confirmPassword" type="password" label="Confirm password" onChange={handleChange} value={formValues.confirmPassword} />
        <input type="submit" value="Sign up"></input>
      </Form>
    </>
  )
}

export default SignUpForm;