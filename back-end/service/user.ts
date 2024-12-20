import {Purchase} from '../model/purchase';
import {User} from '../model/user';
import userDb from '../repository/user.db';
import {Library} from '../model/library';
import {Profile} from '../model/profile';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {AuthenticationResponse, Role, UserInput} from "../types";

const getAllUsers = async (): Promise<User[]> => await userDb.getAllUsers();

const getUserById = (id: number): Promise<User | null> => {
    if (userDb.getUserById(id) === null) {
        throw new Error(`User with id ${id} not found`);
    }
    return userDb.getUserById(id)!;
};

const getUserByUsername = (username: string): Promise<User | null> => {
    if (userDb.getUserByUsername(username) === null) {
        throw new Error(`User with username ${username} not found`);
    }
    return userDb.getUserByUsername(username)!;
};

const newUser = async (username: string, password: string) => {
    const existingUser = await userDb.getUserByUsername(username);
    if (existingUser) {
        throw new Error(`User with username: ${username} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    const id = (await userDb.getAllUsers()).length + 1;
    const library = new Library({id, games: [], achievements: 0, timePlayed: 0})
    const profile = new Profile({id, profilePic: "/images/profile/1.png", description: `This is the profile of ${username}.`})
    const purchases: Purchase[] = [];

    const user = new User({
        id,
        username,
        password: hashedPassword,
        library,
        profile,
        purchases,
        balance: 0,
        role: Role.User,
    });

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

const login = async ({ username, password, role }: UserInput): Promise<AuthenticationResponse | Error> => {
    if (!username || !password || !role) {
        return new Error("Invalid input");
    }

    const user = await getUserByUsername(username);

    if (!user) {
        throw new Error("Username or password is invalid");
    }

    const isPasswordCorrect = user.id < 4
        ? password === user.getPassword()
        : await bcrypt.compare(password, user.getPassword());

    if (!isPasswordCorrect) {
        throw new Error("Username or password is invalid");
    }

    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(
        {
            username: user.getUsername(),
            role: user.getRole(),
        },
        jwtSecret!,
        { expiresIn: '8h' }
    );

    return {
        token: token,
        username: user.getUsername(),
        role: user.getRole(),
    };
};

const generateJwtToken = (username: string, role: Role): string => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const expiresIn = `${process.env.JWT_EXPIRES_HOURS || 8}h`;
    const options = { expiresIn, issuer: 'courses_app' };

    return jwt.sign({ username, role }, jwtSecret, options);
};

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    newUser,
    getUserBalance,
    addUserBalance,
    login,
    generateJwtToken,
};
