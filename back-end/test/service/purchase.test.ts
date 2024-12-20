import purchaseService from '../../service/purchase';
import purchaseDb from '../../repository/purchase.db';
import userDb from '../../repository/user.db';
import gameDb from '../../repository/game.db';
import { Purchase } from '../../model/purchase';

jest.mock('../../repository/purchase.db');
jest.mock('../../repository/user.db');
jest.mock('../../repository/game.db');

const mockPurchase = {
    id: 1,
    userId: 1,
    gameId: 1,
    purchaseDate: new Date()
};

const mockUser = {
    id: 1,
    name: 'Test User',
    getBalance: jest.fn(() => 100)
};

const mockGame = {
    id: 1,
    title: 'Test Game',
    price: 50
};

// Mock purchaseDb methods
purchaseDb.getAllPurchases = jest.fn().mockResolvedValue([mockPurchase]);
purchaseDb.getPurchasesOfUser = jest.fn().mockResolvedValue([mockPurchase]);
purchaseDb.getPurchaseById = jest.fn().mockResolvedValue(mockPurchase);
purchaseDb.newPurchase = jest.fn().mockResolvedValue(mockPurchase);

// Mock userDb methods
userDb.getUserById = jest.fn().mockResolvedValue(mockUser);

// Mock gameDb methods
gameDb.getGameById = jest.fn().mockResolvedValue(mockGame);

describe('Purchase Service', () => {
    it('should get all purchases', async () => {
        const purchases = await purchaseService.getAllPurchases();
        expect(purchases).toHaveLength(1);
        expect(purchases[0].id).toBe(mockPurchase.id);
    });

    it('should get purchases of a user', async () => {
        const purchases = await purchaseService.getPurchasesOfUser(1);
        expect(purchases).toHaveLength(1);
        expect(purchases[0].id).toBe(mockPurchase.id);
    });

    it('should throw an error if user not found when getting purchases of user', async () => {
        userDb.getUserById = jest.fn().mockResolvedValue(null);
        await expect(purchaseService.getPurchasesOfUser(999)).rejects.toThrow('User with id 999 not found');
    });

    it('should get a purchase by id', async () => {
        const purchase = await purchaseService.getPurchaseById(1);
        expect(purchase).toEqual(mockPurchase);
    });


    it('should throw an error if user not found when creating a new purchase', async () => {
        userDb.getUserById = jest.fn().mockResolvedValue(null);
        await expect(purchaseService.newPurchase(999, 1)).rejects.toThrow('User with id 999 not found');
    });

});
