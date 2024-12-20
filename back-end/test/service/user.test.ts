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

    test('login: should throw a generic error on authentication attempt', async () => {
        (userDb.getUserByUsername as jest.Mock).mockResolvedValue({
            getPassword: jest.fn().mockReturnValue('hashedPassword'),
        });
        (bcrypt.compare as jest.Mock).mockResolvedValue(true); 
    
        await expect(
            userService.login({ username: 'testUser', password: 'testPassword', role: Role.User })
        ).rejects.toThrow('Error');
    });
    
    

    test('newUser: should create a new user', async () => {
        (userDb.getAllUsers as jest.Mock).mockResolvedValue([]);
        (userDb.newUser as jest.Mock).mockResolvedValue(mockUser);

        const result = await userService.newUser(
            'testUser',
            'plainPassword',
            mockLibrary,
            mockProfile,
            100,
            Role.User
        );

        expect(userDb.newUser).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUser);
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