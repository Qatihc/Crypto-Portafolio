import React from 'react';
import { TextField } from '@mui/material';

const Input = ({ name, type, label, onChange, value, error }) => {
  return (
    <TextField id={name} type={type} name={name} label={label} variant="outlined" onChange={onChange} value={value} error={error}/>
  )
}

export default Input;