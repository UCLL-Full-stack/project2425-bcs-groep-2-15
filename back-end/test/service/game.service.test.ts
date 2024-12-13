import gameService from '../../service/game';
import gameDB from '../../repository/game.db';
import { Game } from '../../model/game';

jest.mock('../../repository/game.db');

describe("Game Service", () => {
    const mockGame = new Game({
        id: 1,
        title: "Epic Quest",
        image: "/images/placeholder.png", // Geçerli bir resim yolu
        categories: ["Adventure"],
        price: 59.99
    });

    beforeEach(() => {
        (gameDB.getAllGames as jest.Mock).mockReturnValue([mockGame]);
        (gameDB.getGameById as jest.Mock).mockReturnValue(mockGame);
    });

    it("should return all games", () => {
        expect(gameService.getAllGames()).toEqual([mockGame]);
    });

    it("should return a game by ID", () => {
        expect(gameService.getGameById(1)).toEqual(mockGame);
    });

    it("should throw an error for an invalid ID", () => {
        (gameDB.getGameById as jest.Mock).mockReturnValue(null);
        expect(() => gameService.getGameById(999)).toThrow("Game with id 999 does not exist.");
    });
});
