import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { Game } from '@types';
import StoreTable from '@components/storeTable';
import React, { useEffect, useState } from 'react';
import GameService from '@services/GameService';
import { getBalance } from './balance';

const userId = 1;

interface StoreProps {
    balance: number;
}

const Store: React.FC<StoreProps> = ({ balance }) => {
    const [balancer, setBalancer] = useState<number>(balance);
    const [games, setGames] = useState<Array<Game>>([]);

    const getGames = async () => {
        const response = await GameService.getAllGames();
        const games = await response.json();
        setGames(games);
    };

    useEffect(() => {
        getGames();
    }, []);

    const updateBalance = async () => {
        const newBalance = await getBalance();
        setBalancer(newBalance);
    };

    return (
        <>
            <Head>
                <title>Setback | Store</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header balance={balancer} />
            <main className={styles.main}>
                <span>
                    <h1>Setback Store</h1>
                </span>
                <div className={styles.description}>
                    <p>Check out our catalog.</p>
                </div>
                <StoreTable games={games} updateBalance={updateBalance} />
            </main>
        </>
    );
};

export async function getServerSideProps() {
    const balance = await getBalance();
    return {
        props: { balance }
    };
}

export default Store;
