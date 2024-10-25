// context/Jobs/JobState.js
import React, { useState } from "react";
import JobContext from './jobsContext';

const JobState = (props) => {
  const initialJobs = [
    {
      "_id": "67118e4107d611d4bebbbadb",
      "jobTitle": "DevOps Engineer",
      "jobDescription": "Manage infrastructure, automate workflows, and ensure efficient CI/CD processes.",
      "jobSalary": "85000",
      "jobType": "Full-time",
      "jobCompany": "CloudTech Solutions",
    },
    {
      "_id": "671299b7f2d437f7c651923a",
      "jobTitle": "Machine Learning Engineer",
      "jobDescription": "Develop machine learning models and integrate them into scalable applications.",
      "jobSalary": "105000",
      "jobType": "Full-time",
      "jobCompany": "AI Innovators Inc.",
    },
    {
      "_id": "6712a2c4f2d437f7c651923c",
      "user": "67103c4e6e1dd166e10cc316",
      "jobTitle": "Mobile App Developer",
      "jobDescription": "Design and build advanced applications for mobile platforms.",
      "jobSalary": "90000",
      "jobType": "Full-time",
      "jobCompany": "AppDev Solutions",
      "date": "2024-10-18T18:02:44.549Z",
      "__v": 0
    }
  ];

  const [jobs, setJobs] = useState(initialJobs);

  // Add Jobs 
  const addJob = (newJob) => {
    const job = {
      ...newJob,
      _id: Date.now().toString(),  // Generate a unique ID for the new job
      date: new Date().toISOString()
    };
    setJobs([...jobs, job]);  // Add the new job to the state without mutating it
  };




  // Delete Jobs
  const deletejob = () => {

  }

  // Edit Jobs 
  const editjob = () => {

  }

  return (
    <JobContext.Provider value={{ jobs, addJob, deletejob, editjob }}>
      {props.children}
    </JobContext.Provider>
  );
}

export default JobState;
