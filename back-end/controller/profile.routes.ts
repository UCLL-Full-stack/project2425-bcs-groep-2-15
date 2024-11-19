/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Profile:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *              description: Unique identifier for the profile.
 *            name:
 *              type: string
 *              description: Name of the profile.
 *            email:
 *              type: string
 *              format: email
 *              description: Email address of the profile.
 *            createdAt:
 *              type: string
 *              format: date-time
 *              description: Date when the profile was created.
 *            games:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Game'
 *              description: List of games associated with the profile.
 */
import express, { NextFunction, Request, Response } from 'express';
import profileService from '../service/profile';

const profileRouter = express.Router();

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Get a list of all profiles.
 *     responses:
 *       200:
 *         description: A list of profiles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/{id}:
 *  get:
 *      summary: Get a profile by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The profile id.
 *      responses:
 *          200:
 *              description: A profile object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile = await profileService.getProfileById(Number(req.params.id));
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
});

export { profileRouter };
