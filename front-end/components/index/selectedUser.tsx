import React from 'react';
import { User, Game } from '@types';
import UserGamesTable from '@components/index/userGamesTable';
import styles from '@styles/home.module.css';

interface SelectedUserProps {
    selectedUser: User;
    selectedUserGames: Game[];
}

const SelectedUser: React.FC<SelectedUserProps> = ({ selectedUser, selectedUserGames }) => {
    return (
        <section className={styles.selectedUserSection}>
            <img className={styles.selectedUserProfilePic} src={selectedUser.profile.profilePic} alt="Profile picture" />
            <div className={styles.selectedUserContent}>
                <h2 className={styles.selectedUserUsername}>{selectedUser.username}</h2>
                {selectedUserGames.length > 0 ? (
                    <UserGamesTable games={selectedUserGames} />
                ) : (
                    <p>User does not own any games</p>
                )}
            </div>
        </section>
    );
};

export default SelectedUser;