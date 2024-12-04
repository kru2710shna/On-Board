import React, { useState } from 'react';
import GroupContext from './GroupContext';

const GroupState = (props) => {
    const [groups, setGroups] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
    let HOST_URL = String(process.env.REACT_APP_API_BASE_URL);

    // Helper function for fetch requests
    const fetchHelper = async (url, options = {}) => {
        try {
            const response = await fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                ...options,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error during fetch:', error);
            throw error;
        }
    };

    // 1. Create a group
    const createGroup = async (name, description, members = []) => {
        try {
            const token = localStorage.getItem('auth_token'); // Retrieve the token from localStorage
            if (!token) {
                throw new Error('No auth token found. Please log in.');
            }
    
            const response = await fetch(`${HOST_URL}/api/groups/creategroup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': token,
                },
                body: JSON.stringify({ name, description, members }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setGroups((prevGroups) => [...prevGroups, data]); // Add the new group to the list
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    // 2. Get all groups
    const getGroups = async () => {
        try {
            const token = localStorage.getItem('auth_token'); // Retrieve the token from localStorage
            if (!token) {
                throw new Error('No auth token found. Please log in.');
            }
    
            const response = await fetch(`${HOST_URL}/api/${String(process.env.REACT_APP_AUTH_FOR_GROUPS)}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': token, // Include the auth_token in the header
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setGroups(data); // Update state with all groups
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    // 3. Get user-specific groups
    const getUserGroups = async () => {
        try {
            const response = await fetchHelper(`${HOST_URL}/api/${String(process.env.REACT_APP_AUTH_FOR_GROUPS)}/${String(process.env.REACT_APP_AUTH_FOR_FETCHGROUPFORUSER)}`, { method: 'GET' });
            setUserGroups(response); // Set state with user-specific groups
        } catch (error) {
            console.error('Error fetching user groups:', error);
        }
    };

    // 4. Join a group
// 4. Join a group
const joinGroup = async (groupId) => {
    try {
        const token = localStorage.getItem('auth_token'); // Retrieve the token from localStorage
        if (!token) {
            throw new Error('No auth token found. Please log in.');
        }

        const response = await fetch(`${HOST_URL}/api/groups/join/${groupId}`, {
            method: 'PATCH', // Correcting the method to PATCH
            headers: {
                'Content-Type': 'application/json',
                'auth_token': token, // Include the auth_token in the header
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedGroup = await response.json(); // Parse the updated group data
        setGroups((prevGroups) =>
            prevGroups.map((group) =>
                group._id === groupId ? updatedGroup : group
            )
        ); // Update the groups state
    } catch (error) {
        console.error('Error joining group:', error);
    }
};

    // 5. Delete a group
    const deleteGroup = async (groupId) => {
        try {
            await fetchHelper(`/api/groups/delete/${groupId}`, { method: 'DELETE' });
            setGroups(groups.filter((group) => group._id !== groupId)); // Remove the deleted group from state
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    return (
        <GroupContext.Provider
            value={{
                groups,
                userGroups,
                createGroup,
                getGroups,
                getUserGroups,
                joinGroup,
                deleteGroup,
                getGroupDetails
            }}
        >
            {props.children}
        </GroupContext.Provider>
    );
};

const getGroupDetails = async (groupId) => {
    try {
        const response = await fetch(`/api/groups/${groupId}`, {
            method: 'GET',
            headers: {
                'auth_token': localStorage.getItem('auth_token'), // Include auth_token
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const group = await response.json();
        return group; // Return the group details
    } catch (error) {
        console.error('Error fetching group details:', error);
        throw error;
    }
};

export default GroupState;
