import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useEffect, useState } from 'react';
import userService from '@services/UserService';
import { Game, User } from '@types';
import AdminPanel from '@components/index/adminPanel';
import WelcomeMessage from '@components/index/welcomeMessage';
import LibraryTable from '@components/libraryTable';
import libraryService from '@services/LibraryService';
import UserGamesTable from '@components/index/userGamesTable';
import SelectedUser from '@components/index/selectedUser';

const About: React.FC = () => {
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

        if (userId) {
            const fetchUserBalance = async () => {
                const user = await userService.getUserById(userId!);
                const userJson = await user.json();
                if (userJson) {
                    setBalance(userJson.balance);
                }
            }
            fetchUserBalance();
        }
    }, [userId]);

    return (
        <>
            <Head>
                <title>Setback | About</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} balance={balance} />
            <main className={styles.main}>
                <h1 className={styles.title}>About Setback</h1>
                <h3 className={styles.subsubtitle}>
                    Setback is an online platform designed for gamers to explore, purchase, and manage
                    their game library. Users can browse through a collection of games, take advantage of discounts,
                    and view games by category. Additionally, each user has a personalized profile where they can
                    showcase their profile picture, name, and games, allowing for a social experience within the gaming
                    community.
                </h3>
            </main>
        </>
    );
};

export default About;
