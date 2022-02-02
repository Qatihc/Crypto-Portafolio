import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logout } from '~/src/common';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { devices } from '~/src/common/constants';
import { selectNavbarOpen, close } from '../navbarSlice';
import { FaBitcoin, FaWallet } from "react-icons/fa";


const NavbarContainer = styled.nav`
  display: flex;
  position: absolute;
  z-index: 100;
  border-right: 2px solid var(--clr-gray-3);
  height: 100%;
  width: var(--size-13);
  grid-row: span 2;
  grid-column: 1;
  background-color: var(--clr-gray-1);
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
  margin-left: var(--size-6);
  gap: var(--size-6);
`

const UserGreeting = styled.p`
  margin: var(--size-5) 0;
  text-align: left;
  width: 100%;
  font-size: var(--size-5);
  color: var(--clr-gray-6);
`

const CloseNavbarOnClickOutside = styled.div`
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

const LinkContainer = styled.li`
  display: flex;
  gap: var(--size-3);
  align-items: center;
  justify-content: flex-start;
  font-size: 1.2rem;
  & svg {
    color: var(--clr-gray-6);
  }
`

const StyledLink = styled(NavLink)`
  &, &:active, &:focus, &:hover {
    text-decoration: none;
    color: var(--clr-gray-9);
  }

  &.active {
    color: var(--clr-accent-7);
  }

  &:hover {
    color: var(--clr-accent-3);
  }

  transition: all .25s ease-in-out;
`



const LinksList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  width: 100%;
  list-style: none;
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
    <CloseNavbarOnClickOutside onClick={() => dispatch(close())} isOpen={isOpen} />
    <NavbarContainer isOpen={isOpen}>
      <NavbarTop>
        <UserGreeting>Bienvenido <br/>{currentUser}</UserGreeting>
        <LinksList>
          <LinkContainer>
            <FaBitcoin />
            <StyledLink to="coins" onClick={() => dispatch(close())}>Monedas</StyledLink>
          </LinkContainer>
          <LinkContainer>
            <FaWallet />
            <StyledLink to="transactions" onClick={() => dispatch(close())}>Transacciones</StyledLink>
          </LinkContainer>
        </LinksList>
      </NavbarTop>
      <button onClick={handleLogout}>logout</button>
    </NavbarContainer>
    </>
  )
}

export default Navbar