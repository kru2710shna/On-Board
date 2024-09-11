// src/components/AboutPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Our Team</h1>
      <ul>
        <li><Link to="/member/krushna-thakkar">Krushna Thakkar</Link></li>
        <li><Link to="/member/khayal-dobariya">Khayal Dobariya</Link></li>
        <li><Link to="/member/shrey-kevadia">Shrey Kevadia</Link></li>
        <li><Link to="/member/chetas-parekh">Chetas Parekh</Link></li>
        <li><Link to="/member/jimmie">Jimmie</Link></li>
        <li><Link to="/member/justin">Justin</Link></li>
      </ul>
    </div>
  );
};

export default AboutPage;
