import gameDB from '../repository/game.db';
import { Game } from '../model/game';

const getAllGames = async (): Promise<Game[]> => await gameDB.getAllGames();

const getGameById = async (id: number): Promise<Game | null> => {
    const game = await gameDB.getGameById(id);
    if (!game) throw new Error(`Game with id ${id} does not exist.`);
    return game;
};

export default {
    getAllGames,
    getGameById
};
