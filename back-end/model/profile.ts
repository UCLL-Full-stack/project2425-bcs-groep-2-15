export class Profile {
    private id: number;
    private description: string;
    private profilePic: string;

    constructor(profile: {
        id: number;
        description: string;
        profilePic: string;
    }) {
        this.validate(profile);

        this.id = profile.id;
        this.description = profile.description;
        this.profilePic = profile.profilePic;
    }

    getId(): number {
        return this.id;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(description: string) {
        this.description = description;
    }

    getProfilePic(): string {
        return this.profilePic;
    }

    setProfilePic(profilePic: string) {
        this.profilePic = profilePic;
    }

    validate(profile: {
        id: number;
        description: string;
        profilePic: string;
    }) {
        if (!profile.description?.trim()) {
            throw new Error('Description is required');
        }
        if (!profile.profilePic?.trim()) {
            throw new Error('Profile picture is required');
        }
    }

    equals(profile: Profile): boolean {
        return (
            this.id === profile.getId() &&
            this.description === profile.getDescription() &&
            this.profilePic === profile.getProfilePic()
        );
    }
}
