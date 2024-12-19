const BASE_URL = 'http://localhost:3000';

const getAllLibraryGames = async (userId: number) => {
    return fetch(`${BASE_URL}/libraries/${userId}/games`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const getLibraryById = async (userId: number) => {
    return fetch(`${BASE_URL}/libraries/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const addLibraryAchievements = async (userId: number) => {
    return fetch(`${BASE_URL}/libraries/${userId}/achievements`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const LibraryService = {
    getAllLibraryGames,
    getLibraryById,
    addLibraryAchievements,
};

export default LibraryService;
