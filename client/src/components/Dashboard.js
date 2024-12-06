// Dashboard.js
import React, { useContext, useEffect } from "react";
import JobContext from "../context/Jobs/jobsContext";
import Jobs from "./Jobs";
import AuthContext from "../context/Auth/authContext";
import "../Dashboard.css";
import Event from './Event.js'
const Dashboard = ({ isDarkMode }) => {
    const { type } = useContext(AuthContext);
    const { jobs, getalljobs } = useContext(JobContext); // Extract state and method

    useEffect(() => {
        getalljobs();
    }, [getalljobs]);

    return (
        <div className={`container my-5 dashboard-container ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <h1 className="dashboard-title text-center mb-4">Dashboard</h1>

            {/* Jobs Section */}
            <section className="dashboard-section">
                <h2 className={`section-title ${isDarkMode ? "text-white" : "text-dark"}`}>Jobs</h2>
                <Jobs isDarkMode={isDarkMode} jobs={jobs} type={type} />
            </section>

            {/* Events Section */}
            <section className="dashboard-section mt-5">
                <h2 className={`section-title ${isDarkMode ? "text-white" : "text-dark"}`}>Events</h2>
                <Event isDarkMode={isDarkMode} />
            </section>
        </div>
    );
};

export default Dashboard;
