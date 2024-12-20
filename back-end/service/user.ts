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

const newUser = async (username: string, password: string, library: Library, profile: Profile, balance: number, role: Role) => {
    const id = (await userDb.getAllUsers()).length + 1;
    const purchases: Purchase[] = [];
    const user = new User({ id, username, password, library, profile, purchases, balance, role });
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

const login = async({ username, password, role }: UserInput): Promise<AuthenticationResponse> => {
    if (!username || !password || !role) {
        throw new Error("Missing arguments. Try again")
    }
    const user = await getUserByUsername(username);
    if (!user) {
        throw new Error(`User with username ${username} not found`);
    }
    const result = await bcrypt.compare(password, user.getPassword());

    if (result) {
        throw new Error('Error');
    }

    return {
        token: generateJwtToken(username, role),
        username: username,
        role: role
    }
};

const generateJwtToken = (username: string, role: Role): string => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'courses_app' };

    try {
        return jwt.sign({ username, role }, jwtSecret, options);
    } catch (error) {
        console.error(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
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
