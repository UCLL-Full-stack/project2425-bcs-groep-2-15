import { Game } from '../model/game';
import { Library } from '../model/library';
import database from './database';

const getAllLibraries = async (): Promise<Library[]> => {
    const librariesData = await database.library.findMany({
        include: {
            GamesInLibraries: {
                include: {
                    game: true,
                },
            },
        },
    });

    return librariesData.map(libraryData => {
        const games = libraryData.GamesInLibraries.map(entry => new Game(entry.game));

        return new Library({
            id: libraryData.id,
            games: games,
            achievements: libraryData.achievements,
            timePlayed: libraryData.timePlayed,
        });
    });
};


const getLibraryById = async (id: number): Promise<Library | null> => {
    const libraryData = await database.library.findUnique({
        where: { id },
        include: {
            GamesInLibraries: {
                include: {
                    game: true,
                },
            },
        },
    });

    if (!libraryData) {
        return null;
    }

    const games = libraryData.GamesInLibraries.map((entry: any) => entry.game);

    return new Library({
        id: libraryData.id,
        games: games,
        achievements: libraryData.achievements,
        timePlayed: libraryData.timePlayed,
    });
};

const getAllLibraryGames = async (library: Library): Promise<Game[]> => {
    return library.getGames();
};

const addGameToLibrary = async (library: Library, game: Game): Promise<Game> => {
    library.getGames().push(game);
    return game;
};

export default {
    getAllLibraries,
    getLibraryById,
    getAllLibraryGames,
    addGameToLibrary,
};
