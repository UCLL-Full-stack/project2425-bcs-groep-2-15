import { Game } from '../../model/game';
import { Genre} from '../../types';
import libraryService from '../../service/library';

describe('Library Service', () => {
    let mockLibrary: any;

    beforeEach(() => {
        // Mocking library data with GamesInLibraries
        mockLibrary = {
            id: 1,
            GamesInLibraries: [
                { game: { id: 1, title: 'Test Game 1', image: 'image1.jpg', categories: convertToGenre([{ id: 1, name: 'Action' }]), price: 10 } },
                { game: { id: 2, title: 'Test Game 2', image: 'image2.jpg', categories: convertToGenre([{ id: 2, name: 'Adventure' }]), price: 20 } }
            ],
            achievements: 5,
            timePlayed: 100
        };
    });

    const convertToGenre = (categories: { id: number, name: string }[]): Genre[] => {
        return categories.map(category => ({ id: category.id, name: category.name } as unknown as Genre));
    };

    // it('should get all games in library by id', async () => {
    //     // Mocking database method call
    //     const mockGetLibraryById = jest.spyOn(libraryService, 'getLibraryById').mockResolvedValue(mockLibrary);

    //     const libraryGames = await libraryService.getAllLibraryGames(1);

    //     expect(libraryGames).toHaveLength(2);
    //     expect(libraryGames[0].getTitle()).toBe('Test Game 1');
    //     expect(libraryGames[1].getTitle()).toBe('Test Game 2');
    // });

    it('should add a game to the library', async () => {
        const newGame = new Game({ id: 3, title: 'Test Game 3', image: 'image3.jpg', categories: convertToGenre([{ id: 3, name: 'Puzzle' }]), price: 30 });

        // Mocking database method call
        const mockAddGameToLibrary = jest.spyOn(libraryService, 'addGameToLibrary').mockResolvedValue(newGame);

        const addedGame = await libraryService.addGameToLibrary(1, newGame);

        expect(addedGame.getTitle()).toBe('Test Game 3');
        expect(addedGame.getImage()).toBe('image3.jpg');
        expect(addedGame.getCategories()).toContainEqual({ id: 3, name: 'Puzzle' });
        expect(addedGame.getPrice()).toBe(30);
    });

    it('should throw an error when trying to add a game that is already in the library', async () => {
        const existingGame = new Game({ id: 1, title: 'Test Game 1', image: 'image1.jpg', categories: convertToGenre([{ id: 1, name: 'Action' }]), price: 10 });

        // Mocking database method call
        const mockAddGameToLibrary = jest.spyOn(libraryService, 'addGameToLibrary').mockRejectedValue(new Error('Game is already owned.'));

        await expect(libraryService.addGameToLibrary(1, existingGame)).rejects.toThrow('Game is already owned.');
    });
});
