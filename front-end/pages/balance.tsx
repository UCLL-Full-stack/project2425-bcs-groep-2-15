import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/balance.module.css';
import React, { useEffect, useState } from 'react';
import UserService from '@services/UserService';
import userService from '@services/UserService';

const Balance: React.FC = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await sessionStorage.getItem('id');
            if (storedUserId) {
                setUserId(Number(storedUserId));
            }
        }
        fetchUserId();
    }, [userId]);

    const fetchUserBalance = async () => {
        if (userId) {
            const user = await userService.getUserById(userId!);
            const userJson = await user.json();
            if (userJson) {
                setBalance(userJson.balance.toFixed(2));
            }
        }
    }

    useEffect(() => {
        fetchUserBalance();
    }, [userId]);

    const handleAddBalance = async (amount: number) => {
        await userService.addUserBalance(userId!, amount);
        await fetchUserBalance();
    };

    return (
        <>
            <Head>
                <title>Setback | Balance</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} balance={balance!} />
            <main className={styles.container}>
                <div className={styles.balanceSection}>
                    <div className={styles.balanceHeader}>
                        <h1>Balance</h1>
                        <h2>Your current balance is:</h2>
                        <h3>€{balance}</h3>
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

    // @ts-ignore
    return balance.toFixed(2);
};

export default Balance;
