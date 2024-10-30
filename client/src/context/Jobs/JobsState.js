// context/Jobs/JobState.js
import React, { useState } from "react";
import JobContext from './jobsContext';

const JobState = (props) => {
  let HOST_URL = 'http://localhost:5001/';
  const initialJobs = [];
  const [jobs, setJobs] = useState(initialJobs);

  // Add Jobs 
  const addJob = async (newJob) => {
    const { jobTitle, jobDescription, jobSalary, jobType, jobCompany } = newJob;
    try {
      const response = await fetch(`${HOST_URL}api/jobs/addjob`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxMDNjNGU2ZTFkZDE2NmUxMGNjMzE2In0sImlhdCI6MTcyOTExNzI2Mn0.3eJbc01Yo-qeFCffFx-O77reE-iER8vQCb7yYPGbf3w',
        },
        body: JSON.stringify({ jobTitle, jobDescription, jobSalary, jobType, jobCompany }),
      });

      // Check if response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`Failed to add job: ${response.statusText}`);
      }

      // Parse response to confirm new job creation
      const addedJob = await response.json();
      console.log("Job added successfully:", addedJob);

      // Update state with new job
      setJobs([...jobs, addedJob]);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // Delete Jobs
  const deletejob = async (id) => {
    try {
      const response = await fetch(`${HOST_URL}api/jobs/deletejob/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxMDNjNGU2ZTFkZDE2NmUxMGNjMzE2In0sImlhdCI6MTcyOTExNzI2Mn0.3eJbc01Yo-qeFCffFx-O77reE-iER8vQCb7yYPGbf3w',
        }
      });

      if (response.ok) {
        // Remove the job from the local state
        setJobs(jobs.filter(job => job._id !== id));
        console.log(`Job with ID: ${id} deleted successfully`);
      } else {
        console.error(`Failed to delete job with ID: ${id}. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Edit Jobs 
  const editjob = async (id, jobTitle, jobDescription, jobSalary, jobType, jobCompany) => {
    try {
      const response = await fetch(`${HOST_URL}api/jobs/updatejob/${id}`, {
        method: 'PUT',  // Use PUT or PATCH here based on backend requirements
        headers: {
          'Content-Type': 'application/json',
          'auth_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxMDNjNGU2ZTFkZDE2NmUxMGNjMzE2In0sImlhdCI6MTcyOTExNzI2Mn0.3eJbc01Yo-qeFCffFx-O77reE-iER8vQCb7yYPGbf3w',
        },
        body: JSON.stringify({ jobTitle, jobDescription, jobSalary, jobType, jobCompany }),
      });

      if (response.ok) {
        setJobs(jobs.map(job =>
          job._id === id
            ? { ...job, jobTitle, jobDescription, jobSalary, jobType, jobCompany }
            : job
        ));
      } else {
        console.error(`Failed to edit job with ID: ${id}. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error editing job:", error);
    }
  };

  // Fetch All Jobs
  const getalljobs = async () => {
    try {
      const response = await fetch(`${HOST_URL}api/jobs/fetchalljobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcxMDNjNGU2ZTFkZDE2NmUxMGNjMzE2In0sImlhdCI6MTcyOTExNzI2Mn0.3eJbc01Yo-qeFCffFx-O77reE-iER8vQCb7yYPGbf3w',
        }
      });

      const res = await response.json();
      console.log(res);
      setJobs(res);  // Update state with fetched jobs
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, deletejob, editjob, getalljobs }}>
      {props.children}
    </JobContext.Provider>
  );
};

export default JobState;
