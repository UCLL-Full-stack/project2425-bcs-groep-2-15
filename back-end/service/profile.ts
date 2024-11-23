import profileDb from '../repository/profile.db';
import { Profile } from '../model/profile';

const getAllProfiles = (): Profile[] => {
    return profileDb.getAllProfiles();
};

const getProfileById = (id: number): Profile => {
    if (profileDb.getProfileById(id) === null) {
        throw new Error(`Library with id ${id} not found`);
    }
    return profileDb.getProfileById(id)!;
};

export default {
    getAllProfiles,
    getProfileById
};
