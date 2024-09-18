// src/App.js
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from './components/AboutPage';
import MemberPage from './components/MemberPage';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';

function App() {
  

  return (
    <Router>
      <Routes>
      
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/navbar' element={<NavBar />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/member/:name" element={<MemberPage />} />

      </Routes>
    </Router>
  );
}

export default App;
