import React from 'react';
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';

import { Provider } from 'react-redux';
import styles from './App.modules.css'
import store from './app/store';

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
      <main className={styles.mainGrid}>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="login" element={<LoginPage />}/>
          <Route path="signup" element={<SignUpPage />}/>
        </Routes>
      </main>
      </BrowserRouter>
    </Provider>
    )
}

export { App };