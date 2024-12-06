import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../EventCard.css";

const EventCard = ({ event, isDarkMode }) => {
    const [interested, setInterested] = useState(false);
    const navigate = useNavigate();

    const handleRSVP = () => {
        navigate(`/rsvp`, { state: { eventTitle: event.title } }); // Navigate to RSVP with event details
    };

    const handleInterested = () => {
        setInterested(!interested);
        alert(
            interested
                ? `You have marked interest for "${event.title}".`
                : `Interest removed for "${event.title}".`
        );
    };

    return (
        <div className={`card ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">
                    <strong>Date:</strong> {event.date}
                </p>
                <p className="card-text">
                    <strong>Location:</strong> {event.location}
                </p>
                <p className="card-text">
                    <strong>Type:</strong> {event.type}
                </p>
                <p className="card-text">{event.description}</p>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={handleRSVP}>
                        RSVP
                    </button>
                    <button
                        className={`btn ${interested ? "btn-success" : "btn-secondary"}`}
                        onClick={handleInterested}
                    >
                        {interested ? "Unmark Interested" : "Interested"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
