const getProfile = async () => {
    const HOST_URL = String(process.env.REACT_APP_API_BASE_URL);

    // Retrieve auth_token from localStorage (or another storage mechanism)
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        throw new Error('No authentication token found. Please log in again.');
    }

    console.log('Fetching from:', `${HOST_URL}/api/user/fetchuser`);
    const response = await fetch(`${HOST_URL}/api/${String(process.env.REACT_APP_AUTH_FOR_USER)}/${String(process.env.REACT_APP_GETUSERPROFILE_TAG)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth_token': authToken, 
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user details');
    }

    return response.json();
};

const updateProfile = async (userDetails) => {
    
    const authToken = localStorage.getItem('auth_token');
    const HOST_URL = String(process.env.REACT_APP_API_BASE_URL);
    const response = await fetch(`${HOST_URL}/api/${String(process.env.REACT_APP_AUTH_FOR_USER)}/${String(process.env.REACT_APP_EDITUSERPROFILE_TAG)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth_token': authToken,
        },
        body: JSON.stringify(userDetails),
    });

    if (!response.ok) {
        throw new Error('Failed to update user details');
    }

    return response.json();
};
const fetchJobs = async () => {
    try {
        const HOST_URL = process.env.REACT_APP_API_BASE_URL;
        const authToken = localStorage.getItem('auth_token');

        if (!authToken) {
            throw new Error('Authentication token not found. Please log in.');
        }

        const response = await fetch(`${HOST_URL}/api/jobs/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                auth_token: authToken,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
};

const fetchGroups = async () => {
    const HOST_URL = String(process.env.REACT_APP_API_BASE_URL);

    // Retrieve auth_token from localStorage (or another storage mechanism)
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        throw new Error('No authentication token found. Please log in again.');
    }

    const response = await fetch(`${HOST_URL}/api/${process.env.REACT_APP_AUTH_FOR_GROUPS}/${process.env.REACT_APP_AUTH_FOR_FETCHGROUPFORUSER}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth_token': authToken,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch groups');
    }

    return response.json(); 
};


export { getProfile, updateProfile, fetchJobs, fetchGroups  };
