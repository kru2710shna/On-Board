//client/src/components/Jobs.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Jobs.css';
import JobContext from '../context/Jobs/jobsContext';
import AuthContext from '../context/Auth/authContext';
import JobsItem from './JobsItem';

const Jobs = () => {
  const jobContext = useContext(JobContext);

  const { jobs, getalljobs, addJob, editjob, deletejob , ApplyJob } = jobContext;
  const { type} = useContext(AuthContext);

  const [currentJob, setCurrentJob] = useState(null);
  const [newJob, setNewJob] = useState({
    jobTitle: '',
    jobDescription: '',
    jobSalary: '',
    jobCompany: '',
    jobType: '',
    jobRequirements: ''
  });

  const editRef = useRef(null);
  const addRef = useRef(null);

  // Fetch all jobs on component mount
  useEffect(() => {
    getalljobs();
  }, [getalljobs]);

  // Update job form
  const handleUpdateJob = (job) => {
    setCurrentJob(job); // Set the job to be edited
    editRef.current.click(); // Trigger the modal for editing
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm(`Are you sure you want to delete this job?`)) {
      try {
        await deletejob(id); // Use deletejob here
        await getalljobs(); // Refresh the jobs list
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  const handleEditSubmit = async () => {
    if (currentJob) {
      const { _id, jobTitle, jobDescription, jobSalary, jobType, jobCompany, jobRequirements } = currentJob;
  
      try {
        await editjob(_id.trim(), currentJob);
        setCurrentJob(null); // Reset current job after successful edit
        await getalljobs(); // Refresh jobs list
      } catch (error) {
        console.error("Error submitting edited job:", error);
        alert("Failed to update the job. Please try again.");
      }
    }
  };
  
  const handleAddSubmit = async () => {
    try {
      // Check for required fields
      const { jobTitle, jobDescription, jobCompany, jobSalary, jobRequirements } = newJob;
      if (!jobTitle || !jobDescription || !jobCompany || !jobSalary || !jobRequirements) {
        alert('Please fill in all required fields.');
        return;
      }

      await addJob(newJob);
      
      // Reset the form fields after successful submission
      setNewJob({
        jobTitle: '',
        jobDescription: '',
        jobSalary: '',
        jobCompany: '',
        jobType: '',
        jobRequirements: '',
      });

      // Refresh job list
      await getalljobs();
      alert('Job added successfully.');
    } catch (error) {
      console.error('Error adding job:', error);
      alert('Failed to add the job. Please try again.');
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
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        {type === 'Company' && (
          <button
            className="btn btn-primary"
            onClick={() => addRef.current.click()}
          >
            Add Job
          </button>
        )}
      </div>

      {/* Hidden Buttons to Trigger Modals */}
      <button
        type="button"
        ref={editRef}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editJobModal"
      >
        Launch Edit Modal
      </button>
      <button
        type="button"
        ref={addRef}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#addJobModal"
      >
        Launch Add Modal
      </button>

      {/* Edit Job Modal */}
      <div
        className="modal fade"
        id="editJobModal"
        tabIndex="-1"
        aria-labelledby="editJobLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editJobLabel">
                Edit Job
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="jobTitle"
                value={currentJob?.jobTitle || ''}
                onChange={handleEditChange}
                className="form-control mb-2"
                placeholder="Job Title"
              />
              <textarea
                name="jobDescription"
                value={currentJob?.jobDescription || ''}
                onChange={handleEditChange}
                className="form-control mb-2"
                placeholder="Job Description"
              ></textarea>
              <input
                type="text"
                name="jobCompany"
                value={currentJob?.jobCompany || ''}
                onChange={handleEditChange}
                className="form-control mb-2"
                placeholder="Company Name"
              />
              <input
                type="text"
                name="jobRequirements"
                value={currentJob?.jobRequirements || ''}
                onChange={handleEditChange}
                className="form-control mb-2"
                placeholder="Job Requirements"
              />
              <input
                type="number"
                name="jobSalary"
                value={currentJob?.jobSalary || ''}
                onChange={handleEditChange}
                className="form-control mb-2"
                placeholder="Salary"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditSubmit}
                data-bs-dismiss="modal"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Job Modal */}
      <div
        className="modal fade"
        id="addJobModal"
        tabIndex="-1"
        aria-labelledby="addJobLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addJobLabel">
                Add Job
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="jobTitle"
                value={newJob.jobTitle}
                onChange={handleAddChange}
                className="form-control mb-2"
                placeholder="Job Title"
              />
              <textarea
                name="jobDescription"
                value={newJob.jobDescription}
                onChange={handleAddChange}
                className="form-control mb-2"
                placeholder="Job Description"
              ></textarea>
              <input
                type="text"
                name="jobCompany"
                value={newJob.jobCompany}
                onChange={handleAddChange}
                className="form-control mb-2"
                placeholder="Company Name"
              />
              <input
                type="text"
                name="jobRequirements"
                value={newJob.jobRequirements}
                onChange={handleAddChange}
                className="form-control mb-2"
                placeholder="Job Requirements"
              />
              <input
                type="number"
                name="jobSalary"
                value={newJob.jobSalary}
                onChange={handleAddChange}
                className="form-control mb-2"
                placeholder="Salary"
              />
              <input
                type="text"
                name="jobType"
                value={newJob.jobType}
                onChange={handleAddChange}
                className="form-control mb-2"
                placeholder="Type"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddSubmit}
                data-bs-dismiss="modal"
              >
                Add Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="row mt-4">
        {jobs.map((job) => (
          <div key={job._id} className="col-md-4 mb-3">
            <JobsItem
              job={job}
              editjob={handleUpdateJob}
              deleteJob={handleDeleteJob}
              userType={type}
              ApplyJob={ApplyJob}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
