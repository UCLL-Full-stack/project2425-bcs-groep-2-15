const BASE_URL = 'http://localhost:3000';

const getAllLibraryGames = async (userId: number) => {
    return fetch(`${BASE_URL}/libraries/${userId}/games`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const LibraryService = {
    getAllLibraryGames
};

export default LibraryService;
