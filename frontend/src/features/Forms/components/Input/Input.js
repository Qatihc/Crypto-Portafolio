import React, { useState, useEffect } from 'react';
import styles from './Input.module.css';

const Input = ({ name, type, label, onChange, value, error, forceDisplayError }) => {
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    if (!forceDisplayError) return;
    setDisplayError(error);
  }, [forceDisplayError])

  useEffect(() => {
    if (error) return;
    setDisplayError(false);
  }, [error])

  const handleBlur = () => {
    if (error) setDisplayError(true);
  }
  
  return (
    <div className={styles.inputContainer}>
      <input
        className={`${styles.input} ${(displayError) ? styles.inputError : ''}`}
        name={name}
        type={type}
        aria-label={label}
        placeholder={label}
        onChange={onChange}
        value={value}
        onBlur={handleBlur}
        autoComplete='off'
      />
      <p className={styles.error}>{(displayError) ? error : ''}</p>
    </div>
  )
}
  
export default Input;