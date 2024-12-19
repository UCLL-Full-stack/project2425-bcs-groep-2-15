import gameDB from '../repository/game.db';
import { Game } from '../model/game';

const getAllGames = async (): Promise<Game[]> => await gameDB.getAllGames();

const getGameById = async (id: number): Promise<Game | null> => {
    const game = await gameDB.getGameById(id);
    if (!game) throw new Error(`Game with id ${id} does not exist.`);
    return game;
};

const deleteGame = async (id: number): Promise<void> => {
    if (await getGameById(id) === null) {
        throw new Error(`Game with id ${id} not found`);
    }
    await gameDB.deleteGame(id);
}

export default {
    getAllGames,
    getGameById,
    deleteGame,
};
