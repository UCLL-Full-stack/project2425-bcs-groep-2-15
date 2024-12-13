import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { getBalance } from './balance';

interface HomeProps {
    balance: number;
}

const Home: React.FC<HomeProps> = ({ balance }) => {
    return (
        <>
            <Head>
                <title>Setback | Home</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header balance={balance} />
            <main className={styles.main}>
                <span>
                    <h1>Setback</h1>
                </span>

                <div className={styles.description}>
                    <p>Welcome to the Setback platform.</p>
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

export default Home;
