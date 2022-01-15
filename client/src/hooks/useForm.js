import { useState, useEffect } from "react";

const useForm = (validateForm) => {

  /* Si no declaro un value inicial para cada input, durante el primer render estos serian no controlados,
   pero luego de que su value cambie pasarian a ser controlados, lo cual no esta permitido. */
  const initialState = {};
  const inputNames = Object.keys(validateForm);
  for (const name of inputNames) {
    initialState[name] = '';
  }

  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialState);
  console.log(formValues);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues, 
      [name]: value
    });
  }

  return { formValues, formErrors, handleChange };
}

export default useForm;