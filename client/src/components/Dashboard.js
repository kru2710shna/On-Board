import React from 'react';
import JobDescription from './JobDescription';
import jobsData from './JobData';
import EventDescription from './EventDescription';
import eventsData from './EventData';
import UpdateDescription from './UpdateDescription';
import updatesData from './UpdateData';
import '../Dashboard.css';

const Dashboard = ({ isDarkMode }) => (
    <div className={`container my-5 dashboard-container ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
        <h1 className={`dashboard-title text-center mb-4 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Job Board Dashboard</h1>

        {/* Jobs Section */}
        <section className="dashboard-section">
            <h2 className={`section-title ${isDarkMode ? 'text-white' : 'text-dark'}`}>Jobs</h2>
            <div className="row g-4">
                {jobsData.map((job) => (
                    <div className="col-lg-4 col-md-6" key={job.id}> {/* Changed to col-lg-4 for wider cards */}
                        <div className={`card job-card ${isDarkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                            <JobDescription job={job} />
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Events Section */}
        <section className="dashboard-section mt-5">
            <h2 className={`section-title ${isDarkMode ? 'text-white' : 'text-dark'}`}>Event Announcements</h2>
            <div className="row g-4">
                {eventsData.map((event) => (
                    <div className="col-lg-6 col-md-6" key={event.id}> {/* Made event cards span 6 columns on larger screens */}
                        <div className={`card event-card ${isDarkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                            <EventDescription event={event} />
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* News Updates Section */}
        <section className="dashboard-section mt-5">
            <h2 className={`section-title ${isDarkMode ? 'text-white' : 'text-dark'}`}>News Updates</h2>
            <div className="row g-4">
                {updatesData.map((update) => (
                    <div className="col-lg-6 col-md-6" key={update.id}> {/* Made update cards span 6 columns on larger screens */}
                        <div className={`card update-card ${isDarkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                            <UpdateDescription update={update} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
);

export default Dashboard;