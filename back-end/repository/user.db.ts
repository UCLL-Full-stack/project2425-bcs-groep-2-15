import { User } from '../model/user';
import { Game } from '../model/game';
import libraryDb from './library.db';
import profileDb from './profile.db';
import { Library } from '../model/library';
import purchase from '../service/purchase';
import purchaseDb from './purchase.db';

const users = [
    new User({
        id: 1,
        username: "User",
        password: "1234",
        library: libraryDb.getLibraryById(1)!,
        profile: profileDb.getProfileById(1)!,
        purchases: [],
        balance: 99.99
    })
];

const getAllUsers = (): User[] => users;

const getUserById = (id: number): User | null => {
    return users.find((user) => user.getId() === id) || null;
};

const newUser = (user: User): User => {
    users.push(user);
    return user;
}

const getBalance = (user: User): number => {
    return user.getBalance();
}

const addBalance = (user: User, amount: number): number => {
    user.setBalance(user.getBalance() + amount);
    return user.getBalance();
}

export default {
    getUserById,
    getAllUsers,
    newUser,
    getBalance,
    addBalance,
};
