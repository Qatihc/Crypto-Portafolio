import React from 'react';
import { Navigate } from "react-router-dom";
import styles from './LandingPage.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { currentUserSelector, logout } from '../../app/user/userSlice';



const LandingPage = ({ form }) => {
  const currentUser = useSelector(currentUserSelector);
  if (currentUser) return <Navigate to="/portfolio" />
  return (
    <div className={styles.pageContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Crypto Portfolio</h1>
        <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam leo nisi, condimentum eget magna sed, venenatis dapibus tortor. Proin non lobortis nunc, vitae auctor magna. Nulla sed malesuada arcu.</p>
      </div>
      <div className={styles.userFormContainer}>
        {form}
      </div>
    </div>
  )
}

export default LandingPage;