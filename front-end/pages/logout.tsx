import React from 'react';
import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/login.module.css';
import LogoutConfirmation from '@components/login/logoutConfirmation';
import fetchUserInfo from "../hooks/fetchUserInfo";

const Logout: React.FC = () => {
    const { userId, userRole, userBalance } = fetchUserInfo();

    const handleLogoutSuccess = () => {
        console.log("User successfully logged out.");
    };

    return (
        <>
            <Head>
                <title>Setback | Logout</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} userRole={userRole} userBalance={userBalance} />
            <main className={styles.main}>
                <LogoutConfirmation onLogout={handleLogoutSuccess} />
            </main>
        </>
    );
};

export default Logout;
