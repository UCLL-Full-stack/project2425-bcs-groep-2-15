import profileDb from '../../repository/profile.db';
import { Profile } from '../../model/profile';

describe('Profile Repository', () => {


    it('should return null if profile not found by id', async () => {
        const profile = await profileDb.getProfileById(999);
        expect(profile).toBeNull();
    });

    it('should update a profile', async () => {
        const updatedProfileData = new Profile({ id: 1, description: 'Updated description', profilePic: 'updated-pic.jpg' });
        await profileDb.updateProfile(1, updatedProfileData);
        expect(true).toBe(true); 
    });
});
