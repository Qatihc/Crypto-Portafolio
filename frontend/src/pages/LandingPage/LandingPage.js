import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { Link } from "react-router-dom";
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  return (
    <main className={styles.pageContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Crypto Portfolio</h1>
        <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam leo nisi, condimentum eget magna sed, venenatis dapibus tortor. Proin non lobortis nunc, vitae auctor magna. Nulla sed malesuada arcu.</p>
        <div className={styles.btnContainer}>
          {(user) ?
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