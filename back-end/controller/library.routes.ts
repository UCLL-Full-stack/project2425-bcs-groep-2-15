/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Genre:
 *       type: string
 *       description: A genre type for games (e.g., Action, Adventure, RPG).
 *     Game:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the game.
 *         title:
 *           type: string
 *           description: Title of the game.
 *         image:
 *           type: string
 *           description: URL to the game's cover image.
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Genre'
 *           description: List of genres associated with the game.
 *         price:
 *           type: number
 *           description: Price of the game in the specified currency.
 *         discount:
 *           type: number
 *           description: Optional discount on the game, expressed as a percentage.
 */


import express, { NextFunction, Request, Response } from 'express';
import libraryService from '../service/library';
import { Game } from '../model/game';

const libraryRouter = express.Router();

/**
 * @swagger
 * /libraries/games:
 *   get:
 *     summary: Get a list of games in the library by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the library to retrieve games from.
 *     responses:
 *       200:
 *         description: A list of games in the library.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       400:
 *         description: Missing or invalid `id` parameter.
 */
libraryRouter.get('/:id/games', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const libraryGames = await libraryService.getAllLibraryGames(id);
        res.status(200).json(libraryGames);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /libraries/{id}:
 *   get:
 *     summary: Get library details by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the library to retrieve.
 *     responses:
 *       200:
 *         description: The details of the library.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Library'
 *       404:
 *         description: Library not found.
 */
libraryRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const library = await libraryService.getLibraryById(id);
        res.status(200).json(library);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /libraries/games:
 *   post:
 *     summary: Add a game to the library.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the library to add the game to.
 *       - in: body
 *         name: game
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Game'
 *     responses:
 *       200:
 *         description: The added game.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Invalid input or game already owned.
 */
libraryRouter.post('/games', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;
        const game: Game = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: "Missing or invalid `id` parameter" });
        }

        const addedGame = await libraryService.addGameToLibrary(Number(id), game);
        res.status(200).json(addedGame);
    } catch (error) {
        next(error);
    }
});

export { libraryRouter };
