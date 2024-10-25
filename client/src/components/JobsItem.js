import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobsItem = ({ job }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h3 className="card-title">{job.jobTitle}</h3>
        <p className="card-text">{job.jobDescription}</p>
        <p className="card-text"><strong>Company:</strong> {job.jobCompany}</p>
        <p className="card-text"><strong>Salary:</strong> ${job.jobSalary}</p>
      </div>
    </div>
  );
}

export default JobsItem;
