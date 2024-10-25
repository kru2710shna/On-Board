import React, { useContext } from 'react';
import JobContext from '../context/Jobs/jobsContext';
import JobsItem from './JobsItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const Jobs = () => {
  const context = useContext(JobContext);
  const { jobs } = context;

  if (!jobs) {
    return <div>No jobs available</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center my-4">Available Jobs</h1>
      <div className="row">
        {jobs.map((job) => (
          <div key={job._id} className="col-md-4 mb-3"> {/* Column layout for each card */}
            <JobsItem job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
