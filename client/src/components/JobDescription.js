import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const JobDescription = ({ job }) => {
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [showFullReq, setShowFullReq] = useState(false);

    const toggleDescription = () => setShowFullDesc((prev) => !prev);
    const toggleRequirements = () => setShowFullReq((prev) => !prev);

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
                <button className="btn btn-primary apply-button">Apply</button>
            </div>
        </div>
    );
};

export default JobDescription;
