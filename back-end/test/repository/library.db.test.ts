import { Game } from '../../model/game';
import { Library } from '../../model/library';
import libraryRepository from '../../repository/library.db';
import database from '../../repository/database';
import { Genre } from '../../types';
import { $Enums } from '@prisma/client';

// Mock the database methods
jest.mock('../../repository/database', () => ({
    library: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        gamesInLibraries: {
            create: jest.fn()
        }
    }
}));

describe('Library Repository', () => {
    let mockLibrary: Library;
    let mockGame: Game;

    beforeEach(() => {
        // Initialize mock data before each test
        mockGame = new Game({ 
            id: 1, 
            title: 'Test Game', 
            image: 'test-image.jpg', 
            categories: [$Enums.Genre.Action], // Correctly assigning genre from the imported Genre enum
            price: 59.99
        });
        mockLibrary = new Library({
            id: 1,
            games: [mockGame],
            achievements: 10,
            timePlayed: 100
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getAllLibraries returns an array of Library objects', async () => {
        const mockLibrariesData = [
            {
                id: 1,
                achievements: 10,
                timePlayed: 100,
                GamesInLibraries: [{ game: mockGame }]
            },
            {
                id: 2,
                achievements: 5,
                timePlayed: 50,
                GamesInLibraries: [{ game: mockGame }]
            }
        ];

        (database.library.findMany as jest.Mock).mockResolvedValue(mockLibrariesData);

        const libraries = await libraryRepository.getAllLibraries();

        expect(libraries).toHaveLength(2);
        expect(libraries[0]).toBeInstanceOf(Library);
        expect(libraries[1].getId()).toBe(2);
    });

    test('getLibraryById returns a Library object or null', async () => {
        const mockLibraryData = {
            id: 1,
            achievements: 10,
            timePlayed: 100,
            GamesInLibraries: [{ game: mockGame }]
        };

        // Return the mock data for the existing ID and null for non-existing ID
        (database.library.findUnique as jest.Mock).mockImplementation(({ where }) => {
            if (where.id === 1) return Promise.resolve(mockLibraryData);
            return Promise.resolve(null);
        });

        const library = await libraryRepository.getLibraryById(1);

        expect(library).toBeInstanceOf(Library);
        expect(library?.getId()).toBe(1);

        const nullLibrary = await libraryRepository.getLibraryById(99);

        expect(nullLibrary).toBeNull();
    });

    // test('addGameToLibrary adds a game to the library', async () => {
    //     (database.gamesInLibraries.create as jest.Mock).mockResolvedValue({ gameId: mockGame.id });

    //     const addedGame = await libraryRepository.addGameToLibrary(mockLibrary, mockGame);

    //     expect(addedGame).toBeInstanceOf(Game);
    //     expect(mockLibrary.getGames()).toContainEqual(mockGame);
    // });

    test('Library validation checks', () => {
        // Test invalid games array
        // expect(() => new Library({ id: 1, games: [], achievements: 0, timePlayed: 0 }))
        //     .toThrow('Amount of games must be a positive number.');

        // Test invalid achievements
        expect(() => new Library({ id: 1, games: [mockGame], achievements: -1, timePlayed: 0 }))
            .toThrow('Achievements must be a positive number');

        // Test invalid timePlayed
        expect(() => new Library({ id: 1, games: [mockGame], achievements: 0, timePlayed: -1 }))
            .toThrow('Time played must be a positive number');
    });
});
