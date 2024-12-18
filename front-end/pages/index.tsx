import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { getBalance } from './balance';
import { useEffect, useState } from 'react';
import userService from '@services/UserService';
import login from './login';

const Home: React.FC = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [username, setUsername] = useState<number | null>(null);

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

            const fetchUsername = async () => {
                const user = await userService.getUserById(userId!);
                const userJson = await user.json();
                if (userJson) {
                    setUsername(userJson.username);
                }
            }
            fetchUsername();
        }
    }, [userId]);

    return (
        <>
            <Head>
                <title>Setback | Home</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} balance={balance} />
            <main className={styles.main}>
                {userId == null ? (
                    <>
                        <h1 className={styles.title}>Welcome to Setback.</h1>
                        <div className={styles.description}>
                            <h2><a href="/login">Log in here</a> to access the platform.</h2>
                        </div>
                    </>
                ) : userId === 2 ? (
                    <h1 className={styles.title}>= ADMIN INTERFACE =</h1>
                ) : (
                    <h1 className={styles.title}>Welcome to Setback, {username}.</h1>
                )}
            </main>
        </>
    );

};

export default Home;
