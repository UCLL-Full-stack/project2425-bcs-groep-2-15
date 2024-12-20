import React from 'react';
import {Purchase, User} from '@types';
import UserGamesTable from '@components/index/userPurchasesTable';
import styles from '@styles/home.module.css';

interface SelectedUserProps {
    selectedUser: User,
    selectedUserPurchases: Purchase[]
}

const SelectedUser: React.FC<SelectedUserProps> = ({ selectedUser, selectedUserPurchases }) => {
    return (
        <section className={styles.selectedUserSection}>
            <img className={styles.selectedUserProfilePic} src={selectedUser.profile.profilePic}
                 alt="Profile picture" />
            <div className={styles.selectedUserContent}>
                <h2 className={styles.selectedUserUsername}>{selectedUser.username}</h2>
                {selectedUserPurchases.length > 0 ? (
                    <UserGamesTable purchases={selectedUserPurchases}/>
                ) : (
                    <p>User does have any purchases.</p>
                )}
            </div>
        </section>
    );
};

export default SelectedUser;