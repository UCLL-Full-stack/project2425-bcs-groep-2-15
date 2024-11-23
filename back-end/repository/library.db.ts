import { Game } from '../model/game';
import { Library } from '../model/library';
import gameDb from './game.db';

const libraries = [
    new Library({
        id: 1,
        games: [],
        achievements: 0,
        timePlayed: 0
    })
]

const getAllLibraryGames = (library: Library): Game[] => library.getGames();

const getLibraryById = (id: number): Library | null => {
    return libraries.find((library) => library.getId() === id) || null;
};

const addGameToLibrary = (library: Library, game: Game): Game => {
    library.getGames().push(game);
    return game;
}

export default {
    getLibraryById,
    getAllLibraryGames,
    addGameToLibrary,
};
