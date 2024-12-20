import userService from '../../service/user';
import userDb from '../../repository/user.db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role, UserInput } from '../../types';
import { User } from '../../model/user';
import { Library } from '../../model/library';
import { Profile } from '../../model/profile';

jest.mock('../../repository/user.db');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Service Tests', () => {
    const mockLibrary = new Library({ id: 1, games: [], achievements: 0, timePlayed: 0 });
    const mockProfile = new Profile({ id: 1, description: 'Test Profile', profilePic: 'test.jpg' });

    const mockUser = new User({
        id: 1,
        username: 'testUser',
        password: 'hashedPassword',
        library: mockLibrary,
        profile: mockProfile,
        purchases: [],
        balance: 100,
        role: Role.User,
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getAllUsers: should return all users', async () => {
        (userDb.getAllUsers as jest.Mock).mockResolvedValue([mockUser]);

        const result = await userService.getAllUsers();

        expect(userDb.getAllUsers).toHaveBeenCalledTimes(1);
        expect(result).toEqual([mockUser]);
    });

    test('getUserById: should return a user by ID', async () => {
        (userDb.getUserById as jest.Mock).mockResolvedValue(mockUser);

        const result = await userService.getUserById(1);

        expect(userDb.getUserById).toHaveBeenCalledWith(1);
        expect(result).toEqual(mockUser);
    });

    test('newUser: should create a new user successfully', async () => {
        (userDb.getUserByUsername as jest.Mock).mockResolvedValue(null);
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
        (userDb.getAllUsers as jest.Mock).mockResolvedValue([mockUser]);
        (userDb.newUser as jest.Mock).mockResolvedValue({ id: 2 });

        const username = 'newUser';
        const password = 'password123';

        const result = await userService.newUser(username, password);

        expect(userDb.getUserByUsername).toHaveBeenCalledWith(username);
        expect(bcrypt.hash).toHaveBeenCalledWith(password, 12);
        expect(userDb.newUser).toHaveBeenCalledTimes(1);
        expect(userDb.newUser).toHaveBeenCalledWith(
            expect.objectContaining({
                username,
                password: 'hashedPassword',
                library: expect.any(Library),
                profile: expect.any(Profile),
                role: Role.User,
                balance: 0,
                purchases: [],
            })
        );
        expect(result).toEqual({ id: 2 });
    });

    test('newUser: should throw an error if username already exists', async () => {
        (userDb.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);

        const username = 'testUser';
        const password = 'password123';

        await expect(userService.newUser(username, password)).rejects.toThrowError(
            `User with username: ${username} already exists.`
        );

        expect(userDb.getUserByUsername).toHaveBeenCalledWith(username);
        expect(bcrypt.hash).not.toHaveBeenCalled();
        expect(userDb.newUser).not.toHaveBeenCalled();
    });

    test('addUserBalance: should add balance to user account', async () => {
        (userDb.getUserById as jest.Mock).mockResolvedValue(mockUser);
        (userDb.addBalance as jest.Mock).mockResolvedValue(150);

        const result = await userService.addUserBalance(1, 50);

        expect(userDb.getUserById).toHaveBeenCalledWith(1);
        expect(userDb.addBalance).toHaveBeenCalledWith(mockUser, 50);
        expect(result).toBe(150);
    });

    test('getUserBalance: should return user balance', async () => {
        (userDb.getUserById as jest.Mock).mockResolvedValue(mockUser);
        (userDb.getBalance as jest.Mock).mockResolvedValue(100);

        const result = await userService.getUserBalance(1);

        expect(userDb.getUserById).toHaveBeenCalledWith(1);
        expect(userDb.getBalance).toHaveBeenCalledWith(mockUser);
        expect(result).toBe(100);
    });
});