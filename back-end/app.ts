import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { gameRouter } from './controller/game.routes';
import { libraryRouter } from './controller/library.routes';
import { purchaseRouter } from './controller/purchase.routes';
import { userRouter } from './controller/user.routes';
import { profileRouter } from './controller/profile.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/games', gameRouter);
app.use('/libraries', libraryRouter);
app.use('/purchases', purchaseRouter);
app.use('/users', userRouter);
app.use('/profiles', profileRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Setback API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));