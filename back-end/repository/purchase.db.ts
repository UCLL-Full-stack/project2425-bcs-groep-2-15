import { Game } from '../model/game';
import { Purchase } from '../model/purchase';
import { User } from '../model/user';
import { PrismaClient } from '@prisma/client';
import database from './database';
import userDb from './user.db';

const prisma = new PrismaClient();

const mapPurchase = (purchaseData: any): Purchase => {
    let user = purchaseData.user;
    if (!user) {
        user = userDb.getUserById(purchaseData.userId);
    }
    let game = purchaseData.game;
    if (!game) {
        game = userDb.getUserById(purchaseData.gameId);
    }

    return new Purchase({
        id: purchaseData.id,
        date: purchaseData.date,
        cost: purchaseData.cost,
        user: user,
        game: game
    });
};


const getAllPurchases = async (): Promise<Purchase[]> => {
    const purchasesData = await database.purchase.findMany();
    return purchasesData.map(mapPurchase);
};

const getPurchasesOfUser = async (userId: number): Promise<Purchase[]> => {
    const purchasesData = await database.purchase.findMany({
        where: { userId: userId }
    });
    return purchasesData.map(mapPurchase);
};

const getPurchaseById = async (id: number): Promise<Purchase | null> => {
    const purchaseData = await database.purchase.findUnique({
        where: { id }
    });

    return purchaseData ? mapPurchase(purchaseData) : null;
};

const newPurchase = async (user: User, game: Game) => {
    user.setBalance(user.getBalance() - game.getPrice());
    await prisma.user.update({
        where: { id: user.id },
        data: { balance: Number(user.balance.toFixed(2)) }
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
    getPurchasesOfUser,
    getPurchaseById,
    newPurchase
};
