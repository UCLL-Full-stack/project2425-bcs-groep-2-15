import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { getBalance } from './balance';
import { useEffect, useState } from 'react';
import userService from '@services/UserService';

const Home: React.FC = () => {
    const [userId, setUserId] = useState<number>(1);
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        const fetchUserId = async () => {
            const storedUserId = await sessionStorage.getItem('id');
            if (storedUserId) {
                setUserId(Number(storedUserId));
            }
        }
        fetchUserId();

        const fetchUserBalance = async () => {
            const user = await userService.getUserById(userId);
            const userJson = await user.json();
            if (userJson) {
                setBalance(userJson.balance);
            }
        }
        fetchUserBalance();
    }, []);

    return (
        <>
            <Head>
                <title>Setback | Home</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header balance={balance} />
            <main className={styles.main}>
                <span>
                    <h1 className={styles.title}>Setback</h1>
                </span>

                <div className={styles.description}>
                    <h2>Welcome to the Setback platform.</h2>
                </div>
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

export default Home;
