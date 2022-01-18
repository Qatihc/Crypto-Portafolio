import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

const Input = ({ name, type, label, onChange, value, errorMsg }) => {
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    if (errorMsg === null && displayError) setDisplayError(false);
  })

  const handleBlur = () => {
    setDisplayError(true);
  }

  return (
    <TextField 
      id={name} 
      type={type} 
      name={name} 
      label={label} 
      variant="outlined" 
      onChange={onChange} 
      value={value}
      error={displayError}
      /* Si no estoy mostrando un mensaje de ayuda, y paso a mostrarlo se mueve el input, para evitar esto muestro siempre un espacio. (https://mui.com/components/text-fields/#helper-text) */
      helperText={(displayError) ? errorMsg : ' '}
      onBlur={handleBlur}
    />
  )
}
  
export default Input;