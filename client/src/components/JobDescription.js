import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const JobDescription = ({ job }) => {
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [showFullReq, setShowFullReq] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const [formData, setFormData] = useState({
        coverLetter: '',
        resume: null,
        veteran: false,
        disability: false,
        agree: false
    });

    const toggleDescription = () => setShowFullDesc((prev) => !prev);
    const toggleRequirements = () => setShowFullReq((prev) => !prev);
    const toggleApplyForm = () => setIsApplying((prev) => !prev);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            resume: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Application Submitted Successfully!");
        setIsApplying(false);
    };

    return (
        <div className="card job-card">
            <img src={job.logo} alt="Company Logo" className="job-logo" />
            <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="card-text company-name">{job.company}</p>
                <p className="card-text">
                    {showFullDesc ? job.description : `${job.description.slice(0, 100)}...`}
                    <span className="toggle-link" onClick={toggleDescription}>
                        {showFullDesc ? " Show Less" : " Show More"}
                    </span>
                </p>
                <ul className="requirements-list">
                    {showFullReq
                        ? job.requirements.map((req, index) => <li key={index}>{req}</li>)
                        : job.requirements.slice(0, 5).map((req, index) => <li key={index}>{req}</li>)
                    }
                </ul>
                <span className="toggle-link" onClick={toggleRequirements}>
                    {showFullReq ? " Show Less" : " Show More"}
                </span>
                <p><strong>Job Type:</strong> {job.type}</p>
                
                <div className="job-market">
                    <Pie
                        data={{
                            labels: ["IT", "Finance", "Healthcare", "Education"],
                            datasets: [{
                                data: [25, 25, 25, 25],
                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                            }],
                        }}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
                <p><strong>Posted on:</strong> {job.datePosted}</p>
                <p><strong>Criteria:</strong> {job.criteria}</p>
                <button className="btn btn-primary apply-button" onClick={toggleApplyForm}>Apply</button>
            </div>

            {isApplying && (
                <div className="apply-form-overlay">
                    <div className="apply-form">
                        <h3>Apply for {job.title} at {job.company}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Cover Letter</label>
                                <textarea
                                    name="coverLetter"
                                    className="form-control"
                                    value={formData.coverLetter}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Resume</label>
                                <input
                                    type="file"
                                    name="resume"
                                    className="form-control"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    name="veteran"
                                    className="form-check-input"
                                    checked={formData.veteran}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">Veteran</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    name="disability"
                                    className="form-check-input"
                                    checked={formData.disability}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">Disability</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    name="agree"
                                    className="form-check-input"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">I agree to the terms and conditions</label>
                            </div>
                            <button type="submit" className="btn btn-success mt-3">Submit</button>
                            <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={toggleApplyForm}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDescription;
