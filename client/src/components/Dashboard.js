import React from 'react';
import JobDescription from './JobDescription';
import jobsData from './JobData'; // Import jobs data
import EventDescription from './EventDescription';
import eventsData from './EventData'; // Import events data
import UpdateDescription from './UpdateDescription';
import updatesData from './UpdateData'; // Import updates data

const Dashboard = () => (
    <div className="container my-4">
        <h1 className="text-center mb-4">Job Board Dashboard</h1>

        {/* Jobs Section */}
        <section className="dashboard-section">
            <h2>Jobs</h2>
            <div className="row">
                {jobsData.map((job) => (
                    <div className="col-lg-3 col-md-6 mb-4" key={job.id}>
                        <JobDescription job={job} />
                    </div>
                ))}
            </div>
        </section>

        {/* Events Section */}
        <section className="dashboard-section mt-5">
            <h2>Event Announcements</h2>
            <div className="row">
                {eventsData.map((event) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={event.id}>
                        <EventDescription event={event} />
                    </div>
                ))}
            </div>
        </section>

        {/* News Updates Section */}
        <section className="dashboard-section mt-5">
            <h2>News Updates</h2>
            <div className="row">
                {updatesData.map((update) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={update.id}>
                        <UpdateDescription update={update} />
                    </div>
                ))}
            </div>
        </section>
    </div>
);

export default Dashboard;
