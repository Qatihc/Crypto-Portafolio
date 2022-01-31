import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { open } from '../navbarSlice';
import { devices } from '~/src/common'
import styled from 'styled-components';

const OpenNavbarButton = ({ className }) => {
  const dispatch = useDispatch();
  return (
    <button className={className} onClick={() => dispatch(open())}><AiOutlineMenu size={40}/></button>
  )
}

export default styled(OpenNavbarButton)`
  background-color: none;
  border: none;
  background: transparent;
  width: 3rem;

  @media ${devices.largeScreen} {
    display: none;
  }
`;