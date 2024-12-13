import { Profile } from '../../../back-end/model/profile';

describe('Profile', () => {
  let validProfileData: { id: number; description: string; profilePic: string };

  beforeEach(() => {
    validProfileData = {
      id: 1,
      description: 'A brief description',
      profilePic: 'http://example.com/pic.jpg',
    };
  });

  it('should create a Profile instance with valid data', () => {
    const profile = new Profile(validProfileData);
    expect(profile.getId()).toBe(validProfileData.id);
    expect(profile.getDescription()).toBe(validProfileData.description);
    expect(profile.getProfilePic()).toBe(validProfileData.profilePic);
  });

  it('should return true for equals() if profiles are identical', () => {
    const profile1 = new Profile(validProfileData);
    const profile2 = new Profile(validProfileData);
    expect(profile1.equals(profile2)).toBe(true);
  });

  it('should return false for equals() if profiles are different', () => {
    const profile1 = new Profile(validProfileData);
    const differentProfileData = { ...validProfileData, id: 2 };
    const profile2 = new Profile(differentProfileData);
    expect(profile1.equals(profile2)).toBe(false);
  });
});
