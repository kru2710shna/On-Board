import React from 'react';
import '../Groups.css';

const GroupList = ({ groups, onJoinGroup, onSelectGroup, isDarkMode }) => {
    return (
        <div className={`group-list ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {groups.map(group => (
                <div key={group._id} className="group-item">
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                    <div className="group-buttons">
                        <button onClick={() => onJoinGroup(group._id)}>Join</button>
                        <button onClick={() => onSelectGroup(group._id)}>View Details</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GroupList;