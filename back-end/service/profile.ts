import profileDb from '../repository/profile.db';
import {Profile} from '../model/profile';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const getAllProfiles = async (): Promise<Profile[]> => {
    return await profileDb.getAllProfiles();
};

const getProfileById = (id: number): Promise<Profile | null> => {
    if (profileDb.getProfileById(id) === null) {
        throw new Error(`Library with id ${id} not found`);
    }
    return profileDb.getProfileById(id)!;
};

const updateProfile = async (id: number, profilePic: string, description: string): Promise<void> => {
    const oldProfile = await profileDb.getProfileById(id);
    if (!oldProfile) {
        throw new Error(`Profile with id ${id} not found`);
    }
    oldProfile.setProfilePic(profilePic);
    oldProfile.setDescription(description);

    await prisma.profile.update({
        where: { id: id },
        data: {
            profilePic: profilePic,
            description: description,
        }
    });
}

export default {
    getAllProfiles,
    getProfileById,
    updateProfile,
};
