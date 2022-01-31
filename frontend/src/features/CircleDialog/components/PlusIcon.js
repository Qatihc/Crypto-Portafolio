import React from 'react';
import styled from "styled-components";

const Button = styled.button`
  position: relative;
  box-sizing: border-box;
  background: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 50%;
  padding:15px;
  border: 2px solid ${({ color }) => color};
  outline: none;
  box-shadow: none;
  cursor: pointer;
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
    width: 2px;
    background-color: ${({ color }) => color};
  }

  &::after {
    transform: 
      translate(-50%,-50%) 
      rotate(90deg);
  }
`

const PlusIcon = ({ onClick, className, size, color = 'black', backgroundColor = 'white' }) => {
  return (
    <Button className={className} onClick={onClick} size={size} color={color} backgroundColor={backgroundColor}/>
  )
}

export default PlusIcon;