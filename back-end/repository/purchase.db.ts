import { Game } from '../model/game';
import { Purchase } from '../model/purchase';
import { User } from '../model/user';
import { PrismaClient } from '@prisma/client';

const purchases: Purchase[] = [];
const prisma = new PrismaClient();

const getAllPurchases = (): Purchase[] => purchases;

const getPurchaseById = (id: number): Purchase | null => {
    return purchases.find((purchase) => purchase.getId() === id) || null;
};

const newPurchase = async (user: User, game: Game): Promise<void> => {
    user.setBalance(user.getBalance() - game.getPrice());
    await prisma.user.update({
        where: { id: user.id },
        data: { balance: user.balance }
    });

    await prisma.gamesInLibraries.create({
        data: {
            game: { connect: { id: game.id } },
            library: { connect: { id: user.getLibrary().id } }
        }
    });

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
