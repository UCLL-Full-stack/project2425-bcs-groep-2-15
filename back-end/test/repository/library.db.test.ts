import libraryDb from '../../repository/library.db';
import {Library} from '../../model/library';
import {Game} from '../../model/game';
import gameDb from '../../repository/game.db';

describe('Library Database', () => {
    it('should return a library by ID', () => {
        const library = libraryDb.getLibraryById(1);
        expect(library).toBeInstanceOf(Library);
        expect(library?.getId()).toBe(1);
    });

    it('should return null if library ID does not exist', () => {
        const library = libraryDb.getLibraryById(999);
        expect(library).toBeNull();
    });

    it('should return all games in a library', () => {
        const library = libraryDb.getLibraryById(1);
        const games = libraryDb.getAllLibraryGames(library!);
        expect(games.length).toBeGreaterThan(0);
        expect(games[0]).toBeInstanceOf(Game);
        expect(games[0].getId()).toBe(1);
    });

    it('should add a game to a library', () => {
        const library = libraryDb.getLibraryById(1);
        const newGame = gameDb.getGameById(2)!;
        const addedGame = libraryDb.addGameToLibrary(library!, newGame);

        const games = libraryDb.getAllLibraryGames(library!);
        expect(addedGame).toBe(newGame);
        expect(games).toContain(newGame);
    });

    it('should increase the number of games when a new game is added', () => {
        const library = libraryDb.getLibraryById(1);
        const initialGameCount = library!.getGames().length;

        const newGame = gameDb.getGameById(3)!;
        libraryDb.addGameToLibrary(library!, newGame);

        const finalGameCount = library!.getGames().length;
        expect(finalGameCount).toBe(initialGameCount + 1);
    });
});
