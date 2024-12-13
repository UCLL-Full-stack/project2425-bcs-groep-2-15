import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import LibraryTable from '@components/libraryTable';
import { Game } from '@types';
import { useEffect, useState } from 'react';
import LibraryService from '@services/LibraryService';
import { getBalance } from './balance';

const userId = 1;

interface LibraryProps {
    balance: number;
}

const Library: React.FC<LibraryProps> = ({ balance }) => {
    const [games, setGames] = useState<Array<Game>>([]);

    const getGames = async () => {
        const response = await LibraryService.getAllLibraryGames(userId);
        const games = await response.json();
        setGames(games);
    }

    useEffect(() => {
            getGames()
        },
        []
    )

    return (
        <>
            <Head>
                <title>Setback | Library</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header balance={balance} />
            <main className={styles.main}>
                <span>
                    <h1>Library</h1>
                </span>

                <div className={styles.description}>
                    <p>Here are your games.</p>
                </div>

                <LibraryTable games={games} />
            </main>
        </>
    )
};

export async function getServerSideProps() {
    const balance = await getBalance();

    return {
        props: { balance },
    };
}

export default Library;