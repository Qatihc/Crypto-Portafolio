import React from 'react';

const SubmitButton = ({ handleSubmit, disabled, children, className = "" }) => {
  return (
    <button className={className} onClick={handleSubmit} disabled={disabled}>{children}</button>
  )
}

export default SubmitButton



