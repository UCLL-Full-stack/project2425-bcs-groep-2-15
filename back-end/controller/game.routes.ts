/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Game:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Unique identifier for the game.
 *            title:
 *              type: string
 *              description: Title of the game.
 *            image:
 *              type: string
 *              description: URL or path to the game image.
 *            categories:
 *              type: array
 *              items:
 *                type: string
 *                enum: [Action, Adventure, Fighting, FPS, RPG]
 *              description: List of categories or genres of the game.
 *            price:
 *              type: number
 *              format: float
 *              description: Price of the game.
 */
import express, { NextFunction, Request, Response } from 'express';
import gameService from '../service/game';

const gameRouter = express.Router();

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get a list of all games.
 *     responses:
 *       200:
 *         description: A list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Game'
 */
gameRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const games = await gameService.getAllGames();
        res.status(200).json(games);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /games/{id}:
 *  get:
 *      summary: Get a game by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The game id.
 *      responses:
 *          200:
 *              description: A game object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Game'
 */
gameRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const game = await gameService.getGameById(Number(req.params.id));
        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game by id.
 *     description: Deletes the game specified by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The unique identifier of the game to delete.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Successfully deleted the game.
 *       404:
 *         description: Game not found.
 *       500:
 *         description: Internal server error.
 */
gameRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await gameService.deleteGame(Number(req.params.id));
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});


export { gameRouter };
