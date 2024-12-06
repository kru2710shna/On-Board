import React, { useState } from 'react';
import GroupContext from './GroupContext';

const GroupState = (props) => {
    const [groups, setGroups] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
    const HOST_URL = String(process.env.REACT_APP_API_BASE_URL);

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
            const token = localStorage.getItem('auth_token');
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
            setGroups((prevGroups) => [...prevGroups, data]);
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    // 2. Get all groups
    const getGroups = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                throw new Error('No auth token found. Please log in.');
            }

            const response = await fetch(`${HOST_URL}/api/groups`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': token,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    // 3. Get user-specific groups
    const getUserGroups = async () => {
        try {
            const response = await fetchHelper(`${HOST_URL}/api/groups/user`, { method: 'GET' });
            setUserGroups(response);
        } catch (error) {
            console.error('Error fetching user groups:', error);
        }
    };

    // 4. Join a group
    const joinGroup = async (groupId) => {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                throw new Error('No auth token found. Please log in.');
            }

            const response = await fetch(`${HOST_URL}/api/groups/join/${groupId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': token,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedGroup = await response.json();
            setGroups((prevGroups) =>
                prevGroups.map((group) =>
                    group._id === groupId ? updatedGroup : group
                )
            );
        } catch (error) {
            console.error('Error joining group:', error);
        }
    };

    // 5. Delete a group
    const deleteGroup = async (groupId) => {
        try {
            await fetchHelper(`${HOST_URL}/api/groups/delete/${groupId}`, { method: 'DELETE' });
            setGroups(groups.filter((group) => group._id !== groupId));
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    // 6. Get group details
    const getGroupDetails = async (groupId) => {
        try {
            const url = `${HOST_URL}/api/groups/${groupId}`;
            console.log("Fetching group details from:", url);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'auth_token': localStorage.getItem('auth_token'),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const group = await response.json();
            return group;
        } catch (error) {
            console.error('Error fetching group details:', error);
            throw error;
        }
    };

    // 7. Get group members
    const getGroupMembers = async (groupId) => {
        try {
            const url = `${HOST_URL}/api/groups/${groupId}/members`;
            console.log("Fetching group members from:", url);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'auth_token': localStorage.getItem('auth_token'),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.members; // Return just the members
        } catch (error) {
            console.error('Error fetching group members:', error);
            throw error;
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
                getGroupDetails,
                getGroupMembers, // Expose the new method
            }}
        >
            {props.children}
        </GroupContext.Provider>
    );
};

export default GroupState;
