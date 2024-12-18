import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import LibraryTable from '@components/libraryTable';
import { Game } from '@types';
import { useEffect, useState } from 'react';
import LibraryService from '@services/LibraryService';
import { getBalance } from './balance';
import userService from '@services/UserService';

const Library: React.FC = () => {
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

        if (userId) {
            const getGames = async () => {
                const response = await LibraryService.getAllLibraryGames(userId!);
                const games = await response.json();
                setGames(games);
            };
            getGames();
        }
    }, [userId]);

    return (
        <>
            <Head>
                <title>Setback | Library</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} balance={balance} />
            <main className={styles.main}>
                <span>
                    <h1 className={styles.title}>Library</h1>
                </span>

                {games.length > 0 ? (
                    <LibraryTable games={games} />
                ) : (
                    <h2>You do not own any games yet.</h2>
                    )}
            </main>
        </>
    );
};

export default Library;