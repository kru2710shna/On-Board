import React, { useState } from 'react';


const UpdateDescription = ({ update }) => {
    const [isUpdated, setIsUpdated] = useState(false);

    const handleToggle = () => {
        setIsUpdated((prev) => !prev); 
    };

    return (
        <div className="card update-card">
            <div className="card-body">
                <h5 className="card-title">{update.title}</h5>
                <p className="card-text">{update.summary}</p>
                <button
                    className={`toggle-button ${isUpdated ? 'updated' : ''}`}
                    onClick={handleToggle}
                >
                    {isUpdated ? 'Updated' : 'Update'}
                </button>
            </div>
        </div>
    );
};

export default UpdateDescription;
