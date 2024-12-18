import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { Game } from '@types';
import StoreTable from '@components/storeTable';
import React, { useEffect, useState } from 'react';
import GameService from '@services/GameService';
import { getBalance } from './balance';
import { parse } from 'yaml';
import userService from '@services/UserService';

const Store: React.FC = () => {
    const [games, setGames] = useState<Array<Game>>([]);
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

        const fetchUserBalance = async () => {
            const user = await userService.getUserById(userId!);
            const userJson = await user.json();
            if (userJson) {
                setBalance(userJson.balance);
            }
        }
        fetchUserBalance();

        const getGames = async () => {
            const response = await GameService.getAllGames();
            const games = await response.json();
            setGames(games);
        };
        getGames();
    }, [userId]);

    const updateBalance = async () => {
        const newBalance = await getBalance();
        setBalance(newBalance);
    };

    return (
        <>
            <Head>
                <title>Setback | Store</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} balance={balance} />
            <main className={styles.main}>
                <span>
                    <h1 className={styles.title}>Setback Store</h1>
                </span>
                <StoreTable games={games} updateBalance={updateBalance} />
            </main>
        </>
    );
};

export default Store;
