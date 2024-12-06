// context/Jobs/JobState.js
import React, { useState, useContext, useCallback } from "react";
import JobContext from './jobsContext';
import AuthContext from '../Auth/authContext';

const JobState = (props) => {
  const HOST_URL = String(process.env.REACT_APP_API_BASE_URL);
  const initialJobs = [];
  const [jobs, setJobs] = useState(initialJobs);
  const { type } = useContext(AuthContext);



  // Add Jobs 
  const addJob = async (newJob) => {
    const { jobTitle, jobDescription, jobSalary, jobType, jobCompany, jobRequirements } = newJob;

    if (type !== 'Company') {
      console.log("Not authorized to add jobs.");
      return;
    }

    try {
      const response = await fetch(`${HOST_URL}/api/${String(process.env.REACT_APP_JOBS_TAG)}/${String(process.env.REACT_APP_ADDJOBS_TAG)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem('auth_token'),
        },
        body: JSON.stringify({ jobTitle, jobDescription, jobSalary, jobType, jobCompany, jobRequirements }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add job: ${response.statusText}`);
      }

      const addedJob = await response.json();
      console.log("Job added successfully:", addedJob);

      // Update state with new job without fetching all jobs
      setJobs((prevJobs) => [...prevJobs, addedJob]);

    } catch (error) {
      console.error("Error adding job:", error);
    }
  };




  // Delete Jobs
  const deletejob = async (id) => {
    if (type !== 'Company') {
      alert("You are not authorized to delete jobs.");
      console.error("Authorization failed: Only companies can delete jobs.");
      return;
    }
  
    // Optimistically update the state
    const previousJobs = [...jobs];
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
  
    try {
      const response = await fetch(
        `${HOST_URL}/api/${String(process.env.REACT_APP_JOBS_TAG)}/${String(process.env.REACT_APP_DELETE_TAG)}/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth_token': localStorage.getItem('auth_token'),
          },
        }
      );
  
      if (response.ok) {
        console.log(`Job with ID: ${id} deleted successfully.`);
        alert("Job deleted successfully.");
      } else {
        // If the server response is not OK, revert state and show an error message
        setJobs(previousJobs);
        console.error(`Failed to delete job with ID: ${id}. Status: ${response.status}`);
        const errorMessage = await response.text();
        alert(`Failed to delete job: ${errorMessage}`);
      }
    } catch (error) {
      // Revert state and log the error in case of a fetch failure
      setJobs(previousJobs);
      console.error("Error deleting job:", error);
      alert("An error occurred while deleting the job. Please try again.");
    }
  };





  // Edit Jobs 
  const editjob = async (id, jobTitle, jobDescription, jobSalary, jobType, jobCompany, jobRequirements) => {
    try {
      const response = await fetch(`${HOST_URL}/api/jobs/updatejob/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': localStorage.getItem('auth_token'), // Ensure token is included
        },
        body: JSON.stringify({ jobTitle, jobDescription, jobSalary, jobType, jobCompany, jobRequirements }),
      });
  
      if (!response.ok) {
        console.error(`Failed to edit job with ID: ${id}. Status: ${response.status}`);
        const errorData = await response.json();
        console.error("Error details:", errorData);
      } else {
        const data = await response.json();
        console.log("Edited Job:", data);
      }
    } catch (error) {
      console.error("Error editing job:", error);
    }
  };





  // Fetch All Jobs
  const getalljobs = useCallback(async () => {
    try {
      const response = await fetch(
        `${HOST_URL}/api/${String(process.env.REACT_APP_JOBS_TAG)}/${String(process.env.REACT_APP_FETCH_TAG)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth_token': localStorage.getItem('auth_token'),
          },
        }
      );

      const res = await response.json();
      setJobs(res); // Update state with fetched jobs
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, [HOST_URL, setJobs]);

  return (
    <JobContext.Provider value={{ jobs, addJob, deletejob, editjob, getalljobs }}>
      {props.children}
    </JobContext.Provider>
  );
};



export const fetchCompanyJobs = async (dispatch) => {
  const HOST_URL = String(process.env.REACT_APP_API_BASE_URL);
  try {
    const response = await fetch(
      `${HOST_URL}/api/${String(process.env.REACT_APP_JOBS_TAG)}/${String(process.env.REACT_APP_COMPANYPROFILE)}`
    );

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    dispatch({ type: "FETCH_COMPANY_JOBS", payload: data });
  } catch (error) {
    console.error("Error fetching company jobs:", error);
  }
};




export default JobState;
