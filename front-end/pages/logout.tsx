import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/login.module.css';
import { getBalance } from './balance';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserService from '@services/UserService';
import userService from '@services/UserService';

const Logout: React.FC = () => {
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
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
    }, [userId]);

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("id");
        setBalance(null);
        setUserId(null);
        await router.push("/");
    };

    return (
        <>
            <Head>
                <title>Setback | Login</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={userId} balance={null} />
            <main className={styles.main}>
                <div className={styles.loginContainer}>
                    <h1 className={styles.title}>Are you sure you want to log out?</h1>
                    <button onClick={handleLogout} className={styles.submitButton}>Yes</button>
                    {error && <div className={styles.error}>{error}</div>}
                </div>
            </main>
        </>
    );
};

export default Logout;
