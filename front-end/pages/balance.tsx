import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import React, { useEffect, useState } from 'react';
import UserService from '@services/UserService';
import userService from '@services/UserService';

const userId = 1;

const Balance: React.FC = () => {
    const [balance, setBalance] = useState<number | null>(null);

    const getBalance = async () => {
        const response = await UserService.getUserBalance(userId);
        const balance = await response.json();
        setBalance(balance.toFixed(2));
    };

    useEffect(() => {
            getBalance();
        },
        []
    );

    const handleAddBalance = async (amount: number) => {
        await userService.addUserBalance(userId, amount);
        await getBalance();
    };

    return (
        <>
            <Head>
                <title>Setback | Balance</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header balance={balance!} />
            <main className={styles.main}>
                <span>
                    <h1>Balance</h1>
                </span>

                <div>
                    <h2>Your current balance is:</h2>
                    <h3>€{balance}</h3>
                </div>

                <div style={{ marginTop: '3%' }}>
                    <h2>Add funds:</h2>
                    <a href="#" onClick={() => handleAddBalance(5)}>€5</a>
                    <a href="#" onClick={() => handleAddBalance(10)}>€10</a>
                    <a href="#" onClick={() => handleAddBalance(20)}>€20</a>
                    <a href="#" onClick={() => handleAddBalance(50)}>€50</a>
                    <a href="#" onClick={() => handleAddBalance(100)}>€100</a>
                </div>
            </main>
        </>
    );
};

export const getBalance = async (): Promise<number> => {
    let balance = 0.00;

    try {
        const response = await UserService.getUserBalance(userId);
        balance = await response.json();
    } catch (error) {
        console.error('Error fetching user balance:', error);
    }

    // @ts-ignore
    return balance.toFixed(2);
};

export default Balance;