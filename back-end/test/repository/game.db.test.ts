import gameRepository from '../../repository/game.db';
import { Game } from '../../model/game';

describe('Game Repository', () => {
    it('should return all games when getAllGames is called', () => {
        const games = gameRepository.getAllGames();
        expect(games.length).toBe(5);
        expect(games[0]).toBeInstanceOf(Game);
    });

    it('should return the correct game when getGameById is called with a valid ID', () => {
        const game = gameRepository.getGameById(1);
        expect(game).toBeDefined();
        expect(game?.getTitle()).toBe('Epic Quest');
    });

    it('should return null when getGameById is called with an invalid ID', () => {
        const game = gameRepository.getGameById(999);  // Geçerli olmayan bir ID
        expect(game).toBeNull();
    });

    it('should return games with correct properties', () => {
        const games = gameRepository.getAllGames();
        const game = games.find((g) => g.getId() === 2);

        expect(game).toBeDefined();
        expect(game?.getTitle()).toBe('Battle Arena');
        expect(game?.getCategories()).toEqual(['Fighting', 'Action']);
        expect(game?.getPrice()).toBe(39.99);
        expect(game?.getDiscount()).toBe(10);
    });
});
