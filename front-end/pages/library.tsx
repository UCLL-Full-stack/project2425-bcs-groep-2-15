import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import LibraryTable from '@components/libraryTable';
import {Game, Library} from '@types';
import React, {useEffect, useState} from 'react';
import LibraryService from '@services/LibraryService';
import userService from '@services/UserService';
import UserService from '@services/UserService';
import fetchUserInfo from "../hooks/fetchUserInfo";

const LibraryPage: React.FC = () => {
    const [games, setGames] = useState<Array<Game>>([]);
    const [userLibrary, setUserLibrary] = useState<Library | null>(null);
    const { userId, userRole, userBalance } = fetchUserInfo();

    useEffect(() => {
        if (userId) {
            const getGames = async () => {
                const response = await LibraryService.getAllLibraryGames(userId!);
                const games = await response.json();
                setGames(games);
            };
            getGames();

            const fetchLibrary = async () => {
                const response = await LibraryService.getLibraryById(userId);
                const libraryJson = await response.json();
                setUserLibrary(libraryJson);
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
            <Header userId={userId} userRole={userRole} userBalance={userBalance} />
            <main className={styles.main}>
                {games.length > 0 ? (
                    <LibraryTable games={games} library={userLibrary} userRole={userRole}/>
                ) : (
                    <h2>You do not own any games yet.</h2>
                    )}
            </main>
        </>
    );
};

export default LibraryPage;