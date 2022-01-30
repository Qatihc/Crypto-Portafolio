import { useState, useEffect } from 'react'

const useFormValidator = (formValues, formValidator) => {
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const newFormErrors = {};
    for (const inputName in formValues) {
      const inputValidator = formValidator[inputName];
      newFormErrors[inputName] = inputValidator(formValues);
    }
    setFormErrors(newFormErrors);
  }, [formValues])
  return formErrors;
}


export default useFormValidator
