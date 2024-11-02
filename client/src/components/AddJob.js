import React, { useState, useContext } from 'react';
import JobContext from '../context/Jobs/jobsContext';

const AddJob = () => {
  const { addJob } = useContext(JobContext);

  const [jobDetails, setJobDetails] = useState({
    jobTitle: '',
    jobDescription: '',
    jobCompany: '',
    jobSalary: '',
    jobType: ''
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob(jobDetails);  
    setJobDetails({ jobTitle: '', jobDescription: '', jobCompany: '', jobSalary: '',  jobType: ''});
  };

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="jobTitle" className="form-label">Job Title</label>
        <input
          type="text"
          className="form-control"
          id="jobTitle"
          name="jobTitle"
          onChange={handleChange}
          placeholder="Enter job title"
          value={jobDetails.jobTitle}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="jobDescription" className="form-label">Job Description</label>
        <textarea
          className="form-control"
          id="jobDescription"
          name="jobDescription"
          onChange={handleChange}
          rows="4"
          placeholder="Describe the job responsibilities and qualifications"
          value={jobDetails.jobDescription}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="jobCompany" className="form-label">Company Name</label>
        <input
          type="text"
          className="form-control"
          id="jobCompany"
          name="jobCompany"
          onChange={handleChange}
          placeholder="Enter company name"
          value={jobDetails.jobCompany}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="jobSalary" className="form-label">Salary</label>
        <input
          type="number"
          className="form-control"
          id="jobSalary"
          name="jobSalary"
          onChange={handleChange}
          placeholder="Enter salary amount"
          value={jobDetails.jobSalary}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="jobType" className="form-label">Type</label>
        <input
          type="text"
          className="form-control"
          id="jobType"
          name="jobType"
          onChange={handleChange}
          placeholder="Full-Time/Part-Time/Intern"
          value={jobDetails.jobType}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Submit Job</button>
    </form>
  );
}

export default AddJob;
