import React from 'react';
import {Game, Profile, User} from '@types';
import styles from '@styles/profile.module.css';

type Props = {
    profile: Profile,
    user: User,
    games: Game[],
    setEditProfileVisibility: () => void
};

const ProfileInterface: React.FC<Props> = ({ profile, user, games, setEditProfileVisibility }: Props) => {
    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div>
                    <img
                        src={profile.profilePic}
                        alt="Profile picture"
                        style={{ width: '150px', height: 'auto' }}
                    />
                </div>
                <div>
                    <h2>{user.username}</h2>
                    <p>{profile.description}</p>
                    <button className={styles.editButton} onClick={() => setEditProfileVisibility()}>Edit</button>
                </div>
            </div>

            <div style={{ marginTop: '5%' }}>
                <table className={styles.profileTable}>
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {games.map((game, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    style={{ width: '150px', height: 'auto' }}
                                />
                            </td>
                            <td>{game.title}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProfileInterface;