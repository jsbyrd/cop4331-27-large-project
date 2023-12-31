import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DefaultPage from './pages/DefaultPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import RegisterPage from './pages/RegisterPage';
import SearchedPage from './pages/SearchedPage';
import ViewQuizPage from './pages/ViewQuizPage';
import TestPage from './pages/TestPage';
import CreateQuizPage from './pages/CreateQuizPage';
import VerificationPage from './pages/VerificationPage';
import DoVerificationPage from './pages/DoVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  // Fetch user info from local storage
  // useEffect(() => {
  //   if (userID === null) {
  //     const userInfo = localStorage.getItem('userInfo');
  //     if (userInfo) {
  //       setUserID(userInfo.userID);
  //     }
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/search/:query" element={<SearchedPage />} />
        <Route path="/viewquiz/:quizID" element={<ViewQuizPage />} />
        <Route path="/taketest/:quizID" element={<TestPage />} />
        <Route path="/createquiz" element={<CreateQuizPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/doverify" element={<DoVerificationPage />} />
        <Route path="/reset" element={<ForgotPasswordPage />} />
        <Route path="/doreset" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
      );
}

export default App;
