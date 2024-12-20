import purchaseDb from '../repository/purchase.db';
import {Purchase} from '../model/purchase';
import userDb from '../repository/user.db';
import gameDb from '../repository/game.db';

const getAllPurchases = async (): Promise<Purchase[]> => await purchaseDb.getAllPurchases();

const getPurchasesOfUser = async (userId: number): Promise<Purchase[]> => {
    const user = await userDb.getUserById(userId);
    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }
    return await purchaseDb.getPurchasesOfUser(userId);
}

const getPurchaseById = (id: number): Promise<Purchase | null> => {
    if (purchaseDb.getPurchaseById(id) === null) {
        throw new Error(`Purchase with id ${id} not found`);
    }
    return purchaseDb.getPurchaseById(id)!;
};

const newPurchase = async (userId: number, gameId: number) => {
    const user = await userDb.getUserById(userId);
    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }

    const game = await gameDb.getGameById(gameId);
    if (!game) {
        throw new Error(`Game with id ${gameId} not found`);
    }

    if (user.getBalance() < game.getPrice()) {
        {
            throw new Error('Game\'s price is higher than user\'s balance');
        }
    }

    await purchaseDb.newPurchase(user, game);
};

export default {
    getAllPurchases,
    getPurchasesOfUser,
    getPurchaseById,
    newPurchase
};
