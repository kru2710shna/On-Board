import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateGroupForm = ({ onCreateGroup, isDarkMode }) => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!groupName || !groupDescription) {
            setErrorMessage("Both fields are required.");
            return;
        }
        onCreateGroup({ name: groupName, description: groupDescription });
        setGroupName('');
        setGroupDescription('');
        setErrorMessage(null);
    };

    return (
        <div className={`card p-4 mb-4 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <h3 className="mb-3">Create New Group</h3>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="groupName" className="form-label">Group Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter group name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="groupDescription" className="form-label">Group Description</label>
                    <textarea
                        className="form-control"
                        id="groupDescription"
                        rows="3"
                        value={groupDescription}
                        onChange={(e) => setGroupDescription(e.target.value)}
                        placeholder="Enter group description"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Group</button>
            </form>
        </div>
    );
};

export default CreateGroupForm;
