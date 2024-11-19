import { Game } from '../model/game';

const games = [
    new Game({
        id: 1,
        title: "Eden Sword",
        image: "/images/games/1_eden_sword.png",
        categories: ["Adventure", "RPG"],
        price: 59.99
    }),

    new Game({
        id: 2,
        title: "Nexus",
        image: "/images/games/2_nexus.png",
        categories: ["FPS", "Action"],
        price: 69.99
    }),

    new Game({
        id: 3,
        title: "Snake Triad",
        image: "/images/games/3_snake_triad.png",
        categories: ["Fighting", "Action"],
        price: 39.99,
        discount: 10
    }),

    new Game({
        id: 4,
        title: "Project Salvo",
        image: "/images/games/4_project_salvo.png",
        categories: ["Adventure", "RPG"],
        price: 49.99
    }),

    new Game({
        id: 5,
        title: "Warriors United",
        image: "/images/placeholder.png",
        categories: ["Action", "Fighting"],
        price: 44.99,
        discount: 25
    }),

];

const getAllGames = (): Game[] => games;

const getGameById = (id: number ): Game | null => {
    return games.find((game) => game.getId() === id) || null;
};

export default {
    getAllGames,
    getGameById,
};
