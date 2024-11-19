import { Game } from '../model/game';
import purchaseDb from '../repository/purchase.db';
import { Purchase } from '../model/purchase';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import gameDb from '../repository/game.db';
import { Library } from '../model/library';
import { Profile } from '../model/profile';

const getAllUsers = (): User[] => userDb.getAllUsers()

const getUserById = (id: number): User => {
    if (userDb.getUserById(id) === null) {
        throw new Error(`User with id ${id} not found`);
    }
    return userDb.getUserById(id)!;
}

const newUser = (username: string, password: string, library: Library, profile: Profile, balance: number): User => {
    const id = userDb.getAllUsers().length + 1;
    const purchases: Purchase[] = [];
    const user = new User( { id, username, password, library, profile, purchases, balance } );
    return userDb.newUser(user);
}

const getUserBalance = (id: number): number => {
    const user = getUserById(id);
    return userDb.getBalance(user);
}

const addUserBalance = (id: number, amount: number): number => {
    const user = getUserById(id);
    return userDb.addBalance(user, amount);
}

export default {
    getAllUsers,
    getUserById,
    newUser,
    getUserBalance,
    addUserBalance,
};
