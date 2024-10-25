import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import JobContext from '../context/Jobs/jobsContext';
import JobsItem from './JobsItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const Jobs = () => {
  const navigate = useNavigate();
  const context = useContext(JobContext);
  const { jobs } = context;

  if (!jobs) {
    return <div>No jobs available</div>;
  }

  return (
    <>
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Available Jobs</h1>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/AddJob')}  
          >
            Add Job
          </button>
        </div>
        <div className="row mt-4">
          {jobs.map((job) => (
            <div key={job._id} className="col-md-4 mb-3">
              <JobsItem job={job} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Jobs;
