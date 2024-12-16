import { User } from '../model/user';
import database from './database';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mapUser = (userData: any): User => {
    return new User({
        id: userData.id,
        username: userData.username,
        password: userData.password,
        balance: userData.balance,
        library: userData.library,
        profile: userData.profile,
        purchases: userData.purchases,
        role: userData.role
    });
};

const getUsersCommonQuery = () => ({
    include: {
        library: { include: { GamesInLibraries: { include: { game: true } } } },
        profile: true,
        purchases: true
    }
});

const getAllUsers = async (): Promise<User[]> => {
    const usersData = await database.user.findMany(getUsersCommonQuery());
    return usersData.map(mapUser);
};

const getUserById = async (id: number): Promise<User | null> => {
    const userData = await database.user.findUnique({
        where: { id },
        ...getUsersCommonQuery()
    });
    return userData ? mapUser(userData) : null;
};

const getUserByUsername = async (username: string): Promise<User | null> => {
    const userData = await database.user.findUnique({
        where: { username },
        ...getUsersCommonQuery()
    });
    return userData ? mapUser(userData) : null;
}

const newUser = async (user: User) => {
    const { username, password, balance, library, profile, purchases } = user;

    await database.user.create({
        data: {
            username,
            password,
            balance,
            library: {
                create: {
                    achievements: library.achievements,
                    timePlayed: library.timePlayed,
                    GamesInLibraries: {
                        create: library.games.map(game => ({ gameId: game.id }))
                    }
                }
            },
            profile: {
                create: {
                    description: profile.getDescription(),
                    profilePic: profile.getProfilePic()
                }
            },
            purchases: {
                create: purchases.map(purchase => ({
                    cost: purchase.cost,
                    date: purchase.date,
                    gameId: purchase.game.id
                }))
            }
        }
    });
};

const getBalance = (user: User): number => user.getBalance();

const addBalance = async (user: User, amount: number): Promise<number> => {
    user.setBalance(user.getBalance() + amount);

    await prisma.user.update({
        where: { id: user.id },
        data: { balance: user.balance }
    });

    return user.getBalance();
};

export default {
    getUserById,
    getAllUsers,
    newUser,
    getBalance,
    addBalance
};
