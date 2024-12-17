import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/login.module.css';
import { getBalance } from './balance';
import { useState } from 'react';
import { useRouter } from 'next/router';
import UserService from '@services/UserService';

interface LoginProps {
    balance: number;
}

const Login: React.FC<LoginProps> = ({ balance }) => {
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username) {
            setError("username is required");
            return;
        }
        if (!password) {
            setError("Password is required");
            return;
        }

        try {
            console.log(username);
            console.log(password);
            const user = await UserService.getUserByUsername(username);
            const userJson = await user.json();
            const response = await UserService.login(username, password, userJson.role);
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Invalid username or password");
            } else {
                const data = await response.json();
                sessionStorage.setItem("authToken", data.token);
                sessionStorage.setItem("user", JSON.stringify(data.user));
                await router.push("/");
            }
        } catch (error) {
            setError("An unexpected error occurred");
        }
    };

    return (
        <>
            <Head>
                <title>Setback | Login</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header balance={balance} />
            <main className={styles.main}>
                <div className={styles.loginContainer}>
                    <h1 className={styles.title}>Login</h1>
                    <form className={styles.loginForm} onSubmit={handleLogin}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="username"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setusername(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>
                            Login
                        </button>
                    </form>
                    {error && <div className={styles.error}>{error}</div>}
                </div>
            </main>
        </>
    );
};

export async function getServerSideProps() {
    const balance = await getBalance();

    return {
        props: { balance },
    };
}

export default Login;
