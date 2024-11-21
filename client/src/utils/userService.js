const getProfile = async () => {
    const HOST_URL = String(process.env.REACT_APP_API_BASE_URL);

    // Retrieve auth_token from localStorage (or another storage mechanism)
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        throw new Error('No authentication token found. Please log in again.');
    }

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
    const HOST_URL = String(process.env.REACT_APP_API_BASE_URL);

    const authToken = localStorage.getItem('auth_token');
    if (!authToken) {
        throw new Error('No authentication token found. Please log in again.');
    }

    const response = await fetch(`${HOST_URL}/api/${String(process.env.REACT_APP_JOBS_TAG)}/${String(process.env.REACT_APP_USERS_JOBS)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth_token': authToken, 
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch jobs');
    }

    return response.json();
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
