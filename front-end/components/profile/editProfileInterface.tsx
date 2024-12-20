import React, {useState} from 'react';
import styles from '@styles/profile.module.css';
import {Profile} from '@types';

interface EditProfileInterfaceProps {
    profile: Profile,
    updateProfile: (profilePic: string, description: string) => Promise<void>,
    userId: number | null
}

const EditProfileInterface: React.FC<EditProfileInterfaceProps> = ({ profile, updateProfile, userId }) => {
    const [description, setDescription] = useState(profile.description);
    const [profilePic, setProfilePic] = useState<string>('');
    const [error, setError] = useState('');

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[1-4]$/.test(value)) {
            setProfilePic(`/images/profile/${value}.png`);
        }
    };

    return (
        <div className={styles.editProfileContainer}>
            <div className={styles.profilePictureGrid}>
                <img className={styles.profilePictureGridPic} src={'/images/profile/1.png'} alt={'Profile picture 1'} />
                <img className={styles.profilePictureGridPic} src={'/images/profile/2.png'} alt={'Profile picture 2'} />
                <img className={styles.profilePictureGridPic} src={'/images/profile/3.png'} alt={'Profile picture 3'} />
                <img className={styles.profilePictureGridPic} src={'/images/profile/4.png'} alt={'Profile picture 4'} />
            </div>
            <form className={styles.editProfileForm} onSubmit={() => updateProfile(profilePic, description)}>
            <div className={styles.inputGroup}>
                    <label htmlFor="profilePic">Profile Picture Number (1-4)</label>
                    <input
                        type="number"
                        id="profilePic"
                        name="profilePic"
                        value={profilePic ? profilePic.match(/\d+/)?.[0] : ''}
                        onChange={handleProfilePicChange}
                        placeholder="Enter a number between 1 and 4"
                        min="1"
                        max="4"
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write a short description about yourself"
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Save Changes
                </button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default EditProfileInterface;
