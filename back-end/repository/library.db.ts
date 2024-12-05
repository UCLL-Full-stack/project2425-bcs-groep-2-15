import { Game } from '../model/game';
import { Library } from '../model/library';
import database from './database';

const mapLibrary = (libraryData: any): Library => {
    const games = libraryData.GamesInLibraries.map((entry: any) => new Game(entry.game));
    return new Library({
        id: libraryData.id,
        games,
        achievements: libraryData.achievements,
        timePlayed: libraryData.timePlayed
    });
};

const getLibraryCommonQuery = () => ({
    include: {
        GamesInLibraries: {
            include: {
                game: true
            }
        }
    }
});

const getAllLibraries = async (): Promise<Library[]> => {
    const librariesData = await database.library.findMany(getLibraryCommonQuery());
    return librariesData.map(mapLibrary);
};

const getLibraryById = async (id: number): Promise<Library | null> => {
    const libraryData = await database.library.findUnique({
        where: { id },
        ...getLibraryCommonQuery()
    });

    return libraryData ? mapLibrary(libraryData) : null;
};

const getAllLibraryGames = async (library: Library): Promise<Game[]> => library.getGames();

const addGameToLibrary = async (library: Library, game: Game): Promise<Game> => {
    await database.gamesInLibraries.create({
        data: {
            libraryId: library.id,
            gameId: game.id
        }
    });

    library.getGames().push(game);
    return game;
};

export default {
    getAllLibraries,
    getLibraryById,
    getAllLibraryGames,
    addGameToLibrary
};
