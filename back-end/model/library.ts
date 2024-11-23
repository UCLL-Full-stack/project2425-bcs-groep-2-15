// import { Game } from './Game';
import { Game } from '../model/game';


export class Library {
    id: number;
    games: Game[];
    achievements: number;
    timePlayed: number;

    constructor(library: {
        id: number;
        games: Game[];
        achievements: number;
        timePlayed: number;
    }) {
        this.validate(library);

        this.id = library.id;
        this.games = library.games;
        this.achievements = library.achievements;
        this.timePlayed = library.timePlayed;
    }

    getId(): number {
        return this.id;
    }

    getGames(): Game[] {
        return this.games;
    }

    getAchievements(): number {
        return this.achievements;
    }

    getTimePlayed(): number {
        return this.timePlayed;
    }

    validate(library: {
        id: number;
        games: Game[];
        achievements: number;
        timePlayed: number;
    }) {
        if (library.games.length < 0) {
            throw new Error('Amount of games must be a positive number.');
        }
        if (library.achievements < 0) {
            throw new Error('Achievements must be a positive number');
        }
        if (library.timePlayed < 0) {
            throw new Error('Time played must be a positive number');
        }
    }

    equals(library: Library): boolean {
        return (
            this.id === library.getId() &&
            this.achievements === library.getAchievements() &&
            this.timePlayed === library.getTimePlayed() &&
            this.games.length === library.getGames().length &&
            this.games.every((game, index) => game === library.getGames()[index])
        );
    }
}
