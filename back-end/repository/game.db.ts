import { Game } from '../model/game';
import database from './database';

const getAllGames = async (): Promise<Game[]> => {
    const result = await database.game.findMany();
    return result.map(gameData => new Game(gameData));
};

const getGameById = async (id: number): Promise<Game | null> => {
    const gameData = await database.game.findUnique({
        where: { id }
    });
    if (!gameData) {
        return null;
    }
    return new Game(gameData);
};

const deleteGame = async (id: number): Promise<void> => {
    await database.game.deleteMany({
        where: { id }
    });
};

export default {
    getAllGames,
    getGameById,
    deleteGame
};