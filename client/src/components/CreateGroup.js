import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupContext from '../context/Groups/GroupContext';
import '../CreateGroup.css'; // Import CSS for styling

const CreateGroup = ({ isDarkMode }) => {
    const { createGroup } = useContext(GroupContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        members: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, description, members } = formData;
        const membersArray = members
            ? members.split(',').map((member) => member.trim())
            : [];
        createGroup(name, description, membersArray);
        navigate('/groups'); // Redirect back to Groups page
    };

    return (
        <div className={`create-group-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <h2>Create Group</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Group Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter group name"
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Enter group description"
                    ></textarea>
                </label>
                <label>
                    Members (comma-separated user IDs):
                    <input
                        type="text"
                        name="members"
                        value={formData.members}
                        onChange={handleChange}
                        placeholder="Enter member IDs (optional)"
                    />
                </label>
                <div className="form-actions">
                    <button type="submit">Create</button>
                    <button type="button" onClick={() => navigate('/groups')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateGroup;
