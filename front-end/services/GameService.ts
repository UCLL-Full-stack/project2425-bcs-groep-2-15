const BASE_URL = 'http://localhost:3000';

const getAllGames = async () => {
    return fetch(`${BASE_URL}/games`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const getGameById = async (id: string) => {
    return fetch(`${BASE_URL}/games/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const GameService = {
    getAllGames,
    getGameById
};

export default GameService;
