import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logout } from '~/src/common';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { devices } from '~/src/common/constants';
import { selectNavbarOpen, close } from '../navbarSlice';

const NavbarContainer = styled.nav`
  display: flex;
  position: absolute;
  z-index: 100;
  height: 100%;
  width: var(--size-13);
  grid-row: span 2;
  grid-column: 1;
  background-color: var(--clr-gray-5);
  flex-direction: column;
  justify-content: space-between;
  transition: all .5s ease-in-out;
  ${({ isOpen }) => isOpen ?
  `
    transform: translateX(0);
  ` :
  `
    transform: translateX(calc(-1 * var(--size-13)));
  `
  }
  @media ${devices.largeScreen} {
    position: initial;
    transform: translateX(0);
    grid-row: 1/4;
  }
`

const NavbarTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--size-3);
`

const UserGreeting = styled.p`
  text-align: center;
  margin: var(--size-5) 0;
`

const Test = styled.div`
  position: absolute;
  z-index: 99;
  min-width: 100vw;
  min-height: 100vh;
  background: black;
  transition: opacity .5s ease-in-out;
  ${({ isOpen }) => isOpen ?
  `
    opacity: 0.8;
  ` :
  `
    pointer-events: none; 
    opacity: 0;
  `
  }
  @media ${devices.largeScreen} {
    opacity: 0;
  }
`

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isOpen = useSelector(selectNavbarOpen);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <>
    <Test onClick={() => dispatch(close())} isOpen={isOpen} />
    <NavbarContainer isOpen={isOpen}>
      <NavbarTop>
        <UserGreeting>Bienvenido <br/>{currentUser}</UserGreeting>
        <Link to="coins" onClick={() => dispatch(close())}>Monedas</Link>
        <Link to="transactions" onClick={() => dispatch(close())}>Transacciones</Link>
      </NavbarTop>
      <button onClick={handleLogout}>logout</button>
    </NavbarContainer>
    </>
  )
}

export default Navbar