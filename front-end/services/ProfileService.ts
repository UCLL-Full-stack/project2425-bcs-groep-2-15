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

const LibraryService = {
    getAllProfiles,
    getProfileById
};

export default LibraryService;
