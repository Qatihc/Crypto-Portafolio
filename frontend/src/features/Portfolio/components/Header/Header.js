import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '~src/app/user/userSlice';
import styles from './Header.module.css';


const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }
  
  return (
    <header className={styles.header}>
      <button className={styles.logout} onClick={handleLogout}>logout</button>
    </header>
  )
}

export default Header;