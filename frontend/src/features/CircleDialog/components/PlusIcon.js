import React from 'react';
import styled from "styled-components";

const Button = styled.button`
  position: relative;
  box-sizing: border-box;
  background: none;
  background-color: white;
  border-radius: 50%;
  padding:15px;
  border: 2px solid ${({ active }) => active ? 'red' : 'green'};
  outline: none;
  box-shadow: none;
  cursor: pointer;
  &:focus {
    border: 2px solid var(--clr-accent-7);
  }

  ${({ size }) =>
    `
    height: ${size};
    width: ${size};
    `
  }
  &::before, &::after {
    position: absolute;
    content: '';
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    height: ${({ size }) => size };
    width: 4px;
    background-color: ${({ active }) => active ? 'red' : 'green'};
    transition: all .45s ease-in-out;
  }
  &::after {
    transform: 
      translate(-50%,-50%) 
      rotate(90deg);
  }
`

const PlusIcon = ({ onClick, className, size, active }) => {
  return (
    <Button 
      className={className}
      onClick={onClick}
      size={size}
      active={active}
      tabIndex={0}
      role={'Open create transaction form.'}
    />
  )
}

export default PlusIcon;