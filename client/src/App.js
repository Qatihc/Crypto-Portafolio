import React, { useState } from 'react';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import UserContext from './contexts/UserContext';
import { NavBar } from './components/NavBar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';

import styles from './App.modules.css'

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
      <main className={styles.mainGrid}>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="login" element={<LoginPage />}/>
          <Route path="signup" element={<SignUpPage />}/>
        </Routes>
      </main>
      </BrowserRouter>
    </UserContext.Provider>
    )
}

export { App };