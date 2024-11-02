import React from 'react';


const EventDescription = ({ event }) => (
    <div className="card event-card">
        <div className="card-body">
            <h5 className="card-title">{event.title}</h5>
            <p className="card-text">
                <strong>Location:</strong> {event.location} <br />
                <strong>Date:</strong> {event.date} <br />
                <strong>Time:</strong> {event.time}
            </p>
            <p className="card-text">{event.description}</p>
            <button className="btn btn-success join-button">RSVP</button>
        </div>
    </div>
);

export default EventDescription;
