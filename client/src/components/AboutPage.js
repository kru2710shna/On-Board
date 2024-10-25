// src/components/AboutPage.js
import React from 'react';
import { Link } from 'react-router-dom';


const AboutPage = () => {
  return (
    <div className="container about my-5">
      <header className="text-center mb-4">
        <h1>About Our Team
        </h1>

        <p>Meet the professional individuals behind the Job Portal Project.</p>
      </header>
      <div className="row justify-content-center">
        {["krushna-thakkar", "khayal-dobaria", "shrey-kevadia", "chetas-parekh", "jimmie"].map(member => (
          <div className="col-md-3 col-sm-6 mb-4" key={member}>
            <div className="card text-center rounded-3 shadow-sm p-3">
              <div className="card-body">
                <Link to={`/member/${member}`} className="card-link">
                  {member.charAt(0).toUpperCase() + member.slice(1).replace(/-/g, ' ')}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
