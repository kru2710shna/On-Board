//client/src/components/Jobs.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import JobContext from '../context/Jobs/jobsContext';
import JobsItem from './JobsItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../context/Auth/authContext';

const Jobs = () => {
  const context = useContext(JobContext);
  const authContext = useContext(AuthContext);
  const { userType } = authContext;
  const { jobs, getalljobs, addJob, editjob } = context;

  const [currentJob, setCurrentJob] = useState(null);
  const [newJob, setNewJob] = useState({ jobTitle: '', jobDescription: '', jobSalary: '', jobCompany: '', jobType: '' });
  const editRef = useRef(null);
  const addRef = useRef(null);

  useEffect(() => {
    getalljobs();
  }, [getalljobs]);

  const handleUpdateJob = (job) => {
    setCurrentJob(job);
    editRef.current.click();
  };

  const handleEditSubmit = async () => {
    if (currentJob) {
      await editjob(currentJob._id, currentJob.jobTitle, currentJob.jobDescription, currentJob.jobSalary, currentJob.jobType, currentJob.jobCompany);
      getalljobs();
    }
  };

  const handleAddSubmit = async () => {
    try {
      // Check for required fields
      if (!newJob.jobTitle || !newJob.jobDescription || !newJob.jobCompany || !newJob.jobSalary) {
        console.log("Please fill in all required fields.");
        alert("Please fill in all required fields.");
        return; // Exit function early if validation fails
      }
      console.log("Adding job:", newJob);
      await addJob(newJob);

      // Reset form fields after successful submission
      setNewJob({ jobTitle: '', jobDescription: '', jobSalary: '', jobCompany: '', jobType: '' });

      // Refresh job list to reflect new addition
      await getalljobs();

    } catch (error) {
      console.error("Error in handleAddSubmit:", error);
    }
  };
  const handleEditChange = (e) => {
    setCurrentJob({ ...currentJob, [e.target.name]: e.target.value });
  };

  const handleAddChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Available Jobs</h1>
        {userType === 'Company' && (
          <button className="btn btn-primary" onClick={() => addRef.current.click()}>Add Job</button>
        )}
        {userType !== 'Student' && (
          <button type="button" ref={editRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editJobModal">
            Launch Edit Modal
          </button>
        )}
        <button type="button" ref={addRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#addJobModal">
          Launch Add Modal
        </button>
      </div>

      {/* Edit Job Modal */}
      <div className="modal fade" id="editJobModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Job</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" name="jobTitle" value={currentJob?.jobTitle || ''} onChange={handleEditChange} className="form-control mb-2" placeholder="Job Title" />
              <textarea name="jobDescription" value={currentJob?.jobDescription || ''} onChange={handleEditChange} className="form-control mb-2" placeholder="Job Description"></textarea>
              <input type="text" name="jobCompany" value={currentJob?.jobCompany || ''} onChange={handleEditChange} className="form-control mb-2" placeholder="Company Name" />
              <input type="number" name="jobSalary" value={currentJob?.jobSalary || ''} onChange={handleEditChange} className="form-control mb-2" placeholder="Salary" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleEditSubmit} data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Job Modal */}
      <div className="modal fade" id="addJobModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Job</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" name="jobTitle" value={newJob.jobTitle} onChange={handleAddChange} className="form-control mb-2" placeholder="Job Title" />
              <textarea name="jobDescription" value={newJob.jobDescription} onChange={handleAddChange} className="form-control mb-2" placeholder="Job Description"></textarea>
              <input type="text" name="jobCompany" value={newJob.jobCompany} onChange={handleAddChange} className="form-control mb-2" placeholder="Company Name" />
              <input type="number" name="jobSalary" value={newJob.jobSalary} onChange={handleAddChange} className="form-control mb-2" placeholder="Salary" />
              <input type="text" name="jobType" value={newJob.jobType} onChange={handleAddChange} className="form-control mb-2" placeholder="Type" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAddSubmit} data-bs-dismiss="modal">Add Job</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        {jobs.map((job) => (
          <div key={job._id} className="col-md-4 mb-3">
            <JobsItem job={job} UpdateJob={handleUpdateJob} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;