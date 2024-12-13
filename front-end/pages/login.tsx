import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/login.module.css';
import { getBalance } from './balance';

interface LoginProps {
    balance: number;
}

const Login: React.FC<LoginProps> = ({ balance }) => {
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
                    <form className={styles.loginForm}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <button type="submit" className={styles.submitButton}>Login</button>
                    </form>
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
