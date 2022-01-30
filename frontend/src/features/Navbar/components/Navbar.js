import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logout } from '~/src/common';
import { Link } from "react-router-dom";
import styled from 'styled-components';


const NavbarContainer = styled.nav`
  display: flex;
  width: var(--size-13);
  min-height: 100vh;
  background-color: var(--clr-gray-2);
  flex-direction: column;
  justify-content: space-between;
`

const NavbarTop = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--size-3);
`
const UserGreeting = styled.p`
  text-align: center;
  margin: var(--size-5) 0;
`

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <NavbarContainer>
      <NavbarTop>
        <UserGreeting>Bienvenido <br/>{currentUser}</UserGreeting>
        <Link to="coins">Monedas</Link>
        <Link to="transactions">Transacciones</Link>
      </NavbarTop>
      <button onClick={handleLogout}>logout</button>
    </NavbarContainer>
  )
}

export default Navbar