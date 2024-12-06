import React from "react";

const EventDetail = ({ event }) => {
    return (
        <div>
            <h2>{event.title}</h2>
            <p>
                <strong>Date:</strong> {event.date}
            </p>
            <p>
                <strong>Location:</strong> {event.location}
            </p>
            <p>
                <strong>Type:</strong> {event.type}
            </p>
            <p>{event.description}</p>
        </div>
    );
};

export default EventDetail;
