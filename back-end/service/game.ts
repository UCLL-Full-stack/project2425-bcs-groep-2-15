import gameDB from '../repository/game.db';
import { Game } from '../model/game';

const getAllGames = (): Game[] => gameDB.getAllGames();

const getGameById = (id: number): Game => {
    const game = gameDB.getGameById(id);
    if (!game) throw new Error(`Game with id ${id} does not exist.`);
    return game;
};

export default {
    getAllGames,
    getGameById
};
