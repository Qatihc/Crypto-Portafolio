import React from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";
import useForm from "../../hooks/useForm";
import validateSignUpForm from "./utils/validateSignUpForm";
import { useDispatch } from "react-redux";
import { signup } from "~/src/app/user/userSlice";

const SignUpForm = () => {
  const { formValues, formErrors, handleChange } = useForm(validateSignUpForm);
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signup(formValues));
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input name="username" label="Username" onChange={handleChange} value={formValues.username} errorMsg={formErrors.username}/>
        <Input name="password" type="password" label="Password" onChange={handleChange} value={formValues.password} errorMsg={formErrors.password}/>
        <Input name="confirmPassword" type="password" label="Confirm password" onChange={handleChange} value={formValues.confirmPassword} errorMsg={formErrors.confirmPassword}/>
        <input type="submit" value="Sign up"></input>
      </Form>
    </>
  )
}

export default SignUpForm;