import libraryDB from '../repository/library.db';
import { Game } from '../model/game';
import { Library } from '../model/library';

const getAllLibraryGames = (userId: number): Game[] => {
    return libraryDB.getAllLibraryGames(libraryDB.getLibraryById(userId)!);
}

const getLibraryById = (id: number): Library => {
    if (libraryDB.getLibraryById(id) === null) {
        throw new Error(`Library with id ${id} not found`);
    }
    return libraryDB.getLibraryById(id)!;
}

const addGameToLibrary = (id: number, game: Game): Game => {
    if (getAllLibraryGames(id).some(ownedGame => ownedGame.id === game.id)) {
        throw new Error("Game is already owned.")
    }

    libraryDB.addGameToLibrary(libraryDB.getLibraryById(id)!, game);
    return game;
}

export default {
    getAllLibraryGames,
    getLibraryById,
    addGameToLibrary,
};
