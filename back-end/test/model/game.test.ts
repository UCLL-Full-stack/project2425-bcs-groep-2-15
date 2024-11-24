import { Game } from '../../model/game';
import { Genre } from '../../types';

describe('Game Model Tests', () => {
    let gameData: {
        id: number;
        title: string;
        image: string;
        categories: Genre[];
        price: number;
        discount?: number;
    };

    beforeEach(() => {
        gameData = {
            id: 1,
            title: 'Sample Game',
            image: 'sample-image.jpg',
            categories: ['Action', 'Adventure'],
            price: 59.99,
            discount: 10
        };
    });

    it('should create a Game instance with correct properties', () => {
        const game = new Game(gameData);

        expect(game.getId()).toBe(gameData.id);
        expect(game.getTitle()).toBe(gameData.title);
        expect(game.getImage()).toBe(gameData.image);
        expect(game.getCategories()).toEqual(gameData.categories);
        expect(game.getPrice()).toBe(gameData.price);
        expect(game.getDiscount()).toBe(gameData.discount);
    });

    it('should throw an error if title is missing', () => {
        expect(() => {
            new Game({ ...gameData, title: '' });
        }).toThrow('Title is required');
    });

    it('should throw an error if image is missing', () => {
        expect(() => {
            new Game({ ...gameData, image: '' });
        }).toThrow('Image is required');
    });

    it('should throw an error if price is missing', () => {
        expect(() => {
            new Game({ ...gameData, price: 0 });
        }).toThrow('Price is required');
    });

    it('equals should return true for games with the same properties', () => {
        const game1 = new Game(gameData);
        const game2 = new Game(gameData);

        expect(game1.equals(game2)).toBe(true);
    });

    it('equals should return false for games with different properties', () => {
        const game1 = new Game(gameData);
        const game2 = new Game({ ...gameData, title: 'Different Game' });

        expect(game1.equals(game2)).toBe(false);
    });
});
