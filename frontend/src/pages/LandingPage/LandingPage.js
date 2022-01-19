import React from 'react';
import { Link } from "react-router-dom";
import styles from './LandingPage.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { currentUserSelector, logout } from '../../app/user/userSlice';
import { fetchPortfolio } from '../../features/Portfolio/portfolioSlice';

const LandingPage = () => {
  const currentUser = useSelector(currentUserSelector);
  const dispatch = useDispatch()
  dispatch(fetchPortfolio())
  return (
    <main className={styles.pageContainer}>
      {(currentUser) ? <p onClick={() => dispatch(logout())}>log out</p> : null}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Crypto Portfolio</h1>
        <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam leo nisi, condimentum eget magna sed, venenatis dapibus tortor. Proin non lobortis nunc, vitae auctor magna. Nulla sed malesuada arcu.</p>
        <div className={styles.btnContainer}>
          {(currentUser) ?
            <Link to="portfolio">My Portfolio</Link> :
            <>
              <Link to="signup">Sign up</Link>
              <Link to="login">Log in</Link>
            </>
          }
        </div>
      </div>
    </main>
  )
}

export default LandingPage;