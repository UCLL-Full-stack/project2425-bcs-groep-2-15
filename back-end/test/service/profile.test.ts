import profileService from '../../service/profile';
import { Profile } from '../../model/profile';
import database from '../../repository/database';

jest.mock('../../repository/database', () => ({
    profile: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn()
    }
}));

describe('Profile Service Tests', () => {
    const mockProfiles = [
        new Profile({ id: 1, description: 'Test Profile 1', profilePic: 'pic1.jpg' }),
        new Profile({ id: 2, description: 'Test Profile 2', profilePic: 'pic2.jpg' })
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getAllProfiles: should return all profiles', async () => {
        // Mock the database method
        (database.profile.findMany as jest.Mock).mockResolvedValue(mockProfiles);

        const result = await profileService.getAllProfiles();

        expect(database.profile.findMany).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockProfiles);
        expect(result.every(profile => profile instanceof Profile)).toBe(true);
    });

    test('getProfileById: should return a profile by ID', async () => {
        const mockProfile = new Profile({ id: 1, description: 'Test Profile', profilePic: 'pic1.jpg' });

        (database.profile.findUnique as jest.Mock).mockResolvedValue(mockProfile);

        const result = await profileService.getProfileById(1);

        expect(database.profile.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(mockProfile);
        expect(result).toBeInstanceOf(Profile);
    });

    test('getProfileById: should return null for non-existing profile', async () => {
        (database.profile.findUnique as jest.Mock).mockResolvedValue(null);

        const result = await profileService.getProfileById(999);

        expect(database.profile.findUnique).toHaveBeenCalledWith({ where: { id: 999 } });
        expect(result).toBeNull();
    });

});
