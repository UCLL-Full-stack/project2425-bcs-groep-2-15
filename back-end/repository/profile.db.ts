import { Profile } from '../model/profile';
import database from './database';

const getAllProfiles = async (): Promise<Profile[]> => {
    const result = await database.profile.findMany();
    return result.map(profileData => new Profile(profileData));
};

const getProfileById = async (id: number): Promise<Profile | null> => {
    const profileData = await database.profile.findUnique({
        where: { id }
    });
    if (!profileData) {
        return null;
    }
    return new Profile(profileData);
};

const updateProfile = async (id: number, profileData: Profile): Promise<void> => {
    await database.profile.update({
        where: {
            id: id,
        },
        data: {
            description: profileData.getDescription(),
            profilePic: profileData.getProfilePic(),
        },
    });
};


// const newProfile = (user: User, game: Game): Purchase => {
//     libraryGames.push(game);
//     return game;
// }

export default {
    getAllProfiles,
    getProfileById,
    updateProfile,
};
