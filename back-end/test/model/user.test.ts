import { User } from '../../model/user';
import { Library } from '../../model/library';
import { Profile } from '../../model/profile';
import { Purchase } from '../../model/purchase';
import { Role } from '../../types';

describe('User Model', () => {
    let user: User;
    let mockLibrary: Library;
    let mockProfile: Profile;
    let mockPurchases: Purchase[];

    beforeEach(() => {
        mockLibrary = {} as Library;
        mockProfile = {} as Profile;
        mockPurchases = [{} as Purchase, {} as Purchase];

        user = new User({
            id: 1,
            username: 'testuser',
            password: 'password123',
            library: mockLibrary,
            profile: mockProfile,
            purchases: mockPurchases,
            balance: 100,
            role: Role.User,
        });
    });

    test('should create a user correctly', () => {
        expect(user).toBeInstanceOf(User);
        expect(user.getId()).toBe(1);
        expect(user.getUsername()).toBe('testuser');
        expect(user.getPassword()).toBe('password123');
        expect(user.getLibrary()).toBe(mockLibrary);
        expect(user.getProfile()).toBe(mockProfile);
        expect(user.getPurchases()).toEqual(mockPurchases);
        expect(user.getBalance()).toBe(100);
        expect(user.getRole()).toBe('User');
    });

    test('should throw error on invalid username', () => {
        expect(() => new User({ ...user, username: '' })).toThrow('Username is required');
    });

    test('should throw error on invalid password', () => {
        expect(() => new User({ ...user, password: '' })).toThrow('Password is required');
    });

    test('should throw error on invalid balance', () => {
        expect(() => new User({ ...user, balance: NaN })).toThrow('Balance is required and must be a number');
    });


    test('should set and get balance correctly', () => {
        user.setBalance(150);
        expect(user.getBalance()).toBe(150);
    });

    test('should set and get role correctly', () => {
        user.setRole(Role.Admin);
        expect(user.getRole()).toBe('Admin');
    });

    test('should throw error on setting invalid role', () => {
        expect(() => user.setRole('InvalidRole' as Role)).toThrow('Invalid role');
    });


    test('should compare two users correctly', () => {
        const anotherUser = new User({ ...user, username: 'testuser2' });
        expect(user.equals(anotherUser)).toBe(false);

        const identicalUser = new User({ ...user });
        expect(user.equals(identicalUser)).toBe(true);
    });
});
