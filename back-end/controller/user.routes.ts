/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         balance:
 *           type: number
 *           description: The user's balance.
 *         library:
 *           type: object
 *           description: The user's library object.
 *           additionalProperties: true
 *         profile:
 *           type: object
 *           description: The user's profile object.
 *           additionalProperties: true
 *         purchases:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Purchase'
 *           description: List of the user's purchases.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was created.
 */

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints related to user operations.
 */

import express, {NextFunction, Request, Response} from 'express';
import userService from '../service/user';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     tags:
 *      - Users
 *     responses:
 *       200:
 *         description: A list of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by their ID.
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            return res.status(400).json({ error: 'Invalid `id` parameter' });
        }

        const user = await userService.getUserById(Number(id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/name/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username } = req.params;

        if (!username || username.trim() === '') {
            return res.status(400).json({ error: 'Invalid `username` parameter' });
        }

        const user = await userService.getUserByUsername(String(username));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user and return a JWT token.
 *     tags:
 *      - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user trying to log in.
 *               password:
 *                 type: string
 *                 description: The password of the user trying to log in.
 *               role:
 *                 type: string
 *                 description: The role of the user.
 *                 enum:
 *                   - user
 *                   - admin
 *     responses:
 *       200:
 *         description: JWT token and user details upon successful login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token.
 *                 username:
 *                   type: string
 *                   description: The username of the logged-in user.
 *                 role:
 *                   type: string
 *                   description: The role of the logged-in user.
 *       400:
 *         description: Missing or invalid credentials.
 *       401:
 *         description: Invalid username or password.
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ error: 'Missing username, password, or role' });
        }

        const authenticationResponse = await userService.login({ username, password, role });

        res.status(200).json(authenticationResponse);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'Invalid credentials.') {
                return res.status(401).json({ error: error.message });
            }
        }
        next(error);
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user.
 *     tags:
 *      - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *               balance:
 *                 type: number
 *                 description: The user's initial balance.
 *               library:
 *                 type: object
 *                 description: The library object for the user.
 *                 additionalProperties: true
 *               profile:
 *                 type: object
 *                 description: The profile object for the user.
 *                 additionalProperties: true
 *               purchases:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Purchase'
 *                 description: Initial purchases array for the user.
 *     responses:
 *       201:
 *         description: The user was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data.
 */
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, balance, library, profile, role } = req.body;

        if (!username) {
            return res.status(400).json({ error: 'Missing username' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Missing password' });
        }

        if (!balance || isNaN(balance)) {
            return res.status(400).json({ error: 'Invalid balance' });
        }

        if (!library) {
            return res.status(400).json({ error: 'Missing library' });
        }

        if (!profile) {
            return res.status(400).json({ error: 'Missing profile' });
        }

        if (!role) {
            return res.status(400).json({ error: 'Missing role' });
        }

        const user = userService.newUser(username, password, library, profile, balance, role);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}/balance:
 *   get:
 *     summary: Retrieve a user's balance.
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The user's balance as a number.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.get('/:id/balance', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            return res.status(400).json({ error: 'Invalid `id` parameter' });
        }

        const user = await userService.getUserBalance(Number(id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}/balance:
 *   patch:
 *     summary: Add balance to a user's account.
 *     tags:
 *      - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user whose balance will be updated.
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount to add to the user's balance.
 *                 example: 50.0
 *     responses:
 *       200:
 *         description: The updated balance of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   description: The user's updated balance.
 *       400:
 *         description: Invalid request data (e.g., invalid ID or amount).
 *       404:
 *         description: User not found.
 */
userRouter.put('/:id/balance', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        if (isNaN(Number(id))) {
            return res.status(400).json({ error: 'Invalid `id` parameter' });
        }

        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid `amount` parameter' });
        }

        const user = await userService.getUserById(Number(id));
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newBalance = await userService.addUserBalance(Number(id), Number(amount));
        res.status(201).json({ balance: newBalance });
    } catch (error) {
        next(error);
    }
});


export { userRouter };
