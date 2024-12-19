const BASE_URL = 'http://localhost:3000';

const getAllProfiles = async () => {
    return fetch(`${BASE_URL}/profiles/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const getProfileById = async (userId: number) => {
    return fetch(`${BASE_URL}/profiles/${userId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const updateProfile = async (userId: number, profilePic: string, description: string) => {
    return fetch(`${BASE_URL}/profiles/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profilePic, description })
    });
};

const LibraryService = {
    getAllProfiles,
    getProfileById,
    updateProfile,
};

export default LibraryService;
