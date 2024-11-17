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
        setJobDetails({ jobTitle: '', jobDescription: '', jobCompany: '', jobSalary: '', jobType: '' });
    };

    const handleChange = (e) => {
        setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <h1 className="mb-4">Add a New Job</h1>
            <div className="mb-3">
                <label htmlFor="jobTitle" className="form-label">Job Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="jobTitle"
                    name="jobTitle"
                    value={jobDetails.jobTitle}
                    onChange={handleChange}
                    placeholder="Enter job title"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="jobDescription" className="form-label">Job Description</label>
                <textarea
                    className="form-control"
                    id="jobDescription"
                    name="jobDescription"
                    value={jobDetails.jobDescription}
                    onChange={handleChange}
                    placeholder="Describe the job responsibilities and qualifications"
                    rows="4"
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
                    value={jobDetails.jobCompany}
                    onChange={handleChange}
                    placeholder="Enter company name"
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
                    value={jobDetails.jobSalary}
                    onChange={handleChange}
                    placeholder="Enter salary amount"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="jobType" className="form-label">Job Type</label>
                <input
                    type="text"
                    className="form-control"
                    id="jobType"
                    name="jobType"
                    value={jobDetails.jobType}
                    onChange={handleChange}
                    placeholder="Full-Time/Part-Time/Intern"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit Job</button>
        </form>
    );
};

export default AddJob;
