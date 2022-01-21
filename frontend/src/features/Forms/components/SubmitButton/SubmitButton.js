import React from 'react';
import styles from './SubmitButton.module.css';

const SubmitButton = ({ onClick, children }) => {
  return (
    <button className={styles.submitButton} onClick={onClick}>{children}</button>
  )
}

export default SubmitButton



