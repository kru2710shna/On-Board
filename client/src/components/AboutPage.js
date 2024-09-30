import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

const AboutPage = () => {
  return (
    <>
      <NavBar />
      <div className="container about my-5">
        <header className="text-center mb-4">
          <h1>About Our Team</h1>
          <p>Meet the professional individuals behind the Job Portal Project.</p>
        </header>
        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center rounded-3 shadow-sm p-3">
              <div className="card-body">
                <Link to="/member/krushna-thakkar" className="card-link">
                  Krushna Thakkar
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center rounded-3 shadow-sm p-3">
              <div className="card-body">
                <Link to="/member/khayal-dobaria" className="card-link">
                  Khayal Dobariya
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center rounded-3 shadow-sm p-3">
              <div className="card-body">
                <Link to="/member/shrey-kevadia" className="card-link">
                  Shrey Kevadia
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center rounded-3 shadow-sm p-3">
              <div className="card-body">
                <Link to="/member/chetas-parekh" className="card-link">
                  Chetas Parekh
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center rounded-3 shadow-sm p-3">
              <div className="card-body">
                <Link to="/member/jimmie" className="card-link">
                  Jimmie
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
