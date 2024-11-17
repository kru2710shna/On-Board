import React, { useState, useEffect } from 'react';
import GroupList from './GroupList';
import CreateGroupForm from './CreateGroupForm';  
import GroupDetail from './GroupDetail';
import '../Groups.css';

const Groups = ({ isDarkMode }) => {
    const [groups, setGroups] = useState([]); // All available groups
    const [userGroups, setUserGroups] = useState([]); // Groups created by the logged-in user
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false); // New state for toggling form

    // Fetch all groups on component mount
    useEffect(() => {

        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';

        const fetchGroups = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/groups`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth_token': localStorage.getItem('auth_token')
                    },
                    credentials: 'include',
                });
                if (!response.ok) throw new Error(`Failed to fetch groups: ${response.statusText}`);
        
                const data = await response.json();
                setGroups(data); 
            } catch (error) {
                console.error('Error fetching groups:', error);
                setErrorMessage('Could not load groups. Please try again later.');
            }
        };

        const fetchUserGroups = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/groups/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth_token': localStorage.getItem('auth_token')
                    },
                    credentials: 'include',
                });
    
                if (!response.ok) throw new Error(`Failed to fetch user groups: ${response.statusText}`);
    
                const data = await response.json();
                setUserGroups(data); 
            } catch (error) {
                console.error('Error fetching user groups:', error);
                setErrorMessage('Could not load groups. Please try again later.');
            }
        };
        fetchGroups();
        fetchUserGroups();
    }, [isDarkMode]);

    const handleCreateGroup = async (groupData) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/groups/creategroup`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('auth_token')
                },
                credentials: 'include',
                body: JSON.stringify(groupData),
            });
            if (!response.ok) throw new Error('Failed to create group.');

            const newGroup = await response.json();
            setGroups([...groups, newGroup]);
            setUserGroups([...userGroups, newGroup]);
            setErrorMessage(null);
            setShowCreateForm(false); // Hide form on successful creation
        } catch (error) {
            console.error('Error creating group:', error);
            setErrorMessage('Could not create group. Please try again.');
        }
    };

    const handleJoinGroup = async (groupId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/groups/join/${groupId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('auth_token')
                },
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to join group.');

            alert("You've successfully joined the group!");
            setErrorMessage(null);
        } catch (error) {
            console.error('Error joining group:', error);
            setErrorMessage('Could not join the group. Please try again.');
        }
    };

    const handleSelectGroup = (groupId) => {
        const group = groups.find(g => g._id === groupId);
        setSelectedGroup(group);
    };

    return (
        <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <h1 className="my-4">Groups</h1>

            {errorMessage && <p className="error">{errorMessage}</p>}

            <button className="btn btn-primary mb-3" onClick={() => setShowCreateForm(!showCreateForm)}>
                {showCreateForm ? "Close Form" : "Add New Group"}
            </button>

            {showCreateForm && <CreateGroupForm onCreateGroup={handleCreateGroup} isDarkMode={isDarkMode} />}

            <h3>Your Groups</h3>
            <GroupList groups={userGroups} onJoinGroup={handleJoinGroup} onSelectGroup={handleSelectGroup} isDarkMode={isDarkMode} />

            <h3 className="my-4">All Groups</h3>
            <GroupList groups={groups} onJoinGroup={handleJoinGroup} onSelectGroup={handleSelectGroup} isDarkMode={isDarkMode} />

            {selectedGroup && <GroupDetail group={selectedGroup} isDarkMode={isDarkMode} />}
        </div>
    );
};

export default Groups;
