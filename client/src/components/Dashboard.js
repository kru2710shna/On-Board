// Dashboard.js
import React, { useContext, useEffect } from "react";
import JobContext from "../context/Jobs/jobsContext";
import Jobs from "./Jobs";
import AuthContext from "../context/Auth/authContext";
import "../Dashboard.css";

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
                <h2 className={`section-title ${isDarkMode ? "text-white" : "text-dark"}`}>Event Announcements</h2>
                {/* Events UI logic */}
            </section>

            {/* News Updates Section */}
            <section className="dashboard-section mt-5">
                <h2 className={`section-title ${isDarkMode ? "text-white" : "text-dark"}`}>News Updates</h2>
                {/* News Updates UI logic */}
            </section>
        </div>
    );
};

export default Dashboard;
