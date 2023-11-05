import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DefaultPage from './pages/DefaultPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import RegisterPage from './pages/RegisterPage';
import SearchedPage from './pages/SearchedPage';
import ViewQuizPage from './pages/ViewQuizPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<SearchedPage />} />
        <Route path="/" element={<DefaultPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/viewquiz/:quizID" element={<ViewQuizPage />} />
      </Routes>
    </BrowserRouter>
      );
}

export default App;
