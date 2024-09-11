import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="container about">
      <header>
        <h1>About Our Team</h1>
        <p>Meet the talented individuals behind the Job Portal Project.</p>
      </header>
      <div className="team">
        <div className="team-member">
          <Link to="/member/krushna-thakkar">Krushna Thakkar</Link>
        </div>
        <div className="team-member">
          <Link to="/member/khayal-dobaria">Khayal Dobariya</Link>
        </div>
        <div className="team-member">
          <Link to="/member/shrey-kevadia">Shrey Kevadia</Link>
        </div>
        <div className="team-member">
          <Link to="/member/chetas-parekh">Chetas Parekh</Link>
        </div>
        <div className="team-member">
          <Link to="/member/jimmie">Jimmie</Link>
        </div>
        <div className="team-member">
          <Link to="/member/justin">Justin</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
