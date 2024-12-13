import profileDb from '../../repository/profile.db';
import { Profile } from '../../model/profile';

describe("Profile Database", () => {
    it("should return all profiles", () => {
        const profiles = profileDb.getAllProfiles();
        expect(profiles.length).toBeGreaterThan(0); 
        expect(profiles[0]).toBeInstanceOf(Profile);
    });

    it("should return a profile by ID", () => {
        const profile = profileDb.getProfileById(1);
        expect(profile).toBeInstanceOf(Profile);
        expect(profile?.getId()).toBe(1);
    });

    it("should return null if profile ID does not exist", () => {
        const profile = profileDb.getProfileById(999);
        expect(profile).toBeNull();
    });
});
