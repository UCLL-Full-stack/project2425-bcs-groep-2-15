import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import LibraryTable from '@components/libraryTable';
import {Game, Library} from '@types';
import {useEffect, useState} from 'react';
import LibraryService from '@services/LibraryService';
import userService from '@services/UserService';
import UserService from '@services/UserService';

const Library: React.FC = () => {
    const [games, setGames] = useState<Array<Game>>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [library, setLibrary] = useState<Library | null>(null);

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
            const fetchUserRole = async () => {
                const response = await UserService.getUserById(userId);
                const userJson = await response.json();
                setUserRole(userJson.role);
            }
            fetchUserRole();

            const getGames = async () => {
                const response = await LibraryService.getAllLibraryGames(userId!);
                const games = await response.json();
                setGames(games);
            };
            getGames();

            const fetchLibrary = async () => {
                const response = await LibraryService.getLibraryById(userId);
                const libraryJson = await response.json();
                setLibrary(libraryJson);
                console.log(libraryJson);
            }
            fetchLibrary();
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
                {games.length > 0 ? (
                    <LibraryTable games={games} library={library}  userRole={userRole}/>
                ) : (
                    <h2>You do not own any games yet.</h2>
                    )}
            </main>
        </>
    );
};

export default Library;