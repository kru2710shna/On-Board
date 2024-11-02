import React from 'react';

const MeetupDescription = ({ meetup }) => (
    <div className="card meetup-card">
        <div className="card-body">
            <h5 className="card-title">{meetup.title}</h5>
            <p className="card-text">{meetup.location} - {meetup.date}</p>
            <p className="card-text">{meetup.description}</p>
            <button className="btn btn-info join-button">RSVP</button>
        </div>
    </div>
);

export default MeetupDescription;
