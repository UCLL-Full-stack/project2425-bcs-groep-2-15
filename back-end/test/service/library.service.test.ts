import libraryService from '../../service/library';
import libraryDB from '../../repository/library.db';
import { Game } from '../../model/game';
import { Library } from '../../model/library';

jest.mock('../../repository/library.db');

describe("Library Service", () => {
    const mockGame = new Game({
        id: 1,
        title: "Epic Quest",
        image: "/images/placeholder.png",
        categories: ["Adventure"],
        price: 59.99
    });

    const mockLibrary = new Library({
        id: 1,
        games: [mockGame],
        achievements: 0,
        timePlayed: 0
    });

    beforeEach(() => {
        (libraryDB.getLibraryById as jest.Mock).mockReturnValue(mockLibrary);
        (libraryDB.getAllLibraryGames as jest.Mock).mockReturnValue([mockGame]);
    });

    it("should return all games in the library", () => {
        expect(libraryService.getAllLibraryGames(1)).toEqual([mockGame]);
    });

    it("should return a library by ID", () => {
        expect(libraryService.getLibraryById(1)).toEqual(mockLibrary);
    });

    it("should throw an error if the library is not found", () => {
        (libraryDB.getLibraryById as jest.Mock).mockReturnValue(null);
        expect(() => libraryService.getLibraryById(999)).toThrow("Library with id 999 not found");
    });

    it("should add a game to the library", () => {
        const newGame = new Game({
            id: 2,
            title: "Battle Arena",
            image: "/images/placeholder.png",
            categories: ["Fighting"],
            price: 39.99
        });

        (libraryDB.getLibraryById as jest.Mock).mockReturnValue(mockLibrary);
        (libraryDB.addGameToLibrary as jest.Mock).mockImplementation((library, game) => {
            (library as any).games.push(game);
        });

        const result = libraryService.addGameToLibrary(1, newGame);
        expect(result).toEqual(newGame);
        expect(mockLibrary.getGames().length).toBe(2);
    });

    it("should throw an error if the game is already owned", () => {
        expect(() => libraryService.addGameToLibrary(1, mockGame)).toThrow("Game is already owned.");
    });
});
