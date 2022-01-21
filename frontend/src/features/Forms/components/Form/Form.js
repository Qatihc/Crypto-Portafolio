import React from 'react'
import Input from '../Input/Input'
import styles from './Form.module.css'

const Form = ({ children, onInputChange, formValues, formErrors, ...props }) => {
  return (
    <form className={styles.form} {...props}>
      {React.Children.map(children, (child) => {
        if (child.type !== Input) return child;
        const { name } = child.props;
        return React.cloneElement(child, {
          onChange: onInputChange,
          value: formValues[name],
          errorMsg: formErrors[name]
        })
      })}
    </form>
  )
}

export default Form;