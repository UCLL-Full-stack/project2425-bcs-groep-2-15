import gameService from '../../service/game';
import gameDB from '../../repository/game.db';
import { Game } from '../../model/game';
import { jest } from '@jest/globals';

jest.mock('../../repository/game.db', () => ({
    getAllGames: jest.fn(),
    getGameById: jest.fn(),
    deleteGame: jest.fn(),
}));

describe('Game Service', () => {
    const mockGames = [
        new Game({
            id: 1,
            title: 'Game One',
            image: 'image1.png',
            categories: ['Action'],
            price: 50,
        }),
        new Game({
            id: 2,
            title: 'Game Two',
            image: 'image2.png',
            categories: ['Adventure', 'RPG'],
            price: 60,
        }),
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllGames', () => {
        it('should return all games from the database', async () => {
            (gameDB.getAllGames as jest.MockedFunction<typeof gameDB.getAllGames>).mockResolvedValue(mockGames);

            const games = await gameService.getAllGames();

            expect(games).toHaveLength(2);
            expect(games[0]).toBeInstanceOf(Game);
            expect(games[1].getTitle()).toBe('Game Two');
            expect(gameDB.getAllGames).toHaveBeenCalledTimes(1);
        });

        it('should return an empty array if no games are available', async () => {
            (gameDB.getAllGames as jest.MockedFunction<typeof gameDB.getAllGames>).mockResolvedValue([]);

            const games = await gameService.getAllGames();

            expect(games).toEqual([]);
            expect(gameDB.getAllGames).toHaveBeenCalledTimes(1);
        });
    });

    describe('getGameById', () => {
        it('should return a game if the game exists', async () => {
            (gameDB.getGameById as jest.MockedFunction<typeof gameDB.getGameById>).mockResolvedValue(mockGames[0]);

            const game = await gameService.getGameById(1);

            expect(game).toBeInstanceOf(Game);
            expect(game?.getId()).toBe(1);
            expect(game?.getTitle()).toBe('Game One');
            expect(gameDB.getGameById).toHaveBeenCalledWith(1);
            expect(gameDB.getGameById).toHaveBeenCalledTimes(1);
        });

        it('should throw an error if the game does not exist', async () => {
            (gameDB.getGameById as jest.MockedFunction<typeof gameDB.getGameById>).mockResolvedValue(null);

            await expect(gameService.getGameById(999)).rejects.toThrowError('Game with id 999 does not exist.');
            expect(gameDB.getGameById).toHaveBeenCalledWith(999);
            expect(gameDB.getGameById).toHaveBeenCalledTimes(1);
        });
    });

    describe('deleteGame', () => {
        it('should delete a game if it exists', async () => {
            (gameDB.getGameById as jest.MockedFunction<typeof gameDB.getGameById>).mockResolvedValue(mockGames[0]);
            (gameDB.deleteGame as jest.MockedFunction<typeof gameDB.deleteGame>).mockResolvedValue(undefined);

            await gameService.deleteGame(1);

            expect(gameDB.getGameById).toHaveBeenCalledWith(1);
            expect(gameDB.getGameById).toHaveBeenCalledTimes(1);
            expect(gameDB.deleteGame).toHaveBeenCalledWith(1);
            expect(gameDB.deleteGame).toHaveBeenCalledTimes(1);
        });
    });
});
