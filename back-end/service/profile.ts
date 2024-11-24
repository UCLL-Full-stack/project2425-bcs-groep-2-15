import profileDb from '../repository/profile.db';
import { Profile } from '../model/profile';

const getAllProfiles = async (): Promise<Profile[]> => {
    return await profileDb.getAllProfiles();
};

const getProfileById = (id: number): Promise<Profile | null> => {
    if (profileDb.getProfileById(id) === null) {
        throw new Error(`Library with id ${id} not found`);
    }
    return profileDb.getProfileById(id)!;
};

export default {
    getAllProfiles,
    getProfileById
};
