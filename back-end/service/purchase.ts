import { Game } from '../model/game';
import purchaseDb from '../repository/purchase.db';
import { Purchase } from '../model/purchase';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import gameDb from '../repository/game.db';

const getAllPurchases = (): Purchase[] => purchaseDb.getAllPurchases()

const getPurchaseById = (id: number): Purchase => {
    if (purchaseDb.getPurchaseById(id) === null) {
        throw new Error(`Purchase with id ${id} not found`);
    }
    return purchaseDb.getPurchaseById(id)!;
}

const newPurchase = (userId: number, gameId: number): Purchase => {
    const user = userDb.getUserById(userId);
    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }

    const game = gameDb.getGameById(gameId);
    if (!game) {
        throw new Error(`Game with id ${gameId} not found`);
    }

    if (user.getBalance() < game.getPrice()) {{
        throw new Error("Game's price is higher than user's balance")
    }}

    user.setBalance(user.getBalance() - game.getPrice());
    return purchaseDb.newPurchase(user, game);
}

export default {
    getAllPurchases,
    getPurchaseById,
    newPurchase,
};
