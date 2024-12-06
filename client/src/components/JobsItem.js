import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const JobsItem = ({ job, editjob,  deleteJob, userType }) => {

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the job: "${job.jobTitle}"?`)) {
      try {
        await deleteJob(job._id); // Ensure the function exists and is passed properly
        alert('Job deleted successfully.');
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };


  const handleEdit = () => {
    editjob(job); // Trigger the edit logic from the parent component
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{job.jobTitle}</h3>
        <p className="card-text"><strong>Description:</strong> {job.jobDescription}</p>
        <p className="card-text"><strong>Company:</strong> {job.jobCompany}</p>
        <p className="card-text"><strong>Salary:</strong> ${job.jobSalary}</p>

        <div className="d-flex justify-content-center mt-3">
          {userType === 'Company' && (
            <>
              <button className="btn btn-outline-danger mx-2" onClick={handleDelete}>
                <i className="fa-solid fa-trash"></i> Delete
              </button>
              <button className="btn btn-outline-primary mx-2" onClick={handleEdit}>
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(JobsItem);
