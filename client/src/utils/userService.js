// Calls -> /api/user/fetchuser -> Returns User Profile
const getProfile = async () => {
    let HOST_URL = String(process.env.REACT_APP_API_BASE_URL);

    // Retrieve auth_token from localStorage (or another storage mechanism)
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        throw new Error('No authentication token found. Please log in again.');
    }

    // TRACK CONSOLE
    console.log('[Entered Profile.js/userService.js/getProfile] Fetching from:', `${HOST_URL}/api/user/${process.env.REACT_APP_GETUSERPROFILE_TAG}`);


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


// Calls -> /api/user/edituser -> Returns Updated User Profile
const updateProfile = async (userDetails) => {
    const authToken = localStorage.getItem('auth_token');
    const HOST_URL = String(process.env.REACT_APP_API_BASE_URL);

    // TRACK CONSOLE
    console.log('[Entered Profile.js/userService.js/updateProfile] Fetching from:', `${HOST_URL}/api/${process.env.REACT_APP_AUTH_FOR_USER}/${process.env.REACT_APP_EDITUSERPROFILE_TAG}`);

    try {
        const response = await fetch(`${HOST_URL}/api/${String(process.env.REACT_APP_AUTH_FOR_USER)}/${String(process.env.REACT_APP_EDITUSERPROFILE_TAG)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': authToken,
            },
            body: JSON.stringify(userDetails),
        });

        // Check if the response is successful
        if (!response.ok) {
            // Parse the response to get error message from the backend
            const errorData = await response.json();
            console.error('Error updating user profile:', errorData); // Log error details
            throw new Error(errorData.message || 'Failed to update user details');
        }

        return response.json();
    } catch (error) {
        console.error('Error during the profile update request:', error);
        throw error; // Re-throw error after logging it
    }
};




const fetchJobs = async () => {
    try {
        const HOST_URL = process.env.REACT_APP_API_BASE_URL;
        const authToken = localStorage.getItem('auth_token');

        if (!authToken) {
            throw new Error('Authentication token not found. Please log in.');
        }

        // TRACK CONSOLE
        console.log('[Entered Profile.js/userService.js/fetchJobs] Fetching from:', `${HOST_URL}/api/${process.env.REACT_APP_USERS_JOBS}`);
        const response = await fetch(`${HOST_URL}/api/${process.env.REACT_APP_JOBS_TAG}/${process.env.REACT_APP_USERS_JOBS}`, {
            
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
    const authToken = localStorage.getItem('auth_token');

    // TRACK CONSOLE
    console.log('[Entered Profile.js/userService.js/fetchGroups] Fetching from:', `${HOST_URL}/api/${process.env.REACT_APP_AUTH_FOR_FETCHGROUPFORUSER}`);
        

    if (!authToken) {
        throw new Error('No authentication token found. Please log in again.');
    }

    try {
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
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw new Error('Error fetching groups.');
    }
};


// Calls -> /api/user/createuser -> Creates a new user
const createUser = async (userDetails) => {
    let HOST_URL = String(process.env.REACT_APP_API_BASE_URL)

    console.log('[Entered userService.js/createUser] Fetching from:', `${HOST_URL}/api/${process.env.REACT_APP_AUTH_FOR_USER || 'user'}/${process.env.REACT_APP_CREATEUSER_TAG || 'createuser'}`);

    try {
        const response = await fetch(`${HOST_URL}/api/${String(process.env.REACT_APP_AUTH_FOR_USER)}/${String(process.env.REACT_APP_CREATEUSER_TAG)}`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error creating user:', errorData);
            throw new Error(errorData.message || 'Failed to create user');
        }

        return response.json();
    } catch (error) {
        console.error('Error during the user creation request:', error);
        throw error; 
    }
};


export { getProfile, updateProfile, fetchJobs, fetchGroups ,createUser};
