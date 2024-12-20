// Import necessary components
import gameRepository from '../../repository/game.db';
import database from '../../repository/database';
import { Game} from '../../model/game';
import { Genre } from '../../types';
import { $Enums} from '@prisma/client';

jest.mock('../../repository/database', () => ({
    game: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        deleteMany: jest.fn(),
    },
}));

const mockedFindMany = database.game.findMany as jest.MockedFunction<typeof database.game.findMany>;
const mockedFindUnique = database.game.findUnique as jest.MockedFunction<typeof database.game.findUnique>;
const mockedDeleteMany = database.game.deleteMany as jest.MockedFunction<typeof database.game.deleteMany>;

// Corrected mock data to match the Game type
const mockGameData: { 
    id: number; 
    title: string; 
    image: string; 
    categories: Genre[]; // Updated to match Genre type
    price: number; 
    discount: number | null 
}[] = [
    {
        id: 1,
        title: 'Game 1',
        image: 'path/to/image1.jpg',
        categories: [$Enums.Genre.Action],
        price: 59.99,
        discount: null
    },
    {
        id: 2,
        title: 'Game 2',
        image: 'path/to/image2.jpg',
        categories: [$Enums.Genre.Adventure], 
        price: 49.99,
        discount: null
    }
];

describe('Game Repository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllGames', () => {
        it('should return an array of Game instances', async () => {
            mockedFindMany.mockResolvedValue(mockGameData);

            const games = await gameRepository.getAllGames();

            expect(mockedFindMany).toHaveBeenCalledTimes(1);
            expect(games).toHaveLength(2);
            expect(games[0]).toBeInstanceOf(Game);
            expect(games[0]).toMatchObject({
                id: 1,
                title: 'Game 1',
                image: 'path/to/image1.jpg',
                categories: [$Enums.Genre.Action],
                price: 59.99,
                discount: null
            });
            expect(games[1]).toMatchObject({
                id: 2,
                title: 'Game 2',
                image: 'path/to/image2.jpg',
                categories: [$Enums.Genre.Adventure],
                price: 49.99,
                discount: null
            });
        });
    });

    describe('getGameById', () => {
        it('should return a Game instance if the game exists', async () => {
            const mockGameData = {
                id: 1,
                title: 'Game 1',
                image: 'path/to/image1.jpg',
                categories: [$Enums.Genre.Action],
                price: 59.99,
                discount: null
            };

            mockedFindUnique.mockResolvedValue(mockGameData);

            const game = await gameRepository.getGameById(1);

            expect(mockedFindUnique).toHaveBeenCalledTimes(1);
            expect(mockedFindUnique).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(game).toBeInstanceOf(Game);
            expect(game).toMatchObject({
                id: 1,
                title: 'Game 1',
                image: 'path/to/image1.jpg',
                categories: [$Enums.Genre.Action],
                price: 59.99,
                discount: null
            });
        });

        it('should return null if the game does not exist', async () => {
            mockedFindUnique.mockResolvedValue(null);

            const game = await gameRepository.getGameById(999);

            expect(mockedFindUnique).toHaveBeenCalledTimes(1);
            expect(mockedFindUnique).toHaveBeenCalledWith({ where: { id: 999 } });
            expect(game).toBeNull();
        });
    });

    describe('deleteGame', () => {
        it('should delete the game with the given ID', async () => {
            mockedDeleteMany.mockResolvedValue({ count: 1 });

            await gameRepository.deleteGame(1);

            expect(mockedDeleteMany).toHaveBeenCalledTimes(1);
            expect(mockedDeleteMany).toHaveBeenCalledWith({ where: { id: 1 } });
        });

        it('should handle deletion when no games match the given ID', async () => {
            mockedDeleteMany.mockResolvedValue({ count: 0 });

            await gameRepository.deleteGame(999);

            expect(mockedDeleteMany).toHaveBeenCalledTimes(1);
            expect(mockedDeleteMany).toHaveBeenCalledWith({ where: { id: 999 } });
        });
    });
});
