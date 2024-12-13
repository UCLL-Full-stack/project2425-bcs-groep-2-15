import { Library } from '../../model/library';
import { Game } from '../../model/game';
import { Genre } from '../../types';

describe('Library Model Tests', () => {
  let libraryData: {
    id: number;
    games: Game[];
    achievements: number;
    timePlayed: number;
  };
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
      categories: ['Action', 'Adventure'] as Genre[],
      price: 59.99,
      discount: 10,
    };
    const game = new Game(gameData);

    libraryData = {
      id: 1,
      games: [game],
      achievements: 100,
      timePlayed: 500,
    };
  });

  it('should create a Library instance with correct properties', () => {
    const library = new Library(libraryData);

    expect(library.getId()).toBe(libraryData.id);
    expect(library.getGames()).toEqual(libraryData.games);
    expect(library.getAchievements()).toBe(libraryData.achievements);
    expect(library.getTimePlayed()).toBe(libraryData.timePlayed);
  });

  it('should throw an error if games list is empty', () => {
    expect(() => {
      new Library({ ...libraryData, games: [] });
    }).toThrow('Amount of games must be a positive number.');
  });

  it('should throw an error if achievements is negative', () => {
    expect(() => {
      new Library({ ...libraryData, achievements: -1 });
    }).toThrow('Achievements must be a positive number');
  });

  it('should throw an error if time played is negative', () => {
    expect(() => {
      new Library({ ...libraryData, timePlayed: -10 });
    }).toThrow('Time played must be a positive number');
  });

  it('equals should return true for libraries with the same properties', () => {
    const library1 = new Library(libraryData);
    const library2 = new Library(libraryData);

    expect(library1.equals(library2)).toBe(true);
  });

  it('equals should return false for libraries with different properties', () => {
    const library1 = new Library(libraryData);
    const library2 = new Library({ ...libraryData, achievements: 50 });

    expect(library1.equals(library2)).toBe(false);
  });
});
