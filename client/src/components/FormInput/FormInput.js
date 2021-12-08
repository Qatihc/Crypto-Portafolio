import React, {useState}  from 'react';

const FormInput = ({
  name,
  type,
  placeholder,
  ...aditionalProps
}) => {
  const [inputType, setInputType] = useState('password');
  
  const toggleShowPassword = () => {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  }

  return (
    <div>
      <input
      name={name}
      type={type === 'password' ? inputType : type}
      placeholder={placeholder}
      {...aditionalProps}
      >
      </input>
      {
        type === 'password' && 
        <span onClick={toggleShowPassword}>
          show
        </span> 
      }
    </div>
  )
};

export default FormInput;