// Calls -> /api/user/fetchuser -> Returns User Profile


const getProfile = async () => {
    const HOST_URL = String(process.env.REACT_APP_API_BASE_URL);
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        console.error("❌ No authentication token found. Redirecting to login.");
        alert("Session expired. Please log in again.");
        return null;
    }

    try {
        console.log("🔹 Fetching User Profile from:", `${HOST_URL}/api/user/fetchuser`);
        console.log("🔹 Sending Auth Token:", authToken);

        const response = await fetch(`${HOST_URL}/api/user/fetchuser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth_token": authToken, // Ensure correct header format
            },
        });

        console.log("🔹 Response Status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ Failed to fetch user details:", errorText);
            return null;
        }

        const userData = await response.json();
        console.log("✅ User Data Fetched Successfully:", userData);

        return userData;
    } catch (error) {
        console.error("❌ Error fetching user profile:", error.message);
        return null;
    }
};

// Calls -> /api/user/edituser -> Returns Updated User Profile
const updateProfile = async (userDetails) => {
    const authToken = localStorage.getItem('auth_token');
    const HOST_URL = process.env.REACT_APP_API_BASE_URL;

    console.log('Payload sent to backend:', userDetails);

    try {
        const response = await fetch(`${HOST_URL}/api/user/edituser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': authToken,
            },
            body: JSON.stringify(userDetails),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response from server:', errorData);
            throw new Error(errorData.error || 'Failed to update profile');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during profile update:', error.message);
        throw error;
    }
};





const fetchJobs = async () => {
    const HOST_URL = process.env.REACT_APP_API_BASE_URL;
    try {
        const authToken = localStorage.getItem('auth_token');

        console.log('[Entered Profile.js/userService.js/fetchJobs] Fetching from:', `${HOST_URL}/api/jobs/profile`);
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


export { getProfile, updateProfile, fetchJobs, fetchGroups, createUser };
