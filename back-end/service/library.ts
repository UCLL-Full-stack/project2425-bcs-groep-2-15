import { Game } from '../model/game';
import { Library } from '../model/library';
import libraryDb from '../repository/library.db';
import database from '../repository/database';

const getAllLibraryGames = async (userId: number): Promise<Game[]> => {
    const library = await libraryDb.getLibraryById(userId);
    if (!library) {
        throw new Error(`Library with id ${userId} not found`);
    }
    return library.getGames();
};

const getLibraryById = async (id: number): Promise<Library | null> => {
    const library = await database.library.findUnique({
        where: { id },
        include: {
            GamesInLibraries: {
                include: {
                    game: true
                }
            }
        }
    });

    if (!library) {
        throw new Error(`Library with id ${id} not found`);
    }

    const games = library.GamesInLibraries.map(entry => new Game(entry.game));

    return new Library({
        id: library.id,
        games: games,
        achievements: library.achievements,
        timePlayed: library.timePlayed
    });
};

const addGameToLibrary = async (id: number, game: Game): Promise<Game> => {
    const library = await getLibraryById(id);
    if (!library) {
        throw new Error(`Library with id ${id} not found`);
    }

    if (library.getGames().some(ownedGame => ownedGame.id === game.id)) {
        throw new Error('Game is already owned.');
    }

    await database.library.update({
        where: { id },
        data: {
            GamesInLibraries: {
                create: {
                    gameId: game.id
                }
            }
        }
    });

    return game;
};

export default {
    getAllLibraryGames,
    getLibraryById,
    addGameToLibrary
};
