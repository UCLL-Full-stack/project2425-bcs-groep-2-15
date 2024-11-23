import { Game } from '../model/game';
import { Purchase } from '../model/purchase';
import { User } from '../model/user';
import libraryDb from './library.db';
import { PrismaClient } from '@prisma/client';

const purchases: Purchase[] = [];
const prisma = new PrismaClient();

const getAllPurchases = (): Purchase[] => purchases;

const getPurchaseById = (id: number ): Purchase | null => {
    return purchases.find((purchase) => purchase.getId() === id) || null;
};

const newPurchase = async (user: User, game: Game): Promise<void> => {
    const libraryId = user.getLibrary().getId();

    if (!libraryId) {
        throw new Error(`User with id ${user.id} does not have a library.`);
    }

    const library = await prisma.library.findUnique({
        where: { id: libraryId }
    });

    if (!library) {
        throw new Error(`Library with id ${libraryId} does not exist.`);
    }

    const existingGameInLibrary = await prisma.gamesInLibraries.findFirst({
        where: {
            gameId: game.id,
            libraryId: libraryId
        }
    });

    if (!existingGameInLibrary) {
        await prisma.gamesInLibraries.create({
            data: {
                game: { connect: { id: game.id } },
                library: { connect: { id: libraryId } }
            }
        });
    }

    await prisma.purchase.create({
        data: {
            date: new Date(),
            cost: game.price,
            user: { connect: { id: user.id } },
            game: { connect: { id: game.id } }
        }
    });
};

export default {
    getAllPurchases,
    getPurchaseById,
    newPurchase
};
