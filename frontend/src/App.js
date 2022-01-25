import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { LandingPage } from './pages/LandingPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { LoginForm } from './features/AuthForms';
import { SignUpForm } from './features/AuthForms';
import { Provider } from 'react-redux';
import styles from './App.modules.css'
import store from './app/store';

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
      <main className={styles.mainGrid}>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/signup" element={<LandingPage form={<SignUpForm/>}/>} />
          <Route path="/login" element={<LandingPage form={<LoginForm/>}/>}/>
          <Route path="/portfolio" element={<PortfolioPage />}/>
        </Routes>
      </main>
      </BrowserRouter>
    </Provider>
    )
}

export { App };