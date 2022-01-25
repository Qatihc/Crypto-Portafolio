import React, { useState, useEffect } from 'react';

const Input = ({ 
  name,
  type,
  label,
  onChange,
  value,
  error,
  forceDisplayError,
  classNames
}) => {
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
    <div>
      <input
        className={`${classNames.input} ${(displayError) ? classNames.inputError : ''}`}
        name={name}
        type={type}
        aria-label={label}
        placeholder={label}
        onChange={onChange}
        value={value}
        onBlur={handleBlur}
      />
      <p className={classNames.error}>{(displayError) ? error : ''}</p>
    </div>
  )
}
  
export default Input;