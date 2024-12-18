import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/login.module.css';
import LoginForm from '@components/loginForm';

const Login: React.FC = () => {
    const handleLoginSuccess = () => {
        console.log("User logged in successfully!");
    };

    return (
        <>
            <Head>
                <title>Setback | Login</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header userId={null} balance={null} />
            <main className={styles.main}>
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            </main>
        </>
    );
};

export default Login;
