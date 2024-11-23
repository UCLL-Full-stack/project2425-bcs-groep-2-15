import { User } from '../model/user';
import { Game } from '../model/game';
import database from './database';
import { $Enums, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mapUser = (userData: any): User => {
    const games = userData.library.GamesInLibraries.map((entry: {
        game: {
            id: number;
            title: string;
            image: string;
            categories: $Enums.Genre[];
            price: number;
            discount?: number | null | undefined;
        };
    }) => new Game(entry.game));

    return new User({
        id: userData.id,
        username: userData.username,
        password: userData.password,
        balance: userData.balance,
        library: userData.library,
        profile: userData.profile,
        purchases: userData.purchases
    });
};

const getAllUsers = async (): Promise<User[]> => {
    const usersData = await database.user.findMany({
        include: {
            library: {
                include: {
                    GamesInLibraries: {
                        include: {
                            game: true
                        }
                    }
                }
            },
            profile: true,
            purchases: true
        }
    });

    return usersData.map(mapUser);
};

const getUserById = async (id: number): Promise<User | null> => {
    const userData = await database.user.findUnique({
        where: { id },
        include: {
            library: {
                include: {
                    GamesInLibraries: {
                        include: {
                            game: true
                        }
                    }
                }
            },
            profile: true,
            purchases: true
        }
    });

    if (!userData) {
        return null;
    }

    return mapUser(userData);
};


const newUser = async (user: User): Promise<void> => {
    const userData = await database.user.create({
        data: {
            username: user.username,
            password: user.password,
            balance: user.balance,
            library: {
                create: {
                    achievements: user.library.achievements,
                    timePlayed: user.library.timePlayed,
                    GamesInLibraries: {
                        create: user.library.games.map(game => ({
                            gameId: game.id
                        }))
                    }
                }
            },
            profile: {
                create: {
                    description: user.profile.getDescription(),
                    profilePic: user.getProfile().getProfilePic()
                }
            },
            purchases: {
                create: user.purchases.map(purchase => ({
                    cost: purchase.cost,
                    date: purchase.date,
                    gameId: purchase.game.id
                }))
            }
        }
    });
};


const getBalance = (user: User): number => {
    return user.getBalance();
};

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
