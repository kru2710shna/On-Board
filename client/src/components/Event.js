import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import "../Events.css";

const Event = ({ isDarkMode }) => {
    const [events, setEvents] = useState([]);

    // Fetch events (mock data for now)
    useEffect(() => {
        const fetchEvents = async () => {
            // Mock data; replace with API call if needed
            const mockEvents = [
                {
                    id: 1,
                    title: "Tech Conference 2024",
                    date: "2024-12-15",
                    location: "San Francisco, CA",
                    type: "Tech Event",
                    description: "Explore the latest in technology and innovation.",
                },
                {
                    id: 2,
                    title: "Networking Night",
                    date: "2024-12-20",
                    location: "New York, NY",
                    type: "Networking Event",
                    description: "Connect with professionals in your industry.",
                },
                {
                    id: 3,
                    title: "Charity Run",
                    date: "2025-01-05",
                    location: "Los Angeles, CA",
                    type: "Fundraising Event",
                    description: "Participate in a charity run to support local communities.",
                },
                {
                    id: 4,
                    title: "Startup Pitch Night",
                    date: "2024-12-22",
                    location: "Seattle, WA",
                    type: "Networking Event",
                    description: "An opportunity to pitch your startup ideas and network with investors.",
                },
                {
                    id: 5,
                    title: "AI Workshop",
                    date: "2024-12-18",
                    location: "Austin, TX",
                    type: "Tech Event",
                    description: "Learn the basics of AI and machine learning in this hands-on workshop.",
                },
                {
                    id: 6,
                    title: "Annual Gala Dinner",
                    date: "2025-02-10",
                    location: "Chicago, IL",
                    type: "Fundraising Event",
                    description: "A formal event to support local charities, featuring dinner and entertainment.",
                },
                {
                    id: 7,
                    title: "Open Source Hackathon",
                    date: "2025-01-20",
                    location: "San Jose, CA",
                    type: "Tech Event",
                    description: "Collaborate and innovate in a 48-hour open-source hackathon.",
                },
                {
                    id: 8,
                    title: "Women in Tech Meetup",
                    date: "2024-12-27",
                    location: "Boston, MA",
                    type: "Networking Event",
                    description: "A gathering to connect and empower women in technology.",
                },
                {
                    id: 9,
                    title: "Climate Change Panel",
                    date: "2025-03-15",
                    location: "Denver, CO",
                    type: "Fundraising Event",
                    description: "Join experts to discuss climate change and raise funds for environmental causes.",
                }
            ];
            setEvents(mockEvents);
        };

        fetchEvents();
    }, []);

    return (
        <div className={`container my-5 ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <h1 className="text-center mb-4">Events</h1>
            <div className="row">
                {events.map((event) => (
                    <div key={event.id} className="col-md-4 mb-4">
                        <EventCard event={event} isDarkMode={isDarkMode} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Event;
