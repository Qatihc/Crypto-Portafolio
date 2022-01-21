import React, { useState, useEffect } from 'react';
import styles from './Input.module.css';

const Input = ({ name, type, label, onChange, value, errorMsg }) => {
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    if (errorMsg === null && displayError) setDisplayError(false);
  })

  const handleBlur = () => {
    setDisplayError(true);
  }
  
  console.log(errorMsg)
  return (
    <div className={styles.inputContainer}>
      <input
        className={`${styles.input} ${(displayError) ? styles.inputError : ''}`}
        name={name}
        aria-label={name} 
        type={type}
        placeholder={label}
        onChange={onChange}
        value={value}
        onBlur={handleBlur}
        autoComplete='off'
      />
      <p className={styles.errorMsg}>{errorMsg}</p>
    </div>
  )
}
  
export default Input;