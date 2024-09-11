// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from './components/AboutPage';
import MemberPage from './components/MemberPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/member/:name" element={<MemberPage />} />
      </Routes>
    </Router>
  );
}

export default App;
