import React from 'react';
import { LoginForm } from '../../features/Forms';

import styles from './LoginPage.module.css'

const LoginPage = () => {
  return (
    <div className={styles.pageContainer}>
      <LoginForm />
    </div>
  )
}

export default LoginPage;