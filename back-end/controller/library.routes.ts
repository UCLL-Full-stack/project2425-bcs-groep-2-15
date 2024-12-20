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

/**
 * @swagger
 * tags:
 *   - name: Libraries
 *     description: Endpoints related to library operations.
 */

import express, {NextFunction, Request, Response} from 'express';
import libraryService from '../service/library';
import {Game} from '../model/game';

const libraryRouter = express.Router();

/**
 * @swagger
 * /libraries/games:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of games in the library by ID.
 *     tags:
 *      - Libraries
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
 *     security:
 *       - bearerAuth: []
 *     summary: Get library details by ID.
 *     tags:
 *      - Libraries
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
 * /libraries/achievements:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add achievements to a library by ID.
 *     tags:
 *      - Libraries
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the library to which achievements will be added.
 *     responses:
 *       200:
 *         description: Successfully added achievements to the library.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   achievementId:
 *                     type: number
 *                     description: The unique ID of the achievement added.
 *                   name:
 *                     type: string
 *                     description: The name of the achievement.
 *                   dateUnlocked:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the achievement was unlocked.
 *       400:
 *         description: Missing or invalid `id` parameter.
 *       500:
 *         description: Internal server error.
 */
libraryRouter.put('/:id/achievements', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Missing or invalid `id` parameter' });
        }

        const addedAchievements = await libraryService.addLibraryAchievements(Number(id));
        res.status(200).json(addedAchievements);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /libraries/games:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add a game to the library.
 *     tags:
 *      - Libraries
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
            return res.status(400).json({ error: 'Missing or invalid `id` parameter' });
        }

        const addedGame = await libraryService.addGameToLibrary(Number(id), game);
        res.status(200).json(addedGame);
    } catch (error) {
        next(error);
    }
});

export { libraryRouter };
