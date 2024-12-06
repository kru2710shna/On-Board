import React, { useState, useContext, useCallback } from "react";
import JobContext from './jobsContext';
import AuthContext from '../Auth/authContext';

const JobState = (props) => {
  const HOST_URL = String(process.env.REACT_APP_API_BASE_URL);
  const initialJobs = [];
  const [jobs, setJobs] = useState(initialJobs);
  const { type } = useContext(AuthContext);

  // Add Job
  const addJob = async (newJob) => {
    if (type !== 'Company') {
      console.error("Not authorized to add jobs.");
      return;
    }

    try {
      const response = await fetch(`${HOST_URL}/api/${String(process.env.REACT_APP_JOBS_TAG)}/${String(process.env.REACT_APP_ADDJOBS_TAG)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem('auth_token'),
        },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) {
        throw new Error(`Failed to add job: ${response.statusText}`);
      }

      const addedJob = await response.json();
      setJobs((prevJobs) => [...prevJobs, addedJob]);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // Delete Job
  const deletejob = async (id) => {
    if (type !== 'Company') {
      alert("You are not authorized to delete jobs.");
      return;
    }

    const previousJobs = [...jobs];
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));

    try {
      const response = await fetch(`${HOST_URL}/api/${String(process.env.REACT_APP_JOBS_TAG)}/${String(process.env.REACT_APP_DELETE_TAG)}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem('auth_token'),
        },
      });

      if (!response.ok) {
        setJobs(previousJobs);
        throw new Error(`Failed to delete job: ${response.statusText}`);
      }
    } catch (error) {
      setJobs(previousJobs);
      console.error("Error deleting job:", error);
    }
  };

  // Edit Job
  const editjob = async (id, updatedJob) => {
    try {
      const response = await fetch(`${HOST_URL}/api/jobs/updatejob/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem('auth_token'),
        },
        body: JSON.stringify(updatedJob),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit job: ${response.statusText}`);
      }

      const updatedData = await response.json();
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === id ? updatedData : job))
      );
    } catch (error) {
      console.error("Error editing job:", error);
    }
  };

  // Fetch All Jobs
  const getalljobs = useCallback(async () => {
    try {
      const response = await fetch(`${HOST_URL}/api/${String(process.env.REACT_APP_JOBS_TAG)}/${String(process.env.REACT_APP_FETCH_TAG)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem('auth_token'),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`);
      }

      const jobsData = await response.json();
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, [HOST_URL]);

  // Apply Job
  const ApplyJob = async (jobId) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert("Please log in to apply for jobs.");
      return;
    }

    try {
      const response = await fetch(`${HOST_URL}/api/jobs/applyjob/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth_token": token,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to apply for the job.");
      }

      const data = await response.json();
      alert(data.message || "Successfully applied for the job.");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.message);
    }
  };

  // Fetch Company Jobs
  const fetchCompanyJobs = async () => {
    try {
      const response = await fetch(`${HOST_URL}/api/${String(process.env.REACT_APP_JOBS_TAG)}/${String(process.env.REACT_APP_COMPANYPROFILE)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch company jobs: ${response.statusText}`);
      }

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching company jobs:", error);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJob,
        deletejob,
        editjob,
        getalljobs,
        ApplyJob,
        fetchCompanyJobs,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};

export default JobState;
