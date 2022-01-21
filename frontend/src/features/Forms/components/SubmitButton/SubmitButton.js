import React from 'react';
import styles from './SubmitButton.module.css';

const SubmitButton = ({ handleSubmit, disabled, children }) => {
  return (
    <button className={styles.submitButton} onClick={handleSubmit} disabled={disabled}>{children}</button>
  )
}

export default SubmitButton



