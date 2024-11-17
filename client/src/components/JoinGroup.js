import React, { useState } from 'react';

const JoinGroup = ({ onJoinGroup }) => {
    const [groupName, setGroupName] = useState('');

    const handleJoin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/groups`, {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to fetch groups.');

            const groups = await response.json();
            const group = groups.find((g) => g.name === groupName);

            if (group) {
                onJoinGroup(group._id);
                setGroupName('');
            } else {
                alert("Group not found. Please check the name and try again.");
            }
        } catch (error) {
            console.error('Error joining group:', error);
            alert('Failed to join group. Please try again.');
        }
    };

    return (
        <form onSubmit={handleJoin} className="form-inline">
            <label htmlFor="groupName" className="sr-only">Group Name</label>
            <input
                type="text"
                id="groupName"
                className="form-control mb-2 mr-sm-2"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
            />
            <button type="submit" className="btn btn-primary mb-2">Join Group</button>
        </form>
    );
};

export default JoinGroup;
