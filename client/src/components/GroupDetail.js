import React from 'react';
import '../Groups.css';

const GroupDetail = ({ group, isDarkMode }) => {
    return (
        <div className={`group-detail ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <h3>{group.name}</h3>
            <p>{group.description}</p>
        </div>
    );
};

export default GroupDetail;