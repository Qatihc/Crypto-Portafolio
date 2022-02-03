import { Form, Input, SubmitButton } from '~/src/common';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: var(--clr-gray-2);
  border-radius: 10px;
  padding-top: 2rem;
`

const StyledForm = styled(Form)`
  gap:  var(--size-5);
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledInput = styled(Input)`
  width: 90%;
  margin: 0 5%;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid transparent;
  border-radius: 7px;
  background-color: var(--clr-gray-3);

  &.error {
    border: 1px solid var(--clr-danger-2);
  }
  & + .errorMsg {
    margin: 0 5%;
    color: var(--clr-danger-2);
  }
  // Si el mensaje de error esta vacio, muestro un espacio 
  // para reservar el lugar que ocuparia el mensaje
  & + .errorMsg:empty::before {
    content: "\\A0";
  }
`

const StyledSubmitButton = styled(SubmitButton)`
  border: none;
  color: var(--clr-gray-1);
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 0 0 10px 10px;
  background-color: var(--clr-accent-9);
  cursor: pointer;
  transition: all ease-in-out .2s;

  &:hover, &:focus {
    background-color: var(--clr-accent-7);
  }
  &:disabled {
    background-color: var(--clr-gray-7);
  }
`

const FormTitle = styled.h2`
  text-align: center;
`

const FormSubtitle = styled.p`
  text-align: center;
  margin-bottom: 2rem;
`

const FormError = styled.p`
  text-align: center;
  margin-bottom: var(--size-3);
  color: var(--clr-danger-2);
`

export { 
  FormContainer,
  StyledForm,
  StyledInput,
  StyledSubmitButton,
  FormTitle,
  FormSubtitle,
  FormError
};