import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/balance.module.css';
import React, {useEffect, useState} from 'react';
import UserService from '@services/UserService';
import userService from '@services/UserService';
import fetchUserInfo from "../hooks/fetchUserInfo";

const Balance: React.FC = () => {
    const { userId, userRole, userBalance, refreshUserInfo } = fetchUserInfo();

    const handleAddBalance = async (amount: number) => {
        await userService.addUserBalance(userId!, amount);
        await refreshUserInfo();
    };

    return (
        <>
            <Head>
                <title>Setback | Balance</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} userRole={userRole} userBalance={userBalance} />
            <main className={styles.container}>
                <div className={styles.balanceSection}>
                    <div className={styles.balanceHeader}>
                        <h1>Balance</h1>
                        <h2>Your current balance is:</h2>
                        <h3>€{userBalance}</h3>
                    </div>

                    <div className={styles.profileTable}>
                        <h2>Add funds:</h2>
                        <div className={styles.buttonRow}>
                            {[5, 10, 20, 50, 100].map((amount) => (
                                <button
                                    key={amount}
                                    className={styles.actionButton}
                                    onClick={() => handleAddBalance(amount)}
                                >
                                    €{amount}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
};

export const getBalance = async (): Promise<number> => {
    let balance = 0.0;

    try {
        const response = await UserService.getUserById(1);
        const userData = await response.json();
        balance = parseFloat(userData.balance);
    } catch (error) {
        console.error("Error fetching user balance:", error);
    }

    return balance;
};

export default Balance;
