import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GroupContext from "../context/Groups/GroupContext";

const JoinGroup = ({ isDarkMode }) => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const { getGroupDetails } = useContext(GroupContext);

    const [groupDetails, setGroupDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const group = await getGroupDetails(groupId);
                setGroupDetails(group);
            } catch (error) {
                console.error("Error fetching group details:", error);
                alert("Could not load group details. Redirecting to groups list.");
                navigate("/groups");
            } finally {
                setLoading(false);
            }
        };

        fetchGroupDetails();
    }, [groupId, getGroupDetails, navigate]);

    if (loading) {
        return <div>Loading group details...</div>;
    }

    if (!groupDetails) {
        return <div>Group details could not be loaded. Please try again later.</div>;
    }

    const handleConfirmJoin = () => {
        alert(`You have successfully joined the group "${groupDetails.name}"!`);
        //navigate("/Chatting");
        navigate(`/chat/${groupId}`);
    };

    return (
        <div className={`container my-4 ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <h2>{groupDetails.name}</h2>
            <p>{groupDetails.description}</p>
            <p>
                <strong>Created by:</strong> {groupDetails.createdBy?.name || "Unknown"}
            </p>
            <button className="btn btn-primary" onClick={handleConfirmJoin}>
                Confirm Join
            </button>
            <button className="btn btn-secondary mx-2" onClick={() => navigate("/groups")}>
                Cancel
            </button>
        </div>
    );
};

export default JoinGroup;
