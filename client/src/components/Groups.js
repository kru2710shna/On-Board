import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupContext from '../context/Groups/GroupContext';
import '../Groups.css'; // Import CSS for styling

const Groups = ({ isDarkMode }) => {
    const { groups, getGroups, joinGroup } = useContext(GroupContext);
    const navigate = useNavigate(); // For navigation to CreateGroup or JoinGroup

    // Fetch groups on component mount
    useEffect(() => {
        getGroups(); // Fetch all groups
    }, [getGroups]);

    // Handle Join Group
    const handleJoinGroup = async (groupId) => {
        try {
            await joinGroup(groupId); // Join the group
            navigate(`/join-group/${groupId}`); // Redirect to JoinGroup chat page
        } catch (error) {
            console.error('Error joining group:', error);
        }
    };

    return (
        <div className={`groups-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {/* Header Section */}
            <div className="header">
                <h2>Groups</h2>
                <button
                    className="create-group-btn"
                    onClick={() => navigate('/create-group')}
                >
                    Create Group
                </button>
            </div>

            {/* Group List Section */}
            <div className="group-list">
                {groups.length === 0 ? (
                    <p>No groups available. Be the first to create one!</p>
                ) : (
                    groups.map((group) => (
                        <div key={group._id} className="group-card">
                            <h3>{group.name}</h3>
                            <p>{group.description}</p>
                            <small>Created by: {group.createdBy?.name || 'Unknown'}</small>
                            <div className="group-actions">
                                <button
                                    className="join-group-btn"
                                    onClick={() => handleJoinGroup(group._id)}
                                >
                                    Join
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Groups;
