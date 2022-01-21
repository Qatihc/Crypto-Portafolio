import { useState } from "react";

const useForm = (inputNames = []) => {

  const initialState = inputNames.reduce((acc, name) => ({ ...acc, [name]: ''}), {}) 
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const newFormValues = {
      ...formValues,
      [name]: value
    }
    setFormValues(newFormValues);
  }

  return { formValues, handleInputChange };
}

export default useForm;