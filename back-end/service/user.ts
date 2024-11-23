import { Purchase } from '../model/purchase';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { Library } from '../model/library';
import { Profile } from '../model/profile';

const getAllUsers = async (): Promise<User[]> => await userDb.getAllUsers();

const getUserById = (id: number): Promise<User | null> => {
    if (userDb.getUserById(id) === null) {
        throw new Error(`User with id ${id} not found`);
    }
    return userDb.getUserById(id)!;
};

const newUser = async (username: string, password: string, library: Library, profile: Profile, balance: number): Promise<void> => {
    const id = (await userDb.getAllUsers()).length + 1;
    const purchases: Purchase[] = [];
    const user = new User({ id, username, password, library, profile, purchases, balance });
    return userDb.newUser(user);
};

const getUserBalance = async (id: number): Promise<number> => {
    const user = await getUserById(id);
    return userDb.getBalance(user!);
};

const addUserBalance = async (id: number, amount: number): Promise<number> => {
    const user = await getUserById(id);
    return userDb.addBalance(user!, amount);
};

export default {
    getAllUsers,
    getUserById,
    newUser,
    getUserBalance,
    addUserBalance
};
