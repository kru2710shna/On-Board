import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const JobsItem = ({ job }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{job.jobTitle}</h3>
        <p className="card-text">{job.jobDescription}</p>
        <p className="card-text"><strong>Company:</strong> {job.jobCompany}</p>
        <p className="card-text"><strong>Salary:</strong> ${job.jobSalary}</p>
        
        {/* Icon Section */}
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-outline-danger mx-2">
            <i className="fa-solid fa-trash"></i>
          </button>
          <button className="btn btn-outline-primary mx-2">
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobsItem;
